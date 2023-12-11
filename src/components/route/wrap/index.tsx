import { ErrorBoundary } from '@/components'
import { FC, ReactNode, Suspense, useEffect } from 'react'
import { usePageRute } from '~page-routes'

type CommonProps = { children: ReactNode }

const _RouteContent: FC<CommonProps> = ({ children }) => {
	const ctx = usePageRute()

	useEffect(() => {
		console.log(`path: ${ctx.path} .. ctx:\n`, ctx)
	}, [])

	return <Suspense fallback={<></>}>{children}</Suspense>
}

const RouteWrap: FC<CommonProps> = ({ children }) => {
	return (
		<ErrorBoundary.Route>
			<_RouteContent>{children}</_RouteContent>
		</ErrorBoundary.Route>
	)
}

export { RouteWrap }
