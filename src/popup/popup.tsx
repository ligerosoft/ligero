import cs from 'classnames';
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useLock from '../hooks/use-lock';
import usePrefix from '../hooks/use-prefix';
import Portal, { PortalProps } from '../portal';

export interface PopupProps extends PortalProps {
  mask?: boolean;
  maskClosable?: boolean;
  prefixCls?: string;
  maskClassName?: string;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  duration?: number;
  destroyOnClose?: boolean;
  onMaskClick?: () => void;
  afterClose?: () => void;
  visible?: boolean;
  shouldLock?: boolean;
  forceRender?: boolean;
  className?: string;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = (props) => {
  const {
    getContainer,
    maskClassName,
    mask = true,
    position = 'center',
    maskClosable = true,
    duration = 300,
    destroyOnClose = false,
    afterClose,
    children,
    shouldLock = true,
    className,
  } = props;
  const { bem, prefixCls } = usePrefix('popup', props.prefixCls);
  const [visible, setVisible] = useState(false);
  const [mount, setMount] = useState(false);
  const maskClasses = cs(maskClassName, bem('mask', { visible: mask && visible }));
  const rootClasses = cs(className, bem({ [position]: position, hidden: !visible && !mount }));
  const contentClasses = cs(bem('content', { [position]: position }));

  useLock(Boolean(props.visible && shouldLock));

  const open = () => {
    if (!visible) {
      setVisible(true);
    }
  };
  const close = () => {
    if (visible) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (props.visible) {
      open();
    } else {
      close();
    }
  }, [props.visible]);

  const onMaskClick = () => {
    props.onMaskClick?.();
    if (maskClosable) {
      close();
    }
  };

  const animations = {
    top: `${prefixCls}-slide-down`,
    right: `${prefixCls}-slide-left`,
    bottom: `${prefixCls}-slide-up`,
    left: `${prefixCls}-slide-right`,
    center: `${prefixCls}-fade`,
  };
  const contentAnimation = animations[position];

  const handleExit = () => {
    setMount(false);
    props.onClose?.();
  };

  const handleEnter = () => {
    setMount(true);
  };

  const onTransitionEnd = () => {
    if (!visible) {
      afterClose?.();
    }
  };
  const node = (
    <div className={rootClasses}>
      <CSSTransition classNames={`${prefixCls}-fade`} timeout={duration} in={visible} appear>
        <div className={maskClasses} onClick={onMaskClick} />
      </CSSTransition>
      <CSSTransition
        unmountOnExit={destroyOnClose}
        appear
        timeout={duration}
        in={visible}
        classNames={contentAnimation}
        onExited={handleExit}
        onEnter={handleEnter}
        addEndListener={onTransitionEnd}
      >
        <div className={contentClasses}>{children}</div>
      </CSSTransition>
    </div>
  );

  if (getContainer === false) {
    return node;
  }

  return <Portal getContainer={getContainer}>{node}</Portal>;
};

Popup.displayName = 'InternalPopup';

export default Popup;
