import type { GeneratorOptions } from './generator-options';

export interface GeneratorAnswers {
  name: string;
  workspace: string;
  deps?: string;
  isNpmPackage?: boolean;
  isPublicPackage?: boolean;
  licenseType?: string;
}

export interface GeneratorAnswers extends GeneratorOptions {
  name: string;
  workspace: string;
  deps?: string;
  isNpmPackage?: boolean;
  isPublicPackage?: boolean;
  licenseType?: string;
  dirName: string;
  repoUrl?: string;
}
