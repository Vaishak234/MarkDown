import axios from 'axios'


export default axios.create({
    baseURL: 'https://markdown-398n.onrender.com/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials:true
})
