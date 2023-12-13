import { Calendar as AntdCalendar } from 'antd'
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns'

const Calendar = AntdCalendar.generateCalendar<Date>(dateFnsGenerateConfig)

export { Calendar }
