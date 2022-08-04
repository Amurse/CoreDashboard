import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../helpers/axios/axiosUser';
import { logoutUser, selectUser, setUserData } from '../../redux/features/User/UserSlice';
import Web3 from 'web3';
import { appError, appMessage, disconnectUser, formattedWalletAddress } from '../../helpers/functions/general';
import { Button } from 'antd';

const ConnectWallet = ({redirect}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const ethereum = window.ethereum;

   // USER CREATION /UPDATE
   const createUser = async (address) => {
    const _user = (await axios.post('/createUser', {address: address})).data;
    dispatch(setUserData(_user));
  };

  const completeSetup = (address, addressExists) => {
    axios.post('/setupUser', {address: address, userId: user._id, emailExists: addressExists}).then((response) => {
      dispatch(setUserData({address: address}));
    }).catch((err) => {
      appError('Something went wrong');
    });
  };

  const login = (address) => {
    axios.post('/login', {address: address, userId: user._id}).then((response) => {
      if (response.data._id !== user._id) {
        // dispatch(clearSpaceData());
      }
      dispatch(setUserData(response.data));
      redirect && history.push(redirect);
    }).catch((err) => {
      appError('Something went wrong');
    });
  };


  const connectMetamask = async () => {
    if (window.ethereum) {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(ethereum);
      const networkId = await window.web3.eth.getChainId();
      if (networkId !== 1 || !accounts[0]) return;
      dispatch(setUserData({address: accounts[0]}));
      const addressExists = (await axios.post('/addressExists', {address: accounts[0]})).data;
            addressExists ? login(accounts[0]) : user._id ? completeSetup(accounts[0], addressExists) : createUser(accounts[0]);
            return true;
    } else {
      appMessage('Please install metamask');
    }
  };

  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts) => {
        dispatch(setUserData({address: accounts[0]}));
        if (!accounts[0]) disconnectUser(redirect, dispatch, logoutUser);
      });
      ethereum.on('disconnect', () => disconnectUser(redirect, dispatch, logoutUser));
    }
    // eslint-disable-next-line
  }, [ethereum]);


  return (
    <div>
       {!user.address && <Button type='primary' onClick={connectMetamask}>Connect Wallet</Button>}
        {user.address && <Button type='primary' onClick={()=>disconnectUser(redirect, dispatch, logoutUser)}>{formattedWalletAddress(user.address)}</Button>}
    </div>
  )
}

export default ConnectWallet