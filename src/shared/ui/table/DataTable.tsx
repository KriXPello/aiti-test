import {
  Box,
  Center,
  Group,
  Spinner,
  Table,
  Text,
  type BoxProps,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef as TanstackColumnDef,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import {
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { SortOption } from '~/shared/model/sort';
import { DataTableRow } from './DataTableRow';
import { type DataTableSelection, dataTableSelectColumn } from './data-table-selection';

export type DataTableSort = SortOption;

export type DataTableHeaderRenderContext = {
  sort: DataTableSort | null;
};
export type DataTableHeaderRender = (ctx: DataTableHeaderRenderContext) => ReactNode;

export type DataTableCellRender<TData> = (row: TData) => ReactNode;

export type DataTableColumn<TData> = {
  id: string;
  header: ReactNode | DataTableHeaderRender;
  cell: DataTableCellRender<TData>;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
};

export type DataTableProps<TData> = Omit<BoxProps, 'children'> & {
  data: TData[];
  columns: Array<DataTableColumn<TData>>;

  sort?: DataTableSort | null;
  onSortChange?: (next: DataTableSort | null) => void;

  isLoading?: boolean;
  emptyState?: ReactNode;
  tableProps?: Table.RootProps;

  /** Опционально: включить выбор строк */
  selection?: DataTableSelection<TData>;
};

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    data,
    columns,
    sort = null,
    onSortChange,
    isLoading = false,
    emptyState = <Text color="fg.muted">Нет данных</Text>,
    tableProps,
    selection,
    ...boxProps
  } = props;

  const selectionEnabled = selection != undefined;

  const sorting: SortingState = useMemo(() => {
    if (!sort) return [];
    return [{ id: sort.column, desc: sort.order === 'desc' }];
  }, [sort]);

  const baseTanstackColumns = useMemo(() => {
    const toDef = (col: DataTableColumn<TData>): TanstackColumnDef<TData, unknown> => ({
      id: col.id,
      header: () =>
        typeof col.header === 'function' ? col.header({ sort }) : col.header,
      cell: (ctx) => col.cell(ctx.row.original),
      enableSorting: Boolean(col.sortable),
      meta: {
        align: col.align,
        width: col.width,
        sortable: col.sortable,
      },
    });

    return columns.map(toDef);
  }, [columns, sort]);

  const finalColumns = useMemo(() => {
    const list = [...baseTanstackColumns];
    if (selectionEnabled) {
      list.unshift(dataTableSelectColumn as TanstackColumnDef<TData>);
    };
    return list;
  }, [selectionEnabled, baseTanstackColumns]);

  const selectedRowIds = selection?.selectedIds;

  const rowSelectionState = useMemo(() => {
    if (!selectedRowIds) return {};
    const obj: Record<string, boolean> = {};
    for (const id of selectedRowIds) obj[id] = true;
    return obj;
  }, [selectedRowIds]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting,
      rowSelection: rowSelectionState,
    },
    enableRowSelection: !!selection,
    getRowId: selection?.getRowId,
    onRowSelectionChange: (updater) => {
      const nextState = typeof updater === 'function'
        ? updater(rowSelectionState)
        : updater;
      const next = new Set<string>();
      for (const [id, isSelected] of Object.entries(nextState as Record<string, boolean>)) {
        if (isSelected) next.add(id);
      }
      selection?.onSelectedChange?.(next);
    },
  });

  const toggleSort = useCallback(
    (columnId: string, enableSorting?: boolean) => {
      if (!enableSorting || !onSortChange) return;

      if (!sort || sort.column !== columnId) {
        onSortChange({ column: columnId, order: 'asc' });
        return;
      }

      if (sort.order === 'asc') {
        onSortChange({ column: columnId, order: 'desc' });
        return;
      }

      onSortChange(null);
    },
    [onSortChange, sort],
  );

  const renderSortIcon = (columnId: string) => {
    if (!onSortChange) return null;
    if (!sort || sort.column !== columnId) return <ChevronsUpDown size={16} />;
    return sort.order === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />;
  };

  return (
    <Box overflow="hidden" position="relative" {...boxProps}>
      <Table.ScrollArea w="full" h="full">
        <Table.Root stickyHeader {...tableProps}>
          <Table.Header>
            {table.getHeaderGroups().map((hg) => (
              <Table.Row key={hg.id}>
                {hg.headers.map((h) => {
                  const columnId = h.column.id;
                  const { sortable = false, width } = h.column.columnDef.meta ?? {};
                  return (
                    <Table.ColumnHeader
                      key={h.id}
                      onClick={() => toggleSort(columnId, sortable)}
                      cursor={sortable ? 'pointer' : 'default'}
                      userSelect="none"
                      w={width}
                    >
                      <Group gap="2" alignItems="center">
                        <Box as="span">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                        </Box>
                        {sortable && <Box as="span" aria-hidden="true">{renderSortIcon(columnId)}</Box>}
                      </Group>
                    </Table.ColumnHeader>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel().rows.length === 0
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={columns.length}>
                      <Center py="8">{emptyState}</Center>
                    </Table.Cell>
                  </Table.Row>
                )
              : (
                  table.getRowModel().rows.map((row) => (
                    <DataTableRow
                      key={row.id}
                      row={row}
                    />
                  ))
                )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      {isLoading && (
        <Center
          position="absolute"
          inset="0"
          bg="bg/70"
          backdropFilter="blur(2px)"
          aria-label="Загрузка"
        >
          <Spinner />
        </Center>
      )}
    </Box>
  );
}
