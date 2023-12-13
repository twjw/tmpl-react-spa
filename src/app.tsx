import { type ReactNode, useMemo } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createPageRoutes } from '~page-routes'
import { App as WtbxI18nApp } from '~wtbx-i18n'
import { RouteWrap, ErrorBoundary } from '@/components'

function _AppWrap({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<WtbxI18nApp>
				<ErrorBoundary.App>{children}</ErrorBoundary.App>
			</WtbxI18nApp>
		</BrowserRouter>
	)
}

function App() {
	const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])

	return (
		<_AppWrap>
			<Routes>
				{pageRoutes}
				<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />
			</Routes>
		</_AppWrap>
	)
}

export { App }
