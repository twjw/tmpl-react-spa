import { Navigate, Route, Routes } from 'react-router-dom'
import { pageRoutes } from 'wtbx/react'

function App() {
	return (
		<Routes>
			{pageRoutes}
			<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />
		</Routes>
	)
}

export { App }
