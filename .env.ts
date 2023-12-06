import { wObject } from '../toolbox-js/packages/type'

const env =
	// --- ---
	{
		project: {
			title: 'twjw-react-spa-tmpl',
		},
		server: {
			_port: 9247,
			apiUrl: '/',
			apiBaseUrl: '/api',
			wsBaseUrl: '/ws',
		},
		login: {
			username: '',
			password: '',
		},
		app: {
			storagePrefix: 'rtmp',
			version: 'v0.0.0',
		},
	}
// --- ---

export type EnvType = wObject.IgnoreKeyPrefix<typeof env>
export default env
