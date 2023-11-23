import { useParams } from 'react-router-dom'

function Page() {
	const { id } = useParams()
	return <>example/role/detail/[id]/page.jsx, id: ${id}</>
}

export default Page
