import { Heading } from '@chakra-ui/react'
import { AddHeritageForm } from '../../components/AddHeritageForm/index'

export const AddHeritagePage = () => {
	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Створення статті про об'єкт світової спадщини
			</Heading>
			<AddHeritageForm />
		</>
	)
}
