import { createFetch2 } from 'wtbx/common'

type ApiResponse<D = null> = {
	success: boolean
	status: number | undefined // undefined 為 error
	data: D
}

const fetch2 = createFetch2({
	prefix: '/api',
})

fetch2.interceptors.request.use(config => {
	return config
})

fetch2.interceptors.response.use<ApiResponse>(res => {
	return {
		success: res.ok,
		status: res.status,
		data: res?.data || null,
	}
})

fetch2.interceptors.error.use<ApiResponse>((error, userConfig) => {
	return {
		success: false,
		status: undefined,
		data: null,
	}
})

export type { ApiResponse }
export { fetch2 }
