import { type ApiResponse, fetch2 } from '@/service/fetch2'
import { UserList } from '@/service/apis/user/type'

const userApis = {
	list: () => fetch2<ApiResponse<UserList.Response>>('get:/user/list'),
}

export { userApis }
