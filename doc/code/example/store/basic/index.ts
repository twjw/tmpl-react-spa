import { create } from 'zustand'

// 沒有持久化(persist) store 的寫法
type UserState = {
	user: object | null
}

// state & actions
type UserStore = UserState & {
	hello(): void
}

const useUserStore = create<UserStore>(set => ({
	user: null,
	hello() {
		console.log('hello user store')
	},
}))

export type { UserState, UserStore }
export { useUserStore }
