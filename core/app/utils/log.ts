import { createLog } from 'wtbx/common'
import { envConfig } from '~app'

const log = createLog('LOG', envConfig.mode === 'development')

export { log }
