import React, { useEffect, useRef, useState } from 'react';
import Picker, { PickerActionRef } from '../picker';
import { clamp, padZero, range } from '../utils';

export type PickerTimeColumnType = 'hour' | 'minute';

export interface TimePickerProps {
  minHour?: number;
  maxHour?: number;
  minMinute?: number;
  maxMinute?: number;
  value?: string;
  filter?: (type: PickerTimeColumnType, values: string[]) => string[];
  formatter?: (type: PickerTimeColumnType, value: string) => string;
  onChange?: (val: string) => void;
  onCancel?: () => void;
  onConfirm?: (val: string) => void;
  okText?: React.ReactNode;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    minHour = 0,
    maxHour = 23,
    maxMinute = 59,
    minMinute = 0,
    value,
    formatter = (type, val) => val,
    ...rest
  } = props;

  const picker = useRef<null | PickerActionRef>(null);
  const formatValue = (val?: string) => {
    if (!val) return `${padZero(minHour)}:${padZero(minMinute)}`;
    let [hour, minute] = val.split(':');
    hour = padZero(clamp(+hour, +minHour, +maxHour));
    minute = padZero(clamp(+minute, +minMinute, +maxMinute));
    return `${hour}:${minute}`;
  };
  const [index, setIndex] = useState<number[]>([]);
  const [time, setTime] = useState(formatValue(value));
  useEffect(() => {
    if (picker.current) {
      const indexes = picker.current.getIndexByValue(updateColumns()) as number[];
      setIndex(indexes);
    }
  }, [time]);
  const ranges: { type: PickerTimeColumnType; values: number[] }[] = [
    {
      type: 'hour',
      values: [minHour, maxHour],
    },
    {
      type: 'minute',
      values: [minMinute, maxMinute],
    },
  ];
  const originColumns = ranges.map(({ type, values }) => {
    const [start, end] = values;
    let getRange = range<string>(start, end, (index) => padZero(start + index), true);
    if (props.filter) {
      getRange = props.filter(type, getRange);
    }

    return {
      type,
      values: getRange,
    };
  });

  const columns = originColumns.map(({ type, values }) => values.map((i) => formatter(type, i)));

  function updateColumns(): string[] {
    const [hour, minute] = time.split(':');
    return originColumns.map((item) => {
      switch (item.type) {
        case 'hour':
          return formatter('hour', hour);
        case 'minute':
          return formatter('minute', minute);
        default:
          return '';
      }
    });
  }

  const onChange = (value: any, index: any) => {
    const [hourIndex, minuteIndex] = index;
    const [{ values: hourColumn }, { values: minuteColumn }] = originColumns;
    const hour = hourColumn[hourIndex] || hourColumn[0];
    const minute = minuteColumn[minuteIndex] || minuteColumn[0];
    const val = `${hour}:${minute}`;
    setTime(val);
    props.onChange?.(val);
  };

  const onCancel = () => {
    props.onCancel?.();
  };

  const onConfirm = () => {
    props.onConfirm?.(time);
  };

  return (
    <Picker
      {...rest}
      onCancel={onCancel}
      onConfirm={onConfirm}
      ref={picker}
      columns={columns}
      onChange={onChange}
      defaultIndex={index}
    />
  );
};

TimePicker.displayName = '@ligero/time-picker';

export default TimePicker;
