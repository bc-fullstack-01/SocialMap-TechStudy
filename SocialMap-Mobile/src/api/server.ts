import axios from 'axios'
import CONSTANTS from '../../constants'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export default {
    default: axios.create({ baseURL:CONSTANTS.API_HOST}),
    noAuth: axios.create({ baseURL:CONSTANTS.API_HOST, headers }),
    auth: (token: string) => axios.create({ 
        baseURL:CONSTANTS.API_HOST, 
        headers: { authorization: `Bearer ${token}` } 
    })
}