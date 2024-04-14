import { Grid, GridItem, Skeleton } from '@chakra-ui/react'

export const HeritagesListSkeleton = () => {
	return (
		<Grid templateColumns='repeat(2, 1fr)' gap={4}>
			{Array.from({ length: 5 }).map((_, index) => (
				<GridItem key={index}>
					<Skeleton height='150px' />
				</GridItem>
			))}
		</Grid>
	)
}
