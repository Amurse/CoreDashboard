import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/User/UserSlice'
import axiosAccess from '../../helpers/axios/axiosAccess';
import { appError } from 'amurse-chatwindow-basic/dist/helpers';
const TokenGenrator = () => {
  const user = useSelector(selectUser);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);


  const getRecentAPIToken = async () => {
    await axiosAccess.post('/getToken', { address: user.address })
      .then(res => {
        let token = res.data;
        token && setToken(token.token);
      }).catch(err => {
        appError('Could not get token')
      });
    setLoading(false)
  }

  useEffect(() => {
    if (user.address) getRecentAPIToken();
  }, [user.address]);

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
      <p>{token}</p>
    </div>
  )

  return (
    <div className='flex flexCol align-center justify-center'>
      {!token && !loading && <Button onClick={createAPIToken} type='primary'>Generate Token For Chat API</Button>}
      {token && tokenDisplayer()}
    </div>
  )
}

export default TokenGenrator