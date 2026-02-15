import { createBrowserRouter } from 'react-router';
import { App } from './App';
import { AuthPage } from '~/pages/auth';
import { ProductsPage } from '~/pages/products';

export const router = createBrowserRouter([{
  path: '/',
  Component: App,
  children: [
    { path: 'auth', Component: AuthPage },
    { path: 'products', Component: ProductsPage },
  ],
}]);
