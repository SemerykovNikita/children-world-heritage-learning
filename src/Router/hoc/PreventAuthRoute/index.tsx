import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../../store/user'

export const PreventAuthRoute = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate()

	const { isLoading, isCheckingAuthFinished, isAuthenticated } = useUserStore(
		useShallow((state) => ({
			isLoading: state.isLoading,
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
		})),
	)

	useEffect(() => {
		if (!isLoading && isCheckingAuthFinished) if (isAuthenticated) navigate('/')
	}, [isLoading, isCheckingAuthFinished, isAuthenticated, navigate])

	if (isLoading || !isCheckingAuthFinished) return 'Loading...'

	return children
}
