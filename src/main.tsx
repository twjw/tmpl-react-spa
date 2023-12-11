import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/style/common.css'
import { register as registerLocale, App as NiceI18nApp } from '~nice-i18n'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/components'
import { App } from '@/app'

registerLocale({
	default: 'zh_TW',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<NiceI18nApp>
			<ErrorBoundary.App>
				<App />
			</ErrorBoundary.App>
		</NiceI18nApp>
	</BrowserRouter>,
)
