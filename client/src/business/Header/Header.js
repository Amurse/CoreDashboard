import React from 'react';
// import './Header.css';
import {Link, useHistory} from 'react-router-dom';
import {selectUser,} from '../../redux/features/User/UserSlice';
import {useSelector, useDispatch} from 'react-redux';

import {selectAppStatus, setAppStatus} from '../../redux/features/App/AppStatus';
import logo from '../../images/landingPage/AMURSE.png';
import {FiMenu} from 'react-icons/fi';
import ConnectWallet from '../../web3/connectWallet/ConnectWallet';



const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const openDrawer = ()=> dispatch(setAppStatus({mobileDrawerActive: true}));

  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;





  

  const headerOptions = () => {
    return (
      <div className="headerMiddleOptions">
        { <h3 type='primary' className='hover margin16' onClick={() => history.push('/business')}>Documentation</h3>}
        <ConnectWallet/>
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
