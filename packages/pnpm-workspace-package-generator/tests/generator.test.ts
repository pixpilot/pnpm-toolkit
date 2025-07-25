import { describe, it, expect } from 'vitest';

import { renderActionsWithHandlebars } from './handlebars-render-utils';

const cases = [
  {
    name: 'basic package',
    answers: {
      workspace: 'packages',
      name: 'simple-package',
      deps: '',
      isNpmPackage: false,
      licenseType: 'none',
    },
  },
  {
    name: 'npm public package with deps and MIT license',
    answers: {
      workspace: 'packages',
      name: 'public-npm',
      deps: 'lodash chalk',
      isNpmPackage: true,
      isPublicPackage: true,
      licenseType: 'mit',
    },
  },
  {
    name: 'scoped package, custom workspace, GPL license',
    answers: {
      workspace: 'custom',
      name: '@scope/scoped-pkg',
      deps: '',
      isNpmPackage: false,
      licenseType: 'gpl-3.0',
    },
  },
  {
    name: 'npm private package, BSD license',
    answers: {
      workspace: 'packages',
      name: 'private-npm',
      deps: '',
      isNpmPackage: true,
      isPublicPackage: false,
      licenseType: 'bsd-3-clause',
    },
  },
  {
    name: 'package with empty license file',
    answers: {
      workspace: 'packages',
      name: 'empty-license',
      deps: '',
      isNpmPackage: false,
      licenseType: 'empty',
    },
  },
];

describe('generator snapshot', () => {
  for (const testCase of cases) {
    it(`should generate correct files for ${testCase.name}`, async () => {
      const files = renderActionsWithHandlebars(testCase.answers);
      await expect(files).toMatchFileSnapshot(
        `__snapshots__/generator-${testCase.name
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-_]/g, '')
          .toLowerCase()}.test.ts.snap`,
      );
    });
  }
});
