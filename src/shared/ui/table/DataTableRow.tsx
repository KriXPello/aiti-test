import { Table } from '@chakra-ui/react';
import { flexRender, type Cell, type Row } from '@tanstack/react-table';
import { memo } from 'react';
import { dataTableSelectColumn } from './data-table-selection';

function DataTableCell<TData>(props: {
  cell: Cell<TData, unknown>;
}) {
  const { cell } = props;
  const { align = 'start', width } = cell.column.columnDef.meta ?? {};

  return (
    <Table.Cell
      key={cell.id}
      textAlign={align}
      w={width}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Table.Cell>
  );
}

const MemoizedDataTableCell = memo(
  DataTableCell,
  (prev, next) => (
    prev.cell.id === next.cell.id
    // ячейка выбора всегда обновляется
    && next.cell.column.id != dataTableSelectColumn.id
  ),
) as typeof DataTableCell;

export function DataTableRow<TData>(props: {
  row: Row<TData>;
}) {
  const { row } = props;
  return (
    <Table.Row key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <MemoizedDataTableCell
          key={cell.id}
          cell={cell}
        />
      ))}
    </Table.Row>
  );
}
