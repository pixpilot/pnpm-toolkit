# pnpm-toolkit

This toolkit provides utilities, generators, and configuration helpers to streamline development, testing, and publishing workflows in pnpm-based monorepos.

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Build all packages:**
   ```sh
   pnpm build
   ```
3. **Run tests:**
   ```sh
   pnpm test
   ```

## Packages & Tools

- [`packages/workspace-package-generator`](packages/workspace-package-generator/README.md): Package scaffolding and workspace utilities

## Release Workflow

Push to the `main` or `next` branch to trigger automated versioning and publishing via GitHub Actions ([Changeset Autopilot Action](https://github.com/pixpilot/changesets-autopilot)).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
