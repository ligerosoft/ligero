import InternalDatePicker, { DatePickerColumnType } from './date-picker';
import TimePicker, { PickerTimeColumnType, TimePickerProps } from './time-picker';

type DatePickerType = typeof InternalDatePicker;
interface DatePickerProps extends DatePickerType {
  TimePicker: typeof TimePicker;
}
const DatePicker = InternalDatePicker as DatePickerProps;
DatePicker.TimePicker = TimePicker;
export type { TimePickerProps, PickerTimeColumnType };
export type { DatePickerColumnType };
export default DatePicker;
