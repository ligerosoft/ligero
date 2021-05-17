import cs from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import usePrefix from '../hooks/use-prefix';
import Transition from '../transition';
import { isFunction } from '../utils';
import Notice, { NoticeProps as INoticeProps } from './notice';

export interface NotificationProps extends INoticeProps {
  prefixCls?: string;
  className?: string;
}
type NoticeProps = NotificationProps & { key?: string };
export type NotificationCallback = {
  notice: (props: NoticeProps) => void;
  removeNotice: (key: string) => void;
  destroy: () => void;
};

export type NotificationInstance = (
  props: NotificationProps & { getContainer?: () => HTMLElement },
  callback: (instance: NotificationCallback) => void,
) => void;
export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<NotificationProps & React.RefAttributes<any>> {
  newInstance: NotificationInstance;
}

let i = 0;
function getUUID() {
  return `notification_${Date.now()}_${i++}`;
}
const Notification = React.forwardRef((props, ref) => {
  const { className } = props;
  const { bem } = usePrefix('notification', props.prefixCls);

  const [notifications, setNotifications] = useState<NoticeProps[]>([]);

  useImperativeHandle(ref, () => ({ add, removeNotice }));

  function add(notice: NoticeProps) {
    const key = notice.key || getUUID();
    notice.key = key;
    const index = notifications.map((item) => item.key).indexOf(key);
    if (index !== -1) {
      notifications.splice(index, 1, notice);
      setNotifications([...notifications]);
    } else {
      setNotifications([...notifications, notice]);
    }
  }
  function removeNotice(key: string) {
    setNotifications(notifications.filter((item) => item.key !== key));
  }

  return (
    <div className={cs(className, bem())}>
      <TransitionGroup>
        {notifications.map((notification) => {
          return (
            <Transition {...notification} visible>
              {(style) => {
                return <Notice {...notification} style={{ ...style, ...notification.style }} />;
              }}
            </Transition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}) as CompoundedComponent;

Notification.newInstance = function createNotificationInstance(args, callback) {
  const { getContainer, ...rest } = args || {};
  const div = document.createElement('div');
  if (isFunction(getContainer)) {
    const root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  let called = false;
  function ref(noticeInstance: any) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice(noticeProps) {
        noticeInstance.add(noticeProps);
      },
      removeNotice(key: string) {
        noticeInstance.remove(key);
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode?.removeChild(div);
      },
    });
  }
  ReactDOM.render(<Notification {...rest} ref={ref} />, div);
};
export default Notification;
