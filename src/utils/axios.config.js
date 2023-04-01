import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.headers.post['Content-Type'] = 'application/json'; 
axios.defaults.headers.post['Accept'] = 'application/json';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        Authorization : `Bearer ${Cookies.get('authCookie')}`
        }
});

export default instance; 