import { kebabCase } from 'change-case';

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
  } else if (isNpmPackage === false) {
    return `@internal/${kebabName}`;
  } else if (orgName) {
    return `@${orgName}/${kebabName}`;
  } else {
    return kebabName;
  }
}
