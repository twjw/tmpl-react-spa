/// <reference types="vite/client" />

declare module '~env-config' {
	import type { EnvType } from '../.env'
	export const envConfig: EnvType
}

declare module '~page-routes' {
	import { ReactPageRoutes } from 'wtbx/vite'
	import type { PageMeta } from '@/type/common'

	export const createPageRoutes: ReactPageRoutes.CreatePageRoutes
	export const usePageRoute: ReactPageRoutes.UsePageRute<PageMeta>
}

declare module '~wtbx-i18n' {
	import type { WtbxI18n } from 'wtbx/vite'

	type Dictionary = typeof import('@/assets/locale/zh_TW').default
	type Locale = 'en' | 'zh_TW'

	export const dictionary: Dictionary
	export const locale: Locale
	export const t: WtbxI18n.Translate<Dictionary>
	export const setLocale: WtbxI18n.SetLocale<Locale>
	export const App: WtbxI18n.App<Locale>
}
