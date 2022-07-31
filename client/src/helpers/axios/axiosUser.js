import axios from 'axios';
import { appError } from '../functions/general';


const API_BASE_URL =  process.env.NODE_ENV === 'production'? 'https://user-dot-amurse.uk.r.appspot.com/api' : 'http://localhost:5002/api';

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    credentials: 'include',

})

instance.interceptors.response.use((res) => res, (error) => {
    if (error.response.data === "Session Expired") appError('Session Expired')
})

export default instance;