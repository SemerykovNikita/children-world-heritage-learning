import { Box, Container } from '@chakra-ui/react'
import { PRIMARY_COLOR } from '../../styles'

export const Footer = () => {
	return (
		<Box color={'gray.100'} bgColor={PRIMARY_COLOR} paddingBlock={3} as='footer'>
			<Container maxW='container.xl'>© 2024 Heritages</Container>
		</Box>
	)
}
