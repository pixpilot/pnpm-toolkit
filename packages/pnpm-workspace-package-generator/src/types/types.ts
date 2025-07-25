export interface GeneratorAnswers {
  name: string;
  workspace: string;
  deps?: string;
  isNpmPackage?: boolean;
  isPublicPackage?: boolean;
  licenseType?: string;
}
