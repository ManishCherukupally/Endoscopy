
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName='csrftoken';
axios.defaults.xsrfHeaderName='x-csrftoken'


const client = axios.create(
    {
        baseURL: "http://192.168.29.251:8005"
    }
)

export default client
