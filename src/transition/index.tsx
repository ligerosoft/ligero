import React from 'react';
import { Transition as LTransition } from 'react-transition-group';
import { getTransitionStyles, LigeroTransition } from './transitons';

export type { LigeroTransition };
interface TransitionProps {
  children: (styles?: React.CSSProperties) => React.ReactNode;
  visible?: boolean;
  duration?: number;
  transition?: LigeroTransition;
  timingFunction?: string;
  destroyOnClose?: boolean;
  onExited?: () => void;
  onExit?: () => void;
  onEnter?: () => void;
  onEntered?: () => void;
}
const Transition = (props: TransitionProps) => {
  const {
    children,
    visible = false,
    duration = 200,
    transition = 'fade',
    timingFunction = 'ease',
    destroyOnClose = true,
    onEnter,
    onEntered,
    onExited,
    onExit,
  } = props;

  return (
    <LTransition
      onEnter={(node: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        node.offsetHeight;
        onEnter?.();
      }}
      in={visible}
      timeout={duration}
      unmountOnExit={destroyOnClose}
      mountOnEnter
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
    >
      {(transitionState) => {
        return children(
          getTransitionStyles({
            transition,
            state: transitionState,
            duration,
            timingFunction,
          }),
        );
      }}
    </LTransition>
  );
};

Transition.displayName = '@ligero/transition';

export default Transition;
