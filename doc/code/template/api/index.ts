import { type ApiResponse, fetch2 } from '@/service'
import { UserList } from '@/service/apis/user/type'

export const list = () => fetch2<ApiResponse<UserList.Response>>('get:/user/list')
