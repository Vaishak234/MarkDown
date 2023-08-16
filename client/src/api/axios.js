import axios from 'axios'


export default axios.create({
    baseURL: 'https://markdown-33vv.onrender.com',
    headers: { 'Content-Type': 'application/json' }
})