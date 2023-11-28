/**
 * @param envConfig {import('../../../../src/type/global.js').EnvConfig}
 * @return {import('vite').ServerOptions}
 */
const serverConfig = envConfig => {
	return {
		host: '0.0.0.0',
		port: envConfig.server._port || 3000,
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
