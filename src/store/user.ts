import { create } from 'zustand'
import { create as createUser, exists, getByEmailAndPassword } from '../http/user'
import { User } from '../types/index'

type UserStore = {
	user: User | null
	isLoading: boolean
	error: string
	isAuthenticated: boolean
	isCheckingAuthFinished: boolean
	saveUserAndAuthenticate: (user: User) => void
	setIsCheckingAuthFinished: (isFinished: boolean) => void
	register: (user: Omit<User, 'id'>) => void
	login: (user: Omit<User, 'id'>) => void
	logout: () => void
}

const defaultUserStoreState = {
	user: null,
	isLoading: false,
	error: '',
	isAuthenticated: false,
	isCheckingAuthFinished: false,
}

export const useUserStore = create<UserStore>((set) => ({
	...defaultUserStoreState,
	saveUserAndAuthenticate: (user: User) => {
		set({ user: user, isAuthenticated: true })
		localStorage.setItem('user', JSON.stringify(user))
	},
	logout: () => {
		set({ user: null, isAuthenticated: false, error: '' })
		localStorage.removeItem('user')
	},
	setIsCheckingAuthFinished: (isFinished: boolean) => {
		set({ isCheckingAuthFinished: isFinished })
	},
	register: async (user: Omit<User, 'id'>) => {
		set({ isLoading: true })
		try {
			const doesUserExist = await exists(user.email)

			if (doesUserExist) {
				set({
					error: `Користувач з електронною адресою ${user.email} вже існує`,
				})
				return
			}

			// Here we check if the email is a teacher email (just for the sake of the example)
			if (!user.email.includes('@teacher.edu.ua')) {
				set({
					...defaultUserStoreState,
					error: `Користучач з електронною адресою ${user.email} не може бути зареєстрований`,
				})
				localStorage.removeItem('user')

				return
			}

			const createdUser = await createUser(user)
			set({ user: createdUser, isAuthenticated: true, error: '' })
			localStorage.setItem('user', JSON.stringify(createdUser))
		} catch (error) {
			set({
				...defaultUserStoreState,
				error: 'Помилка реєстрації',
			})
			localStorage.removeItem('user')
		} finally {
			set({ isLoading: false })
		}
	},
	login: async (user: Omit<User, 'id'>) => {
		set({ isLoading: true })
		try {
			const candidate = await getByEmailAndPassword(user.email, user.password)

			if (!candidate) {
				set({
					error: 'Користувача не знайдено',
				})
				return
			}

			set({
				user: candidate,
				isAuthenticated: true,
				error: '',
			})
			localStorage.setItem('user', JSON.stringify(candidate))
		} catch (error) {
			set({
				...defaultUserStoreState,
				error: 'Помилка логіну',
			})
			localStorage.removeItem('user')
		} finally {
			set({ isLoading: false })
		}
	},
}))
