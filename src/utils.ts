export function maybeString(str: string): string | null {
  if (str.length === 0) {
    return null
  }

  return str
}
