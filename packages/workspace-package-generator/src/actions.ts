import type { GeneratorAnswers } from './types';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { getLicenseActions } from './license-actions';
import { hasStringValue, isRecord } from './utils';
import { getDirName } from './utils/dir-name';
import { getRootRepoUrl } from './utils/get-root-repo-url';
import { getPackageName } from './utils/package-name';
import { createJoinRelative } from './utils/path';

const joinRel = createJoinRelative(import.meta.url);

export function getActions(
  data: GeneratorAnswers,
): Array<((answers: GeneratorAnswers) => string) | Record<string, unknown>> {
  const INDENT_SPACES = 2;
  const actions = [
    (origAnswers: GeneratorAnswers) => {
      // Avoid direct mutation of function parameter
      const answers = { ...origAnswers };
      if (answers.name) {
        answers.name = getPackageName({
          name: answers.name,
          isNpmPackage: data.isNpmPackage,
          orgName: data.orgName,
        });
      }
      answers.dirName = getDirName(answers.name);

      if (hasStringValue(data.author)) {
        answers.author = data.author;
      }

      if (hasStringValue(data.repoUrl)) {
        answers.repoUrl = data.repoUrl;
      } else if (hasStringValue(data.baseRepoUrl)) {
        answers.repoUrl = data.baseRepoUrl;
      } else {
        answers.repoUrl = getRootRepoUrl() ?? '';
      }
      answers.repoDirectory = `${answers.workspace}/${answers.dirName}`;

      // Copy back to original object
      Object.assign(origAnswers, answers);
      return 'Config sanitized';
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/eslint.config.ts',
      templateFile: joinRel('templates', 'eslint.config.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/package.json',
      templateFile: joinRel('templates', 'package.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/tsconfig.json',
      templateFile: joinRel('templates', 'tsconfig.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/rollup.config.js',
      templateFile: joinRel('templates', 'rollup.config.js.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/vitest.config.ts',
      templateFile: joinRel('templates', 'vitest.config.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/tsconfig.build.json',
      templateFile: joinRel('templates', 'tsconfig.build.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/README.md',
      templateFile: joinRel('templates', 'README.md.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/src/main.ts',
      templateFile: joinRel('templates', 'src', 'main.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/src/index.ts',
      templateFile: joinRel('templates', 'src', 'index.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ dirName }}/test/main.test.ts',
      templateFile: joinRel('templates', 'test', 'main.test.ts.hbs'),
    },
  ];

  // Add LICENSE actions from external module
  actions.push(...getLicenseActions(data));

  // Add the package.json modify action as a custom function
  actions.push((answers: GeneratorAnswers) => {
    const pathStr = `${answers.workspace}/${answers.dirName}/package.json`;
    if (!existsSync(pathStr)) return 'package.json not found';
    const content = readFileSync(pathStr, 'utf8');
    let pkg: Record<string, unknown> = {};
    try {
      pkg = JSON.parse(content) as Record<string, unknown>;
    } catch {
      return 'Invalid package.json';
    }
    // Add user-specified dependencies
    if (hasStringValue(answers.deps?.trim())) {
      const deps = answers.deps.split(' ').filter(Boolean);
      if (!isRecord(pkg['dependencies'])) pkg['dependencies'] = {};
      for (const dep of deps) {
        (pkg['dependencies'] as Record<string, string>)[dep] = '*';
      }
    }

    // Sort dependencies and devDependencies alphabetically
    if (isRecord(pkg['dependencies'])) {
      const entries = Object.entries(pkg['dependencies'] as Record<string, string>);
      (pkg['dependencies'] as Record<string, string>) = Object.fromEntries(
        entries.sort(([a], [b]) => a.localeCompare(b)),
      );
    }
    if (isRecord(pkg['devDependencies'])) {
      const entries = Object.entries(pkg['devDependencies'] as Record<string, string>);
      (pkg['devDependencies'] as Record<string, string>) = Object.fromEntries(
        entries.sort(([a], [b]) => a.localeCompare(b)),
      );
    }
    writeFileSync(pathStr, JSON.stringify(pkg, null, INDENT_SPACES));
    return 'package.json updated';
  });

  // Add the final install and format action
  actions.push((answers: GeneratorAnswers) => {
    /**
     * Install deps and format everything
     */
    if (answers.name && answers.workspace) {
      try {
        execSync('pnpm i', { stdio: 'inherit' });
        execSync(
          `pnpm prettier --write ${answers.workspace}/${answers.dirName}/** --list-different`,
          { stdio: 'inherit' },
        );
        return `Package '${answers.name}' scaffolded successfully in '${answers.workspace}' workspace!`;
      } catch {
        console.warn('Warning: Failed to install dependencies or format files');
        return `Package '${answers.name}' scaffolded in '${answers.workspace}' workspace (with warnings)`;
      }
    }
    return 'Package not scaffolded';
  });

  return actions;
}
