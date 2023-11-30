import { ErrorBoundary } from '@/components'
import { ReactNode, Suspense, useEffect } from 'react'

type CommonProps = { path: string; children: ReactNode }

const _RouteContent = ({ path, children }: CommonProps) => {
	useEffect(() => {}, [])

	return <Suspense fallback={<div>{path} loading...</div>}>{children}</Suspense>
}

const RouteWrap = ({ path, children }: CommonProps) => {
	return (
		<ErrorBoundary.Route>
			<_RouteContent path={path}>{children}</_RouteContent>
		</ErrorBoundary.Route>
	)
}

export { RouteWrap }
