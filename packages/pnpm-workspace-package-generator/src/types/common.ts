export interface GeneratorAnswers extends GeneratorOptions {
  name: string;
  workspace: string;
  deps?: string;
  isNpmPackage?: boolean;
  isPublicPackage?: boolean;
  licenseType?: string;
  dirName?: string;
}

export interface GeneratorOptions {
  orgName?: string;
}
