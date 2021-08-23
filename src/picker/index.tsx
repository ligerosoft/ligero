import cs from 'classnames';
import React, { useRef } from 'react';
import { BORDER_UNSET_TOP_BOTTOM } from '../constant';
import usePrefix from '../hooks/use-prefix';
import PickerColumn, { PickerColumnProps, PickerColumns } from './column';

type PickerColumnOptions = {
  label: string | number;
  value: string | number;
  disabled?: boolean;
};
export type PickerColumnType = string | number | PickerColumnOptions;

export type PickerChangeHandler = (
  value: PickerColumnType | PickerColumns,
  index: number | number[],
) => void;
export interface PickerProps extends Omit<PickerColumnProps, 'columns' | 'defaultIndex'> {
  prefixCls?: string;
  className?: string;
  title?: React.ReactNode;
  toolbar?: boolean;
  onConfirm?: PickerChangeHandler;
  onCancel?: PickerChangeHandler;
  cancelText?: React.ReactNode;
  okText?: React.ReactNode;
  onChange?: PickerChangeHandler;
  columns: PickerColumns | PickerColumns[];
  defaultIndex?: number | number[];
}

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 5;

export function correctIndex(index: number, len: number) {
  if (index > len) return len - 1;
  if (index < 0) return 0;
  return index || 0;
}

const Picker: React.FC<PickerProps> = (props) => {
  const {
    className,
    itemHeight = ITEM_HEIGHT,
    visibleCount = VISIBLE_COUNT,
    cancelText = '取消',
    okText = '确定',
    title,
    toolbar = true,
    columns = [],
    defaultIndex,
    ...rest
  } = props;
  const { bem } = usePrefix('picker', props.prefixCls);

  const isPickerGroup = columns.some((item) => Array.isArray(item));

  const indexRef = useRef(getIndex(defaultIndex));
  const valueRef = useRef(getValue());

  function getIndex(indexes?: number | number[]) {
    if (isPickerGroup) {
      return (columns as PickerColumns[]).map((column, index) => {
        const len = column.length;
        return correctIndex((indexes as number[])?.[index] || 0, len);
      });
    }
    return indexes || 0;
  }

  function getValue() {
    if (isPickerGroup) {
      return (columns as PickerColumns[]).map((column, index) => {
        return column.find((item, i) => {
          let findIndex = (indexRef.current as number[])[index] || 0;
          findIndex = correctIndex(findIndex, column.length);
          return i === findIndex;
        })!;
      });
    }
    return columns[(defaultIndex as number) || 0];
  }

  const wrapperHeight = itemHeight * visibleCount;

  const handleCancel = () => {
    props.onCancel?.(valueRef.current, indexRef.current);
  };

  const handleConfirm = () => {
    props.onConfirm?.(valueRef.current, indexRef.current);
  };

  const renderToolbar = () => (
    <div className={bem('toolbar')}>
      <button type="button" className={bem('cancel')} onClick={handleCancel}>
        {cancelText}
      </button>
      <div className={bem('title')}>{title}</div>
      <button type="button" className={bem('confirm')} onClick={handleConfirm}>
        {okText}
      </button>
    </div>
  );

  const handleChange = (changed: any, index: number) => {
    indexRef.current = index;
    valueRef.current = changed.value;
    props.onChange?.(valueRef.current, indexRef.current);
  };

  const handleColumnsChange = (changed: PickerColumnType, index: number, columnIndex: number) => {
    (indexRef.current as number[])[columnIndex] = index;
    valueRef.current = getValue();
    props.onChange?.(valueRef.current, indexRef.current);
  };

  const renderPicker = () => {
    if (isPickerGroup) {
      return (columns as PickerColumns[]).map((column, index) => {
        return (
          <PickerColumn
            {...rest}
            key={index.toString()}
            defaultIndex={(defaultIndex as number[])?.[index]}
            columns={column}
            onChange={(changed, i) => handleColumnsChange(changed, i, index)}
          />
        );
      });
    }
    return (
      <PickerColumn
        {...rest}
        defaultIndex={defaultIndex as number}
        columns={columns as PickerColumns}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className={cs(className, bem())}>
      {toolbar && renderToolbar()}
      <div className={bem('columns')} style={{ height: wrapperHeight }}>
        {renderPicker()}
        <div
          className={bem('mask')}
          style={{ backgroundSize: `100% ${(wrapperHeight - itemHeight) / 2}px` }}
        />
        <div
          className={cs(BORDER_UNSET_TOP_BOTTOM, bem('hairline'))}
          style={{ height: itemHeight }}
        />
      </div>
    </div>
  );
};

Picker.displayName = '@ligero/picker';

export default Picker;
