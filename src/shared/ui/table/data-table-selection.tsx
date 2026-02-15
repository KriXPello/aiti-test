import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@chakra-ui/react';

export type DataTableSelection<TData> = {
  /** Как получить стабильный id строки (обязателен для выбора) */
  getRowId: (row: TData) => string;
  selectedIds: Set<string>;
  onSelectedChange: (next: Set<string>) => void;
};

export function useDataTableSelection<T>(
  getRowId: (row: T) => string,
): DataTableSelection<T> {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selection: DataTableSelection<T> = {
    getRowId,
    onSelectedChange: setSelectedIds,
    selectedIds,
  };

  return selection;
}

export const dataTableSelectColumn: ColumnDef<unknown> = {
  id: '###select-col',
  header: ({ table }) => {
    const state = table.getIsSomeRowsSelected()
      ? 'indeterminate'
      : table.getIsAllRowsSelected();
    return (
      <Checkbox.Root
        checked={state}
        title="Выбрать все строки на странице"
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>
    );
  },
  cell: ({ row }) => (
    <Checkbox.Root
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={row.getToggleSelectedHandler()}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
    </Checkbox.Root>
  ),
};
