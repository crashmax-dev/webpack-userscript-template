import {
    ce,
    qs,
    http
} from './utils'

import './style.css'

/**
 * DOM Manipulation
 */
const title = ce('h1', {
    innerHTML: 'Hello, World!',
    style: {
        cursor: 'pointer'
    },
    onclick: function () {
        console.log(this)
    }
})

const h1 = qs('h1')
h1?.replaceWith(title)

/**
 * fetch
 */
interface ITodos {
    completed: boolean
    id: number
    title: string
    userId: number
}

http<ITodos>('https://jsonplaceholder.typicode.com/todos/10', {
    method: 'GET',
}).then(response => {
    if (response.ok && response.parsedBody) {
        console.table(response.parsedBody)
    }
})