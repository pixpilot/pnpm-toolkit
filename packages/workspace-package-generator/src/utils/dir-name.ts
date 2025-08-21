export function getDirName(packageName: string): string {
  if (packageName.startsWith('@')) {
    // For scoped packages, remove the scope but preserve nested paths
    const withoutScope = packageName.split('/').slice(1).join('/');
    return withoutScope;
  }
  // For regular packages, preserve the full path including nested directories
  return packageName;
}
