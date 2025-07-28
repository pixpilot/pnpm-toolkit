# pnpm-workspace-package-generator

**WARNING:** The generated templates from this package include `@internal/*` dependencies, which are placeholders for local workspace packages in a monorepo. If you use this generator outside of a compatible monorepo, you must manually update or remove these dependencies in the generated `package.json` and related files.

---

This template generator is designed for use with [pixpilot/pnpm-turbo-monorepo-template](https://github.com/pixpilot/pnpm-turbo-monorepo-template) and similar monorepo setups. You can use it for your own projects, but be aware of the dependency requirements above.

## Usage

This package exports a function `packageGenerator(plop: PlopGenerator)` that registers the generator with Plop. You should use it in your Turbo generator or Plop setup:

```typescript
import { packageGenerator } from '@pixpilot/pnpm-workspace-package-generator';

export default function (plop) {
  packageGenerator(plop);
}
```

- This is not a CLI tool. You must call the function in your code to register the packageGenerator.
- Typical usage is in a Turbo generator or Plopfile, e.g. in `turbo/generators/config.ts`.

For more details, see the documentation in [pixpilot/pnpm-turbo-monorepo-template](https://github.com/pixpilot/pnpm-turbo-monorepo-template).

### 🛠️ GeneratorOptions

The package generator in this monorepo uses the following TypeScript interface to customize the creation of new packages:

```typescript
export interface GeneratorOptions {
  orgName?: string; // Organization or scope name for generated packages (e.g., "@your-org")
  author?: string; // Author name for the generated package's package.json
  /**
   * The base URL for the repository hosting service (e.g., 'https://github.com/example/').
   * The package name (or directory name) will be appended to this base URL, followed by '.git',
   * to form the full repository URL for the generated package.
   * Example: If baseRepoUrl is 'https://github.com/example/' and the package name is 'my-lib',
   * the resulting repository URL will be 'https://github.com/example/my-lib.git'.
   */
  baseRepoUrl?: string;
}
```

These options can be provided when running the generator to control naming, authorship, and repository configuration for new packages.
