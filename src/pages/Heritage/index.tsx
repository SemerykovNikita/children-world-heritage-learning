import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { ButtonLink } from '../../components/ui/ButtonLink/index'
import { Loader } from '../../components/ui/Loader/index'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritage } from '../../queries/heritage'
import { useQueryUser } from '../../queries/user'
import { useUserStore } from '../../store/user'
import { COLOR_THEME } from '../../styles/index'
import { getFormattedDate } from '../../utils/date'
import { NotFoundPage } from '../NotFound/index'

export const HeritagePage = () => {
	const { id: heritageParamsId } = useParams()

	const showErrorToast = useErrorToast({
		title: 'Помилка завантаження. Спробуйте пізніше.',
	})

	const { isAuthenticated } = useUserStore(
		useShallow((state) => ({
			isAuthenticated: state.isAuthenticated,
		})),
	)

	const navigate = useNavigate()

	const {
		data: heritage,
		isLoading: isHeritageLoading,
		error: heritageError,
	} = useQueryHeritage(heritageParamsId ?? '')

	const { data: user, isLoading: isUserLoading, error: userError } = useQueryUser(heritage?.userId ?? '')

	useEffect(() => {
		if (!heritageError || !userError) return

		showErrorToast()

		navigate('/')
	}, [heritageError, navigate, showErrorToast, userError])

	if (isHeritageLoading || isUserLoading) return <Loader />

	if (!heritage || !user) return <NotFoundPage />

	const { username, email } = user
	const { dateOfCreation, description, imageBlob, title, id } = heritage

	return (
		<Box>
			<Flex alignItems={'center'} gap={10}>
				<Heading>{title}</Heading>
				{isAuthenticated && (
					<ButtonLink to={`/edit-heritage/${id}`} colorScheme={COLOR_THEME}>
						Редагувати
					</ButtonLink>
				)}
			</Flex>
			<Flex gap={5} marginTop={7} alignItems={'flex-start'}>
				<Box flex={'0 1 30%'} border={'1px solid #bbb'} borderRadius={15} p={3}>
					<Image w={'100%'} borderRadius={15} src={imageBlob} alt={title} />
				</Box>

				<Text flex={'0 1 70%'} whiteSpace={'pre-wrap'} overflowWrap={'break-word'} fontSize='lg'>
					{description}
				</Text>
			</Flex>
			<Text marginTop={7} fontSize='lg'>
				Стаття була створена {getFormattedDate(dateOfCreation)} користувачем {username} (
				<Link fontWeight={'bold'} href={`mailto:${email}`}>
					{email}
				</Link>
				)
			</Text>
		</Box>
	)
}
