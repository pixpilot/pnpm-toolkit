import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Returns a function that joins paths relative to the current module's directory.
 * Usage:
 *   const joinRel = createJoinRelative(import.meta.url);
 *   const pathToFile = joinRel('templates', 'eslint.config.js.hbs');
 */
export function createJoinRelative(metaUrl: string) {
  const baseDir = dirname(fileURLToPath(metaUrl));
  return (...segments: string[]) => join(baseDir, ...segments);
}
