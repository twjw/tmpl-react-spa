import { Navigate, Route, Routes } from 'react-router-dom'
import { RouteWrap } from '@/components'
import { createPageRoutes } from '~page-routes'
import { useMemo } from 'react'

function App() {
	const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])

	return (
		<Routes>
			{pageRoutes}
			<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />
		</Routes>
	)
}

export { App }
