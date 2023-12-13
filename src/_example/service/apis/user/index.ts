import { UserList } from '@/_example/service/apis/user/type'
import { type ApiResponse, fetch2 } from '@/_example/service'

export const list = () => fetch2<ApiResponse<UserList.Type>>('get:/user/list')
