import { ErrorBoundary } from '@/components'
import { FC, ReactNode, Suspense, useEffect } from 'react'
// import { useRoute } from 'wtbx/react'

type CommonProps = { children: ReactNode }

const _RouteContent: FC<CommonProps> = ({ children }) => {
	// const ctx = useRoute()
	//
	// console.log('ctx', ctx)

	useEffect(() => {}, [])

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
