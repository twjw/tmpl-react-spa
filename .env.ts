import { WObject } from '../toolbox-js/packages/type'

const env = {
	title: 'twjw-react-spa-tmpl',
	port: 9247,
	apiUrl: '/',
	apiBaseUrl: '/api',
	wsBaseUrl: '/ws',
	vite: {
		title: 'twjw-react-spa-tmpl',
		storagePrefix: 'rtmp',
		version: 'v0.0.0',
	},
}

export type EnvType = WObject.IgnoreKeyPrefix<typeof env>
export type EnvMode = 'development' | 'production'
export type ClintEnv = { mode: EnvMode } & EnvType['vite']
export default env
