import {
    ce,
    qs,
    http,
    split
} from './utils'

import './style.css'

(() => {
    console.log(split('Hello World!'))

    const title = ce('h1', {
        innerHTML: 'Hello, World!'
    })

    const h1 = qs('h1')
    h1.replaceWith(title)

    interface ITodos {
        completed: boolean
        id: number
        title: string
        userId: number
    }

    http<ITodos>('GET', 'https://jsonplaceholder.typicode.com/todos/10').then(response => {
        if (response.ok && response.parsedBody) {
            console.table(response.parsedBody)
        }
    })
})()