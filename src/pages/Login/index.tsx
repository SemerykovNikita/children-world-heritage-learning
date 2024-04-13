import { Heading } from '@chakra-ui/react'
import { LoginForm } from '../../components/LoginForm/index'

export const LoginPage = () => {
	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Авторизація
			</Heading>
			<LoginForm />
		</>
	)
}
