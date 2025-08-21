/**
 * Calculate the relative path from a target directory to the repository root.
 * This is useful for generating correct paths to files like .gitignore and .prettierignore
 * in monorepo packages that can be nested at various levels.
 *
 * @param targetPath - The target directory path (e.g., "packages/utils/my-package")
 * @returns The relative path to the repository root (e.g., "../../../")
 */
export function getRelativeRootPath(targetPath: string): string {
  // Normalize path separators to forward slashes
  const normalizedPath = targetPath.replace(/\\/gu, '/');

  // Split the path and count the number of directory levels
  const parts = normalizedPath.split('/').filter((part) => part.length > 0);
  const levels = parts.length;

  // Generate the appropriate number of "../" for each level
  return '../'.repeat(levels);
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
