
import axios from "axios";
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName='csrftoken'
axios.defaults.xsrfHeaderName='x-csrftoken'


const client = axios.create(
    // {
    //     baseURL: "http://192.168.29.251:8000"
    // }

    // {
    //     baseURL: "http://localhost:8000"
    // }

    
    {
        baseURL: "http://127.0.0.1:8000"
    }

    
)

export default client
