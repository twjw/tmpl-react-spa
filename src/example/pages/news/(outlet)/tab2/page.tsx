import { useState } from 'react'

function Page() {
	const [arr, setArr] = useState([])
	return (
		<>
			example/news/tab2/page.tsx~
			<div>
				<button
					onClick={() => {
						setArr(1 as unknown as [])
					}}
				>
					點擊會報錯 {arr.map(e => e)}
				</button>
			</div>
		</>
	)
}

export default Page