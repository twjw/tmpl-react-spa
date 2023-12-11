/// <reference types="vite/client" />

declare module '~env-config' {
	import type { EnvType } from '../.env'
	export const envConfig: EnvType
}

declare module '~page-routes' {
	import type { PageMeta } from '@/type/common.ts'
	import type { CreatePageRouteProps, PageRouteContext } from 'wbtx/vite'

	export const createPageRoutes: CreatePageRouteProps
	export const usePageRoute: PageRouteContext<PageMeta>
}

declare module '~nice-i18n' {
	import type {
		NiceI18nTranslate,
		NiceI18nRegister,
		NiceI18nSetLocale,
		NiceI18nApp,
	} from 'wtbx/vite'

	type Dictionary = import('./assets/locale/en').default
	type Locale = 'en' | 'zh_TW'

	export const dictionary: Dictionary
	export const locale: Locale
	export const t: NiceI18nTranslate<Dictionary>
	export const register: NiceI18nRegister<Locale>
	export const setLocale: NiceI18nSetLocale<Locale>
	export const App: NiceI18nApp
}
