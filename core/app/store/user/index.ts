import { create } from 'zustand'
import { commonStoreActions, CommonStoreActions } from '~common/utils'

type UserState = {
	user: object | null
	token: boolean
}

type UserStore = UserState & {} & CommonStoreActions<UserState>

const userStore = create<UserStore>(set => ({
	user: null,
	token: false,
	...commonStoreActions<UserState>(set),
}))

export type { UserState, UserStore }
export { userStore }
