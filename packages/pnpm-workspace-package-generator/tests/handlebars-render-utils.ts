import { readFileSync } from 'fs';
import { resolve } from 'path';

import Handlebars from 'handlebars';

import { getActions } from '../src/actions';
import type { GeneratorAnswers } from '../src/types';

function renderTemplate(templatePath: string, context: Record<string, any>) {
  const templateSource = readFileSync(resolve(__dirname, '../src', templatePath), 'utf8');
  const template = Handlebars.compile(templateSource);
  return template(context);
}

export function renderActionsWithHandlebars(answers: GeneratorAnswers) {
  const actions = getActions(answers);
  const files: Record<string, string> = {};
  for (const action of actions) {
    if (typeof action === 'function') {
      action(answers);
      continue;
    }
    if (action.type === 'add') {
      let content = '';
      if (action.templateFile) {
        content = renderTemplate(action.templateFile, answers);
      }
      files[
        action.path.replace(/{{\s*(\w+)\s*}}/g, (_, key) => (answers as any)[key] ?? '')
      ] = content;
    }
  }
  return files;
}
