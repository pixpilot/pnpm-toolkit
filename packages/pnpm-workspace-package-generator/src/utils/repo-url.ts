// Utility to construct a repo URL from baseRepoUrl and dirName
export function getRepoUrl(
  baseRepoUrl: string | undefined,
  dirName: string | undefined,
): string {
  let repoBase = baseRepoUrl ?? '';
  // Remove trailing .git if present
  if (repoBase.endsWith('.git')) {
    repoBase = repoBase.slice(0, -4);
  }
  // Remove trailing slash after removing .git, if any
  if (repoBase.endsWith('/')) {
    repoBase = repoBase.slice(0, -1);
  }
  const repoBaseWithSlash = repoBase ? repoBase + '/' : '/';
  const repoName = dirName ?? '';
  return `${repoBaseWithSlash}${repoName}.git`;
}
