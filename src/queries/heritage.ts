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

const fetchHeritages = async () => {
	const { data: response } = await axios.get<Heritage[]>(URL)
	return response
}

export const useQueryHeritages = (options?: UseQueryOptions<Heritage[], AxiosError, Heritage[], string[]>) =>
	useQuery({
		queryKey: [QUERY_HERITAGES],
		queryFn: fetchHeritages,
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
