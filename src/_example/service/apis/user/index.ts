import { type ApiResponse, fetch2 } from '@/_example/service'
import { UserList } from '@/_example/service/apis/user/type'

export const list = () => fetch2<ApiResponse<UserList.Response>>('get:/user/list')
