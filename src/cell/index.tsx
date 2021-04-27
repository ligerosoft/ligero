import InternalCell from './cell';
import CellGroup from './group';

type CellState = typeof InternalCell;
interface CellProps extends CellState {
  Group: typeof CellGroup;
}
const Cell = InternalCell as CellProps;
Cell.Group = CellGroup;
export default Cell;
