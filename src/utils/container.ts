import { ce, qs } from './dom'

export const createContainer = (name: string, content: HTMLElement[]) => {
    const body = qs('body')
    const div = ce('div')
    const title = ce('h1', { innerHTML: name })

    div.appendChild(title)
    content.forEach(e => div.appendChild(e))
    body!.appendChild(div)
}