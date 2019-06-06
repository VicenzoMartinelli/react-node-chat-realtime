import axios from 'axios';

export default axios.create({
    baseURL: 'http://172.30.2.220:3000/'
    //baseURL: 'http://127.0.0.1:3000/'
});