import Transition from '../transition';
import cs from 'classnames';
import React, { useEffect, useState } from 'react';
import useLock from '../hooks/use-lock';
import usePrefix from '../hooks/use-prefix';
import Overlay from '../overlay';
import Portal, { PortalProps } from '../portal';

export interface PopupProps extends PortalProps {
  overlay?: boolean;
  overlayClosable?: boolean;
  prefixCls?: string;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  duration?: number;
  destroyOnClose?: boolean;
  onOverlayClick?: () => void;
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
    overlay = true,
    position = 'center',
    overlayClosable = true,
    duration = 300,
    destroyOnClose = false,
    afterClose,
    children,
    onOverlayClick,
    shouldLock = true,
    className,
  } = props;
  const { bem } = usePrefix('popup', props.prefixCls);
  const [visible, setVisible] = useState(false);

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
    onOverlayClick?.();
    if (overlayClosable) {
      close();
    }
  };

  const animations = {
    top: `slide-down`,
    right: `slide-left`,
    bottom: `slide-up`,
    left: `slide-right`,
    center: `fade`,
  } as const;

  const onExited = () => {
    afterClose?.();
  };
  const node = (
    <>
      {overlay && <Overlay duration={duration} visible={visible} onClick={onMaskClick} />}
      <Transition
        destroyOnClose={destroyOnClose}
        duration={duration}
        visible={visible}
        transition={animations[position]}
        onExited={onExited}
      >
        {(style) => {
          return (
            <div className={cs(className, bem([position]))} style={{ ...style }}>
              {children}
            </div>
          );
        }}
      </Transition>
    </>
  );

  if (getContainer === false) {
    return node;
  }

  return <Portal getContainer={getContainer}>{node}</Portal>;
};

export default Popup;
