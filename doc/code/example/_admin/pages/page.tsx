import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/favicon.svg'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/user'
import { createFetch2 } from 'wtbx/common'
import { t, setLocale } from '~wtbx-i18n'
import { Status } from '@/enum'
import { storage } from '@/store/storage'
import { userApis } from '@/service/apis/user'
import { usePageRoute } from '~page-routes'

const fetch2 = createFetch2()

fetch2.interceptors.request.use(config => {
	return config
})

fetch2.interceptors.response.use(res => {
	console.log(res)
	return res?.data
})

fetch2.interceptors.error.use((error, userConfig) => {
	return { aaa: 123 }
})

function Page() {
	const [arr, setArr] = useState([])
	const token = useUserStore(e => e.token)
	const ctx = usePageRoute()
	const ctx2 = usePageRoute('/news/tab1')
	const ctx3 = usePageRoute('/news/tab2')

	useEffect(() => {
		console.log('usePageRoute()', ctx)
		console.log(`usePageRoute('/news/tab1')`, ctx2)
		console.log(`usePageRoute('/news/tab2')`, ctx3)

		Status.hello()
		;(async () => {
			const { success, status, data } = await userApis.list()
			console.log('userList', success, status, data)
		})()

		const formData = new FormData()
		formData.append('text', 'hello form-data text')
		fetch2<{ n: number }[]>('post:/api/form-data', {
			body: formData,
			resType: 'text',
		})
			.then(res => {
				console.log('api/form-data', res)
			})
			.catch(err => {
				console.log(777, err)
			})

		fetch2<{ n: number }[]>('get:/api/qs', {
			params: {
				id: '123',
				name: 'frank',
			},
			resType: 'text',
		}).then(res => {
			console.log('api/qs', res)
		})

		const mark = Symbol()
		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: mark,
		}).then(res => {
			console.log('api/json' + 1, res)
		})

		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: mark,
		}).then(res => {
			console.log('api/json' + 2, res)
		})

		fetch2<{ n: number }[]>('get:/api/json', undefined, {
			mark: mark,
		}).then(res => {
			console.log('api/json' + 3, res)

			fetch2<{ n: number }[]>('get:/api/json', undefined, {
				mark: mark,
			}).then(res => {
				console.log('api/json' + 4, res)
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
				<div>Status enum(ERROR value): {Status.getByLabel('ERROR')}</div>
				<div>Status enum(OK color): {Status.getByLabel('OK', 'color')}</div>
				<div>
					Status enum map:{' '}
					{Status.map(([label, value, color]) => (
						<span key={value}>
							Status.{label}: {value} {color},{' '}
						</span>
					))}
				</div>
				<button
					className={'cursor-pointer text-red'}
					onClick={ev => {
						setLocale(t('testBlock.name') === 'test block name' ? 'zh_TW' : 'en')
					}}
				>
					國際化(testBlock.name) - {t('testBlock.name')}
				</button>
				<button
					className={'cursor-pointer'}
					onClick={ev => {
						console.log(t('testBlock.name'))
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
				<button onClick={() => storage.token.setItem(String(Math.random()))}>
					change token(storage) test
				</button>
				<div>last user.token = {token}</div>
				<div className="flex items-start flex-wrap">
					{[
						'/404',
						'/home',
						'/news/detail',
						'/news',
						'/news/tab1',
						'/news/tab1/tab1-1',
						'/news/tab1/tab1-2',
						'/news/tab2',
						'/role/detail/:id/:myName',
						'/role/detail/:id',
						'/role/detail',
						'/role/list',
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
