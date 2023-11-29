import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { routePaths, Routes } from '~app'
import { Link } from 'react-router-dom'
import { fetch2 } from 'wtbx/common'
import { translate, useLocale } from '~common/store/locale'

function App() {
	const setLocale = useLocale(e => e.setLocale)
	const [arr, setArr] = useState([])

	useEffect(() => {
		fetch2('/api/text')
			.then(res => res.text())
			.then(e => {
				console.log(123, e)
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	return (
		<div className={'text-18'}>
			{Math.random()}
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<button className={'cursor-pointer'} onClick={() => {
				setLocale(translate('test') === 'test' ? 'zh_TW' : 'en')
			}}>國際化(test) - {translate('test')}</button>
			<button className={'cursor-pointer'} onClick={() => {
				console.log(translate('testBlock.name'))
			}}>log 翻譯
			</button>
			<div>
				<button onClick={() => {
					setArr(1 as unknown as [])
				}}>點擊會報錯 {arr.map(e => e)}</button>
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
	)
}

export {
	App,
}
