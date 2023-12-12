import { createFetch2 } from 'wtbx/common'

const fetch2 = createFetch2()

// 以下三個為攔截器，傳參不了解其實可以自己點進去看
// 統一 request 處理
fetch2.interceptors.request.use(config => {
	return config
})

// 統一正確的響應處理，fetch api 是後端不管是 400, 500 還啥只要是返回得了的
// 都是正確響應，可以使用 ok 跟 status 來判斷要響應什麼
fetch2.interceptors.response.use(res => {
	return res
})

// 錯誤響應攔截，如果未攔截的話 fetch2 遇到以下錯誤將會 throw error 出去，要主動 catch
// 首參是錯誤實例
//   內外部錯誤: Fetch2UnknownError
//   取消: Fetch2AbortError
//   超時: Fetch2TimeoutError
// 二參是 fetch2 傳入的所有數據 { url: string, init: RequestInit | null, apiOptions: ApiOptions | null }
fetch2.interceptors.error.use((error, userConfig) => {
	return error
})

export { fetch2 }
