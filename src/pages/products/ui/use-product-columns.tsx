import type { DataTableColumn } from '~/shared/ui/table';
import type { ApiProduct } from '../api/fetch-products';
import { HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { PlusIcon, CircleEllipsisIcon } from 'lucide-react';

const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPrice = (value: number) => {
  const formatted = priceFormatter.format(value);
  const [integer, other] = formatted.split(',');
  const fraction = other.replace(/[^0-9]/g, '');
  return { integer, fraction };
};

type RowData = ApiProduct;

export function useProductsColumns(options: {
  onClickAdd: (row: RowData) => void;
  onClickMore: (row: RowData) => void;
}): DataTableColumn<RowData>[] {
  return [
    {
      id: 'name',
      header: 'Наименование',
      cell: (row) => (
        <HStack gap="18px">
          <Image w="48px" aspectRatio="1" rounded="md" src={row.thumbnail} alt={row.title} />
          <Stack gap="0">
            <Text fontWeight="bold">{row.title}</Text>
            <Text fontSize="14px" color="gray.300" textTransform="capitalize">
              {row.category}
            </Text>
          </Stack>
        </HStack>
      ),
    },
    {
      id: 'brand',
      header: 'Вендор',
      align: 'center',
      cell: (row) => (
        <Text fontWeight="bold">{row.brand}</Text>
      ),
    },
    {
      id: 'sku',
      header: 'Артикул',
      align: 'center',
      cell: (row) => row.sku,
    },
    {
      id: 'rating',
      header: 'Оценка',
      sortable: true,
      align: 'center',
      cell: (row) => {
        const rating = `${row.rating.toFixed(1)}/5`;
        if (row.rating < 3) {
          return <Text color="red">{rating}</Text>;
        }
        return <Text>{rating}</Text>;
      },
    },
    {
      id: 'price',
      header: 'Цена, ₽',
      sortable: true,
      align: 'center',
      cell: (row) => {
        const { integer, fraction } = formatPrice(row.price);
        return (
          <Text>
            <Text as="span">{integer}</Text>
            <Text as="span" color="gray">{',' + fraction}</Text>
          </Text>
        );
      },
    },
    {
      id: 'add_action',
      header: '',
      cell: (row) => (
        <IconButton
          variant="solid"
          colorPalette="blue"
          onClick={() => options.onClickAdd(row)}
        >
          <PlusIcon />
        </IconButton>
      ),
    },
    {
      id: 'more_action',
      header: '',
      cell: (row) => (
        <IconButton
          variant="ghost"
          onClick={() => options.onClickMore(row)}
        >
          <CircleEllipsisIcon />
        </IconButton>
      ),
    },
  ];
}
