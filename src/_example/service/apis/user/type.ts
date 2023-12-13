import { type ApiResponse } from '@/_example/service'

export namespace UserList {
	export type User = {
		name: string
		age: number
	}

	export type Response = ApiResponse<User[]>
}
