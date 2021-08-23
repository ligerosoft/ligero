import { useCallback, useState } from 'react';
import { isFunction, isObject } from '../utils';

export default function useSetState<T extends Record<string, unknown>>(
  defaultValue: T = {} as T,
): [T, (value: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
  if (!isObject(defaultValue)) {
    throw new Error(`useSetState only accept object as params, the params is: ${defaultValue}`);
  }
  const [state, setState] = useState(defaultValue);
  const onChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      ...(isFunction(value) ? value(prevState) : value),
    }));
  }, []);
  return [state, onChange];
}
