import { useParams } from 'react-router-dom'

function Page() {
	const { id, myName } = useParams()
	return (
		<>
			example/role/detail/[id]/[username]/page.jsx, id: {id}, myName: {myName}
		</>
	)
}

export default Page
