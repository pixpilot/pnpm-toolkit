import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { findRootSync } from '@manypkg/find-root';
import { isRecord } from './is-record';

// import { findMonorepoRoot } from './find-monorepo-root';

export function getRootRepoUrl(dir: string = process.cwd()): string | undefined {
  let rootDir;
  try {
    rootDir = findRootSync(dir);
  } catch {
    return undefined;
  }
  const pkgPath = path.join(rootDir.rootDir, 'package.json');
  if (!fs.existsSync(pkgPath)) return undefined;
  try {
    const pkgRaw = fs.readFileSync(pkgPath, 'utf-8');
    const pkg: unknown = JSON.parse(pkgRaw);
    if (isRecord(pkg) && 'repository' in pkg) {
      const repo = (pkg as { repository?: unknown }).repository;
      if (
        isRecord(repo) &&
        'url' in repo &&
        typeof (repo as { url?: unknown }).url === 'string'
      ) {
        return (repo as { url: string }).url;
      }
      if (typeof repo === 'string') {
        return repo;
      }
    }
  } catch {
    // ignore
  }
  return undefined;
}
