import { createContext } from 'react';
import { RowSpaces } from '.';

export interface RowContextProps {
  gutter?: number | [number, number];
  rowPadding?: RowSpaces;
}
const RowContext = createContext<RowContextProps>({});

export default RowContext;
