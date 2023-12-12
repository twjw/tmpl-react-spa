import { create } from 'zustand'
import { storage } from '@/example/store'

type UserState = {
	user: object | null
	token: string
}

type UserStore = UserState & {}

const useUserStore = create<UserStore>(set => ({
	user: null,
	token: storage.state.token,
}))

storage.bind<UserState>(useUserStore, {
	token: 'token',
})

export type { UserState, UserStore }
export { useUserStore }
