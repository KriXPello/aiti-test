import { ButtonGroup, Flex, IconButton, Pagination, Text, type FlexProps } from '@chakra-ui/react';

export type DataTablePaginationProps = Omit<FlexProps, 'children'> & {
  /** Текущая страница (1-based) */
  page: number;
  /** Размер страницы */
  pageSize: number;
  /** Всего элементов */
  total: number;
  /** Коллбек смены страницы (1-based) */
  onPageChange: (page: number) => void;

  /** Кол-во “соседних” страниц по бокам */
  siblingCount?: number;
};

export function DataTablePagination(props: DataTablePaginationProps) {
  const {
    page,
    pageSize,
    total,
    onPageChange,
    siblingCount = 1,
    ...rest
  } = props;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const from = total === 0
    ? 0
    : (safePage - 1) * pageSize + 1;
  const to = total === 0
    ? 0
    : Math.min(safePage * pageSize, total);

  const shownInfo = `Показано ${from}-${to} из ${total}`;

  return (
    <Flex justifyContent="space-between" alignItems="center" {...rest}>
      <Text color="fg.muted">
        {shownInfo}
      </Text>

      <Pagination.Root
        count={total}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => onPageChange(e.page)}
        siblingCount={siblingCount}
      >
        <ButtonGroup variant="outline" size="sm">
          <Pagination.PrevTrigger />
          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: 'outline', _selected: 'solid' }}>
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger />
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
}
