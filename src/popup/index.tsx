import React, { useEffect, useRef, useState } from 'react';
import InternalPopup from './popup';
import type { PopupProps } from './popup';

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
export type { PopupProps };

export default Popup;
