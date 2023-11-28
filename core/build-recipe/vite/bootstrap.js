import { defineConfig } from 'vite'
import { serverConfig } from './config/server-config.js'
import { createEnvConfig } from './utils/create-env-config.js'
import { pluginsConfig } from './config/plugins-config.js'
import { resolveConfig } from './config/resolve-config.js'

async function bootstrap({ mode }) {
	const envConfig = await createEnvConfig(mode)

	return defineConfig({
		plugins: pluginsConfig(envConfig),
		resolve: await resolveConfig(envConfig),
		server: serverConfig(envConfig),
	})
}

export { bootstrap }
