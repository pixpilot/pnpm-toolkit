import type { GeneratorAnswers } from '../src/types';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Handlebars from 'handlebars';
import { getActions } from '../src/actions';

// Define the type for an action object
interface AddAction {
  type: 'add';
  path: string;
  templateFile?: string;
}
type Action = AddAction | ((answers: GeneratorAnswers) => void);

function renderTemplate(templatePath: string, context: Record<string, any>) {
  const templateSource = readFileSync(resolve(__dirname, '../src', templatePath), 'utf8');
  const template = Handlebars.compile(templateSource);
  return template(context);
}

export function renderActionsWithHandlebars(
  answers: GeneratorAnswers,
): Record<string, string> {
  const actions = getActions(answers) as Action[];
  const files: Record<string, string> = {};
  for (const action of actions) {
    if (typeof action === 'function') {
      action(answers);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (action.type === 'add') {
      let content = '';
      if (typeof action.templateFile === 'string') {
        content = renderTemplate(action.templateFile, answers);
      }
      files[
        action.path.replace(
          /\{\{\s*(?<temp1>\w+)\s*\}\}/gu,
          (_: any, key: string | number) => (answers as any)[key] ?? '',
        )
      ] = content;
    }
  }
  return files;
}
