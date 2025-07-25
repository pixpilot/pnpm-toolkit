import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

import { kebabCase } from 'change-case';

import { getLicenseActions } from './license-actions';
import type { GeneratorAnswers } from './types/common';
import { createJoinRelative } from './utils/path';

const joinRel = createJoinRelative(import.meta.url);

export function getActions(data: GeneratorAnswers) {
  const actions = [
    (answers: GeneratorAnswers) => {
      if (answers.name) {
        // Ensure name is in kebab-case
        const kebabName = kebabCase(answers.name);

        if (kebabName.startsWith('@internal/') || kebabName.startsWith('@')) {
          answers.name = kebabName.replace(/^@[^/]+\//, '');
        } else {
          answers.name = kebabName;
        }
      }
      return 'Config sanitized';
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/eslint.config.js',
      templateFile: joinRel('templates', 'eslint.config.js.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/package.json',
      templateFile: joinRel('templates', 'package.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/tsconfig.json',
      templateFile: joinRel('templates', 'tsconfig.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/src/index.ts',
      template: "export const name = '{{ name }}';",
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/rollup.config.js',
      templateFile: joinRel('templates', 'rollup.config.js.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/vitest.config.ts',
      templateFile: joinRel('templates', 'vitest.config.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/tsconfig.build.json',
      templateFile: joinRel('templates', 'tsconfig.build.json.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/README.md',
      templateFile: joinRel('templates', 'README.md.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/src/main.ts',
      templateFile: joinRel('templates', 'src', 'main.ts.hbs'),
    },
    {
      type: 'add',
      path: '{{ workspace }}/{{ name }}/tests/main.test.ts',
      templateFile: joinRel('templates', 'tests', 'main.test.ts.hbs'),
    },
  ];

  // Conditionally add release.config.js only if isNpmPackage is true
  if (data.isNpmPackage === true) {
    actions.push({
      type: 'add',
      path: '{{ workspace }}/{{ name }}/release.config.js',
      templateFile: joinRel('templates', 'release.config.js.hbs'),
    });
  }

  // Add LICENSE actions from external module
  actions.push(...getLicenseActions(data));

  // Add the package.json modify action as a custom function
  actions.push((answers: GeneratorAnswers) => {
    const pathStr = `${answers.workspace}/${answers.name}/package.json`;
    if (!existsSync(pathStr)) return 'package.json not found';
    const content = readFileSync(pathStr, 'utf8');
    let pkg: Record<string, unknown> = {};
    try {
      pkg = JSON.parse(content) as Record<string, unknown>;
    } catch {
      return 'Invalid package.json';
    }
    // Add user-specified dependencies
    if (answers.deps?.trim()) {
      const deps = answers.deps.split(' ').filter(Boolean);
      if (!pkg['dependencies'] || typeof pkg['dependencies'] !== 'object')
        pkg['dependencies'] = {};
      for (const dep of deps) {
        (pkg['dependencies'] as Record<string, string>)[dep] = '*';
      }
    }
    // Add @internal/semantic-release to devDependencies if isNpmPackage is true
    if (answers.isNpmPackage === true) {
      if (!pkg['devDependencies'] || typeof pkg['devDependencies'] !== 'object')
        pkg['devDependencies'] = {};
      (pkg['devDependencies'] as Record<string, string>)['@internal/semantic-release'] =
        'workspace:*';
    }
    // Sort dependencies and devDependencies alphabetically
    if (pkg['dependencies'] && typeof pkg['dependencies'] === 'object') {
      const entries = Object.entries(pkg['dependencies'] as Record<string, string>);
      (pkg['dependencies'] as Record<string, string>) = Object.fromEntries(
        entries.sort(([a], [b]) => a.localeCompare(b)),
      );
    }
    if (pkg['devDependencies'] && typeof pkg['devDependencies'] === 'object') {
      const entries = Object.entries(pkg['devDependencies'] as Record<string, string>);
      (pkg['devDependencies'] as Record<string, string>) = Object.fromEntries(
        entries.sort(([a], [b]) => a.localeCompare(b)),
      );
    }
    writeFileSync(pathStr, JSON.stringify(pkg, null, 2));
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
          `pnpm prettier --write ${answers.workspace}/${answers.name}/** --list-different`,
          { stdio: 'inherit' },
        );
        return `Package '${answers.name}' scaffolded successfully in '${answers.workspace}' workspace!`;
      } catch (_err) {
        console.warn('Warning: Failed to install dependencies or format files');
        return `Package '${answers.name}' scaffolded in '${answers.workspace}' workspace (with warnings)`;
      }
    }
    return 'Package not scaffolded';
  });

  return actions;
}
