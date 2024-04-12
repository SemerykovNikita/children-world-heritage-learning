import { Button, FormControl, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useSuccessToast } from '../../hooks/useSuccessToast'
import { useUserStore } from '../../store/user'
import { COLOR_THEME } from '../../styles/index'
import { Form } from '../ui/Form/index'
import FormError from '../ui/FormError/index'
import { RegistrationForm as RegistrationFormType, useRegistrationForm } from './hooks/useRegistrationForm'
import { generateUsername } from './utils/generateUsername'

export const RegistrationForm = () => {
	const navigate = useNavigate()

	const showSuccessToast = useSuccessToast({
		title: 'You have successfully registered',
	})

	const showErrorToast = useErrorToast()

	const {
		user,
		error,
		register: createUser,
		isLoading,
	} = useUserStore(
		useShallow((state) => ({
			error: state.error,
			register: state.register,
			user: state.user,
			isLoading: state.isLoading,
		})),
	)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useRegistrationForm()

	useEffect(() => {
		if (!error) return

		showErrorToast(error)
	}, [error, showErrorToast])

	useEffect(() => {
		if (!user) return

		reset()

		showSuccessToast()

		navigate('/')
	}, [navigate, reset, showSuccessToast, user])

	const onSubmit: SubmitHandler<RegistrationFormType> = ({ email, password }) => {
		createUser({
			email,
			password,
			username: generateUsername(email),
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.email}>
				<Input placeholder='Електронна адреса' type='email' {...register('email')} />
				<FormError message={errors.email?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.password}>
				<Input placeholder='Пароль' type='password' {...register('password')} />
				<FormError message={errors.password?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.confirmPassword}>
				<Input placeholder='Повторіть пароль' type='password' {...register('confirmPassword')} />
				<FormError message={errors.confirmPassword?.message} />
			</FormControl>

			<Button
				type='submit'
				disabled={!isValid}
				isLoading={isLoading}
				loadingText='Чекайте...'
				colorScheme={COLOR_THEME}
				variant='solid'
			>
				Зареєструватися
			</Button>
		</Form>
	)
}
