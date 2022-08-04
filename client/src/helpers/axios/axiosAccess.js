import axios from 'axios';
import { appError } from '../functions/general';

const BASE_URL = process.env.NODE_ENV === 'production'? 'https://chat-dot-amurse.uk.r.appspot.com' : 'http://localhost:5003'

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    credentials: 'include',

})

instance.interceptors.response.use((res) => res, (error) => {
    if (error.response.data === "Session Expired") appError('Session Expired')
})

export default instance;