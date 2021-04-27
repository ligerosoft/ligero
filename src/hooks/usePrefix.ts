import { useContext } from 'react';
import { ConfigContext } from '../config-provider/context';
import { createBem } from '../utils';

export default function usePrefix(cls: string, customizedPrefixCls?: string) {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls(cls, customizedPrefixCls);
  const bem = createBem(prefixCls);
  return {
    prefixCls,
    bem,
  };
}
