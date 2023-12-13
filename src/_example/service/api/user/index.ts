import { fetch2 } from '@/_example/service/fetch2'
import { UserList } from '@/_example/service/api/user/type'

export const list = () => fetch2<UserList.Type>('get:/user/list')
