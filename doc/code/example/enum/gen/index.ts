import { createEnum } from 'wtbx/common'

// 最基本的 enum
const Status = createEnum(
	undefined, // 預設為 ['label', 'value']
	[
		['ERROR', 1],
		['OK', 2],
	] as const,
)
Status.getByLabel('ERROR') // 1
Status.getByValue(2) // 'OK'

// 超過 2 個(label, value)值的 enum
const Status2 = createEnum(
	['color'] as const, // ['label', 'value', 'color'] 記得要有 as const
	[
		['ERROR', 1, 'red'],
		['OK', 2, 'green'],
	] as const,
)
Status2.getByLabel('OK') // 2
Status2.getByLabel('OK', 'color') // 'green'
Status2.getByValue(1, 'label') // 'ERROR'
Status2.getByValue(1, 'color') // 'red'

// 擴展自訂方法的 enum
type Actions3 = {
	hello: () => void
}

const _enum3 = createEnum(
	['color'] as const,
	[
		['ERROR', 1, 'red'],
		['OK', 2, 'green'],
	] as const,
)

const Status3 = _enum3 as typeof _enum3 & Actions3

Status3.hello = () => {
	console.log('123')
}

Status3.hello() // console '123'

export { Status, Status2, Status3 }
