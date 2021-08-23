import { createContext } from 'react';

const prefixCls = 'ligero';

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizedPrefixCls?: string) => {
    if (customizedPrefixCls) return customizedPrefixCls;
    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
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
