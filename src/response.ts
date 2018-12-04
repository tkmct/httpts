export interface Response {
  write: (body: string) => void
  end: () => void
}
