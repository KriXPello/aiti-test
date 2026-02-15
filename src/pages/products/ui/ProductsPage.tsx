import { useSearchQuery } from '~/shared/lib/search';
import { useProductsList } from '../model/use-products-list';
import { useProductsColumns } from './use-product-columns';
import { Box, Button, Center, Heading, HStack, IconButton, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import { SearchIcon, RefreshCwIcon, CirclePlusIcon } from 'lucide-react';
import { DataTable, DataTablePagination, useDataTableSelection } from '~/shared/ui/table';
import type { ApiProduct } from '../api/fetch-products';
import { useEffect, useState } from 'react';
import { useDebouncedFn } from '~/shared/lib/debounce';

function PageHeader(props: {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}) {
  const { searchText, onSearchTextChange } = props;

  const [local, setLocal] = useState(searchText);

  useEffect(() => {
    setLocal(searchText);
  }, [searchText]);

  const onSearchTextChangeDebounced = useDebouncedFn(onSearchTextChange, 500);

  const onChangeSearch = (value: string) => {
    setLocal(value);
    onSearchTextChangeDebounced(value);
  };

  return (
    <HStack py="26px" px="30px" bg="#FFF">
      <Heading flex="1" fontSize="24px">Товары</Heading>
      <InputGroup flex="2" startElement={<SearchIcon />}>
        <Input
          size="xl"
          variant="subtle"
          placeholder="Найти"
          value={local}
          onChange={(e) => onChangeSearch(e.currentTarget.value)}
        />
      </InputGroup>
      <Box flex="1" />
    </HStack>
  );
}

export function ProductsPage() {
  const {
    page,
    pageSize,
    searchText,
    sort,
    setPage,
    setSearchText,
    setSort,
  } = useSearchQuery();
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(20);
  // const [searchText, setSearchText] = useState('');
  // const [sort, setSort] = useState<any>(null);

  const { data, isFetching, error, refresh } = useProductsList({ page, pageSize, searchText, sort });

  useEffect(() => {
    console.log('page');
  }, []);

  const columns = useProductsColumns({
    onClickAdd: () => alert('В реальном приложении что-нибудь бы произошло'),
    onClickMore: () => alert('В реальном приложении что-нибудь бы произошло 2'),
  });
  const selection = useDataTableSelection<ApiProduct>((x) => String(x.id));

  const onCreateClick = () => {
    // TODO:
  };

  return (
    <Stack h="full" overflow="hidden" bg="#F6F6F6" pt="20px" gap="30px">
      <PageHeader
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <Stack flex="1" minH="0" overflow="hidden" p="30px" bg="#FFF" gap="40px">
        <HStack justify="space-between" align="center">
          <Heading fontSize="20px">Все позиции</Heading>
          <HStack gap="8px">
            <IconButton variant="outline" onClick={refresh}>
              <RefreshCwIcon />
            </IconButton>
            <Button gap="15px" onClick={onCreateClick}>
              <CirclePlusIcon />
              <Text>Добавить</Text>
            </Button>
          </HStack>
        </HStack>

        {error && (
          <Center flex="1">
            Произошла ошибка при загрузке
          </Center>
        )}

        <DataTable
          flex="1"
          columns={columns}
          data={data?.products ?? []}
          isLoading={isFetching}
          sort={sort}
          onSortChange={setSort}
          selection={selection}
        />

        {data && (
          <DataTablePagination
            page={page}
            onPageChange={setPage}
            pageSize={pageSize}
            total={data.total ?? 0}
          />
        )}
      </Stack>
    </Stack>
  );
}
