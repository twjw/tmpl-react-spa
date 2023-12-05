import { EnvConfig } from '../../../type/build'
import { ServerOptions } from 'vite'

const serverConfig = (envConfig: EnvConfig): ServerOptions => {
	return {
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
	}
}

export { serverConfig }
