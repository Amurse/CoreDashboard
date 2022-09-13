import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Homepage.css';
import {useLocation, useParams} from 'react-router-dom';
import {selectUserExists, setUserData} from '../../redux/features/User/UserSlice';

import axios from '../../helpers/axios/axiosUser';
import MessagingPage from '../MessagePage/MessagingPage';
import NewHeader from '../Header/NewHeader';

const Homepage = () => {
  const userExists = useSelector(selectUserExists);
  const location = useLocation();


  // const { workspace, page } = qs.parse(location.search); //representing the index of the workspace to enter
  const {workspace} = useParams();
  // console.log("IDD>>", id)
  const dispatch = useDispatch();




  // USER CREATION /UPDATE
  const createUser = async () => {
    const _user = await axios.post('/createUser', {});
    dispatch(setUserData(_user.data));
  };

  // if not logged-in user tryna access workspace, create a user
  useEffect(() => {
    if (!userExists && workspace) createUser();
    // eslint-disable-next-line
  }, [userExists, workspace]);




  useEffect(() => {
    document.title = 'Home - Amurse';
    // eslint-disable-next-line
    }, [location.pathname]);


 

  const toReturn = () => {
    return (
      <div className="width100">
        <NewHeader boxShadow={true}/>
        <div className='homepageContent'>
          {<MessagingPage />}
        </div>
      </div>
    );
  };


  return (
    toReturn()
  );
};

export default Homepage;
