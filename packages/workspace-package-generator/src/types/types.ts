import type { GeneratorOptions } from './generator-options';

export interface GeneratorAnswers extends GeneratorOptions {
  name: string;
  workspace: string;
  deps?: string;
  isNpmPackage?: boolean;
  isPublicPackage?: boolean;
  bundler?: 'tsc' | 'tsdown';
  hasTsdownConfig?: boolean;
  tsdownPackageName?: string;
  tsdownInternalPackageName?: string;
  licenseType?: string;
  dirName: string;
  repoUrl?: string;
  repoDirectory?: string; // This is used in templates, but not in answers
  relativeRootPath?: string; // Dynamic path to repository root (e.g., "../../" or "../../../")
  bundleSizeLimit?: number;
}
