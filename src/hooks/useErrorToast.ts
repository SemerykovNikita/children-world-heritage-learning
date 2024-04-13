import { UseToastOptions, useToast } from '@chakra-ui/react'
import { useState } from 'react'

export const useErrorToast = (options?: UseToastOptions | undefined) => {
	const toast = useToast()
	const [error, setError] = useState<string | undefined>()

	return (errorMessage?: string) => {
		// Prevent showing the same error message twice
		if (error === errorMessage) return

		setError(errorMessage)

		return toast({
			duration: 5000,
			isClosable: true,
			...options,
			status: 'error',
			title: errorMessage ?? 'An error occurred',
		})
	}
}
