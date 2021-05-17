import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import React from 'react';
import usePrefix from '../hooks/use-prefix';
import { tuple } from '../utils/function';

const ButtonTypes = tuple('default', 'primary', 'success', 'warning', 'dashed', 'danger');
export type ButtonType = typeof ButtonTypes[number];

const ButtonShapes = tuple('square', 'round');
export type ButtonShape = typeof ButtonShapes[number];

const ButtonSizes = tuple('xs', 'sm', 'md', 'lg');
export type ButtonSize = typeof ButtonSizes[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];
export interface BaseButtonProps {
  /**
   * 组件额外的CSS className
   */
  className?: string;
  /**
   * 自定义className的前缀
   */
  prefixCls?: string;
  /**
   * button的类型，可选primary、default、success、warning、danger
   * @default primary
   * @type string
   */
  type?: ButtonType;
  /**
   * button的形状，可选square(无圆角)、round(圆形)
   * @type string
   */
  shape?: ButtonShape;
  /**
   * button的大小，可选xs、sm、md、lg
   * @default md
   * @type string
   */
  size?: ButtonSize;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 朴素形式
   * @default false
   */
  plain?: boolean;
  /**
   * 块状显示，占据一行
   * @default false
   */
  block?: boolean;
  /**
   * 设置button的原生type值，可选submit、button、reset
   * @default button
   * @type string
   */
  htmlType?: ButtonHTMLType;
  /**
   * 额外配置button的颜色
   */
  color?: string;
  /**
   * button额外样式
   */
  style?: React.CSSProperties;
  /**
   * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
   */
  href?: string;
  target?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps | AnchorButtonProps>;
const Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    shape,
    size,
    htmlType,
    disabled,
    prefixCls,
    plain,
    color,
    style,
    block,
    className,
    href,
    target,
    children,
    loading,
    icon,
    ...rest
  } = props;
  const { bem } = usePrefix('button', prefixCls);
  const extraStyle: React.CSSProperties = {};
  const buttonRef = (ref as any) || React.createRef();
  const onlyIcon = !children && icon;
  const classes = classnames(
    className,
    bem([type, shape, size, { disabled, plain, block, 'only-icon': onlyIcon }]),
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (disabled || loading) return;
    props.onClick?.(e);
  };

  const iconNode =
    icon && !loading ? (
      <span className={bem('icon')}>{icon}</span>
    ) : (
      loading && (
        <span className={bem('loading')}>
          <LoadingOutlined />
        </span>
      )
    );
  if (href) {
    return (
      <a
        {...rest}
        className={classes}
        target={target}
        onClick={handleClick}
        href={href}
        ref={buttonRef}
      >
        <div className={bem('content')}>
          {iconNode}
          <span className={bem('text')}>{props.children}</span>
        </div>
      </a>
    );
  }
  if (color) {
    extraStyle.background = color;
    extraStyle.borderColor = color;
    extraStyle.color = '#fff';
    if (plain) {
      extraStyle.background = '#fff';
      extraStyle.color = color;
    }
  }
  return (
    <button
      {...rest}
      className={classes}
      disabled={disabled}
      type={htmlType}
      ref={buttonRef}
      onClick={handleClick}
      style={{ ...extraStyle, ...style }}
    >
      <div className={bem('content')}>
        {iconNode}
        {children && <span className={bem('text')}>{children}</span>}
      </div>
    </button>
  );
};

Button.displayName = '@ligero/button';

export default React.forwardRef(Button);
