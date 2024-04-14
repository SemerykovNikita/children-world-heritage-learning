import { Card, CardBody, CardFooter, Heading, Image, Stack } from '@chakra-ui/react'
import { COLOR_THEME } from '../../../styles/index'
import { Heritage } from '../../../types/index'
import { ButtonLink } from '../../ui/ButtonLink/index'

export const HeritagesItem = ({ heritage }: { heritage: Heritage }) => {
	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
			<Image padding={3} objectFit='contain' h={'150px'} src={heritage.imageBlob} alt='The heritage image' />

			<Stack>
				<CardBody>
					<Heading size='md'>{heritage.title}</Heading>
				</CardBody>

				<CardFooter>
					<ButtonLink to={`/heritage/${heritage.id}`} colorScheme={COLOR_THEME}>
						Детальніше
					</ButtonLink>
				</CardFooter>
			</Stack>
		</Card>
	)
}
