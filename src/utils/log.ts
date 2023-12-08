import { createLog } from 'wtbx/common'
import { envConfig } from '~env-config'

const log = createLog('LOG', envConfig.mode === 'development')

export { log }
