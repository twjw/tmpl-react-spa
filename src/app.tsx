import { useEffect, useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { envConfig, routePaths, Routes } from '~app'
import { Link } from 'react-router-dom'
import { fetch2 } from 'wtbx/common'

function App() {
	const [count, setCount] = useState(0)

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
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1 className={'text-rose'}>{envConfig.project.title}</h1>
			<div className="card">
				<button onClick={() => setCount(count => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			{routePaths.map(path => (
				<div key={path}>
					<Link to={path}>{path}</Link>
				</div>
			))}
			<Routes />
		</>
	)
}

export default App
