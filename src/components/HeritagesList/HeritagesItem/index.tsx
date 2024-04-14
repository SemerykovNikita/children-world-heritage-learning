import {
	Box,
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
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { useShallow } from 'zustand/react/shallow'
import { useErrorToast } from '../../../hooks/useErrorToast'
import { useSuccessToast } from '../../../hooks/useSuccessToast'
import { useDeleteHeritage } from '../../../queries/heritage'
import { useUserStore } from '../../../store/user'
import { COLOR_THEME } from '../../../styles/index'
import { Heritage } from '../../../types/index'
import { ButtonLink } from '../../ui/ButtonLink/index'

export const HeritagesItem = ({ heritage }: { heritage: Heritage }) => {
	const { imageBlob, title, id } = heritage

	const { isAuthenticated } = useUserStore(
		useShallow((state) => ({
			isAuthenticated: state.isAuthenticated,
		})),
	)

	const showSuccessToast = useSuccessToast({
		title: 'Стаття успішно видалена.',
	})

	const showErrorToast = useErrorToast({
		title: 'Помилка при видаленні статті. Спробуйте ще раз.',
	})

	const { mutateAsync: deleteHeritage, isPending } = useDeleteHeritage(id, {
		onSuccess: async () => showSuccessToast(),
		onError: async () => showErrorToast(),
	})

	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleDeleteHeritage = () => {
		deleteHeritage(id)
		onClose()
	}

	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
			<Box
				flex={'0 1 40%'}
				width={'100%'}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				position={'relative'}
			>
				<Image
					w={'100%'}
					top={0}
					left={0}
					position={'absolute'}
					padding={3}
					height={'100%'}
					objectFit='contain'
					src={imageBlob}
					alt='The heritage image'
				/>
			</Box>

			<Stack flex={'1 1 auto'} width={'100%'}>
				<CardBody width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Heading flex={'1 1 auto'} size='md'>
						{title}
					</Heading>
					{isAuthenticated && (
						<>
							<Tooltip hasArrow label='Видалити статтю' placement={'top'}>
								<Button
									isLoading={isPending}
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									onClick={onOpen}
									rightIcon={<MdDelete />}
									colorScheme={'red'}
									variant='outline'
								/>
							</Tooltip>
							<Modal isCentered closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader fontWeight={'bold'}>Видалення статті</ModalHeader>
									<ModalCloseButton />
									<ModalBody pb={6}>Ви впевнені, що хочете видалити статтю "{title}"?</ModalBody>

									<ModalFooter>
										<Button colorScheme='red' mr={3} onClick={handleDeleteHeritage}>
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
