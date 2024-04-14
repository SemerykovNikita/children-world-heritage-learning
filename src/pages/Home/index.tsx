import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HeritagesList } from '../../components/HeritagesList/index'

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isListLoading, setIsListLoading] = useState(false)

	// searchRef is used to store the search value between renders (to prevent re-rendering when the search value is changed)
	const searchRef = useRef(searchParams.get('search') ?? '')

	const [search, setSearch] = useState(searchRef.current)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		!value ? searchParams.delete('search') : searchParams.set('search', value)

		setSearchParams(searchParams)

		searchRef.current = value
	}

	return (
		<>
			<Heading textAlign={'center'} marginBottom={10}>
				Об'єкти світової спадщини
			</Heading>
			<Flex alignItems={'center'} gap={3} mb={5}>
				<Input
					placeholder='Пошук по всіх статтях...'
					maxW={300}
					value={searchRef.current}
					onChange={handleInputChange}
				/>
				<Button isLoading={isListLoading} onClick={() => setSearch(searchRef.current)}>
					Знайти
				</Button>
			</Flex>
			<HeritagesList search={search} setIsLoading={setIsListLoading} />
		</>
	)
}
