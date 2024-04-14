import { Grid, GridItem } from '@chakra-ui/react'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritages } from '../../queries/heritage'
import { HeritagesItem } from './HeritagesItem/index'
import { HeritagesListSkeleton } from './HeritagesListSkeleton/index'

export type HeritagesListRef = {
	refetchHeritages: () => void
}

export const HeritagesList = forwardRef<HeritagesListRef>((_, ref) => {
	const [searchParams] = useSearchParams()

	const {
		data: heritages = [],
		isLoading: areHeritagesLoading,
		error: heritagesError,
		refetch: refetchHeritages,
	} = useQueryHeritages(searchParams.get('search') ?? '')

	// to be able to call refetchHeritages from the parent component
	useImperativeHandle(
		ref,
		() => {
			return {
				refetchHeritages,
			}
		},
		[refetchHeritages],
	)

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
})
