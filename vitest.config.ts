import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/__tests__/*.{ts,tsx}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],

      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },

      include: ['src'],
      exclude: [
        '**/*.d.ts',
        'src/**/index.ts',
        'src/main.ts',
        'src/**/*.stories.tsx',
        'src/contracts/**',
        'src/**/*State.ts',
        'src/**/*Controller.ts',
      ],
    },
  },

  resolve: {
    alias: {
      '@context': path.resolve(__dirname, 'src/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@model': path.resolve(__dirname, 'src/model'),
    },
  },
});
