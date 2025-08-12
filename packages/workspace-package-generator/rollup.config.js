import rollupConfig from '@internal/rollup-config';
import { copy } from '@web/rollup-plugin-copy';

export default {
  ...rollupConfig,
  plugins: [
    ...(rollupConfig.plugins || []),
    copy({
      patterns: ['templates/**/*'],
      rootDir: 'src',
    }),
  ],
};
