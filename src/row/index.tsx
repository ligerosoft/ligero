import cs from 'classnames';
import React, { useMemo } from 'react';
import usePrefix from '../hooks/use-prefix';
import toArray, { tuple } from '../utils/function';
import RowContext from './RowContext';

const RowAlign = tuple('top', 'center', 'bottom');
const RowJustify = tuple('start', 'center', 'end', 'space-around', 'space-between');

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  gutter?: number | [number, number];
  align?: typeof RowAlign[number];
  justify?: typeof RowJustify[number];
  wrap?: boolean;
}
export type RowSpaces = { left?: number; right: number }[];
const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { children, className, gutter = 0, align, justify, wrap = true, ...rest } = props;

  const { bem } = usePrefix('row', props.prefixCls);

  const gutterGroup = useMemo(
    (): [number, number] => (Array.isArray(gutter) ? gutter : [gutter, 0]),
    [gutter],
  );

  const childrenNodes = toArray(children);
  const childSpans = (): number[] => {
    if (!childrenNodes.length) return [];
    const result: number[] = [];
    childrenNodes.forEach((child) => {
      result.push(child.props.span || 0);
    });
    return result;
  };
  const spans = childSpans();

  const groups = useMemo(() => {
    const group: number[][] = [[]];
    let totalSpan = 0;
    spans.forEach((span, index) => {
      totalSpan += span;
      if (totalSpan > 24) {
        group.push([index]);
        totalSpan -= 24;
      } else {
        group[group.length - 1].push(index);
      }
    });
    return group;
  }, [spans]);

  const rowPadding = useMemo(() => {
    const spaces: RowSpaces = [];
    const [x] = gutterGroup;
    if (!x) {
      return spaces;
    }
    groups.forEach((group) => {
      const average = x / 2;
      group.forEach((item, index) => {
        if (index === 0) {
          spaces.push({ right: average });
        } else {
          const left = x - spaces[index - 1].right;
          const right = average - left;
          spaces.push({ left, right });
        }
      });
    });
    return spaces;
  }, [groups, gutterGroup]);
  return (
    <RowContext.Provider value={{ gutter: gutterGroup, rowPadding }}>
      <div
        {...rest}
        ref={ref}
        className={cs(
          className,
          bem({
            [`align-${align}`]: align,
            [`justify-${justify}`]: justify,
            wrap,
          }),
        )}
      >
        {childrenNodes.map((child, index) => {
          return React.cloneElement(child, {
            ...child.props,
            index,
            key: index.toString(),
          });
        })}
      </div>
    </RowContext.Provider>
  );
});

Row.displayName = '@ligero/row';

export default Row;
