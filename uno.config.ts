import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { unoPresetRemPlugin } from '../toolbox-js/packages/vite'

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		unoPresetRemPlugin(),
	],
	theme: {
		breakpoints: {
			xxs: '0px',
			xs: '320px',
			sm: '480px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			xxl: '1600px',
		},
		colors: {
			red: '#ff0000',
		},
	},
	shortcuts: {},
})
