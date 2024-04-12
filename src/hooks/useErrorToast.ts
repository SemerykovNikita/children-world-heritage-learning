import { UseToastOptions, useToast } from '@chakra-ui/react'

export const useErrorToast = (options?: UseToastOptions | undefined) => {
	const toast = useToast()

	return (errorMessage?: string) =>
		toast({
			duration: 5000,
			isClosable: true,
			...options,
			status: 'error',
			title: errorMessage ?? 'An error occurred',
		})
}
