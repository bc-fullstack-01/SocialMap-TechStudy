import axios from 'axios'

export default axios.create({
    baseURL: process.env.API_PORT || 'http://localhost:4000/v1'
})