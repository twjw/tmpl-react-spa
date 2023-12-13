import { fetch2 } from '@/service'
import { UserList } from '@/service/apis/user/type'

export const list = () => fetch2<UserList.Response>('get:/user/list')
