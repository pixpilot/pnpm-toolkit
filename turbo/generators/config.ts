import packageGenerator from '../../packages/pnpm-workspace-package-generator/dist/index';

export default function generator(plop: unknown) {
  packageGenerator(plop as never);
}
