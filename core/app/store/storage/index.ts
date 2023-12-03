import { envConfig } from '~app'
import { AutoStorageWithZustand } from 'wtbx/web'

const storage = new AutoStorageWithZustand(envConfig.app.storagePrefix, {
	token: AutoStorageWithZustand.string(''),
})

export { storage }
