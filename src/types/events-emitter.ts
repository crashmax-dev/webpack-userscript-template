export interface EventsEmitter {
  error: (error: Error) => void
  message: (body: string, from: string) => void
}
