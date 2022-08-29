import React, { useEffect } from 'react';
import { Route} from 'react-router-dom';
import { selectUser, setUserData } from '../../redux/features/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../helpers/pages/NotFound'
import axiosUser from '../../helpers/axios/axiosUser';


const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const isAdmin = async () => {
    if (user.admin) return;
    let _isAdmin = (await axiosUser.post('/isAdmin', { address: user.address })).data;
    dispatch(setUserData({admin: _isAdmin}))
  }

  useEffect(() => {
    if (user.address) isAdmin();
  }, [user.address, user.admin])


    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => {
            // console.log(path)
            return (user._id && user.admin) ?
                <Component {...props} />
                : <NotFound/>
        }} />
    );
};

export default AdminRoute;