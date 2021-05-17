import { useEffect, useRef, useState } from 'react';
import type { PopupProps } from './popup';
import InternalPopup from './popup';

const Popup = (props: PopupProps) => {
  const { visible, afterClose, forceRender } = props;
  const [animatedVisible, setAnimatedVisible] = useState(false);

  const mounted = useRef(false);
  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);

  if (!forceRender && !animatedVisible && !mounted.current) return null;
  if (!mounted.current) {
    mounted.current = true;
  }

  return (
    <InternalPopup
      {...props}
      afterClose={() => {
        afterClose?.();
        setAnimatedVisible(false);
      }}
    />
  );
};

Popup.displayName = '@ligero/popup';

export type { PopupProps };

export default Popup;
