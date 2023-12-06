import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'
import type { EnvType } from './.env'
import { bootstrap } from '../toolbox-js/packages/vite'
import { baseFontSize } from './uno.config'

export default ({ mode }) =>
	bootstrap<EnvType, 'development' | 'production'>(
		{ mode },
		async ({ envConfig, resolveAlias }) => {
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
				],
				resolve: {
					alias: resolveAlias,
				},
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
		},
	)
