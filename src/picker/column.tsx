import React, { useMemo, useRef } from 'react';
import { correctIndex } from '.';
import usePrefix from '../hooks/use-prefix';
import useSetState from '../hooks/use-set-state';
import useTouch from '../hooks/use-touch';
import { isNumber, isString } from '../utils';

type PickerColumnOptions = {
  label: string | number;
  value: string | number;
  disabled?: boolean;
};
export type PickerColumnType = string | number | PickerColumnOptions;
export type PickerColumns = PickerColumnType[];

export interface PickerColumnProps {
  prefixCls?: string;
  className?: string;
  onChange?: (changed: PickerColumnType, index: number) => void;
  columns: PickerColumns;
  itemHeight?: number;
  visibleCount?: number;
  readonly?: boolean;
  defaultIndex?: number;
}

const formatColumns = (columns: PickerColumnType[]): PickerColumnOptions[] => {
  return columns.map((column) => {
    if (isString(column) || isNumber(column)) {
      return {
        label: column,
        value: column,
      };
    }
    return column;
  });
};
const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 5;
const MOMENTUM_TIME = 300;
const MOMENTUM_DISTANCE = 15;
const DURATION = 300;
const SWIPE_DURATION = 1000;

const PickerColumn: React.FC<PickerColumnProps> = (props) => {
  const {
    className,
    itemHeight = ITEM_HEIGHT,
    visibleCount = VISIBLE_COUNT,
    readonly = false,
    defaultIndex = 0,
  } = props;

  const { bem } = usePrefix('picker-column', props.prefixCls);
  const touch = useTouch();
  const columns = useMemo(() => formatColumns(props.columns || []), [props.columns]);

  const count = columns.length;

  function correctOffset(index: number) {
    index = correctIndex(index, count);
    return -index * itemHeight;
  }

  const [state, setState] = useSetState({
    index: correctIndex(defaultIndex, count),
    offset: correctOffset(defaultIndex),
    duration: 0,
  });

  const moving = useRef<boolean>(false);
  const startOffset = useRef<number>(0);
  const time = useRef<number>(0);

  const momentumRef = useRef(0);
  const containerRef = useRef(null);

  const baseOffset = () => (itemHeight * (visibleCount - 1)) / 2;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (readonly || !count) return;
    touch.start(e);
    if (moving.current) {
      const translateY = getElementTranslateY(containerRef.current!);
      startOffset.current = Math.min(translateY - baseOffset(), 0);
      setState({
        offset: startOffset.current,
      });
    } else {
      startOffset.current = state.offset;
    }
    time.current = Date.now();
    momentumRef.current = startOffset.current;
    setState({
      duration: 0,
    });
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (readonly || !count) return;
    touch.move(e);
    if (touch.isVertical) {
      moving.current = true;
    }
    const offset = getMin(touch.deltaY + startOffset.current, -(count * itemHeight), itemHeight);
    setState({
      offset,
    });
    const now = Date.now();
    if (now - time.current > MOMENTUM_TIME) {
      momentumRef.current = offset;
      time.current = now;
    }
  };

  const onTouchCancel = () => {
    if (readonly || !count) return;
    const distance = state.offset - momentumRef.current;
    const duration = Date.now() - time.current;
    const allowMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;
    startOffset.current = 0;
    touch.reset();
    if (allowMomentum) {
      momentum(distance, duration);
      return;
    }
    const index = getIndexByOffset(state.offset);
    setByIndex(index);
    // fix firefox
    moving.current = false;
  };

  function momentum(distance: number, duration: number) {
    const speed = Math.abs(distance / duration);
    distance = state.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);
    const index = getIndexByOffset(distance);
    setByIndex(index, SWIPE_DURATION);
  }

  function stopMomentum() {
    moving.current = false;
    setState({
      duration: 0,
    });
  }

  function setByValue(value: PickerColumnType, swipeDuration?: number) {
    const index = columns.findIndex((column) => column === value);
    setByIndex(index, swipeDuration);
  }

  const getValueByIndex = (index: number) => {
    return columns.find((column, i) => i === index)!;
  };

  function setByIndex(index: number, swipeDuration?: number) {
    index = getMin(index, 0, count) || 0;
    const offset = -index * itemHeight;
    setState({
      index,
      offset,
      duration: swipeDuration || DURATION,
    });
    if (index !== state.index) {
      props.onChange?.(getValueByIndex(index), index);
    }
  }

  function getIndexByOffset(offset: number) {
    return getMin(Math.round(-offset / itemHeight), 0, count - 1);
  }

  const handleClick = (column: PickerColumnType) => {
    if (!moving.current) {
      setByValue(column, DURATION);
    }
  };

  const renderPicker = () => {
    return columns.map((column) => {
      return (
        <div
          key={column.value}
          className={bem('item')}
          style={{ height: itemHeight }}
          onClick={() => handleClick(column)}
        >
          {column.label}
        </div>
      );
    });
  };
  const getWrapperStyle = () => {
    return {
      transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
      transitionDuration: `${state.duration}ms`,
      transitionProperty: state.duration ? 'all' : 'none',
    } as React.CSSProperties;
  };

  return (
    <div
      className={bem(className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchCancel}
      onTouchCancel={onTouchCancel}
    >
      <div
        className={bem('wrapper')}
        ref={containerRef}
        style={{ ...getWrapperStyle() }}
        onTransitionEnd={stopMomentum}
      >
        {renderPicker()}
      </div>
    </div>
  );
};
PickerColumn.displayName = '@ligero/picker/column';
export default PickerColumn;

function getMin(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getElementTranslateY(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}
