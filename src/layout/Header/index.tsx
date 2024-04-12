import { Box, Container, Flex, Heading, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/ButtonLink/index'
import { PRIMARY_COLOR } from '../../styles'

export const Header = () => {
	return (
		<Box bgColor={PRIMARY_COLOR} paddingBlock={3} as='header'>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between' alignItems='center' gap={5}>
					<Box>
						<Link _hover={{ textDecoration: 'none' }} as={ReactRouterLink} to='/'>
							<Heading as='h1' size='lg' color={'gray.100'}>
								Heritages
							</Heading>
						</Link>
					</Box>
					<Box>
						<Flex alignItems='center' gap={2}>
							<ButtonLink to='/' colorScheme={'gray'}>
								Ввійти
							</ButtonLink>
							<ButtonLink colorScheme={'gray'} to='/'>
								Реєстрація
							</ButtonLink>
						</Flex>
					</Box>
				</Flex>
			</Container>
		</Box>
	)
}
