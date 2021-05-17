import cs from 'classnames';
import React, { useEffect, useRef } from 'react';
import usePrefix from '../hooks/use-prefix';
import { noop } from '../utils';

export interface NoticeProps {
  duration?: number;
  style?: React.CSSProperties;
  message?: React.ReactNode;
  onClose?: () => void;
  prefixCls?: string;
  className?: string;
  closable?: boolean;
  closeIcon?: React.ReactNode;
}

const Notice = (props: NoticeProps) => {
  const {
    duration = 2,
    message,
    style,
    prefixCls,
    className,
    closable,
    closeIcon,
    onClose = noop,
  } = props;
  const timer = useRef<NodeJS.Timeout>();
  const { bem } = usePrefix('notification', prefixCls);

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    if (duration > 0) {
      timer.current = setTimeout(() => {
        onClose();
      }, duration * 1e3);
    }
    return () => {
      clear();
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div style={style} className={cs(className, bem('notice'))}>
        <div className={bem('content')}>{message}</div>
        {closable ? (
          <a onClick={handleClose} className={bem('close')}>
            {closeIcon || <span className={bem('close-icon')} />}
          </a>
        ) : null}
      </div>
    </>
  );
};
export default Notice;
