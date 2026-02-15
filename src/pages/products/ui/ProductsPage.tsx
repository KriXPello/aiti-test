import { Button, Center, Heading, HStack, IconButton, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import { CirclePlusIcon, RefreshCwIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedFn } from '~/shared/lib/debounce';
import { useSearchQuery } from '~/shared/lib/search';
import { DataTable, DataTablePagination, useDataTableSelection } from '~/shared/ui/table';
import type { ApiProduct } from '../api/fetch-products';
import { useCreateProduct } from '../model/create-product';
import { useProductsList } from '../model/use-products-list';
import { CreateProductDialog } from './CreateProductDialog';
import { useProductsColumns } from './use-product-columns';
import { clearAuthToken } from '~/shared/auth';

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

  const onLogout = () => {
    clearAuthToken();
    location.reload();
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
      <HStack justify="end" flex="1">
        <Button variant="outline" onClick={onLogout}>Выйти</Button>
      </HStack>
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

  const { data, isFetching, error, refresh } = useProductsList({ page, pageSize, searchText, sort });

  const columns = useProductsColumns({
    onClickAdd: () => alert('В реальном приложении что-нибудь бы произошло'),
    onClickMore: () => alert('В реальном приложении что-нибудь бы произошло 2'),
  });
  const selection = useDataTableSelection<ApiProduct>((x) => String(x.id));

  const createProduct = useCreateProduct();

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
            <Button gap="15px" onClick={createProduct.openDialog}>
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

      {createProduct.dialog.open && (
        <CreateProductDialog
          dialog={createProduct.dialog}
          onSubmit={createProduct.onSubmit}
        />
      )}
    </Stack>
  );
}
