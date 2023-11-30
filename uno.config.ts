import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetRem } from './core/build-recipe/vite/plugins/unocss/plugins/preset-rem'

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
		presetRem(),
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
