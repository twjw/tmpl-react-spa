import { definePreset } from '@unocss/core'

const remRE = /(-?[.\d]+)rem/g

type RemToPxOptions = {
	/**
	 * 1rem = n px
	 * @default 16
	 */
	baseFontSize: number
}

const presetRem = definePreset((options?: RemToPxOptions) => {
	const { baseFontSize = 16 } = options || {}

	return {
		name: '@unocss/preset-rem',
		postprocess: util => {
			util.entries.forEach(e => {
				const value = e[1]
				if (typeof value === 'string' && remRE.test(value))
					e[1] = value.replace(remRE, (_, p1) => `${p1 / baseFontSize * 4}rem`)
			})
		},
	}
})

export type { RemToPxOptions }

export { presetRem }
