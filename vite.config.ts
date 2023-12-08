import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import { autoAlias, buildDropLog, reactPageRoutes } from '../toolbox-js/packages/vite'
import { createEnvConfig } from '../toolbox-js/packages/node'
import type { EnvType } from '.env'
import { baseFontSize } from './uno.config'
import path from 'path'

export default async ({ mode }) => {
	const envConfig = await createEnvConfig<EnvType, 'development' | 'production'>({ mode })

	return defineConfig({
		plugins: [
			UnoCSS({
				configFile: 'uno.config.ts',
			}),
			react(),
			svgr(),
			createHtmlPlugin({
				minify: envConfig.mode === 'production',
				inject: {
					data: {
						title: envConfig.project.title,
						htmlFontSize: `${baseFontSize}px`,
					},
				},
			}),
			autoAlias(),
			reactPageRoutes({
				defaultMeta: {
					title: envConfig.project.title,
				},
				pages: [path.resolve(__dirname, './src/pages')],
			}),
			buildDropLog(envConfig.mode === 'production'),
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
