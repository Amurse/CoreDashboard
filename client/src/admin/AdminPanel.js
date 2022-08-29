import { Tabs } from 'antd'
import React from 'react'
import NewHeader from '../components/Header/NewHeader';
import CustomerData from './Customers/CustomerData';

const { TabPane } = Tabs;

const AdminPanel = () => {
  return (
    <div className='width100 padHorHuge'>
      <NewHeader />
      <div className='headerMargin width100'>
        <Tabs>
          <TabPane tab="Customers" key='1'>
            <CustomerData/>
          </TabPane>  
          <TabPane tab="Visitors" key='2'>
            Displays data on website visitors, and number of users
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPanel