export namespace UserApi {
	export namespace GetUser {
		export type User = {
			name: string
			age: number
		}

		export type Type = {
			name: string
			user: User
		}
	}
}
