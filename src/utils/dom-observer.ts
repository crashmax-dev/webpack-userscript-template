export function domObserver(callback: (mutation: MutationRecord) => void) {
  return new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      callback(mutation)
    }
  })
}
