import { el, mount } from 'redom'
import fetcher from './utils/fetcher'

// import './style.css'
import './style.scss'

/**
 * DOM Manipulation
 */
const logo = el('img', {
  src: BASE_PATH + 'typescript.png',
  style: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})


mount(document.querySelector('body > div')!, logo)

const title = el('h1', {
  innerHTML: '🚀 Typescript + Webpack userscript template!',
  style: {
    cursor: 'pointer'
  },
  onclick: function () {
    console.log(this)
  }
})

const h1 = document.querySelector('h1')
h1!.replaceWith(title)

const p = document.querySelector('p')
if (p) {
  p.textContent = 'This template is based on Webpack and webpack-userscript, written in TypeScript.'
  p.appendChild(el('a', {
    href: 'https://github.com/crashmax-off/webpack-userscript-template'
  }))
}

/** fetch example */
interface ITodos {
  completed: boolean
  id: number
  title: string
  userId: number
}

fetcher<ITodos>(
  'https://jsonplaceholder.typicode.com/todos/10',
  { method: 'GET' }
).then((response) => {
  console.log(response)
})

/** webpack define */
console.log(DEV_MODE)
console.log(BASE_PATH)
console.log(APP_VERSION)
