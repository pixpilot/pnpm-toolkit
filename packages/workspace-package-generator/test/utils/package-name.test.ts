import { describe, expect, it } from 'vitest';

import { getPackageName } from '../../src/utils/package-name';

describe('getPackageName', () => {
  it('returns kebab-case for plain name', () => {
    expect(getPackageName({ name: 'MyLib' })).toBe('my-lib');
  });

  it('returns @internal/ for non-npm package', () => {
    expect(getPackageName({ name: 'MyLib', isNpmPackage: false })).toBe(
      '@internal/my-lib',
    );
  });

  it('returns @org/ for orgName', () => {
    expect(
      getPackageName({ name: 'MyLib', isNpmPackage: true, orgName: 'pixpilot' }),
    ).toBe('@pixpilot/my-lib');
  });

  it('returns name as-is if already scoped', () => {
    expect(getPackageName({ name: '@scope/other-lib' })).toBe('@scope/other-lib');
  });

  it('returns @internal/ even if orgName is set and isNpmPackage is false', () => {
    expect(
      getPackageName({ name: 'MyLib', isNpmPackage: false, orgName: 'pixpilot' }),
    ).toBe('@internal/my-lib');
  });
});
