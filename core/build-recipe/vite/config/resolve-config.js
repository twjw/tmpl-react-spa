import path from 'path'
import { logs } from 'wtbx/common'
import fs from 'fs/promises'
import JSON5 from 'json5'

const ideaConfigFilename = 'idea.config.js'
const ideaConfigPath = path.resolve(process.cwd(), `./${ideaConfigFilename}`)

async function getIdeaPaths() {
	try {
		const buffer = await fs.readFile(ideaConfigPath)
		const text = buffer.toString()
		const configStartIndex = /^[\\s]*System\.config[\\s]*\(/.exec(text)[0].length
		const configEndIndex = /\)[\s]*$/.exec(text).index
		const paths =
			JSON5.parse(text.substring(configStartIndex, configEndIndex).trim())?.paths || {}
		const dirReg = /\/\*$/
		const result = {}

		for (const k in paths) {
			result[k.replace(dirReg, '')] = paths[k]
				// .replace(/^..\//, '')
				.replace(dirReg, '')
		}

		return result
	} catch (error) {
		logs.error(error, `\n解析 ${ideaConfigFilename} 失敗，取消該檔自動 alias`)
		return {}
	}
}

/**
 * @param envConfig {import('../../../../src/type/global.js').EnvConfig}
 * @return {{ alias: import('vite').AliasOptions }}
 */
async function resolveConfig(envConfig) {
	const alias = await getIdeaPaths()

	logs.info(`通過 ${ideaConfigFilename} 生成的 alias:`)
	logs.info(alias)

	return {
		alias,
	}
}

export { resolveConfig }
