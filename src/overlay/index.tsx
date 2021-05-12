import React from 'react';
import cs from 'classnames';
import usePrefix from '../hooks/use-prefix';
import useLazyRender from '../hooks/use-lazy-render';

export interface OverlayProps {
  prefixCls?: string;
  className?: string;
  show?: boolean;
  style?: React.CSSProperties;
}

const Overlay: React.FC<OverlayProps> = (props) => {
  const { className, show, style } = props;
  const { bem } = usePrefix('overlay', props.prefixCls);
  const lazyRender = useLazyRender(show);

  const renderOverlay = lazyRender(() => {
    return (
      <div style={style} className={cs(className, bem())}>
        {props.children}
      </div>
    );
  });

  return renderOverlay();
};

Overlay.displayName = '@ligero/overlay';

export default Overlay;
