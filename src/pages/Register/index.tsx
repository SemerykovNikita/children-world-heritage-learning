import { Heading } from '@chakra-ui/react'
import { RegistrationForm } from '../../components/RegistrationForm/index'

export const RegisterPage = () => {
	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Реєстрація
			</Heading>
			<RegistrationForm />
		</>
	)
}
