import type { GeneratorAnswers } from '../src/types';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Handlebars from 'handlebars';
import { getActions } from '../src/actions';

// Register the 'eq' helper for Handlebars
Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b);

function renderTemplate(templatePath: string, context: Record<string, any>) {
  const templateSource = readFileSync(resolve(__dirname, '../src', templatePath), 'utf8');
  const template = Handlebars.compile(templateSource);
  return template(context);
}

export async function renderActionsWithHandlebars(
  answers: GeneratorAnswers,
): Promise<Record<string, string>> {
  const actions = getActions(answers);
  const files: Record<string, string> = {};
  for (const action of actions) {
    if (typeof action === 'function') {
      await action(answers);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (action['type'] === 'add') {
      // Check if the action should be skipped
      if (typeof action['skip'] === 'function') {
        const skipResult = action['skip'](answers);
        if (skipResult !== false) {
          // eslint-disable-next-line no-continue
          continue;
        }
      }

      let content = '';
      if (typeof action['templateFile'] === 'string') {
        content = renderTemplate(action['templateFile'], answers);
      }
      const path = action['path'] as string;
      files[
        path.replace(
          /\{\{\s*(?<temp1>\w+)\s*\}\}/gu,
          (_: any, key: string | number) => (answers as any)[key] ?? '',
        )
      ] = content;
    }
  }
  return files;
}
