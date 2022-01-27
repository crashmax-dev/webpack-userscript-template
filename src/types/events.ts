export type Events = {
  error: (error: Error) => void
  message: (body: string, from: string) => void
}
