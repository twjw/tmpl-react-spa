/// <reference types="vite/client" />

declare module '~envConfig' {
	import { EnvType } from '../.env'
	export const envConfig: EnvType
}
