import {
    ce,
    qs,
    http
} from './utils'

// import { observe } from 'selector-observer'

// import './style.css'
import './style.scss'

(() => {
    /**
     * DOM Manipulation
     */
    const logo = ce('img', {
        src: BASE_PATH + 'typescript.png',
        style: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    })

    const body = qs('body > div')
    body?.prepend(logo)

    const title = ce('h1', {
        innerHTML: '🚀 Typescript + Webpack userscript template!',
        style: {
            cursor: 'pointer'
        },
        onclick: function () {
            console.log(this)
        }
    })

    qs('h1')?.replaceWith(title)
    qs('p')!.textContent = 'This template is based on Webpack and webpack-userscript, written in TypeScript.'
    qs('a')!.href = 'https://github.com/crashmax-off/webpack-userscript-template'

    /**
     * Fetch example
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

    /**
     * Webpack define
     */
    console.log(DEV_MODE)
    console.log(BASE_PATH)
    console.log(APP_VERSION)
})()