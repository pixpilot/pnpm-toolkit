export interface GeneratorOptions {
  orgName?: string;
  author?: string;
  /**
   * Fallback repository URL to use for the generated package if no explicit repoUrl is provided.
   * This value is used as-is and is not modified or appended to.
   */
  baseRepoUrl?: string;
}
