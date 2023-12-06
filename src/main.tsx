import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/style/common.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerPageRoutes } from 'wtbx/react'
import { ErrorBoundary, RouteWrap } from '@/components'
import { LocaleWrap } from '@/store'
import { log } from '@/utils'
import { App } from '@/app'
import { envConfig } from '~envConfig'

registerPageRoutes({
	log,
	ignorePrefixes: ['\\./pages'],
	defaultMeta: {
		title: envConfig.project.title,
	},
	metaModules: [import.meta.glob('./pages/**/page.meta.ts', { eager: true })],
	pageModules: [import.meta.glob('./pages/**/page.tsx') as Record<string, () => Promise<any>>],
	Wrap: RouteWrap,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorBoundary.App>
			<LocaleWrap fc={App} />
		</ErrorBoundary.App>
	</BrowserRouter>,
)
