// Root ESLint config for monorepo, re-exporting the main config from tooling/eslint/base.js
import baseConfig from '@internal/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig];
