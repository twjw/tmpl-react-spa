import { Routes as ReactRouterDomRoutes, Route, Navigate } from 'react-router-dom'
import { lazy, LazyExoticComponent, FC, ReactNode, ComponentType } from 'react'
import { logs } from 'wtbx/common'

type Route = {
	path: string,
	LazyPage: LazyExoticComponent<any>
	children?: Route[],
}

type MySuspense = FC<{ path: string, children: ReactNode }>

type RegisterOptions = { prefix: string, modules: Record<string, () => Promise<{ default: ComponentType }>>, Suspense: MySuspense }

let _routes: Route[] = []
let routePaths: string[] = []
let _Suspense: FC<{ path: string, children: ReactNode }>
const _OUTLET = '(outlet)'

/**
 * @return 表示是否有該 outlet
 */
function _passRouteChildren(path: string, routes: Record<string, Route> = {}, outlets: Record<string, Route[]> = {}, route?: Route) {
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

function _recursivePassChildrenRoutePath(routePaths: string[] = [], path = '', route: Route = {} as Route) {
	if (route.children) {
		for (let i = 0; i < route.children.length; i++) {
			const e = route.children[i]
			const _path = `${path.length === 1 ? '' : path}/${e.path}`
			routePaths.push(_path)
			_recursivePassChildrenRoutePath(routePaths, _path, e)
		}
	}
}

function _flatRoutePaths(routes: Record<string, Route> = {}) {
	const routePaths = []

	for (const k in routes) {
		const e = routes[k]
		routePaths.push(e.path)
		_recursivePassChildrenRoutePath(routePaths, e.path, e)
	}

	return routePaths
}

function register({ prefix, modules, Suspense }: RegisterOptions) {
	const outlets: Record<string, Route[]> = {}
	const routes: Record<string, Route> = {}

	for (const modulePath in modules) {
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
				path: spByOutlets[spByOutlets.length - 1].replace(/^\/?(.+)\/page\.tsx$/, '$1'),
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

function _mapRoutes(routes: Route[] = [], parentPath = '') {
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
	return <ReactRouterDomRoutes>
		{_mapRoutes(_routes)}
		<Route path={'*'} element={<Navigate to={'/404'} replace />} />
	</ReactRouterDomRoutes>
}

export { routePaths, register, Routes }
