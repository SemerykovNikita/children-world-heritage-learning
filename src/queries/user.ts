import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from '../http/index'
import { User } from '../types/index'
import { QUERY_USER } from './queryKeys'

const URL = '/users'

const fetchUser = async (id: number | string) => {
	const { data: response } = await axios.get<User>(`${URL}/${id}`)
	return response
}

export const useQueryUser = (id: number | string, options?: UseQueryOptions<User, AxiosError, User, QueryKey>) =>
	useQuery({
		queryKey: [QUERY_USER, id],
		queryFn: () => fetchUser(id),
		enabled: !!id && options?.enabled !== false,
	})
