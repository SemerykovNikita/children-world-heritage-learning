import _axios from 'axios'
import { API_URL } from '../utils/constants'

const axios = _axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

export default axios
