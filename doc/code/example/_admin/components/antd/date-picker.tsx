import { DatePicker as AntdDatePicker } from 'antd'
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns'

const DatePicker = AntdDatePicker.generatePicker<Date>(dateFnsGenerateConfig)

export { DatePicker }
