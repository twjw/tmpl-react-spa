import { Routes as ReactRouterDomRoutes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { envConfig } from '~app'
import { logs } from 'wtbx/common'

/**
 * @typedef {{
 * 	path: string,
 *  LazyPage: import('react').LazyExoticComponent<any>
 *  children?: Route[],
 * }} Route
 */

/**
 * @type {Route[]}
 */
let _routes = []
/**
 * @type {string[]}
 */
let routePaths = []
let _Suspense
const _OUTLET = '(outlet)'

function _parseFileName(filename = '') {
	const names = filename.split('.')

	if (names[0][0] === '[') {
		return '/:' + names[0].substring(1, names[0].length - 1)
	} else {
		if (names[0] !== 'index') {
			return '/' + names[0]
		}
	}
}

/**
 * @returns {boolean} 表示是否有該 outlet
 */
function _passRouteChildren(path, routes = {}, outlets = {}, route) {
	if ((route != null || routes[path || '/'] != null) && outlets[path] != null) {
		const children = outlets[path]
		const _route = route || routes[path || '/']

		_route.children = children
		delete outlets[path]

		for (let i = 0; i < children.length; i++) {
			_passRouteChildren(path + '/' + children[i].path, routes, outlets, children[i])
		}

		return true
	}

	return false
}

function _recursivePassChildrenRoutePath(routePaths = [], path = '', route = {}) {
	if (route.children) {
		for (let i = 0; i < route.children.length; i++) {
			const e = route.children[i]
			const _path = `${path.length === 1 ? '' : path}/${e.path}`
			routePaths.push(_path)
			_recursivePassChildrenRoutePath(routePaths, _path, e)
		}
	}
}

function _flatRoutePaths(routes = {}) {
	const routePaths = []

	for (let k in routes) {
		const e = routes[k]
		routePaths.push(e.path)
		_recursivePassChildrenRoutePath(routePaths, e.path, e)
	}

	return routePaths
}

function register({ prefix, modules, Suspense }) {
	const outlets = {}
	const routes = {}

	for (let modulePath in modules) {
		const noPrefixPath = modulePath.substring(prefix.length)
		const spByOutlets = noPrefixPath.split(`/${_OUTLET}`)

		// 如果含 (outlet) 做特殊處理
		if (spByOutlets.length > 1) {
			let path = ''

			for (let i = 0; i < spByOutlets.length - 1; i++) {
				path += spByOutlets[i]
			}

			if (outlets[path] == null) {
				outlets[path] = []
			}

			outlets[path].push({
				path: spByOutlets[spByOutlets.length - 1].replace(/^\/?(.+)\/page\.jsx$/, '$1'),
				LazyPage: lazy(() => modules[modulePath]()),
			})

			continue
		}

		const paths = noPrefixPath.split('/')
		let _path = ''

		// 拚前綴路徑
		for (let i = 1; i < paths.length - 1; i++) {
			if (paths[i][0] === '[') {
				const paramName = paths[i]
					.substring(1, paths[i].length - 1)
					.split('-')
					.reduce((p, e, i) => p + (i === 0 ? e : `${e[0].toUpperCase()}${e.substring(1)}`), '')
				_path += `/:${paramName}`
			} else {
				_path += `/${paths[i]}`
			}
		}

		const routePath = _path || '/'
		routes[routePath] = {
			path: routePath,
			LazyPage: lazy(() => modules[modulePath]()),
		}
	}

	// 將子路由們塞進他爹娘裡
	let max = 1000,
		exec = 0
	while (exec < max && Object.keys(outlets).length > 0) {
		for (const path in outlets) {
			if (_passRouteChildren(path, routes, outlets)) break
		}
		exec++
	}
	if (exec >= max) {
		logs.warn('路由生成比對次數超過上限，請排查...')
	}

	const flatRoutePaths = _flatRoutePaths(routes)

	logs.info(`項目 pages 生成的路由(length: ${flatRoutePaths.length})`)
	logs.info(flatRoutePaths)

	_Suspense = Suspense
	_routes = Object.values(routes)
	routePaths = flatRoutePaths
}

/**
 *
 * @param routes {Route[]}
 * @param [parentPath=''] {string}
 * @private
 */
function _mapRoutes(routes = [], parentPath = '') {
	return routes.map(e => (
		<Route
			key={e.path}
			path={e.path}
			element={
				<_Suspense path={`${parentPath ? `${parentPath}/` : parentPath}${e.path}`}>
					<e.LazyPage />
				</_Suspense>
			}
		>
			{e.children ? _mapRoutes(e.children, e.path) : null}
		</Route>
	))
}

function Routes() {
	return <ReactRouterDomRoutes>{_mapRoutes(_routes)}</ReactRouterDomRoutes>
}

export { routePaths, register, Routes }
