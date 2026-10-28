/**
 * Resolves a public asset path against Vite's configured base URL.
 * Needed for paths passed as props/strings, which Vite cannot rewrite
 * at build time.
 */
export function assetUrl(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
