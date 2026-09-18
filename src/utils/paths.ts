/**
 * Prefixes a root-relative path with the site's `base`, so internal links
 * keep working when the site is served from a subpath — GitHub Pages serves
 * a project site from `/<repo>/`. External URLs, `#hash` links and relative
 * paths are returned untouched.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${base}${path}`;
}
