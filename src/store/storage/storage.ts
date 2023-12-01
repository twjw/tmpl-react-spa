import { Storage2 } from 'wtbx/web'
import { envConfig } from '~app'

const storage = new Storage2(envConfig.app.storagePrefix, {
	hello: Storage2.string('world'),
})

export { storage }
