import type { ReactNode } from 'react';
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from '@chakra-ui/react';
import { Toaster } from './toaster.ui';

const config = defineConfig({
  globalCss: {
    'html, body': {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  },
});

const system = createSystem(defaultConfig, config);

export function AppChakraProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
