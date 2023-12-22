import { type ReactNode, useMemo } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createPageRoutes } from '~page-routes'
import { App as I18nApp } from '~i18n'
import { RouteWrap } from '@/components/route/wrap'
import { ErrorBoundary } from '@/components/error-boundary'

function _AppWrap({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<I18nApp defaultLocale={'zh_TW'}>
				<ErrorBoundary.App>{children}</ErrorBoundary.App>
			</I18nApp>
		</BrowserRouter>
	)
}

function App() {
	const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])

	return (
		<_AppWrap>
			<Routes>
				{pageRoutes}
				<Route path={'*'} element={<Navigate to={'/404'} replace />} />
			</Routes>
		</_AppWrap>
	)
}

export { App }
