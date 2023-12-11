import type { EnvType } from './.env'
import { WObject } from '../toolbox-js/packages/type'

const env: WObject.DeepPartial<EnvType> =
	// --- ---
	{
		server: {
			apiUrl: 'http://localhost:7981',
		},
		login: {
			username: 'admin',
			password: '123456',
		},
	}
// --- ---

export default env
