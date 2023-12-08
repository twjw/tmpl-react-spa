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
