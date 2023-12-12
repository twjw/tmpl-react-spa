import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { storage } from '@/_example/store/storage'

type UserState = {
	user: object | null
	token: typeof storage.token.defaultValue
}

type UserStore = UserState & {}

const useUserStore = create<UserStore>()(
	subscribeWithSelector(set => ({
		user: null,
		token: storage.token.defaultValue,
	})),
)

useUserStore.subscribe(state => state.token, storage.token.setItem)

export type { UserState, UserStore }
export { useUserStore }
