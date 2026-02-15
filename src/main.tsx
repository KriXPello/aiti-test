import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AppChakraProvider } from '~/shared/config/chakra';
import { AppQueryClientProvider } from '~/shared/config/query';
import './assets/main.css';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <AppQueryClientProvider>
    <AppChakraProvider>
      <RouterProvider router={router} />
    </AppChakraProvider>
  </AppQueryClientProvider>,
);
