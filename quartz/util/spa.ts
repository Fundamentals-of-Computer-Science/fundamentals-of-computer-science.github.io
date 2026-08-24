const standaloneBetaRoot = "/beta/Funcs"

export function requiresFullDocumentNavigation(url: URL): boolean {
  return url.pathname === standaloneBetaRoot || url.pathname.startsWith(`${standaloneBetaRoot}/`)
}
