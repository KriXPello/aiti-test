import type { SortOption } from '~/shared/model/sort';

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: Array<string>;
};

type FetchProductsOptions = {
  skip: number;
  limit: number;
  search: string;
  sort: SortOption | null;
};

type FetchProductsResult = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchProducts(options: FetchProductsOptions) {
  const { skip, limit, search, sort } = options;
  const url = new URL('https://dummyjson.com/products/search');
  url.searchParams.append('skip', String(skip));
  url.searchParams.append('limit', String(limit));
  if (search) {
    url.searchParams.append('q', search);
  }
  if (sort) {
    url.searchParams.append('sortBy', sort.column);
    url.searchParams.append('order', sort.order);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result: FetchProductsResult = await response.json();
  return result;
}
