import { createHashRouter, replace } from 'react-router';
import { AuthPage } from '~/pages/auth';
import { ProductsPage } from '~/pages/products';
import { authMiddleware } from '~/shared/auth/middleware';

export const router = createHashRouter([
  {
    path: '/auth',
    Component: AuthPage,
  },
  {
    path: '/',
    middleware: [authMiddleware],
    children: [
      { index: true, loader: async () => replace('/products') },
      { path: 'products', Component: ProductsPage },
    ],
  },
]);
