import { Grid, GridItem } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritages } from '../../queries/heritage'
import { HeritagesItem } from './HeritagesItem/index'
import { HeritagesListSkeleton } from './HeritagesListSkeleton/index'

export const HeritagesList = () => {
	const { data: heritages = [], isLoading: areHeritagesLoading, error: heritagesError } = useQueryHeritages()

	const showErrorToast = useErrorToast({
		title: 'Помилка завантаження. Спробуйте пізніше.',
	})

	useEffect(() => {
		if (!heritagesError) return

		showErrorToast()
	}, [heritagesError, showErrorToast])

	if (areHeritagesLoading) return <HeritagesListSkeleton />

	return (
		<Grid templateColumns='repeat(2, 1fr)' gap={4}>
			{heritages.map((heritage) => (
				<GridItem key={heritage.id} h={'100%'}>
					<HeritagesItem heritage={heritage} />
				</GridItem>
			))}
		</Grid>
	)
}
