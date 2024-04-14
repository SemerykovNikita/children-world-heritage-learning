import { Route } from 'react-router-dom'
import { HomePage } from '../pages/Home/index'
import { LoginPage } from '../pages/Login/index'
import { RegisterPage } from '../pages/Register/index'
import { BaseRoute } from './BaseRoute/index'
import { AuthRoute } from './hoc/AuthRoute/index'
import { PreventAuthRoute } from './hoc/PreventAuthRoute/index'

const Router = () => {
	return (
		<BaseRoute>
			<Route index element={<HomePage />} />
			<Route
				path='register'
				element={
					<PreventAuthRoute>
						<RegisterPage />
					</PreventAuthRoute>
				}
			/>
			<Route
				path='login'
				element={
					<PreventAuthRoute>
						<LoginPage />
					</PreventAuthRoute>
				}
			/>
			<Route
				path='add-heritage'
				element={
					<AuthRoute>
						<h1>hello</h1>
					</AuthRoute>
				}
			/>
		</BaseRoute>
	)
}

export default Router
