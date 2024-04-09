import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/index'
import { HomePage } from '../pages/Home/index'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
