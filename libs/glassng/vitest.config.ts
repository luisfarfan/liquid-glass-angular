import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vitest-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/glassng',
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/lib/components/**/*']
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
