/// <reference types="vite/client" />
/// <reference types="wtbx/v-d-nice-i18n" />

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
