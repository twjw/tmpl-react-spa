import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/style/common.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerPageRoutes } from 'wtbx/react'
import { ErrorBoundary, RouteWrap } from '@/components'
import { LocaleWrap } from '@/store'
import { PageMeta } from '@/type/global'
import { log } from '@/utils'
import envConfig from '~envConfig'
import { App } from './app'

registerPageRoutes<PageMeta>({
	log,
	ignorePrefixes: ['./pages'],
	defaultMeta: {
		title: envConfig.project.title,
	},
	metaModules: import.meta.glob('./pages/**/page.meta.ts', { eager: true }),
	pageModules: import.meta.glob('./pages/**/page.tsx'),
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
