import packageGenerator from '../../packages/workspace-package-generator/dist/index';

import type { NodePlopAPI } from 'plop';

module.exports = function generator(plop: NodePlopAPI) {
  packageGenerator(plop, {
    author: 'm.doaie <m.doaie@hotmail.com>',
    orgName: 'pixpilot',
  });
};
