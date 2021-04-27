import { ConfigConsumerProps, ConfigContext } from './context';

export interface ConfigProviderProps {
  prefixCls?: string;
  theme?: 'light' | 'dark';
}

const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { prefixCls, children, theme = 'light' } = props;

  const getPrefixCls = (context: ConfigConsumerProps) => {
    return (suffixCls?: string, customizedPrefix?: string) => {
      if (customizedPrefix) return customizedPrefix;
      const composedPrefix = prefixCls || context.getPrefixCls('');
      const darkTheme = theme === 'light' ? '' : '-dark';
      return suffixCls
        ? `${composedPrefix}-${suffixCls}${darkTheme}`
        : `${composedPrefix}${darkTheme}`;
    };
  };

  const renderProvider = (context: ConfigConsumerProps) => {
    const value = {
      ...context,
      getPrefixCls: getPrefixCls(context),
    };
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
  };
  return <ConfigContext.Consumer>{context => renderProvider(context)}</ConfigContext.Consumer>;
};

export default ConfigProvider;
