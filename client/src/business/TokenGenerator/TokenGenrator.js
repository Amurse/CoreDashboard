import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserData } from '../../redux/features/User/UserSlice'
import axiosAccess from '../../helpers/axios/axiosAccess';
import { appError, verifyUser } from '../../helpers/functions/general'

const TokenGenrator = () => {
  const user = useSelector(selectUser);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getRecentAPIToken = async () => {
    
    await axiosAccess.post('/getToken', { address: user.address, signature: user.signature })
      .then(res => {
        let token = res.data;
        token && setToken(token.token);
      }).catch(err => {});
    setLoading(false)
  }

  useEffect(() => {
    //in order to get run the function, either a session must exist or there must be a signature in user object
    if (user._id && user.signature) {
      getRecentAPIToken();
    } else if (user._id && !user.signature) {
      verifyUser(dispatch, setUserData, user, user.address)
    }
    // eslint-disable-next-line
  }, [user._id, user.signature]);

  const createAPIToken = () => {
    if (token) return;
    axiosAccess.post('/createToken', { address: user.address })
      .then(res => {
        const token = res.data;
        setToken(token.token)
      }).catch(err => {
        appError('Address not whitelisted')
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