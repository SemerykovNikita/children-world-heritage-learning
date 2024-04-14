import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { useSearchParams } from 'react-router-dom'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useQueryHeritages } from '../../queries/heritage'
import { LIMIT } from '../../utils/constants'
import { HeritagesItem } from './HeritagesItem/index'
import { HeritagesListSkeleton } from './HeritagesListSkeleton/index'

export type HeritagesListRef = {
	refetchHeritages: () => void
}

type Props = {
	setIsLoading: (isLoading: boolean) => void
	search?: string
}

export const HeritagesList = forwardRef<HeritagesListRef, Props>(({ setIsLoading, search }, ref) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const {
		data: heritages = { data: [], count: 0 },
		isLoading: areHeritagesLoading,
		error: heritagesError,
		refetch: refetchHeritages,
		isFetching: areHeritagesFetching,
		isRefetching: areHeritagesRefetching,
	} = useQueryHeritages({
		search: search ?? '',
		limit: LIMIT,
		page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
	})

	useEffect(() => {
		setIsLoading(areHeritagesRefetching)
	}, [areHeritagesRefetching, setIsLoading])

	// to be able to call refetchHeritages from the parent component if needed
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

	if (areHeritagesLoading || areHeritagesFetching) return <HeritagesListSkeleton />

	return heritages.data.length > 0 ? (
		<>
			<Grid templateColumns='repeat(2, 1fr)' gap={4}>
				{heritages.data.map((heritage) => (
					<GridItem key={heritage.id} h={'100%'}>
						<HeritagesItem heritage={heritage} />
					</GridItem>
				))}
			</Grid>
			<Flex justifyContent={'center'} marginInline={10}>
				<PaginationControl
					page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
					limit={LIMIT}
					total={Number(heritages.count)}
					last={true}
					next={true}
					changePage={async (page) => {
						searchParams.set('page', page.toString())
						setSearchParams(searchParams)
						refetchHeritages()
					}}
				/>
			</Flex>
		</>
	) : (
		<Heading mt={10} textAlign={'center'}>
			Нічого не знайдено
		</Heading>
	)
})
