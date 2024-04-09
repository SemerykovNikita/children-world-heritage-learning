import { Box, Container, Flex, Heading, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

export const Header = () => {
	return (
		<Box paddingBlock={3} as='header'>
			<Container maxW='container.xl'>
				<Flex justifyContent='space-between' alignItems='center' gap={5}>
					<Box>
						<Link _hover={{ textDecoration: 'none' }} as={ReactRouterLink} to='/'>
							<Heading as='h1' size='lg'>
								Heritages
							</Heading>
						</Link>
					</Box>
				</Flex>
			</Container>
		</Box>
	)
}
