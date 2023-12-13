import { useParams } from 'react-router-dom'

function Page() {
	const { id } = useParams()
	return <>/role/detail/:id, id: ${id}</>
}

export default Page
