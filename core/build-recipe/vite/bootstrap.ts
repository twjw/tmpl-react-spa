import { defineConfig } from 'vite'
import { serverConfig } from './config/server-config'
import { createEnvConfig } from './utils/create-env-config'
import { pluginsConfig } from './config/plugins-config'
import { resolveConfig } from './config/resolve-config'

async function bootstrap({ mode }) {
	const envConfig = await createEnvConfig(mode)

	return defineConfig({
		plugins: pluginsConfig(envConfig),
		resolve: await resolveConfig(envConfig),
		server: serverConfig(envConfig),
	})
}

export { bootstrap }
