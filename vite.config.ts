import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'
import type { EnvType } from './.env'
import { autoAlias, reactPagesPlugin } from '../toolbox-js/packages/vite'
import { baseFontSize } from './uno.config'
import { createEnvConfig } from '../toolbox-js/packages/node'

export default async ({ mode }) => {
	const envConfig = await createEnvConfig<EnvType, 'development' | 'production'>({ mode })

	return defineConfig({
		plugins: [
			UnoCSS({
				configFile: path.relative(__dirname, path.join(process.cwd(), 'uno.config.ts')),
			}),
			react(),
			svgr(),
			createHtmlPlugin({
				minify: envConfig.mode !== 'development',
				inject: {
					data: {
						title: envConfig.project.title,
						htmlFontSize: `${baseFontSize}px`,
					},
				},
			}),
			autoAlias(),
			reactPagesPlugin(),
		],
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
	})
}
