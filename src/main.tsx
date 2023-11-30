import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { App } from './app'
import { envConfig, registerRouter } from '~app'
import { logs } from 'wtbx/common'
import { ComponentType } from 'react'
import { LocaleWrap } from '~common/store'
import { ErrorBoundary, RouteWrap } from '@/components'

// 只有 mode 為 development 才會顯示 log
logs.isDebug = envConfig.mode === 'development'

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
