import { useEffect, useRef } from 'react';

export default function useLazyRender(show?: boolean) {
  const mounted = useRef(false);

  useEffect(() => {
    if (show) {
      mounted.current = true;
    }
    return () => {
      mounted.current = false;
    };
  }, [show]);

  return (render: (...options: any[]) => JSX.Element) => (...args: any[]) =>
    mounted.current ? render(...args) : null;
}
