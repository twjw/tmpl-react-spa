import { wObject } from '../../../toolbox-js/packages/type'

export type Mode = 'development' | 'production'

export type EnvConfig = {
	mode: Mode
} & wObject.IgnoreKeyPrefix<typeof import('../build-recipe/env/env').default>
