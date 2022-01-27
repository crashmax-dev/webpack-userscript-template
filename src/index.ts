import { el, mount } from 'redom'
import fetcher from './utils/fetcher'
import watcher from './utils/safe-event-emitter'
import './styles/global.scss'

(async () => {
  /** RE:DOM */
  const logo = el('img', {
    src: BASE_PATH + 'typescript.png',
    style: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })

  mount(document.querySelector('body > div')!, logo)

  /** fetch example */
  interface ITodos {
    completed: boolean
    id: number
    title: string
    userId: number
  }

  const response = await fetcher<ITodos>(
    'https://jsonplaceholder.typicode.com/todos/10',
    { method: 'GET' }
  )

  console.log(response)

  /** webpack define */
  console.log(VERSION)
  console.log(NODE_ENV)
  console.log(BASE_PATH)
})()
