import cs from 'classnames';
import React from 'react';
import usePrefix from '../hooks/use-prefix';

interface CellProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  label?: React.ReactNode;
  right?: React.ReactNode;
  extra?: React.ReactNode;
  ellipsis?: boolean;
  align?: 'top' | 'center' | 'bottom';
}

const Cell: React.FC<CellProps> = (props) => {
  const { className, extra, right, icon, children, label, ellipsis, align } = props;
  const { bem } = usePrefix('cell', props.prefixCls);
  return (
    <div className={cs(className, bem({ [`${align}`]: align }))} role={'button'}>
      {icon && <div className={bem('icon')}>{icon}</div>}
      <div className={bem('content', { ellipsis })}>
        {children}
        {label && <div className={bem('label')}>{label}</div>}
      </div>
      {right && <div className={bem('right')}>{right}</div>}
      {extra && <div className={bem('extra')}>{extra}</div>}
    </div>
  );
};

Cell.displayName = 'Cell';

export default Cell;
