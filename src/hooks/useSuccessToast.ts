import { UseToastOptions, useToast } from '@chakra-ui/react'
import { useState } from 'react'

export const useSuccessToast = (options?: UseToastOptions | undefined) => {
	const toast = useToast()
	const [message, setMessage] = useState<string | undefined>()

	return () => {
		// Prevent showing the same message message twice
		if (options?.title === message) return

		setMessage(options?.title?.toString())

		toast({
			duration: 5000,
			isClosable: true,
			...options,
			status: 'success',
		})
	}
}
