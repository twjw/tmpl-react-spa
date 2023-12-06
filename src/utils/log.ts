import { createLog } from 'wtbx/common'
import envConfig from '~envConfig'

const log = createLog('LOG', envConfig.mode === 'development')

export { log }
