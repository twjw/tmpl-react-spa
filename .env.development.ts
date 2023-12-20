import type { EnvType } from './.env'
import { WObject } from '../toolbox-js/packages/type'

const env: WObject.DeepPartial<EnvType> = {
	apiUrl: 'http://localhost:7981',
}

export default env
