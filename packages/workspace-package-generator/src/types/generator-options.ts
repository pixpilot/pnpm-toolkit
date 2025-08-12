export interface GeneratorOptions {
  orgName?: string;
  author?: string;
  /**
   * The base URL for the repository hosting service (e.g., 'https://github.com/foo/bar.git').
   * When generating a package, the package name (or directory name) will be appended to this base URL,
   * followed by '.git', to form the full repository URL for the generated package.
   * Example: If baseRepoUrl is 'https://github.com/foo/bar.git' and the package name is 'my-lib',
   * the resulting repository URL will be 'https://github.com/foo/bar.gitmy-lib.git'.
   */
  baseRepoUrl?: string;
}
