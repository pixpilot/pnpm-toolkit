import makeConfig from '@pixpilot/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';

/** @type {object} */
const baseConfig = makeConfig(
  {
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    pnpm: false,
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      turbo: turboPlugin,
    },
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {},
    rules: {},
  },
);

export default baseConfig;
