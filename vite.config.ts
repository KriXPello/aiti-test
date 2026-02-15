import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const { BASE_URL } = env;
  console.log('BASE_URL', BASE_URL);

  return {
    plugins: [
      svgr(),
      react(),
      tsconfigPaths(),
    ],
    base: BASE_URL,
  };
});
