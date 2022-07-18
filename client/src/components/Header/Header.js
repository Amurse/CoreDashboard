import React, {useEffect} from 'react';
import './Header.css';
import {Link, useHistory} from 'react-router-dom';
import {selectUser, setUserData} from '../../redux/features/User/UserSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'antd';
import axios from '../../helpers/axiosUser';
import {selectAppStatus, setAppStatus} from '../../redux/features/App/AppStatus';
import logo from '../../images/landingPage/AMURSE.png';
import {FiMenu} from 'react-icons/fi';
import Web3 from 'web3';
import {appError, appMessage, disconnectUser, formattedWalletAddress} from '../../helpers/helpers';



const Header = () => {
  const ethereum = window.ethereum;
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const openDrawer = ()=> dispatch(setAppStatus({mobileDrawerActive: true}));

  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;


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
      history.push('/');
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
        if (!accounts[0]) disconnectUser();
      });
      ethereum.on('disconnect', () => disconnectUser());
    }
    // eslint-disable-next-line
  }, [ethereum]);


  const headerOptions = () => {
    return (
      <div className="headerMiddleOptions">
        {!user.address && <Button type='primary' onClick={connectMetamask}>Connect Wallet</Button>}
        {user.address && <Button type='primary' onClick={disconnectUser}>{formattedWalletAddress(user.address)}</Button>}
      </div>
    );
  };

  return (
    <div className="header">
      <div className="headerLeft">
        {mobileView && user._id && <FiMenu style={{fontSize: 'xx-large'}} onClick={() => openDrawer()}/>}
        <div className="headerTitle">
          <Link to="/">
            <span className='flex align-bottom black'>
              <img src={logo} width={20} height={20} alt="Amurse"></img>murse
            </span>
          </Link>
                </div> 
            </div>
            { <div className="headerMiddle">
                { headerOptions()}
            </div>}
        </div>
  );
};

export default Header;
