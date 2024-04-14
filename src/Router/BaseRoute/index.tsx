import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../../layout/index'

export const BaseRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					{children}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
