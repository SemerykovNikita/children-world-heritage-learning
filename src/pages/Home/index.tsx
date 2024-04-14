import { Heading } from '@chakra-ui/react'
import { HeritagesList } from '../../components/HeritagesList/index'

export const HomePage = () => {
	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Об'єкти світової спадщини
			</Heading>
			<HeritagesList />
		</>
	)
}
