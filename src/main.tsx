import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { App } from './app'
import { registerRouter } from '~app'
import { ComponentType } from 'react'
import { LocaleWrap } from '~common/store'
import { ErrorBoundary, RouteWrap } from '@/components'

registerRouter({
	prefix: './pages', // modules glob /**/* 前面的路徑
	modules: import.meta.glob<ComponentType>('./pages/**/page.tsx') as unknown as Record<
		string,
		() => Promise<{ default: ComponentType }>
	>,
	afterRoutes: [<Route key={'*'} path={'*'} element={<Navigate to={'/404'} replace />} />],
	Wrap: ({ path, children }) => {
		return (
			<RouteWrap key={path} path={path}>
				{children}
			</RouteWrap>
		)
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorBoundary.App>
			<LocaleWrap fc={App} />
		</ErrorBoundary.App>
	</BrowserRouter>,
)
