import packageGenerator from '../../packages/pnpm-workspace-package-generator/dist/index';

import type { NodePlopAPI } from 'plop';

module.exports = function generator(plop: NodePlopAPI) {
  packageGenerator(plop, {
    author: 'm.doaie <m.doaie@hotmail.com>',
    baseRepoUrl: 'https://github.com/pixpilot/pnpm-toolkit',
    orgName: 'pixpilot',
  });
};
