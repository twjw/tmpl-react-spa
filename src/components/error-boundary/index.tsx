import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ReactNode } from 'react'

class ErrorBoundary {
	// 最外層
	static App({ children }: { children: ReactNode }) {
		return (
			<ReactErrorBoundary
				fallback={
					<p>
						⚠️Something went wrong.{' '}
						<button onClick={() => location.reload()}>click reload page</button>
					</p>
				}
			>
				{children}
			</ReactErrorBoundary>
		)
	}

	// 路由層
	static Route({ children }: { children: ReactNode }) {
		return (
			<ReactErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
				{children}
			</ReactErrorBoundary>
		)
	}
}

export { ErrorBoundary }
