import { defineConfig } from 'tsup';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  target: 'esnext',
  outDir: 'dist',
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.alias = {
      '@components': resolve(__dirname, 'src/components'),
      '@context': resolve(__dirname, 'src/context'),
      '@contracts': resolve(__dirname, 'src/contracts'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    };
  },
});
