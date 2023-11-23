import 'virtual:uno.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app.jsx'
import { envConfig, registerRouter } from '~app'
import { logs } from 'wtbx/common'
import { Suspense } from 'react'

// 只有 mode 為 development 才會顯示 log
logs.isDebug = envConfig.mode === 'development'

registerRouter({
	prefix: './pages', // modules glob /**/* 前面的路徑
	modules: import.meta.glob('./pages/**/page.jsx'),
	Suspense: ({ path, children }) => (
		<Suspense fallback={<div>{path} 頁面加載中...</div>}>{children}</Suspense>
	),
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
)