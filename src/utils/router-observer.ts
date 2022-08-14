export function routerObserver(callback: (history: History) => void) {
  window.addEventListener('load', () => {
    const { history } = window
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { pushState, replaceState } = history

    history.pushState = (...args) => {
      pushState.apply(history, args)
      callback(history)
    }

    history.replaceState = (...args) => {
      replaceState.apply(history, args)
      callback(history)
    }

    callback(history)
  })
}
