import { Outlet } from 'react-router-dom'

function Page() {
	return (
		<>
			<div>/news/page.tsx</div>
			<div>
				<div>this is layout</div>
				<div>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Page
