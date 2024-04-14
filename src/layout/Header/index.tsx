import { Box, Button, Container, Flex, Heading, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { ButtonLink } from '../../components/ui/ButtonLink/index'
import { useUserStore } from '../../store/user'
import { PRIMARY_COLOR } from '../../styles'

export const Header = () => {
	const navigate = useNavigate()

	const { isCheckingAuthFinished, isAuthenticated, isLoading, logout } = useUserStore(
		useShallow((state) => ({
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isAuthenticated: state.isAuthenticated,
			isLoading: state.isLoading,
			logout: state.logout,
			user: state.user,
		})),
	)

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<Box bgColor={PRIMARY_COLOR} paddingBlock={3} as='header' height={'64px'}>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between' height={'100%'} alignItems='center' gap={5}>
					<Box>
						<Link _hover={{ textDecoration: 'none' }} as={ReactRouterLink} to='/'>
							<Heading as='h1' size='lg' color={'gray.100'}>
								Heritages
							</Heading>
						</Link>
					</Box>
					<Box>
						{isLoading || !isCheckingAuthFinished ? (
							''
						) : isAuthenticated ? (
							<Flex alignItems='center' gap={2}>
								<ButtonLink to='/add-heritage' colorScheme={'gray'}>
									Додати статтю
								</ButtonLink>
								<Button onClick={handleLogout} type={'button'}>
									Вийти
								</Button>
							</Flex>
						) : (
							<Flex alignItems='center' gap={2}>
								<ButtonLink to='/login' colorScheme={'gray'}>
									Ввійти
								</ButtonLink>
								<ButtonLink colorScheme={'gray'} to='/register'>
									Реєстрація
								</ButtonLink>
							</Flex>
						)}
					</Box>
				</Flex>
			</Container>
		</Box>
	)
}
