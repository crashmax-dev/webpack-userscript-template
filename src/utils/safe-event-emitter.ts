import { EventEmitter } from 'events'
import type TypedEmitter from 'typed-emitter'
import type { Events } from '../types/events'

// https://github.com/andywer/typed-emitter#extending-an-emitter
export class SafeEventEmitter extends (EventEmitter as new () => TypedEmitter<Events>) {
  constructor() {
    super()
    this.setMaxListeners(100)
  }
}

export default new SafeEventEmitter()
