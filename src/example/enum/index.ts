import { createEnum } from 'wtbx/common'

const Status = createEnum(
	['color'] as const,
	[
		['ERROR', 1, 'red'],
		['OK', 2, 'green'],
	] as const,
)

export { Status }
