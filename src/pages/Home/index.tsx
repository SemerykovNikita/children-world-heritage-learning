import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HeritagesList, HeritagesListRef } from '../../components/HeritagesList/index'

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const listRef = useRef<HeritagesListRef>(null)
	const [isListLoading, setIsListLoading] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		!value ? searchParams.delete('search') : searchParams.set('search', value)

		setSearchParams(searchParams)
	}

	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Об'єкти світової спадщини
			</Heading>
			<Flex alignItems={'center'} gap={3} mb={5}>
				<Input maxW={300} value={searchParams.get('search') ?? ''} onChange={handleInputChange} />
				<Button isLoading={isListLoading} onClick={() => listRef && listRef.current?.refetchHeritages?.()}>
					Знайти
				</Button>
			</Flex>
			<HeritagesList setIsLoading={setIsListLoading} ref={listRef} />
		</>
	)
}
