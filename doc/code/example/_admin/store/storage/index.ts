import { createValueStorage } from 'wtbx/web'
import { envConfig } from '~env-config'

const name = (name: string) => `${envConfig.storagePrefix}-${name}`

const storage = {
	token: createValueStorage<string | null>(name('token'), null),
}

export { storage }
