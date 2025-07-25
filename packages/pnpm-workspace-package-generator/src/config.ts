import { kebabCase } from 'change-case';

import { getActions } from './actions';
import type { GeneratorAnswers } from './types/common';
import { getWorkspaceFolders } from './utils/folder';

interface PlopGenerator {
  setGenerator: (name: string, config: unknown) => void;
}

export function generator(plop: PlopGenerator) {
  const workspaceFolders = getWorkspaceFolders();

  plop.setGenerator('init', {
    description: 'Generate a new package for the monorepo',
    prompts: [
      {
        type: 'list',
        name: 'workspace',
        message: 'Select target workspace:',
        choices: workspaceFolders,
        default: 'packages',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the package?',
        validate: (input: string) => {
          if (!input || input.trim().length === 0) {
            return 'Package name is required';
          }
          return true;
        },
        filter: (input: string) => {
          // Convert to kebab-case and remove any scope prefix
          const cleaned = input.replace(/^@[^/]+\//, '');
          return kebabCase(cleaned);
        },
      },
      {
        type: 'input',
        name: 'deps',
        message: 'Enter list of dependencies (space separated, optional)',
        default: '',
      },
      {
        type: 'confirm',
        name: 'isNpmPackage',
        message: 'Is this an npm package?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'isPublicPackage',
        message: 'Is this a public package?',
        default: false,
        when: (answers: GeneratorAnswers) => answers.isNpmPackage === true,
      },
      {
        type: 'list',
        name: 'licenseType',
        message: 'Select a license for this package:',
        choices: [
          { name: 'None', value: 'none' },
          { name: 'Empty LICENSE file', value: 'empty' },
          { name: 'MIT', value: 'mit' },
          { name: 'Apache 2.0', value: 'apache-2.0' },
          { name: 'GPL v3', value: 'gpl-3.0' },
          { name: 'BSD 3-Clause', value: 'bsd-3-clause' },
          { name: 'Mozilla Public License 2.0', value: 'mpl-2.0' },
          { name: 'LGPL v3', value: 'lgpl-3.0' },
        ],
        default: 'none',
      },
    ],
    actions(data: GeneratorAnswers) {
      return getActions(data);
    },
  });
}
