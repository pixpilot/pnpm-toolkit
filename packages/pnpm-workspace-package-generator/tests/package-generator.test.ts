/* eslint-disable import/order */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { packageGenerator } from '../src/package-generator';

vi.mock('../src/actions', () => {
  return {
    getActions: vi.fn(() => ['mock-action']),
  };
});
import { getActions } from '../src/actions';
import type { GeneratorOptions } from '../src/types/common';

// Helper to create a mock plop API
function createMockPlop() {
  return {
    setGenerator: vi.fn(),
  };
}

describe('packageGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers the generator with plop', () => {
    const plop = createMockPlop();
    packageGenerator(plop as any);
    expect(plop.setGenerator).toHaveBeenCalledWith(
      'init',
      expect.objectContaining({
        description: expect.any(String),
        prompts: expect.any(Array),
        actions: expect.any(Function),
      }),
    );
  });

  it('passes options to getActions and actions receives merged data', () => {
    const plop = createMockPlop();
    const options: GeneratorOptions = {
      orgName: 'test-org',
      author: 'Test Author',
      baseRepoUrl: 'test-repo-url',
    };
    packageGenerator(plop as any, options);
    const generator = plop.setGenerator.mock.calls[0]?.[1];
    expect(generator).toBeDefined();
    const data = { foo: 'bar' };
    generator.actions(data);
    expect(getActions).toHaveBeenCalledWith(expect.objectContaining(options));
  });
});
