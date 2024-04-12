import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { User } from '../../../types/index'
import { registrationValidation } from '../utils/registrationValidation'

type RegistrationForm = Omit<User, 'id'> & {
	confirmPassword: string
}

export const useRegistrationForm = () => {
	return useForm<RegistrationForm>({
		mode: 'onChange',
		resolver: yupResolver(registrationValidation),
	})
}
