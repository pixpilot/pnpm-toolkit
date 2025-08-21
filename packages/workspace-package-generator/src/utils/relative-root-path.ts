import { existsSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';

/**
 * Calculate the relative path from a target directory to the repository root.
 * This is useful for generating correct paths to files like .gitignore and .prettierignore
 * in monorepo packages that can be nested at various levels.
 *
 * @param targetPath - The target directory path (e.g., "packages/utils/my-package")
 * @returns The relative path to the repository root (e.g., "../../../")
 */
export function getRelativeRootPath(targetPath: string): string {
  // Find the repository root by looking for common root indicators
  const rootIndicators = ['pnpm-workspace.yaml', 'package.json', '.git'];

  // Start from current working directory
  const searchStartPath = process.cwd();

  let repoRoot: string | undefined;

  // Try to find the repository root using common indicators
  let currentPath = searchStartPath;
  while (currentPath !== dirname(currentPath)) {
    // Continue until we reach the filesystem root
    for (const indicator of rootIndicators) {
      const indicatorPath = resolve(currentPath, indicator);
      if (existsSync(indicatorPath)) {
        repoRoot = currentPath;
        break;
      }
    }
    if (typeof repoRoot === 'string') break;
    currentPath = dirname(currentPath);
  }

  // Fallback to current working directory if no root found
  const finalRepoRoot = repoRoot ?? searchStartPath;

  // Calculate the absolute path of the target directory
  const absoluteTargetPath = resolve(finalRepoRoot, targetPath);

  // Calculate relative path from target to root
  const relativePath = relative(absoluteTargetPath, finalRepoRoot);

  // Normalize path separators to forward slashes for consistency across platforms
  const normalizedPath = relativePath.replace(/\\/gu, '/');

  // Ensure the path ends with a separator for clean concatenation
  return normalizedPath ? `${normalizedPath}/` : './';
}

/**
 * Calculate the relative path to the repository root based on workspace and directory name.
 * This is a convenience function for the package generator that takes the same parameters
 * as the template variables.
 *
 * @param workspace - The workspace folder (e.g., "packages")
 * @param dirName - The package directory name (e.g., "my-package" or "utils/my-package")
 * @returns The relative path to the repository root (e.g., "../../" or "../../../")
 */
export function getPackageRelativeRootPath(workspace: string, dirName: string): string {
  const targetPath = `${workspace}/${dirName}`;
  return getRelativeRootPath(targetPath);
}
