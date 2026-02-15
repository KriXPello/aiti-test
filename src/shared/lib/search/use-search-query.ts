import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export type SortOrder = 'asc' | 'desc';

export type SortOption = {
  column: string;
  order: SortOrder;
};

type UseSearchQueryOptions = {
  defaultPage?: number;
  defaultPageSize?: number;
  defaultSearchText?: string;
  pageParam?: string;
  pageSizeParam?: string;
  searchTextParam?: string;
  sortParam?: string;
  /**
   * если true — изменения будут через replace, а не push в history
   */
  replace?: boolean;
};

type UseSearchQueryResult = {
  page: number;
  pageSize: number;
  searchText: string;
  sort: SortOption | null;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchText: (text: string) => void;
  setSort: (sort: SortOption | null) => void;
};

function clampInt(value: string | null, fallback: number, min: number) {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, n);
}

// sort=column:asc
function parseSort(raw: string | null): SortOption | null {
  if (!raw) return null;
  const idx = raw.lastIndexOf(':');
  if (idx <= 0 || idx === raw.length - 1) return null;

  const column = raw.slice(0, idx).trim();
  const order = raw.slice(idx + 1).trim();

  if (!column) return null;
  if (order !== 'asc' && order !== 'desc') return null;

  return { column, order };
}

function serializeSort(sort: SortOption | null) {
  if (!sort) return null;
  return `${sort.column}:${sort.order}`;
}

export function useSearchQuery(options: UseSearchQueryOptions = {}): UseSearchQueryResult {
  const {
    defaultPage = 1,
    defaultPageSize = 20,
    defaultSearchText = '',
    pageParam = 'page',
    pageSizeParam = 'pageSize',
    searchTextParam = 'query',
    sortParam = 'sort',
    replace = true,
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const page = clampInt(searchParams.get(pageParam), defaultPage, 1);

  const pageSize = clampInt(searchParams.get(pageSizeParam), defaultPageSize, 1);

  const searchText = searchParams.get(searchTextParam) ?? defaultSearchText;

  const sortRaw = searchParams.get(sortParam);
  const sort = useMemo(
    () => parseSort(sortRaw),
    [sortRaw],
  );

  const updateParams = useCallback(
    (
      updater: (next: URLSearchParams) => void,
      mode: { replace?: boolean } = {},
    ) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        updater(next);
        return next;
      }, { replace: mode.replace ?? replace });
    },
    [setSearchParams, replace],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      const safe = Math.max(1, Math.floor(nextPage));
      updateParams((p) => {
        p.set(pageParam, String(safe));
      });
    },
    [updateParams, pageParam],
  );

  const setPageSize = useCallback(
    (nextPageSize: number) => {
      const safe = Math.max(1, Math.floor(nextPageSize));
      updateParams((p) => {
        // смена pageSize сбрасывает page
        p.set(pageParam, '1');
        p.set(pageSizeParam, String(safe));
      });
    },
    [updateParams, pageParam, pageSizeParam],
  );

  const setSearchText = useCallback(
    (text: string) => {
      const value = text ?? '';
      updateParams((p) => {
        // смена поиска сбрасывает page
        p.set(pageParam, '1');
        if (value) {
          p.set(searchTextParam, value);
        } else {
          p.delete(searchTextParam);
        }
      });
    },
    [updateParams, pageParam, searchTextParam],
  );

  const setSort = useCallback(
    (nextSort: SortOption | null) => {
      updateParams((p) => {
        // смена сортировки сбрасывает page
        p.set(pageParam, '1');

        const raw = serializeSort(nextSort);
        if (raw) {
          p.set(sortParam, raw);
        } else {
          p.delete(sortParam);
        }
      });
    },
    [updateParams, pageParam, sortParam],
  );

  return {
    page,
    pageSize,
    searchText,
    sort,
    setPage,
    setPageSize,
    setSearchText,
    setSort,
  };
}
