import { PageMeta } from '@/type/common.ts'
import { envConfig } from '~env-config'

const meta: PageMeta = {
	title: envConfig.title,
}

export default meta
