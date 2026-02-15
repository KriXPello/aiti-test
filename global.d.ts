import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string | undefined;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
  }
}
