import { recurFindKeyStrValue } from 'wtbx/common'
import type { Dictionary } from '~common/store'
import { locale, dictionary } from '~common/store'
import { wObject } from 'wtbx/type'

const t = (key: wObject.RecursiveKeyOf<Dictionary>, values = []) => {
	let result = recurFindKeyStrValue<Dictionary>(dictionary[locale], key)

	if (!values.length) return result

	for (let i = 0; i < values.length; i++) {
		result = result.replace(/\{[0-9]+}/, values[i])
	}

	return result
}

export { t }
