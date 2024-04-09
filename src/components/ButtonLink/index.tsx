import { Button, ButtonProps, Link } from '@chakra-ui/react'
import { ButtonHTMLAttributes } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { COLOR_THEME } from '../../styles'

type Props = {
	children: React.ReactNode
	to: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonProps

export const ButtonLink = ({ children, to, ...props }: Props) => {
	return (
		<Link as={ReactRouterLink} to={to}>
			<Button variant={'solid'} colorScheme={COLOR_THEME} type='button' {...props}>
				{children}
			</Button>
		</Link>
	)
}
