import { NOINDEX_ROUTES } from "../consts.ts";

const normalize = (path: string) => `/${path.replace(/^\/+|\/+$/g, "")}`;

const excluded = new Set(NOINDEX_ROUTES.map(normalize));

export function isNoindexRoute(pathname: string, base = "/"): boolean {
  const prefix = normalize(base);
  const inBase =
    prefix !== "/" &&
    (pathname === prefix || pathname.startsWith(`${prefix}/`));
  return excluded.has(normalize(inBase ? pathname.slice(prefix.length) : pathname));
}
