import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from '../http/index'
import { Heritage } from '../types/index'
import { CREATE_HERITAGE, QUERY_HERITAGES } from './queryKeys'

const URL = '/heritages'

type HeritageToAdd = Omit<Heritage, 'id'>

const addHeritage = async (heritage: HeritageToAdd) => {
	await axios.post(URL, heritage)
}

export const useAddHeritage = (options?: UseMutationOptions<void, AxiosError, HeritageToAdd>) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: [CREATE_HERITAGE],
		mutationFn: addHeritage,
		onSuccess: async (...params) => {
			options?.onSuccess?.(...params)

			await queryClient.invalidateQueries({ queryKey: [QUERY_HERITAGES] })
		},
		...options,
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
