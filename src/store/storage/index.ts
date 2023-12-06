import envConfig from '~envConfig'
import { AutoStorageWithZustand } from 'wtbx/web'

const storage = new AutoStorageWithZustand(envConfig.app.storagePrefix, {
	token: AutoStorageWithZustand.string(''),
})

export { storage }
