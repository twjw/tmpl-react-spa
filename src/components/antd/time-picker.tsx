import type { PickerTimeProps } from 'antd/es/date-picker/generatePicker'
import { forwardRef } from 'react'
import { DatePicker } from '@/components/antd/date-picker'

interface TimePickerProps extends Omit<PickerTimeProps<Date>, 'picker'> {}

const TimePicker = forwardRef<any, TimePickerProps>((props, ref) => (
	<DatePicker {...props} picker="time" mode={undefined} ref={ref} />
))

TimePicker.displayName = 'TimePicker'

export type { TimePickerProps }
export { TimePicker }
