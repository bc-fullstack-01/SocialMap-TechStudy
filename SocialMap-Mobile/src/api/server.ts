import axios from 'axios'
import CONSTANTS from '../../constants'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export default {
    noAuth: axios.create({ baseURL:CONSTANTS.API_HOST, headers }),
    auth: (token: string) => axios.create({ 
        baseURL:CONSTANTS.API_HOST, 
        headers: { ...headers, authorization: `Bearer ${token}` } 
    })
}