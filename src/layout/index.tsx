import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer/index'
import { Header } from './Header/index'

export const Layout = () => {
	return (
		<Box className='wrapper'>
			<Header />
			<Box as='main'>
				<Container maxW='container.xl'>
					<Outlet />
				</Container>
			</Box>
			<Footer />
		</Box>
	)
}
