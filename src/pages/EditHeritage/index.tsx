import { Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditHeritageForm } from '../../components/EditHeritageForm/index'
import { Loader } from '../../components/ui/Loader/index'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritage } from '../../queries/heritage'
import { NotFoundPage } from '../NotFound/index'

export const EditHeritagePage = () => {
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

	useEffect(() => {
		if (!heritageError) return

		showErrorToast()

		navigate('/')
	}, [heritageError, navigate, showErrorToast])

	if (isHeritageLoading) return <Loader />

	if (!heritage) return <NotFoundPage />

	const { title } = heritage

	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Редагування статті "{title}"
			</Heading>
			<EditHeritageForm heritage={heritage} />
		</>
	)
}
