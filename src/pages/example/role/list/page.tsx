import { useState } from 'react'

function Page() {
	const [arr, setArr] = useState([])

	return <>example/role/list/page.tsx
		<div>
			<button className={'text-[#1b1b1b]'} onClick={() => {
				setArr(1 as unknown as [])
			}}>點擊會報錯 {arr.map(e => e)}</button>
		</div>
	</>
}

export default Page
