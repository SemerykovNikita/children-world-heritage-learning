import { Button, FormControl, Input } from '@chakra-ui/react'
import { COLOR_THEME } from '../../styles/index'
import { Form } from '../ui/Form/index'
import FormError from '../ui/FormError/index'
import { useRegistrationForm } from './hooks/useRegistrationForm'

export const RegistrationForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useRegistrationForm()

	const onSubmit = () => {}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.email}>
				<Input placeholder='Email' type='email' {...register('email')} />
				<FormError message={errors.email?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.password}>
				<Input placeholder='Password' type='password' {...register('password')} />
				<FormError message={errors.password?.message} />
			</FormControl>

			<FormControl isInvalid={!!errors.confirmPassword}>
				<Input placeholder='Confirm Password' type='password' {...register('confirmPassword')} />
				<FormError message={errors.confirmPassword?.message} />
			</FormControl>

			<Button
				disabled={!isValid}
				isLoading={false}
				loadingText='Submitting'
				colorScheme={COLOR_THEME}
				variant='solid'
			>
				Submit
			</Button>
		</Form>
	)
}
