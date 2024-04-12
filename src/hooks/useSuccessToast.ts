import { UseToastOptions, useToast } from '@chakra-ui/react'

export const useSuccessToast = (options?: UseToastOptions | undefined) => {
	const toast = useToast()

	return () =>
		toast({
			duration: 5000,
			isClosable: true,
			...options,
			status: 'success',
		})
}
