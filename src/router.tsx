import { createBrowserRouter } from 'react-router';
import { AuthPage } from '~/pages/auth';
import { ProductsPage } from '~/pages/products';
import { authMiddleware } from '~/shared/auth/middleware';

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: AuthPage,
  },
  {
    path: '/',
    middleware: [authMiddleware],
    children: [
      { path: 'products', Component: ProductsPage },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
