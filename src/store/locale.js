import { create } from 'zustand'

const useLocale = create(set => ({
	locale: 'zh_TW', // 預設 locale
	setLocale(locale) {
		set({ locale })
	},
}))
