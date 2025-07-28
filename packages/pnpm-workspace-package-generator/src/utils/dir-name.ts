export function getDirName(packageName: string): string {
  if (packageName.startsWith('@')) {
    return packageName.split('/').slice(1).join('/');
  }
  return packageName;
}
