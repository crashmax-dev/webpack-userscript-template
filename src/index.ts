import { ce, qs, request } from './utils'

// import './style.css'
import './style.scss'

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

const h1 = qs('h1')
h1?.replaceWith(title)

const p = qs('p')
if (p) {
  p.textContent = 'This template is based on Webpack and webpack-userscript, written in TypeScript.'
  p.appendChild(ce('a', {
    href: 'https://github.com/crashmax-off/webpack-userscript-template'
  }))
}

/**
 * Fetch example
 */
interface ITodos {
  completed: boolean
  id: number
  title: string
  userId: number
}

request<ITodos>('https://jsonplaceholder.typicode.com/todos/10', {
  method: 'GET'
}).then(({ response, data }) => {
  console.log(response)
  console.table(data)
})

/**
 * Webpack define
 */
console.log(DEV_MODE)
console.log(BASE_PATH)
console.log(APP_VERSION)