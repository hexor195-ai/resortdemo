/**
 * Resolves public asset paths against Vite's configured BASE_URL so images work
 * both at `/` locally and under `/<repo>/` on GitHub Pages.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
