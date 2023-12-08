import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/style/common.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/components'
import { LocaleWrap } from '@/store'
import { App } from '@/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorBoundary.App>
			<LocaleWrap fc={App} />
		</ErrorBoundary.App>
	</BrowserRouter>,
)
