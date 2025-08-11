import { defineConfig } from 'vitest/config';
import vitestConfig from './tooling/vitest';

export default defineConfig({
  ...vitestConfig,
  test: {
    ...vitestConfig.test,
    globals: true,
    ui: false,
    // Ensure all test files in packages/**/test are included
    include: ['test/**/*.test.{ts,js,tsx,jsx}'],
  },
});
