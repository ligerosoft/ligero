import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { globalConfig } from '../config-provider/context';
import type { NotificationCallback, NotificationProps } from '../notification';
import Notification from '../notification';
import { isString } from '../utils';

let toastInstance: null | NotificationCallback;

let defaultConfig: ToastProps = {
  duration: 2,
  type: 'text',
  transition: 'fade',
} as ToastProps;

type ToastType = 'text' | 'loading' | 'success' | 'fail';

export interface ToastProps extends NotificationProps {
  type?: ToastType;
  icon?: React.ReactNode;
  getContainer?: () => HTMLElement;
}
function parseOptions(options: string | ToastProps) {
  if (isString(options)) {
    return {
      message: options,
    };
  }
  return options;
}
const typeToIcon = {
  success: CheckCircleOutlined,
  fail: CloseCircleOutlined,
  loading: LoadingOutlined,
  text: null,
};

function toast(props: string | ToastProps = {}) {
  const parsedOptions = parseOptions(props);
  const config = { ...defaultConfig, ...parsedOptions };
  const IconComponent = typeToIcon[config.type || 'text'];
  const { getPrefixCls } = globalConfig();
  const prefixCls = getPrefixCls('toast', isString(props) ? '' : props.prefixCls);
  Notification.newInstance(config, (instance) => {
    if (toastInstance) {
      toastInstance.destroy();
      toastInstance = null;
    }
    toastInstance = instance;
    toastInstance.notice({
      ...config,
      prefixCls,
      message: (
        <div className={`${prefixCls}--${config.type}`}>
          {config.icon || (IconComponent && <IconComponent className={`${prefixCls}__icon`} />)}
          <span className={`${prefixCls}__text`}>{config.message}</span>
        </div>
      ),
      onClose() {
        parsedOptions.onClose?.();
        instance.destroy();
        toastInstance = null;
      },
    });
  });
}
toast.config = (config: ToastProps) => {
  defaultConfig = {
    ...defaultConfig,
    ...config,
  };
};

toast.destroy = (key?: string) => {
  if (toastInstance) {
    if (key) {
      const { removeNotice } = toastInstance;
      removeNotice(key);
    } else {
      toastInstance.destroy();
      toastInstance = null;
    }
  }
};
const createToast = (type: ToastType) => (options: string | ToastProps) =>
  toast({
    type,
    ...parseOptions(options),
  });
toast.loading = createToast('loading');
toast.success = createToast('success');
toast.fail = createToast('fail');

export default toast;
