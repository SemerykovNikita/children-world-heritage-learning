import { FormErrorMessage } from '@chakra-ui/react'

type Props = { message?: string; className?: string }

const FormError = ({ message, className = '' }: Props) => {
	return message ? <FormErrorMessage className={className}>{message}</FormErrorMessage> : null
}

export default FormError
