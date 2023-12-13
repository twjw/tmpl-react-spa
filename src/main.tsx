import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/style/common.css'
import { register as registerLocale } from '~wtbx-i18n'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'

registerLocale({
	default: 'zh_TW',
})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
