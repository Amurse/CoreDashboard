import React, { useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from './helpers/axios/axiosUser'
import { selectUser, selectUserLoaded, setUserData } from './redux/features/User/UserSlice';
import LoadingPage from './components/ContentLoader/LoadingPage';
import NotFound from './helpers/pages/NotFound';
import { setScreenSize } from './redux/features/App/AppStatus'
import { Grid } from 'antd';
import Homepage from './components/Homepage/Homepage';
import Pusher from './pusher/features/PusherChat';
import SessionFull from './helpers/pages/SessionFull';
import BusinessIndex from './business/BusinessIndex';
import { appError } from './helpers/functions/general'
import { connectSilentlyMetamask } from './web3/ConnectWallet';
import NewLandingPage from './components/LandingPage/NewLandingPage';
import PaymentThanks from './components/PaymentThanks/PaymentThanks';
import AdminPanel from './admin/AdminPanel';
import AdminRoute from './components/Helpers/AdminRoute';
import TokenPage from './components/LandingPage/TokenPage';
import '@amurse/chatwindow/dist/styles.css';
import { initializeChatSDK } from '@amurse/chat_sdk'

const { useBreakpoint } = Grid;

function App() {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const user = useSelector(selectUser);
  const userLoaded = useSelector(selectUserLoaded);

  //for screen size
  useEffect(() => {
        
       //globally updates the size of the screen 
    let sizes = Object.entries(screens)
        .filter(screen => !!screen[1])
        .map(screen => {
            return screen[0]
        });
    let screenSize = sizes[sizes.length - 1]
    dispatch(setScreenSize({screenSize: screenSize}));
    
  }, [screens, dispatch]);

  

  const history = useHistory();
  const location = useLocation();

  const fullSessions = () => {
    if (location.path !== '/sessionsFull') history.push('/sessionsFull');
  };

  let validate = async () => {
    // wakeUpNeededAPIs();
    let sessions = (await axios.post('/getSessions')).data;
    if (sessions.total > 300) fullSessions()
    let address = await connectSilentlyMetamask(setUserData, appError);

    address && await axios.post('/loginValidate', {address}, { withCredentials: true, credentials: 'include' })
      .then(async res => {
       
      if (res && !res.data) {
        dispatch(setUserData({found: false, loaded: true}));
      }
      else if (res && res.data) {
        initializeChatSDK({accessToken: process.env.REACT_APP_AMURSE_ACCESS_TOKEN, dev: process.env.NODE_ENV === 'development'})
        dispatch(setUserData({ ...res.data, loaded: true }));
       
      };
      
      }).catch(err => console.log(err));
    dispatch(setUserData({loaded: true}))
  }
  

  const checkWallet = () => {
    setTimeout(() => {
      validate();
    }, [500])
  }

  useEffect(() => {
    checkWallet()
    // eslint-disable-next-line
  }, [])


  return (
    <div className="app">
      {userLoaded && <Pusher />}
      {userLoaded &&
        <Switch>
          <Route path='/inquiry'><TokenPage/></Route>
          <AdminRoute path="/adminPanel" component={AdminPanel}></AdminRoute>
          <Route path="/paymentConfirm"><PaymentThanks/></Route>
          <Route path="/sessionsFull"><SessionFull /></Route>
          <Route path="/business"><BusinessIndex /></Route>
          <Route exact path="/">{user._id ? <Homepage /> : <NewLandingPage />}</Route>
          <Route component={NotFound} />
        </Switch>}
      {
        !userLoaded && <LoadingPage/>
      }
    </div>
  );
}

export default App;
