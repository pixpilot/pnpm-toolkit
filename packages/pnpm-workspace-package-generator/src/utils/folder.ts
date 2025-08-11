import { readFileSync } from 'node:fs';

import { parse } from 'yaml';

type PNPMWorkspace = {
  packages?: string[];
} | null;

// Function to get workspace folders from pnpm-workspace.yaml
export function getWorkspaceFolders(): string[] {
  try {
    const workspaceContent = readFileSync('pnpm-workspace.yaml', 'utf8');

    let workspace: PNPMWorkspace = null;
    try {
      workspace = parse(workspaceContent) as PNPMWorkspace;
    } catch {
      return ['packages', 'apps', 'tooling', 'api'];
    }

    if (!workspace || typeof workspace !== 'object' || !('packages' in workspace)) {
      return ['packages', 'apps', 'tooling', 'api'];
    }

    const { packages } = workspace;
    if (!Array.isArray(packages)) {
      return ['packages', 'apps', 'tooling', 'api'];
    }

    // Extract base folder names from patterns like "packages/**", "tooling/**"
    const folders = packages
      .filter(
        (pkg): pkg is string =>
          typeof pkg === 'string' && (pkg.includes('/**') || pkg.includes('/*')),
      )
      .map((pkg: string) =>
        // Handle both "packages/**" and "packages/*" patterns
        pkg.replace(/\/\*\*?$/u, '').replace(/^['"]|['"]$/gu, ''),
      )
      .sort();

    if (folders.length === 0) {
      return ['packages', 'apps', 'tooling', 'api'];
    }

    return folders;
  } catch {
    console.warn('Could not read pnpm-workspace.yaml, using default folders');
    return ['packages', 'apps', 'tooling', 'api'];
  }
}
