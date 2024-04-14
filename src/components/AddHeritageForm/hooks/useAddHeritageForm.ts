import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Heritage } from '../../../types/index'
import { addHeritageValidation } from '../utils/addHeritageValidation'

export type HeritageForm = Omit<Heritage, 'id' | 'dateOfCreation' | 'imageBlob'> & {
	image: FileList
}

export const useAddHeritageForm = () =>
	useForm<HeritageForm>({
		mode: 'onChange',
		resolver: yupResolver(addHeritageValidation),
		defaultValues: {
			userId: 1,
		},
	})
