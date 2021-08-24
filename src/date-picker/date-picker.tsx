import Picker, { PickerActionRef } from '../picker';
import { clamp, isDate, lastDayOfMonth, padZero, range } from '../utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export type DatePickerColumnType = 'year' | 'month' | 'day' | 'hour' | 'minute';

export interface DateTimePickerProps {
  type?: 'date' | 'datetime' | 'yearmonth' | 'monthday' | 'datehour';
  minDate?: Date;
  maxDate?: Date;
  value?: Date;
  filter?: (type: DatePickerColumnType, values: string[]) => string[];
  formatter?: (type: DatePickerColumnType, val: string) => any;
  onChange?: (date: Date) => void;
  onCancel?: () => void;
  onConfirm?: (date: Date) => void;
  okText?: React.ReactNode;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
}

const currentYear = new Date().getFullYear();

const DatePicker: React.FC<DateTimePickerProps> = (props) => {
  const { value, formatter = (type, val) => val, type = 'datetime', ...rest } = props;

  const picker = useRef<PickerActionRef | null>(null);
  const [index, setIndex] = useState<number[] | number>();

  const formatValue = (val?: Date) => {
    if (isDate(val)) {
      const timestamp = clamp(val.getTime(), props.minDate!.getTime(), props.maxDate!.getTime());
      return new Date(timestamp);
    }
    return undefined;
  };

  const [date, setDate] = useState(formatValue(value || props.minDate));

  useEffect(() => {
    if (picker.current) {
      const indexes = picker.current.getIndexByValue(updateColumns());
      setIndex(indexes);
    }
  }, [date]);
  const getBoundary = (type: 'min' | 'max', val: Date) => {
    const boundary = props[`${type}Date` as const]!;
    const year = boundary.getFullYear();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;
    if (type === 'max') {
      month = 12;
      hour = 23;
      date = lastDayOfMonth(val.getFullYear(), val.getMonth() + 1);
      minute = 59;
    }
    if (year === val.getFullYear()) {
      month = boundary.getMonth() + 1;
      if (month === val.getMonth() + 1) {
        date = boundary.getDate();
        if (date === val.getDate()) {
          hour = boundary.getHours();
          if (hour === val.getHours()) {
            minute = boundary.getMinutes();
          }
        }
      }
    }
    return {
      [`${type}Year`]: year,
      [`${type}Month`]: month,
      [`${type}Date`]: date,
      [`${type}Hour`]: hour,
      [`${type}Minute`]: minute,
    };
  };
  const ranges = useMemo(() => {
    const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary(
      'max',
      date || props.minDate!,
    );
    const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary(
      'min',
      date || props.maxDate!,
    );

    let result: { type: DatePickerColumnType; values: number[] }[] = [
      {
        type: 'year',
        values: [minYear, maxYear],
      },
      {
        type: 'month',
        values: [minMonth, maxMonth],
      },
      {
        type: 'day',
        values: [minDate, maxDate],
      },
      {
        type: 'hour',
        values: [minHour, maxHour],
      },
      {
        type: 'minute',
        values: [minMinute, maxMinute],
      },
    ];

    switch (props.type) {
      case 'date':
        result = result.slice(0, 3);
        break;
      case 'yearmonth':
        result = result.slice(0, 2);
        break;
      case 'monthday':
        result = result.slice(1, 3);
        break;
      case 'datehour':
        result = result.slice(0, 4);
        break;
      default:
        break;
    }
    return result;
  }, [date, props.minDate, props.maxDate]);

  const originColumns = useMemo(() => {
    return ranges.map(({ type, values }) => {
      const [start, end] = values;
      let getRange: string[] = range<string>(start, end, (index) => padZero(start + index), true);
      if (props.filter) {
        getRange = props.filter(type, getRange);
      }
      return {
        type,
        values: getRange,
      };
    });
  }, [ranges]);

  const columns = originColumns.map((item) => {
    return item.values.map((val) => formatter(item.type, val));
  });

  function updateColumns(): string[] {
    const val = date!;
    return originColumns.map((item) => {
      switch (item.type) {
        case 'year':
          return formatter('year', `${val.getFullYear()}`);
        case 'month':
          return formatter('month', padZero(val.getMonth() + 1));
        case 'day':
          return formatter('day', padZero(val.getDate()));
        case 'hour':
          return formatter('hour', padZero(val.getHours()));
        case 'minute':
          return formatter('minute', padZero(val.getMinutes()));
        default:
          return '';
      }
    });
  }

  const onChange = (value: any) => {
    const getValue = (type: DatePickerColumnType) => {
      let i = 0;
      let column: string[] = [];
      originColumns.forEach((item, idx: number) => {
        if (item.type === type) {
          i = idx;
          column = item.values;
        }
      });
      return getTrueValue(value[i] || column[i]);
    };

    let year: number;
    let month;
    let day;
    if (type === 'monthday') {
      year = (date || props.minDate!).getFullYear();
      month = getValue('month');
      day = getValue('day');
    } else {
      year = getValue('year');
      month = getValue('month');
      day = type === 'yearmonth' ? 1 : getValue('day');
    }

    const lastDay = lastDayOfMonth(year, month);
    day = day > lastDay ? lastDay : day;

    let hour = 0;
    let minute = 0;
    if (type === 'datehour') {
      hour = getValue('hour');
    }
    if (type === 'datetime') {
      hour = getValue('hour');
      minute = getValue('minute');
    }
    // day is possibly `undefined` used by getValue('day')
    const newDate = new Date(year, month - 1, day, hour, minute);
    setDate(newDate);
    props.onChange?.(newDate);
  };

  const onConfirm = () => {
    props.onConfirm?.(date!);
  };

  const onCancel = () => {
    props.onCancel?.();
  };
  return (
    <Picker
      {...rest}
      ref={picker}
      columns={columns}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onChange={onChange}
      defaultIndex={index}
    />
  );
};

DatePicker.displayName = '@ligero/date-picker';

DatePicker.defaultProps = {
  minDate: new Date(currentYear - 10, 0, 1, 0, 0),
  maxDate: new Date(currentYear + 10, 11, 31, 0, 0),
};

export default DatePicker;

function getTrueValue(value: string) {
  if (!value) return 0;
  while (Number.isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value, 10);
}
