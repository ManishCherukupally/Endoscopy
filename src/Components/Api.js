
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName='csrftoken';
axios.defaults.xsrfHeaderName='x-csrftoken'


const client = axios.create(
    {
        baseURL: "http://localhost:8000"
    }
)

export default client
