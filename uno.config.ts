import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { unoPresetRemPlugin } from '../toolbox-js/packages/vite'

const baseFontSize = 50

const config = defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		unoPresetRemPlugin({ baseFontSize }),
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

export { baseFontSize }
export default config
