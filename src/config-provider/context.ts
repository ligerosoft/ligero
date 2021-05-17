import { createContext } from 'react';

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizedPrefixCls?: string) => {
    if (customizedPrefixCls) return customizedPrefixCls;
    return suffixCls ? `ligero-${suffixCls}` : 'ligero';
  },
});
export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  theme?: 'light' | 'dark';
}
export const ConfigContext = createContext<ConfigConsumerProps>({
  getPrefixCls: (suffixCls?: string, customizedPrefixCls?: string) => {
    if (customizedPrefixCls) return customizedPrefixCls;
    return suffixCls ? `ligero-${suffixCls}` : 'ligero';
  },
  theme: 'light',
});
