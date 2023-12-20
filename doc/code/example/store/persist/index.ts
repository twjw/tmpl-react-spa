import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { createValueStorage } from 'wtbx/web'
import { envConfig } from '~env-config'

// 建立集中管理的 storage
// store/storage/index.ts
const name = (name: string) => `${envConfig.project.storagePrefix}-${name}`

const storage = {
	token: createValueStorage<string | null>(name('token'), null),
}

export { storage }

// 有持久化(persist) store 的寫法
// store/user/index.ts
type UserState = {
	user: object | null
	token: typeof storage.token.defaultValue
}

type UserStore = UserState & {
	hello(): void
}

const useUserStore = create<UserStore>()(
	subscribeWithSelector(set => ({
		user: null,
		token: storage.token.defaultValue,
		hello() {
			console.log('hello user store')
		},
	})),
)

useUserStore.subscribe(state => state.token, storage.token.setItem)

export type { UserState, UserStore }
export { useUserStore }
