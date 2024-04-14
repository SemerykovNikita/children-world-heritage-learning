import { Route } from 'react-router-dom'
import { AddHeritagePage } from '../pages/AddHeritage/index'
import { HeritagePage } from '../pages/Heritage/index'
import { HomePage } from '../pages/Home/index'
import { LoginPage } from '../pages/Login/index'
import { NotFoundPage } from '../pages/NotFound/index'
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
						<AddHeritagePage />
					</AuthRoute>
				}
			/>
			<Route path='heritages/:id' element={<HeritagePage />} />

			<Route path='*' element={<NotFoundPage />} />
		</BaseRoute>
	)
}

export default Router
