import 'virtual:uno.css'
import '@/style/reset.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app.tsx'
import { envConfig, registerRouter } from '~app'
import { logs } from 'wtbx/common'
import { ComponentType, Suspense } from 'react'
import { LocaleWrap } from '~common/store/locale'
import { ErrorBoundary } from '@/components'

// 只有 mode 為 development 才會顯示 log
logs.isDebug = envConfig.mode === 'development'

registerRouter({
	prefix: './pages', // modules glob /**/* 前面的路徑
	modules: import.meta.glob<ComponentType>('./pages/**/page.tsx') as unknown as Record<string, () => Promise<{ default: ComponentType }>>,
	Suspense: ({ path, children }) => {
		return (
			<ErrorBoundary.Page key={path}>
				<Suspense fallback={<div>{path} 頁面加載中...</div>}>{children}</Suspense>
			</ErrorBoundary.Page>
		)
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorBoundary.Common>
			<LocaleWrap fc={App} />
		</ErrorBoundary.Common>
	</BrowserRouter>,
)
