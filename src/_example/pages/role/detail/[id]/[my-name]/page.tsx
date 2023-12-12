import { useParams } from 'react-router-dom'

function Page() {
	const { id, myName } = useParams()
	return (
		<>
			/role/detail/:id/:myName, id: {id}, myName: {myName}
		</>
	)
}

export default Page
