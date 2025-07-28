import { describe, expect, it } from 'vitest';

import { getRepoUrl } from '../../src/utils/repo-url';

describe('getRepoUrl', () => {
  it('should append .git and ensure trailing slash', () => {
    expect(getRepoUrl('https://github.com/org', 'my-package')).toBe(
      'https://github.com/org/my-package.git',
    );
    expect(getRepoUrl('https://github.com/org/', 'my-package')).toBe(
      'https://github.com/org/my-package.git',
    );
  });

  it('should handle undefined baseRepoUrl', () => {
    expect(getRepoUrl(undefined, 'foo')).toBe('/foo.git');
  });

  it('should handle undefined dirName', () => {
    expect(getRepoUrl('https://github.com/org', undefined)).toBe(
      'https://github.com/org/.git',
    );
  });

  it('should handle both undefined', () => {
    expect(getRepoUrl(undefined, undefined)).toBe('/.git');
  });

  it('should remove trailing .git from baseRepoUrl', () => {
    expect(getRepoUrl('https://github.com/org.git', 'my-package')).toBe(
      'https://github.com/org/my-package.git',
    );
    expect(getRepoUrl('https://github.com/org/.git', 'my-package')).toBe(
      'https://github.com/org/my-package.git',
    );
  });
});
