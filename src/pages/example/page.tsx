import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import { storage, t, useLocale, useUserStore } from '@/store'
import { log } from '@/utils'
import { createFetch2 } from 'wtbx/common'

const fetch2 = createFetch2()

fetch2.interceptors.request.use(config => {
	return config
})

fetch2.interceptors.response.use(res => {
	console.log(res)
	return res?.data
})

function Page() {
	const setLocale = useLocale(e => e.setLocale)
	const [arr, setArr] = useState([])
	const token = useUserStore(e => e.token)

	useEffect(() => {
		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: 'eee',
		}).then(res => {
			console.log('e' + 1, res)
		})

		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: 'eee',
		}).then(res => {
			console.log('e' + 2, res)
		})

		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: 'eee',
		}).then(res => {
			console.log('e' + 3, res)

			fetch2<{ n: number }[]>('get:/api/json', undefined, {
				mark: 'eee',
			}).then(res => {
				console.log('e' + 4, res)
			})
		})

		// fetch2<{ n: number }[]>('get:/api/json', undefined, {
		// 	cacheTime: 3000,
		// }).then(res => {
		// 	console.log(152111, res)
		// 	setTimeout(() => {
		// 		console.log(1500)
		//
		// 		fetch2<{ n: number }[]>('get:/api/json', undefined, { forceRun: true }).then(res => {
		// 			console.log(1500, res)
		// 		})
		// 	}, 1500)
		// 	setTimeout(() => {
		// 		console.log(4000)
		//
		// 		fetch2<{ n: number }[]>('get:/api/json', undefined).then(res => {
		// 			console.log(4000, res)
		// 		})
		// 	}, 4000)
		// })

		// const c = new AbortController()
		// fetch2<string>(
		// 	'get:/api/text',
		// 	{
		// 		params: {
		// 			test: 1,
		// 			cool: 'guys',
		// 			arr: [1, 2],
		// 			obj: { hello: 'world', name: 'frank' },
		// 		},
		// 		// body: {
		// 		// 	hello: 'world',
		// 		// 	color: 'red',
		// 		// },
		// 		resType: 'text',
		// 	},
		// 	{
		// 		// controller: c
		// 		// timeout: 1,
		// 	}
		// )
		// 	.then(res => {
		// 		console.log(444, res)
		// 		throw Error('asdasd')
		// 	})
		// 	.catch(err => {
		// 		console.log(123, err)
		// 	})
		//
		// c.abort()
		// fetch2.cancelAll()
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
				<button onClick={() => useUserStore.setState({ token: String(Math.random()) })}>
					change token(userStore) test
				</button>
				<button onClick={() => storage.update('token', String(Math.random()))}>
					change token(storage) test
				</button>
				<div>last user.token = {token}</div>
				<div className="flex items-start flex-wrap">
					{[
						'/404',
						'/example/home',
						'/example/news/detail',
						'/example/news',
						'/example/news/tab1',
						'/example/news/tab1/tab1-1',
						'/example/news/tab1/tab1-2',
						'/example/news/tab2',
						'/example',
						'/example/role/detail/:id/:myName',
						'/example/role/detail/:id',
						'/example/role/detail',
						'/example/role/list',
						'/',
					].map(path => (
						<div key={path} className={'mb-3 mr-4'}>
							<Link to={path}>{path}</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Page
