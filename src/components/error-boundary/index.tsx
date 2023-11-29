import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ReactNode } from 'react'

class ErrorBoundary {
	static Common({ children }: { children: ReactNode }) {
		return (
			<ReactErrorBoundary fallback={<p>⚠️Something went wrong. <button onClick={() => location.reload()}>click reload page</button></p>}>
				{children}
			</ReactErrorBoundary>
		)
	}

	static Page({ children }: { children: ReactNode }) {
		return (
			<ReactErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
				{children}
			</ReactErrorBoundary>
		)
	}
}

export {
	ErrorBoundary
}
