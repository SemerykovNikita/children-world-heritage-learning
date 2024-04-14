import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Heritage } from '../../../types/index'
import { editHeritageValidation } from '../utils/editHeritageValidation'

export type HeritageForm = Omit<Heritage, 'id' | 'dateOfCreation' | 'imageBlob'> & {
	image?: FileList
}

type DefaultValues = {
	title?: string | undefined
	description?: string | undefined
	userId?: number | undefined
	image?: FileList | undefined
}

export const useEditHeritageForm = (defaultValues: DefaultValues | undefined) =>
	useForm<HeritageForm>({
		mode: 'onChange',
		resolver: yupResolver(editHeritageValidation),
		defaultValues,
	})
