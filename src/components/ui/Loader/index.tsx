import { Box, Spinner } from '@chakra-ui/react'
import { COLOR_THEME } from '../../../styles/index'

export const Loader = () => {
	return (
		<Box
			position={'fixed'}
			top={0}
			left={0}
			width={'100vw'}
			height={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Spinner thickness='5px' speed='0.65s' emptyColor='gray.200' color={COLOR_THEME} size='xl' />
		</Box>
	)
}
