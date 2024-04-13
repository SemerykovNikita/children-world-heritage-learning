import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { User } from '../../../types/index'
import { loginValidation } from '../utils/loginValidation'

export type LoginForm = Omit<User, 'id' | 'username'>

export const useLoginForm = () => {
	return useForm<LoginForm>({
		mode: 'onChange',
		resolver: yupResolver(loginValidation),
	})
}
