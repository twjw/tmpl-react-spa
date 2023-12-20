import path from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import {
	autoAlias,
	buildDropLog,
	reactPageRoutes,
	reactI18n,
	injectEnv,
} from '../toolbox-js/packages/vite'
import { mergeEnv } from '../toolbox-js/packages/node'
import { baseFontSize } from './uno.config'
import type { EnvMode, EnvType } from '.env'

export default async ({ mode }) => {
	const envConfig = await mergeEnv<EnvType, EnvMode>({
		mode,
		dirs: [process.cwd()],
	})

	return defineConfig({
		plugins: [
			react(),
			svgr(),
			createHtmlPlugin({
				minify: envConfig.mode === 'production',
				inject: {
					data: {
						title: envConfig.title,
						htmlFontSize: `${baseFontSize}px`,
					},
				},
			}),
			injectEnv({ env: envConfig }),
			autoAlias(),
			reactPageRoutes({
				defaultMeta: {
					title: envConfig.title,
				},
				pages: [
					path.resolve(__dirname, './src/pages'),
					path.resolve(__dirname, './doc/code/example/_admin/pages'),
				],
			}),
			buildDropLog({
				clean: envConfig.mode === 'production',
			}),
			reactI18n({
				dirs: [
					path.resolve(__dirname, './src/assets/locale'),
					path.resolve(__dirname, './doc/code/example/_admin/assets/locale'),
				],
			}),
			UnoCSS({
				configFile: 'uno.config.ts',
			}),
		],
		server: {
			host: '0.0.0.0',
			port: envConfig.port || 3000,
			proxy: {
				[envConfig.apiBaseUrl]: {
					target: envConfig.apiUrl,
					changeOrigin: true,
				},
				// [envConfig.wsBaseUrl]: {
				// 	target: envConfig.apiUrl,
				// 	changeOrigin: true,
				// 	// rewrite: path => path.replace(/^\/ws/, '')
				// }
			},
		},
	})
}
