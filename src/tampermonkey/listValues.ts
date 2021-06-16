import { ce, createContainer } from '../utils'

export const listValues = () => {
    const values = GM_listValues()
    const inputs: HTMLElement[] = []

    values.forEach(name => {
        const div = ce('p')
        const inputValue = ce('input', {
            value: name,
            disabled: true
        })

        const removeButton = ce('button', {
            innerHTML: 'Remove',
            onclick: () => GM_deleteValue(name)
        })

        div.appendChild(inputValue)
        div.appendChild(removeButton)
        inputs.push(div)
    })

    if (!inputs.length) {
        const noValues = ce('p', {
            innerHTML: 'Values is not found!'
        })

        inputs.push(noValues)
    }

    createContainer('GM_listValues', inputs)
}