import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import { presetRem } from '../plugins/unocss/plugins/preset-rem'
import { PluginOption } from 'vite'
import { EnvConfig } from '../../../type/build'

function pluginsConfig(envConfig: EnvConfig): PluginOption[] {
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
				presetRem({ baseFontSize: 40 }),
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
