import React from 'react';
import cs from 'classnames';
import usePrefix from '../hooks/use-prefix';
import Transition, { LigeroTransition } from '../transition';

export interface OverlayProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  style?: React.CSSProperties;
  duration?: number;
  transition?: LigeroTransition;
}

const Overlay: React.FC<OverlayProps> = (props) => {
  const { className, visible = false, style, duration, transition = 'fade', ...rest } = props;
  const { bem } = usePrefix('overlay', props.prefixCls);

  return (
    <Transition visible={visible} transition={transition} duration={duration}>
      {(styles) => {
        return (
          <div {...rest} style={{ ...styles, ...style }} className={cs(className, bem())}>
            {props.children}
          </div>
        );
      }}
    </Transition>
  );
};

Overlay.displayName = '@ligero/overlay';

export default Overlay;
