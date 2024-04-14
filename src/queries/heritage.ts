import {
	QueryKey,
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from '../http/index'
import { Heritage } from '../types/index'
import { LIMIT } from '../utils/constants'
import { CREATE_HERITAGE, DELETE_HERITAGE, QUERY_HERITAGE, QUERY_HERITAGES } from './queryKeys'

const URL = '/heritages'

type HeritageToAdd = Omit<Heritage, 'id'>

const addHeritage = async (heritage: HeritageToAdd) => {
	await axios.post(URL, heritage)
}

export const useAddHeritage = (options?: UseMutationOptions<void, AxiosError, HeritageToAdd>) => {
	const queryClient = useQueryClient()

	return useMutation({
		...options,
		mutationKey: [CREATE_HERITAGE],
		mutationFn: addHeritage,
		onSuccess: async (...params) => {
			options?.onSuccess?.(...params)

			await queryClient.invalidateQueries({ queryKey: [QUERY_HERITAGES] })
		},
	})
}

export type FetchHeritagesResponse = {
	data: Heritage[]
	count: string | number
}

export type FetchHeritagesParams = {
	search?: string
	limit?: number
	page?: number
}

const fetchHeritages = async (params?: FetchHeritagesParams) => {
	const { data: response, headers } = await axios.get<Heritage[]>(
		`${URL}?q=${params?.search ?? ''}&_page=${params?.page || 1}&_limit=${params?.limit || LIMIT}`,
	)
	return { data: response, count: headers['x-total-count'] }
}

export const useQueryHeritages = (
	params?: FetchHeritagesParams,
	options?: UseQueryOptions<FetchHeritagesResponse, AxiosError, FetchHeritagesResponse>,
) =>
	useQuery({
		queryKey: [QUERY_HERITAGES, params?.search, params?.page, params?.limit],
		queryFn: () => fetchHeritages(params),
		...options,
	})

const fetchHeritage = async (id: number | string) => {
	const { data: response } = await axios.get<Heritage>(`${URL}/${id}`)
	return response
}

export const useQueryHeritage = (
	id: number | string,
	options?: UseQueryOptions<Heritage, AxiosError, Heritage, QueryKey>,
) =>
	useQuery({
		queryKey: [QUERY_HERITAGE, id],
		queryFn: () => fetchHeritage(id),
		enabled: !!id && options?.enabled !== false,
	})

const deleteHeritage = async (id: string | number) => {
	await axios.delete(`${URL}/${id}`)
}

export const useDeleteHeritage = (
	id: string | number,
	options?: UseMutationOptions<void, AxiosError, string | number>,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		...options,
		mutationKey: [DELETE_HERITAGE, id],
		mutationFn: () => deleteHeritage(id),
		onSuccess: async (...params) => {
			options?.onSuccess?.(...params)

			await queryClient.invalidateQueries({ queryKey: [QUERY_HERITAGES] })
		},
	})
}
