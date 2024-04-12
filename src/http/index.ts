import _axios from 'axios'

const API_URL: string = 'http://localhost:5000/'

const axios = _axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

export default axios
