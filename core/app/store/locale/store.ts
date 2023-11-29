import { create } from 'zustand'
import { dictionary } from '~common/store/locale'

type Locale = keyof typeof dictionary
type Dictionary = typeof dictionary['zh_TW']
type LocaleState = {
	locale: Locale
	setLocale: (locale: Locale) => void
}

let locale: Locale = 'zh_TW'

const useLocale = create<LocaleState>(set => ({
	locale, // 預設 locale
	setLocale(_locale) {
		locale = _locale
		set({ locale })
	},
}))

export type {
	Locale,
	Dictionary,
	LocaleState,
}

export {
	locale,
	useLocale,
}
