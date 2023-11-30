type State<T extends object> = {
	[K in keyof T]?: T[K]
}

type CommonStoreActions<T extends object> = {
	setState(newState: State<T>): void
}

function commonStoreActions<T extends object>(
	set: (state: State<T>) => void,
): CommonStoreActions<T> {
	return {
		setState(newState: State<T>) {
			set(newState)
		},
	}
}

export type { CommonStoreActions }
export { commonStoreActions }
