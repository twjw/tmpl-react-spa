import type { EnvType } from './.env'
import { wObject } from '../toolbox-js/packages/type'

const env: wObject.DeepPartial<EnvType> =
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
