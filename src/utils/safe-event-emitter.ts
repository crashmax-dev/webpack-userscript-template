import { EventEmitter } from 'events'
import type TypedEmitter from 'typed-emitter'
import type { EventsEmitter } from '../types/events-emitter'

// https://github.com/andywer/typed-emitter#extending-an-emitter
class SafeEventEmitter extends (EventEmitter as new () => TypedEmitter<EventsEmitter>) {
  constructor() {
    super()
    this.setMaxListeners(100)
  }
}

export default new SafeEventEmitter()
