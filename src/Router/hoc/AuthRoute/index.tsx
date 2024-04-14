import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../../store/user'

type Props = {
	children: React.ReactNode
}

export const AuthRoute = ({ children }: Props) => {
	const navigate = useNavigate()

	const { isLoading, isCheckingAuthFinished, isAuthenticated } = useUserStore(
		useShallow((state) => ({
			isLoading: state.isLoading,
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
		})),
	)

	useEffect(() => {
		if (!isLoading) if (!isAuthenticated && isCheckingAuthFinished) navigate('/login')
	}, [isLoading, isCheckingAuthFinished, isAuthenticated, navigate])

	if (isLoading || !isCheckingAuthFinished) return 'Loading...'

	return children
}
