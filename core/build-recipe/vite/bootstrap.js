import { defineConfig } from 'vite'
import { server } from './config/server.js'
import { createEnvConfig } from './utils/create-env-config.js'
import { plugins } from './config/plugins.js'
import { resolve } from './config/resolve.js'

async function bootstrap({ mode }) {
	const envConfig = await createEnvConfig(mode)

	return defineConfig({
		plugins: plugins(envConfig),
		resolve: await resolve(envConfig),
		server: server(envConfig),
	})
}

export { bootstrap }
