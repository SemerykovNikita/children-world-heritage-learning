import { Route } from 'react-router-dom'
import { HomePage } from '../pages/Home/index'
import { LoginPage } from '../pages/Login/index'
import { RegisterPage } from '../pages/Register/index'
import { BaseRoute } from './BaseRoute/index'

const Router = () => {
	return (
		<BaseRoute>
			<Route index element={<HomePage />} />
			<Route path='register' element={<RegisterPage />} />
			<Route path='login' element={<LoginPage />} />
		</BaseRoute>
	)
}

export default Router
