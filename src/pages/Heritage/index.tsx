import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../components/ui/Loader/index'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritage } from '../../queries/heritage'
import { useQueryUser } from '../../queries/user'
import { getFormattedDate } from '../../utils/date'
import { NotFoundPage } from '../NotFound/index'

export const HeritagePage = () => {
	const { id: heritageParamsId } = useParams()

	const showErrorToast = useErrorToast({
		title: 'Помилка завантаження. Спробуйте пізніше.',
	})

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
	const { dateOfCreation, description, imageBlob, title } = heritage

	return (
		<Box>
			<Box>
				<Heading>{title}</Heading>
			</Box>
			<Flex gap={4} marginTop={5}>
				<Image objectFit='contain' borderRadius={15} boxSize='300px' src={imageBlob} alt={title} />
				<Text fontSize='lg'>{description}</Text>
			</Flex>
			<Text marginTop={5} fontSize='lg'>
				Стаття була створена {getFormattedDate(dateOfCreation)} користувачем {username} (
				<Link fontWeight={'bold'} href={`mailto:${email}`}>
					{email}
				</Link>
				)
			</Text>
		</Box>
	)
}
