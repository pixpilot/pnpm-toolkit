# workspace-package-generator

workspace-package-generator is a Plop generator for quickly scaffolding new packages in a pnpm + Turbo monorepo. It helps standardize package structure, configuration, and setup for modern TypeScript monorepos.

This generator is designed to work with the [pixpilot/pnpm-turbo-monorepo-template](https://github.com/pixpilot/pnpm-turbo-monorepo-template) template.

---

## Usage

This package exports a function `packageGenerator(plop: PlopGenerator)` that registers the generator with Plop. You should use it in your Turbo generator or Plop setup:

```typescript
import { packageGenerator } from '@pixpilot/workspace-package-generator';

export default function (plop: unknown): void {
  packageGenerator(plop);
}
```

- This is not a CLI tool. You must call the function in your code to register the packageGenerator.
- Typical usage is in a Turbo generator or Plopfile, e.g. in `turbo/generators/config.ts`.

### GeneratorOptions

The package generator uses the following TypeScript interface to customize the creation of new packages:

```typescript
export interface GeneratorOptions {
  orgName?: string; // Organization or scope name for generated packages (e.g., "@your-org")
  author?: string; // Author name for the generated package's package.json
  /**
   * Fallback repository URL to use for the generated package if no explicit repoUrl is provided.
   * This value is used as-is and is not modified or appended to.
   */
  baseRepoUrl?: string;
}
```

These options can be provided when running the generator to control naming, authorship, and repository configuration for new packages.

---

## License

This package is licensed under the [MIT License](./LICENSE).
