import { create } from 'zustand'

const useLocale = create(set => ({
	locale: 'zh_TW', // 預設 locale
	// TODO 要跟隨 locales keyof
	setLocale(locale: string) {
		set({ locale })
	},
}))
