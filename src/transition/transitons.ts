import { isString } from '@/utils';
import React from 'react';
import { TransitionStatus } from 'react-transition-group';

export interface TransitionStyles {
  common?: React.CSSProperties;
  in: React.CSSProperties;
  out: React.CSSProperties;
  transitionProperty: React.CSSProperties['transitionProperty'];
}

export type TransitionName = 'fade' | 'slide-down' | 'slide-up' | 'slide-right' | 'slide-left';

export type LigeroTransition = TransitionName | TransitionStyles;

export const transitions: Record<TransitionName, TransitionStyles> = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: 'opacity',
  },

  'slide-down': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(-100%)' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  },

  'slide-up': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(100%)' },
    common: { transformOrigin: 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'slide-left': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(100%)' },
    common: { transformOrigin: 'left' },
    transitionProperty: 'transform, opacity',
  },

  'slide-right': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-100%)' },
    common: { transformOrigin: 'right' },
    transitionProperty: 'transform, opacity',
  },
};

const transitionStatuses = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  unmounted: 'out',
} as const;

export function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: LigeroTransition;
  state: TransitionStatus;
  duration: number;
  timingFunction: React.CSSProperties['transitionTimingFunction'];
}) {
  const style = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  };

  if (isString(transition)) {
    if (!(transition in transitions)) {
      return undefined;
    }

    return {
      transitionProperty: transitions[transition].transitionProperty,
      ...style,
      ...transitions[transition].common,
      ...transitions[transition][transitionStatuses[state]],
    };
  }
  return {
    transitionProperty: transition.transitionProperty,
    ...style,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  };
}
