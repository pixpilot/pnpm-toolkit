export interface GeneratorOptions {
  orgName?: string;
  author?: string;
  /**
   * Fallback repository URL to use for the generated package if no explicit repoUrl is provided.
   * By default, this will be collected from the root package.json repository.url field,
   * but setting baseRepoUrl will override that default value.
   * This value is used as-is and is not modified or appended to.
   */
  baseRepoUrl?: string;
}
