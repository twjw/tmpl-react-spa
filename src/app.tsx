import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { routePaths, Routes } from '~app'
import { Link } from 'react-router-dom'
import { fetch2 } from 'wtbx/common'
import { storage, translate, useLocale, useUserStore } from '~common/store'
import { log } from '~common/utils'

function App() {
	const setLocale = useLocale(e => e.setLocale)
	const [arr, setArr] = useState([])
	const token = useUserStore(e => e.token)

	useEffect(() => {
		fetch2('/api/text')
			.then(res => res.text())
			.then(e => {
				log.info(123, e)
			})
			.catch(err => {
				log.error(err)
			})
	}, [])

	return (
		<div>
			<div className={'text-18 text-color1 <md:text-24'}>
				{Math.random()}
				<div>
					<a href="https://vitejs.dev" target="_blank">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
				</div>
				<button
					className={'cursor-pointer text-red'}
					onClick={ev => {
						setLocale(translate('test') === 'test' ? 'zh_TW' : 'en')
					}}
				>
					國際化(test) - {translate('test')}
				</button>
				<button
					className={'cursor-pointer'}
					onClick={ev => {
						log.info(translate('testBlock.name'))
					}}
				>
					log 翻譯
				</button>
				<button
					onClick={() => {
						setArr(1 as unknown as [])
					}}
				>
					點擊會報錯 {arr.map(e => e)}
				</button>
				<button onClick={() => useUserStore.setState({ token: String(Math.random()) })}>
					change token(userStore) test
				</button>
				<button onClick={() => storage.update('token', String(Math.random()))}>
					change token(storage) test
				</button>
				<div>last user.token = {token}</div>
				<div className="flex items-start flex-wrap">
					{routePaths.map(path => (
						<div key={path} className={'mb-3 mr-4'}>
							<Link to={path}>{path}</Link>
						</div>
					))}
				</div>
				<Routes />
			</div>
		</div>
	)
}

export { App }
