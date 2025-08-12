import type { GeneratorAnswers } from '../src/types';

import { describe, expect, it } from 'vitest';

import { renderActionsWithHandlebars } from './handlebars-render-utils';

const cases: { name: string; answers: GeneratorAnswers }[] = [
  {
    name: 'basic package',
    answers: {
      workspace: 'packages',
      name: 'simple-package',
      deps: '',
      isNpmPackage: false,
      licenseType: 'none',
      dirName: 'simple-package',
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
      dirName: 'simple-package',
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
      dirName: 'simple-package',
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
      dirName: 'simple-package',
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
      dirName: 'simple-package',
    },
  },
  {
    name: 'package with author and baseRepo and organization',
    answers: {
      workspace: 'packages',
      name: 'with-author-repo',
      deps: '',
      isNpmPackage: true,
      isPublicPackage: true,
      licenseType: 'mit',
      author: 'Test Author <test@exaple.com> (https://github.com/exaple/)',
      orgName: 'test-org',
      baseRepoUrl: 'https://github.com/foo/bar.git',
      dirName: 'simple-package',
    },
  },
];

describe('generator snapshot', () => {
  for (const testCase of cases) {
    it(`should generate correct files for ${testCase.name}`, async () => {
      const files = renderActionsWithHandlebars(testCase.answers);
      await expect(files).toMatchFileSnapshot(
        `__snapshots__/generator-${testCase.name
          .replace(/\s+/gu, '-')
          .replace(/[^\w-]/gu, '')
          .toLowerCase()}.test.ts.snap`,
      );
    });
  }
});
