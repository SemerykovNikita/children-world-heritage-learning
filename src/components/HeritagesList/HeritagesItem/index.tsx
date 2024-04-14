import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../../store/user'
import { COLOR_THEME } from '../../../styles/index'
import { Heritage } from '../../../types/index'
import { ButtonLink } from '../../ui/ButtonLink/index'

export const HeritagesItem = ({ heritage }: { heritage: Heritage }) => {
	const { isAuthenticated } = useUserStore(
		useShallow((state) => ({
			isAuthenticated: state.isAuthenticated,
		})),
	)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { imageBlob, title } = heritage

	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
			<Image padding={3} objectFit='contain' h={'150px'} src={imageBlob} alt='The heritage image' />

			<Stack width={'100%'}>
				<CardBody width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Heading flex={'1 1 auto'} size='md'>
						{title}
					</Heading>
					{isAuthenticated && (
						<>
							<Button
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								onClick={onOpen}
								rightIcon={<MdDelete />}
								colorScheme={'red'}
								variant='outline'
							></Button>
							<Modal isCentered closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader fontWeight={'bold'}>Видалення статті</ModalHeader>
									<ModalCloseButton />
									<ModalBody pb={6}>Ви впевнені, що хочете видалити статтю "{title}"?</ModalBody>

									<ModalFooter>
										<Button colorScheme='red' mr={3}>
											Видалити
										</Button>
										<Button onClick={onClose}>Відмінити</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</>
					)}
				</CardBody>

				<CardFooter>
					<ButtonLink to={`/heritages/${heritage.id}`} colorScheme={COLOR_THEME}>
						Детальніше
					</ButtonLink>
				</CardFooter>
			</Stack>
		</Card>
	)
}
