import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from '../http/index'
import { Heritage } from '../types/index'
import { CREATE_HERITAGE } from './queryKeys'

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

			await queryClient.invalidateQueries({ queryKey: ['soldiers'] })
		},
		...options,
	})
}
