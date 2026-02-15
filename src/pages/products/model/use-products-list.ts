import { useQuery } from '@tanstack/react-query';
import type { SortOption } from '~/shared/model/sort';
import { fetchProducts } from '../api/fetch-products';

type UseProductsListOptions = {
  /** 1-based */
  page: number;
  pageSize: number;
  searchText: string;
  sort: SortOption | null;
};

export function useProductsList(options: UseProductsListOptions) {
  const { page, pageSize, searchText, sort } = options;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['products', page, pageSize, searchText, sort],
    queryFn: () => fetchProducts({
      skip: (page - 1) * pageSize,
      limit: pageSize,
      search: searchText,
      sort,
    }),
  });

  const refresh = async () => {
    await refetch();
  };

  return {
    data,
    isFetching,
    error,
    refresh,
  };
}
