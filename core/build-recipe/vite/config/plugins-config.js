import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'

/**
 * @param envConfig {import('../../../../src/type/global.js').EnvConfig}
 * @return {import('vite').PluginOption}
 */
function pluginsConfig(envConfig) {
	return [
		UnoCSS({
			shortcuts: [],
			presets: [
				presetUno(),
				presetAttributify(),
				presetIcons({
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'middle',
					},
				}),
			],
			inspector: true,
		}),
		react(),
		svgr(),
		createHtmlPlugin({
			minify: envConfig.mode !== 'development',
			inject: {
				data: {
					title: envConfig.project.title,
				},
			},
		}),
	]
}

export { pluginsConfig }
