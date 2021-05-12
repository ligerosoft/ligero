import React from 'react';
import usePrefix from '../hooks/use-prefix';
import { BORDER_TOP_BOTTOM } from '../constant';
import cs from 'classnames';

export interface CellGroupProps {
  prefixCls?: string;
  className?: string;
  title?: React.ReactNode;
  border?: boolean;
}

const CellGroup: React.FC<CellGroupProps> = (props) => {
  const { prefixCls, children, title, className, border = true } = props;
  const { bem } = usePrefix('cell-group', prefixCls);
  return (
    <>
      {title && <div className={bem('title')}>{title}</div>}
      <div className={cs(className, bem(), { [BORDER_TOP_BOTTOM]: border })}>{children}</div>
    </>
  );
};

CellGroup.displayName = 'CellGroup';

export default CellGroup;
