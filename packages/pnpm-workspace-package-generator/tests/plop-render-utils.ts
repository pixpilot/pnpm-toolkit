import nodePlop from 'node-plop';

import { generator } from '../src/generator';
import type { GeneratorAnswers } from '../src/types/common';

export async function renderWithPlop(answers: GeneratorAnswers) {
  // Create a plop instance
  const plop = await nodePlop();
  // Register the generator
  generator(plop);
  // Get the generator
  const gen = plop.getGenerator('init');
  // Run actions with mock answers
  const results = await gen.runActions(answers);
  // Collect file contents
  const files: Record<string, string> = {};
  for (const action of results.changes) {
    files[action.path] = (action as any).content;
  }
  return files;
}
