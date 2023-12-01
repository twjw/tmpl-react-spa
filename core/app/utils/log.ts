import { createLog } from 'wtbx/common'
import { envConfig } from '~app'

const log = createLog('Client', envConfig.mode === 'development')

export { log }
