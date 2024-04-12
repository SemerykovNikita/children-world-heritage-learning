import { User } from '../types/index'
import axios from './index'

const RESOURCE: string = '/users'

export const exists = async (email: string): Promise<boolean> => {
	const { data: response } = await axios.get<User[]>(`${RESOURCE}?email=${email}`)
	return !!response[0]
}

export const getByEmailAndPassword = async (email: string, password: string): Promise<User> => {
	const { data: response } = await axios.get<User[]>(`${RESOURCE}?email=${email}&password=${password}`)
	return response[0]
}

export const create = async (user: Omit<User, 'id'>): Promise<User> => {
	const { data: response } = await axios.post<User>(RESOURCE, user)
	return response
}
