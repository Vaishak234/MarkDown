import axios from 'axios'


export default axios.create({
    baseURL: 'https://markdown-1zpw.onrender.com/api',
    headers: { 'Content-Type': 'application/json' }
})