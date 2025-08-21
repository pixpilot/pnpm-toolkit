import { kebabCase } from 'change-case';
import { hasStringValue } from './has-string-value';

export interface PackageNameOptions {
  name: string;
  isNpmPackage?: boolean | undefined;
  orgName?: string | undefined;
}

export function getPackageName({
  name,
  isNpmPackage,
  orgName,
}: PackageNameOptions): string {
  // If the name contains slashes, only kebab-case the final part for npm packages
  // but preserve the directory structure for internal packages
  if (name.includes('/')) {
    const parts = name.split('/');
    const lastPart = parts[parts.length - 1];

    if (name.startsWith('@')) {
      return name;
    }

    if (lastPart == null || lastPart.length === 0) {
      throw new Error('Invalid package name: cannot end with slash');
    }

    const kebabLastPart = kebabCase(lastPart);

    if (isNpmPackage === false) {
      // For internal packages, create a scoped name from the last part only
      return `@internal/${kebabLastPart}`;
    }
    if (hasStringValue(orgName)) {
      // For npm packages with org, create a scoped name from the last part only
      return `@${orgName}/${kebabLastPart}`;
    }
    // For public npm packages, use just the last part (can't have slashes in npm package names)
    return kebabLastPart;
  }

  // Original logic for non-nested packages
  const kebabName = kebabCase(name);
  if (name.startsWith('@')) {
    return name;
  }
  if (isNpmPackage === false) {
    return `@internal/${kebabName}`;
  }
  if (hasStringValue(orgName)) {
    return `@${orgName}/${kebabName}`;
  }
  return kebabName;
}
