import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/User/UserSlice'
import axiosAccess from '../../helpers/axios/axiosAccess';
import { appError } from '../../helpers/functions/general'
import { signMessageMetamask } from '../../web3/SignMessage';

const TokenGenrator = () => {
  const user = useSelector(selectUser);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);


  const getRecentAPIToken = async () => {
    
    await axiosAccess.post('/getToken', { address: user.address, signature: user.signature })
      .then(res => {
        let token = res.data;
        token && setToken(token.token);
      }).catch( async err => {
        let signature = await signMessageMetamask('PLEASE VERIFY OWNERSHIP', user.address);
        await axiosAccess.post('/getToken', { address: user.address, signature: signature })
          .then(res => {
            let token = res.data;
            token && setToken(token.token);
          }).catch(err => { appError('No signature provided')})
      });
    setLoading(false)
  }

  useEffect(() => {
    //in order to get run the function, either a session must exist or there must be a signature in user object
    if (user._id) getRecentAPIToken();
    // eslint-disable-next-line
  }, [user._id]);

  const createAPIToken = () => {
    if (token) return;
    axiosAccess.post('/createToken', { address: user.address })
      .then(res => {
        const token = res.data;
        console.log(token);
        setToken(token.token)
      }).catch(err => {
      appError('Could not generate token')
    })
  }

  const tokenDisplayer = () => (
    <div>
      <h2>Your API token: </h2>
      <p className='flex flexWrap wordWrap'>{token}</p>
    </div>
  )

  return (
    <div className='flex flexCol align-center justifyCenter'>
      {!token && !loading && <Button className='borderRadius' onClick={createAPIToken} type='primary'>Generate Token For Chat API</Button>}
      {token && tokenDisplayer()}
    </div>
  )
}

export default TokenGenrator