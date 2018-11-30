import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.25.98:7780/trafficweb',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
request.interceptors.request.use(config => {
    return config;
}, error => {
    return new Promise.inject(error);
})

request.interceptors.response.use(response=>{
    return response.data
},error=>{
    new Promise.inject(error)
})

export default request;