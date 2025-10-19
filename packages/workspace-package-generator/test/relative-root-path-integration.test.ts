import type { GeneratorAnswers } from '../src/types';

import { describe, expect, it } from 'vitest';
import { getActions } from '../src/actions';

describe('relativeRootPath integration', () => {
  it('should calculate relativeRootPath for packages in simple structure', async () => {
    const mockData: Partial<GeneratorAnswers> = {
      name: 'test-package',
      workspace: 'packages',
      isNpmPackage: false,
    };

    const actions = getActions(mockData as GeneratorAnswers);
    const sanitizeAction = actions[0] as (answers: GeneratorAnswers) => Promise<string>;

    const answers = { ...mockData } as GeneratorAnswers;
    await sanitizeAction(answers);

    expect(answers.relativeRootPath).toBe('../../');
  });

  it('should calculate relativeRootPath for packages in nested structure', async () => {
    const mockData: Partial<GeneratorAnswers> = {
      name: 'utils/helper-package',
      workspace: 'packages',
      isNpmPackage: false,
    };

    const actions = getActions(mockData as GeneratorAnswers);
    const sanitizeAction = actions[0] as (answers: GeneratorAnswers) => Promise<string>;

    const answers = { ...mockData } as GeneratorAnswers;
    await sanitizeAction(answers);

    expect(answers.relativeRootPath).toBe('../../../');
  });

  it('should calculate relativeRootPath for tooling packages', async () => {
    const mockData: Partial<GeneratorAnswers> = {
      name: 'eslint-config',
      workspace: 'tooling',
      isNpmPackage: false,
    };

    const actions = getActions(mockData as GeneratorAnswers);
    const sanitizeAction = actions[0] as (answers: GeneratorAnswers) => Promise<string>;

    const answers = { ...mockData } as GeneratorAnswers;
    await sanitizeAction(answers);

    expect(answers.relativeRootPath).toBe('../../');
  });
});
