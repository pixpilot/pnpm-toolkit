import { generator as packageGen } from '../../packages/pnpm-workspace-package-generator/dist/index';

export default function generator(plop: unknown) {
  packageGen(plop as never);
}
