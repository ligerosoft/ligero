import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  getContainer?: false | HTMLElement | (() => HTMLElement);
  children?: React.ReactNode;
}

const getParent = (getContainer: PortalProps['getContainer']) => {
  if (typeof getContainer === 'function') {
    return getContainer();
  }
  return getContainer;
};

const Portal: React.FC<PortalProps> = (props) => {
  const { children, getContainer } = props;
  const wrapper = useRef<HTMLElement | null>(null);
  const parent = getParent(getContainer);

  useEffect(
    () => () => {
      if (wrapper.current) {
        wrapper.current.parentNode?.removeChild(wrapper.current);
      }
    },
    [],
  );

  if (!wrapper.current && !parent) {
    const node = document.createElement('div');
    wrapper.current = node;
    document.body.appendChild(node);
  }

  return ReactDOM.createPortal(children, parent || wrapper.current!);
};

Portal.displayName = '@ligero/portal';

export default Portal;
