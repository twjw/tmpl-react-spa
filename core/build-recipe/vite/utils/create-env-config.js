import path from 'path'
import fs from 'fs/promises'
import { logs } from 'wtbx/common'
import JSON5 from 'json5'
import { merge, cloneDeep } from 'lodash-es'
import { getBuildPath } from './get-build-path.js'
import { deepRemoveKey } from './deep-remove-key.js'
import { checkCreateBuildPath } from './check-create-build-path.js'

const extJson = 'json'
const extTs = 'ts'
const supportExtensions = [extJson, extTs]
const tsSym = '// --- ---'
const envPath = path.resolve(process.cwd(), './core/build-recipe/env')
const outputDirPath = getBuildPath()
const outputFileName = 'env.config.js'
const outputPath = path.resolve(process.cwd(), `${outputDirPath}/${outputFileName}`)

const passConfig = async (config, filename, extension) => {
	const _configBuffer = await fs.readFile(path.resolve(envPath, filename))

	try {
		let _config = {}
		const text = _configBuffer.toString()

		if (extension === extJson) {
			_config = JSON.parse(text)
		} else if (extension === extTs) {
			const symReg = new RegExp(tsSym, 'gi')
			const ranges = []
			let match

			while ((match = symReg.exec(text)) !== null) {
				ranges.push(match.index)
			}

			if (ranges.length < 2) throw 'break'

			_config = JSON5.parse(text.substring(ranges[0] + tsSym.length, ranges[1]).trim())
		}

		merge(config, _config)
	} catch (error) {
		logs.error(error, `\n${filename} 解析失敗，忽略該配置`)
	}
}

/**
 * @typedef {import('../../../../src/type/global.js').Mode} Mode
 * @typedef {import('../../../../src/type/global.js').EnvConfig} EnvConfig
 */

/**
 * @param mode {Mode}
 * @param extension {'json' | 'ts'}
 * @param transform {<Result = any>(envConfig: EnvConfig) => Result}
 * @return {Promise<EnvConfig>}
 */
const createEnvConfig = async (mode = 'development', extension = extTs, transform = e => e) => {
	logs.info('開始創建環境變數...')

	let config = {
		mode,
	}

	if (supportExtensions.includes(extension)) {
		const ls = await fs.readdir(envPath)
		const baseFileName = `env.${extension}`
		const filterBaseLs = ls.filter(e => e === baseFileName)

		if (ls.length > 0 && filterBaseLs.length !== ls.length)
			await passConfig(config, baseFileName, extension)

		for (let i = 0; i < ls.length; i++) {
			const filename = ls[i]
			const env = filename.match(/^env\.?([A-z0-9-_]+)?\.(ts|json)$/)?.[1]
			if (env === mode) await passConfig(config, filename, extension)
		}

		config = transform(config)
		const viteConfig = cloneDeep(config)
		deepRemoveKey(viteConfig, k => /^_/.test(k))

		await checkCreateBuildPath()
		await fs.writeFile(outputPath, `export default ${JSON.stringify(viteConfig, null, 2)}`)
	}

	logs.info('環境變數創建完畢！環境變數為：')
	logs.info(JSON.stringify(config, null, 2))

	return config
}

export { createEnvConfig }
