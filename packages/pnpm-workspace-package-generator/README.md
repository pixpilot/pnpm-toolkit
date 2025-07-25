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
