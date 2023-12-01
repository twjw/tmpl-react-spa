import path from 'path'
import { brLog } from '../utils'
import fs from 'fs/promises'
import jsonc from 'jsonc-parser'
import { EnvConfig } from '../../../type/build'
import { AliasOptions, ResolveOptions } from 'vite'

const tsConfigJsonName = 'tsconfig.json'
const tsConfigJsonPath = path.resolve(process.cwd(), `./${tsConfigJsonName}`)

async function getIdeaPaths() {
	try {
		const text = await fs.readFile(tsConfigJsonPath, { encoding: 'utf8' })
		const paths = jsonc.parse(text)?.compilerOptions?.paths || {}
		const dirReg = /\/\*$/
		const result = {}

		for (const k in paths) {
			result[(k as string).replace(dirReg, '')] = `/${paths[k][0].replace(dirReg, '')}`
		}

		return result
	} catch (error) {
		brLog.error(error, `\n解析 ${tsConfigJsonName} 失敗，取消該檔自動 alias`)
		return {}
	}
}

async function resolveConfig(envConfig: EnvConfig): Promise<
	ResolveOptions & {
		alias?: AliasOptions
	}
> {
	const alias = await getIdeaPaths()

	brLog.info(`通過 ${tsConfigJsonName} 生成的 alias:`)
	brLog.info(alias)

	return {
		alias,
	}
}

export { resolveConfig }
