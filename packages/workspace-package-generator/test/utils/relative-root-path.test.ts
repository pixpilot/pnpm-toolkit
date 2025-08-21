import { describe, expect, it } from 'vitest';
import {
  getPackageRelativeRootPath,
  getRelativeRootPath,
} from '../../src/utils/relative-root-path';

describe('relative-root-path', () => {
  describe('getRelativeRootPath', () => {
    it('should calculate correct relative path for simple package structure', () => {
      // For packages/my-package -> ../../
      const result = getRelativeRootPath('packages/my-package');
      expect(result).toBe('../../');
    });

    it('should calculate correct relative path for nested package structure', () => {
      // For packages/utils/my-package -> ../../../
      const result = getRelativeRootPath('packages/utils/my-package');
      expect(result).toBe('../../../');
    });

    it('should calculate correct relative path for deeply nested package structure', () => {
      // For packages/category/subcategory/my-package -> ../../../../
      const result = getRelativeRootPath('packages/category/subcategory/my-package');
      expect(result).toBe('../../../../');
    });

    it('should handle root level packages', () => {
      // For my-package -> ../
      const result = getRelativeRootPath('my-package');
      expect(result).toBe('../');
    });
  });

  describe('getPackageRelativeRootPath', () => {
    it('should combine workspace and dirName correctly for simple structure', () => {
      const result = getPackageRelativeRootPath('packages', 'my-package');
      expect(result).toBe('../../');
    });

    it('should combine workspace and dirName correctly for nested structure', () => {
      const result = getPackageRelativeRootPath('packages', 'utils/my-package');
      expect(result).toBe('../../../');
    });

    it('should handle tooling workspace', () => {
      const result = getPackageRelativeRootPath('tooling', 'eslint');
      expect(result).toBe('../../');
    });

    it('should handle deeply nested workspace structure', () => {
      const result = getPackageRelativeRootPath(
        'packages',
        'category/subcategory/my-package',
      );
      expect(result).toBe('../../../../');
    });
  });
});
