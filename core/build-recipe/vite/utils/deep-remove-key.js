import { forEach, isObject, isFunction } from 'lodash-es'

function deepRemoveKey(obj, key) {
	forEach(obj, function (value, _key) {
		if (isObject(value)) {
			deepRemoveKey(value, key)
		}

		const match = isFunction(key) ? key(_key) : _key === key

		if (match) {
			delete obj[_key]
		}
	})

	return obj
}

export { deepRemoveKey }
