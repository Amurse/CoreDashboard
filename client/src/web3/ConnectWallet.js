import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../helpers/axios/axiosUser';
import { logoutUser, selectUser, setUserData } from '../redux/features/User/UserSlice';
import Web3 from 'web3';
import { appError, appMessage, disconnectUser, formattedWalletAddress } from '../helpers/functions/general';
import { Button } from 'antd';
import { signMessageMetamask } from './SignMessage';



//validate ethreum address
export const validateAddressEthereum = async (address) => {
  const valid = await Web3.utils.isAddress(address);
  return valid;
}

// if metamask already connected, return updated account
export const connectSilentlyMetamask = async (setUserData, errorHandler) => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    const networkId = await window.web3.eth.getChainId();
    let accounts;
    await web3.eth.getAccounts((err, result) => {
      if (err) return console.log(err)
      accounts = result;
    });
    if (!networkId || !accounts[0]) return;
    if (networkId && networkId !== 1) {
      errorHandler && errorHandler('Please review network');
      return
    }
    
    setUserData && setUserData({ address: accounts[0] });
    return accounts[0];
  }
  return null;
}

const ConnectWallet = ({button, redirect, text, buttonSize, buttonStyle}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const ethereum = window.ethereum;


  const login = async (address) => {
    const signature = await signMessageMetamask('PLEASE VERIFY OWNERSHIP', address);

    if (!signature) return appError('No Signature Provided');

    await axios.post('/login', {address: address, userId: user._id, signature: signature}).then((response) => {
      if (response.data._id !== user._id) {
        // dispatch(clearSpaceData());
      }
      dispatch(setUserData({...response.data, signature}));
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
      if (networkId !== 1 || !accounts[0]) return appError('Please verify network/active account');
      dispatch(setUserData({address: accounts[0]}));
      await login(accounts[0]);
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
      {!button && !user.address && <span onClick={connectMetamask}>{ text }</span>}
       
      {button && !user.address && <Button style={buttonStyle} className='borderRadius' type='primary' size={ buttonSize || 'middle'} onClick={connectMetamask}>{text}</Button>}
        {user.address && <Button type='primary' className='borderRadius' onClick={()=>disconnectUser(redirect, dispatch, logoutUser)}>{formattedWalletAddress(user.address)}</Button>}
    </div>
  )
}

export default ConnectWallet