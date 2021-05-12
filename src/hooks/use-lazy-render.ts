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
  }, []);

  return (render: () => JSX.Element) => () => (mounted.current ? render() : null);
}
