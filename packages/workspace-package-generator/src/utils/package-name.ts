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
