import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { routePaths, Routes } from '~app'
import { Link } from 'react-router-dom'
import { fetch2, logs } from 'wtbx/common'
import { translate, useLocale } from '~common/store'
import { storage } from '@/store'

logs.info('storage.state', storage.state)

function App() {
	const setLocale = useLocale(e => e.setLocale)
	const [arr, setArr] = useState([])

	useEffect(() => {
		fetch2('/api/text')
			.then(res => res.text())
			.then(e => {
				logs.info(123, e)
			})
			.catch(err => {
				logs.error(err)
			})
	}, [])

	const [theme, setTheme] = useState('red')

	return (
		<div className={theme}>
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
						logs.info(translate('testBlock.name'))
					}}
				>
					log 翻譯
				</button>
				<button onClick={() => setTheme('red')}>切換主題</button>
				<div>
					<button
						onClick={() => {
							setArr(1 as unknown as [])
						}}
					>
						點擊會報錯 {arr.map(e => e)}
					</button>
				</div>
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
