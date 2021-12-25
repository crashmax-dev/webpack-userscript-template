import { EventEmitter } from 'events'
import type TypedEmitter from 'typed-emitter'
import type { EventsEmitter } from '../types/events-emitter'

// https://github.com/andywer/typed-emitter#extending-an-emitter
export class SafeEventEmitter<T> extends (EventEmitter as { new <T>(): TypedEmitter<T> })<T> {
  constructor() {
    super()
    this.setMaxListeners(100)
  }
}

export default new SafeEventEmitter<EventsEmitter>()
