import { createEnum } from 'wtbx/common'

type Actions = {
	hello: () => void
}

const _enum = createEnum(
	['color'] as const,
	[
		['ERROR', 1, 'red'],
		['OK', 2, 'green'],
	] as const,
)

const Status = _enum as typeof _enum & Actions

Status.hello = () => {
	console.log('123')
}

export { Status }
