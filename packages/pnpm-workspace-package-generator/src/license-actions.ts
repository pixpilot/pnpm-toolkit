// licenseActions.ts
// Utility to generate license-related Plop actions for the generator
import { createJoinRelative } from './utils/path';

interface LicenseActionInput {
  workspace: string;
  dirName: string;
  licenseType?: string;
}

const joinRel = createJoinRelative(import.meta.url);

/**
 * Returns an array of Plop actions for LICENSE file generation based on licenseType.
 */
export function getLicenseActions(data: LicenseActionInput) {
  switch (data.licenseType) {
    case 'empty':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_EMPTY'),
        },
      ];
    case 'mit':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_MIT'),
        },
      ];
    case 'apache-2.0':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_APACHE_2_0'),
        },
      ];
    case 'gpl-3.0':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_GPL_3_0'),
        },
      ];
    case 'bsd-3-clause':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_BSD_3_CLAUSE'),
        },
      ];
    case 'mpl-2.0':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_MPL_2_0'),
        },
      ];
    case 'lgpl-3.0':
      return [
        {
          type: 'add',
          path: `{{ workspace }}/{{ dirName }}/LICENSE`,
          templateFile: joinRel('templates', 'LICENSE_LGPL_3_0'),
        },
      ];
    default:
      return [];
  }
}
