import { forwardRef } from 'react'
import { DatePicker } from '@/components/antd/date-picker.jsx'

const TimePicker = forwardRef((props, ref) => (
	<DatePicker {...props} picker="time" mode={undefined} ref={ref} />
))

TimePicker.displayName = 'TimePicker'

export { TimePicker }
