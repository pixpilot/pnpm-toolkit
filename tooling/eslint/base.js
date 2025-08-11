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
  {
    files: ['**/*.test.ts', '**/test/**/*.ts'],
    rules: {
      // Relax TypeScript rules
      'ts/no-non-null-assertion': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/strict-boolean-expressions': 'off',
      'ts/no-unsafe-return': 'off',
      'no-console': 'off',
      'prefer-const': 'off',
      'ts/no-unsafe-call': 'off',
      'import/no-extraneous-dependencies': 'off',
      'ts/typedef': 'off',
      'ts/no-explicit-any': 'off',
      'ts/ban-ts-comment': 'off',
    },
  },
);

export default baseConfig;
