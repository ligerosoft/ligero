import cs from 'classnames';
import React, { useContext } from 'react';
import usePrefix from '../hooks/use-prefix';
import RowContext from '../row/RowContext';
import { isNumber } from '../utils';

type ColSpanSize = number | string;
type FlexType = number | string | 'auto' | 'none';

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanSize;
  offset?: ColSpanSize;
  flex?: FlexType;
  prefixCls?: string;
  className?: string;
  index?: number;
}

function parseFlex(flex: FlexType) {
  if (isNumber(flex)) {
    return `${flex} ${flex} auto`;
  }
  if (/^\d+px|em|rem|pt|%$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { className, children, style, flex, span = 0, index, offset, ...rest } = props;

  const { bem } = usePrefix('col', props.prefixCls);
  const { gutter = [0, 0], rowPadding } = useContext(RowContext);

  const [, y] = gutter as [number, number];

  const horizontal = () => {
    if (isNumber(index)) {
      if (rowPadding?.length) {
        const { left, right } = rowPadding[index];
        return { paddingLeft: left, paddingRight: right };
      }
    }
    return {};
  };
  const vertical = y > 0 ? { paddingTop: y / 2, paddingBottom: y / 2 } : {};

  const RowStyle = {
    ...horizontal(),
    ...vertical,
  };

  let flexStyle = {};
  if (flex) {
    flexStyle = { flex: parseFlex(flex) };
  }
  return (
    <div
      {...rest}
      ref={ref}
      style={{ ...RowStyle, ...flexStyle, ...style }}
      className={cs(className, bem({ [span]: span, [`offset-${offset}`]: offset }))}
    >
      {children}
    </div>
  );
});

Col.displayName = 'Col';

export default Col;
