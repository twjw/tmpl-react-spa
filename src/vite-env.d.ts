/// <reference types="vite/client" />

declare module '~env-config' {
	import type { ClintEnv } from '../.env'
	export const envConfig: ClintEnv
}

declare module '~page-routes' {
	import type { ReactPageRoutes } from 'wtbx/vite'
	import type { PageMeta } from '@/type/common'

	export const createPageRoutes: ReactPageRoutes.CreatePageRoutes
	export const usePageRoute: ReactPageRoutes.UsePageRute<PageMeta>
}

declare module '~i18n' {
	import type { ReactI18n } from 'wtbx/vite'

	type Dictionary = typeof import('@/assets/locale/zh_TW').default
	type Locale = 'en' | 'zh_TW'

	export const dictionary: Dictionary
	export const locale: Locale
	export const t: ReactI18n.Translate<Dictionary>
	export const setLocale: ReactI18n.SetLocale<Locale>
	export const App: ReactI18n.App<Locale>
}
