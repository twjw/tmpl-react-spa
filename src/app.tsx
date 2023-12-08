import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom'
import { RouteWrap } from '@/components'
import { createPageRoutes } from '~page-routes'
import { useMemo } from 'react'

function App() {
	const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])

	return (
		<ReactRoutes>
			{pageRoutes}
			<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />
		</ReactRoutes>
	)
}

export { App }
