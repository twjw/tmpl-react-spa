import { FC } from 'react'
import { useLocale } from '@/store'

const LocaleWrap: FC<{ fc: FC }> = ({ fc: FuncComp }) => {
	useLocale(e => e.locale)
	return <FuncComp />
}

export { LocaleWrap }
