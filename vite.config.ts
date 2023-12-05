import { bootstrap } from '../toolbox-js/packages/vite'
import type { EnvType } from './env/env'

export default async ({ mode }) => {
	return await bootstrap<EnvType, 'development' | 'production'>({ mode }, envConfig => {
		return {
			server: {
				host: '0.0.0.0',
				port: envConfig.server.port || 3000,
				proxy: {
					[envConfig.server.apiBaseUrl]: {
						target: envConfig.server.apiUrl,
						changeOrigin: true,
					},
					// [envConfig.server.wsBaseUrl]: {
					// 	target: envConfig.server.apiUrl,
					// 	changeOrigin: true,
					// 	// rewrite: path => path.replace(/^\/ws/, '')
					// }
				},
			},
		}
	})
}
