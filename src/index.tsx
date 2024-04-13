import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Router from './Router/index'
import { useUserStore } from './store/user'
import { User } from './types/index'

export function App() {
	const { login, setIsCheckingAuthFinished } = useUserStore(
		useShallow((state) => ({
			login: state.login,
			setIsCheckingAuthFinished: state.setIsCheckingAuthFinished,
		})),
	)

	useEffect(() => {
		const userJSON = localStorage.getItem('user')

		let user = null

		if (userJSON) user = JSON.parse(userJSON) as User

		if (user) login(user)

		setIsCheckingAuthFinished(true)
	})

	return <Router />
}
