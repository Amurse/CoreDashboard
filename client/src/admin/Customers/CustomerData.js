
import { Button, Collapse, Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosAccess from '../../helpers/axios/axiosAccess';
import axiosUser from '../../helpers/axios/axiosUser';
import { appError, verifyUser } from '../../helpers/functions/general';
import { selectUser, setUserData } from '../../redux/features/User/UserSlice';
import { validateAddressEthereum } from '../../web3/ConnectWallet';

const Columns = [
  { title: 'Project', dataIndex: 'projectName', key: 'project' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Address', dataIndex: 'address', key: 'address' }
];

const { Panel } = Collapse;
const CustomerData = () => {
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [tokens, setTokens] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ active: false });
  const toggleNewCustomer = () => setNewCustomer({active: !newCustomer.active});

  const getTotalTokens = async () => {
    let _tokens = await axiosAccess.post('/totalTokens', { signature: user.signature });
    _tokens = _tokens.data?.totalTokens;
    _tokens && setTokens(_tokens)
  }

  const getCustomers = async () => {
    let customers = (await axiosUser.post('/customer/getCustomers', {signature: user.signature})).data;
    setCustomers(customers);
  }

  const createCustomer = async (values) => {
    //session already create from getCustomers call, no signature needed
    let newCus = (await axiosUser.post('/customer/createCustomer', values)).data;
    if (newCus) {
      setCustomers([newCus, ...customers])
      form.resetFields();
      setNewCustomer({ active: false });
    } else appError('Could not create new customer')
    // console.log(newCus)
   
  }



  useEffect(() => {
    user._id && !user.signature && verifyUser(dispatch, setUserData, user, user.address);
    // eslint-disable-next-line
  }, [user._id])


  useEffect(() => {
    if (user.address && user.signature) {
      getTotalTokens();
      getCustomers();
    }
    // eslint-disable-next-line
  }, [user.address, user.signature]);

 

  const AddCustomerButton = () => {
    return (
      <div>
        {!newCustomer.active && <Button type='primary' className='marVerMed borderRadius' onClick={toggleNewCustomer}>Add New Customer</Button>}
      </div>
    )
  }

 

  return (
    <div className='width100'>
       <div className='blue bold'>Used to whitelist customer wallet address for API key generation</div>
      <div className='textBig gray'>Total tokens: {tokens ? tokens.length : 0}</div>
      <Collapse>
        <Panel key="1" header="Token Addresses">
          {tokens && tokens.map((token, index) => {
            return (
              <div key={index} className='textMed gray'>{token.address}</div>
            )
          })}
        </Panel>
      </Collapse>

      <AddCustomerButton />
      <div className='textMed bold gray marVerMed'>Customer Data</div>
      <Table dataSource={customers} columns={Columns} />

      <Modal
        closable
        footer={null}
        visible={newCustomer.active}
        onCancel={toggleNewCustomer}
        // onOk={createCustomer}
        title="New Customer 🎉😍🔥"
        className="postCreationModal"          
      >
        <Form layout='vertical' onFinish={createCustomer} form={form}>
          <Form.Item
            label="WALLET ADDRESS"
            name="address"
            rules={[{ required: true, message: 'Please input your wallet address!' }, {validator: validateAddressEthereum}]}>
            <Input placeholder="Enter address..." ></Input>
          </Form.Item>
          <Form.Item
            label="EMAIL" 
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
            <Input placeholder="Enter email..." ></Input>
          </Form.Item>
          <Form.Item
            name="projectName"
            label="PROJECT NAME" 
            rules={[{ required: true, message: 'Please input project name!' }]}>
            <Input placeholder="Enter name..." ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      

    </div>
  )
}

export default CustomerData