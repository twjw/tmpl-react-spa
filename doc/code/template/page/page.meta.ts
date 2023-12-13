import { PageMeta } from '@/type/common.ts'
import { envConfig } from '~env-config'

const meta: PageMeta = {
	title: envConfig.project.title,
}

export default meta
