import { Navigate, Route, Routes } from 'react-router-dom'
import { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/components'
import { createPageRoutes } from '~page-routes'
import { App as WtbxI18nApp } from '~wtbx-i18n'
import { RouteWrap } from '@/components'

function App() {
	const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])

	return (
		<BrowserRouter>
			<WtbxI18nApp>
				<ErrorBoundary.App>
					<Routes>
						{pageRoutes}
						<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />
					</Routes>
				</ErrorBoundary.App>
			</WtbxI18nApp>
		</BrowserRouter>
	)
}

export { App }
