import * as fs from 'fs';
import os from 'os';
import * as path from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import { getRootRepoUrl } from '../../src/utils/get-root-repo-url';

const tmpRoot = path.join(os.tmpdir(), 'get-root-repo-url-test');
const pkgPath = path.join(tmpRoot, 'package.json');

describe('getRootRepoUrl (integration)', () => {
  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('returns repo url from object repository', () => {
    fs.mkdirSync(tmpRoot, { recursive: true });
    fs.writeFileSync(
      pkgPath,
      JSON.stringify({ repository: { url: 'https://github.com/foo/bar.git' } }),
    );
    expect(getRootRepoUrl(tmpRoot)).toBe('https://github.com/foo/bar.git');
  });

  it('returns repo url from string repository', () => {
    fs.mkdirSync(tmpRoot, { recursive: true });
    fs.writeFileSync(
      pkgPath,
      JSON.stringify({ repository: 'https://github.com/foo/bar.git' }),
    );
    expect(getRootRepoUrl(tmpRoot)).toBe('https://github.com/foo/bar.git');
  });

  it('returns undefined if no package.json', () => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    expect(getRootRepoUrl(tmpRoot)).toBeUndefined();
  });

  it('returns undefined if repository missing', () => {
    fs.mkdirSync(tmpRoot, { recursive: true });
    fs.writeFileSync(pkgPath, JSON.stringify({}));
    expect(getRootRepoUrl(tmpRoot)).toBeUndefined();
  });
});
