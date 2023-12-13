import { UserList } from '@/_example/service/apis/user/type'
import { fetch2 } from '@/_example/service'

export const list = () => fetch2<UserList.Response>('get:/user/list')
