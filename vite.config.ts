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
	const env = await mergeEnv<EnvType, EnvMode>({
		mode,
		dirs: [process.cwd()],
	})

	return defineConfig({
		plugins: [
			react(),
			svgr(),
			createHtmlPlugin({
				minify: env.mode === 'production',
				inject: {
					data: {
						title: env.title,
						htmlFontSize: `${baseFontSize}px`,
					},
				},
			}),
			injectEnv({ env }),
			autoAlias(),
			reactPageRoutes({
				defaultMeta: {
					title: env.title,
				},
				pages: [
					path.resolve(__dirname, './src/pages'),
					path.resolve(__dirname, './doc/code/example/_admin/pages'),
				],
			}),
			buildDropLog({
				clean: env.mode === 'production',
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
			port: env.port || 3000,
			proxy: {
				[env.apiBaseUrl]: {
					target: env.apiUrl,
					changeOrigin: true,
				},
				// [env.wsBaseUrl]: {
				// 	target: env.apiUrl,
				// 	changeOrigin: true,
				// 	// rewrite: path => path.replace(/^\/ws/, '')
				// }
			},
		},
	})
}
