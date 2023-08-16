import axios from 'axios'


export default axios.create({
    baseURL: 'https://markdown-33vv.onrender.com/api',
    headers: { 'Content-Type': 'application/json' }
})