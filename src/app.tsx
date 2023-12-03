import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { envConfig, routePaths, Routes } from '~app'
import { Link } from 'react-router-dom'
import { storage, t, useLocale, useUserStore } from '~common/store'
import { log } from '~common/utils'
import { create } from 'zustand'
import { zmStorage } from '../../toolbox-js/packages/web'

type State = {
	hello: string
}

const useStore = create<State>(
	zmStorage(
		set => ({
			hello: 'hello',
		}),
		{
			prefix: envConfig.app.storagePrefix,
			items: ['hello'],
		},
	),
)

function App() {
	const setLocale = useLocale(e => e.setLocale)
	const [arr, setArr] = useState([])
	const token = useUserStore(e => e.token)
	const hello = useStore(e => e.hello)

	useEffect(() => {
		// fetch2('/api/text')
		// 	.then(res => res.text())
		// 	.then(e => {
		// 		log.info(123, e)
		// 	})
		// 	.catch(err => {
		// 		log.error(err)
		// 	})
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
						setLocale(t('testBlock.name') === 'test block name' ? 'zh_TW' : 'en')
					}}
				>
					國際化(test) - {t('testBlock.name')}
				</button>
				<button
					className={'cursor-pointer'}
					onClick={ev => {
						log.info(t('testBlock.name'))
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
				{hello}
				<button onClick={() => useStore.setState({ hello: String(Math.random()) })}>
					change token(useStore) test
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
