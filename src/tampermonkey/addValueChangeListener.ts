import { ce, createContainer } from '../utils'

export const addValueChangeListener = () => {
    const STORAGE_NAME = 'value_' + (Math.random() * 10)

    GM_addValueChangeListener(STORAGE_NAME, (name, oldValue, newValue) => {
        console.table({
            name,
            newValue,
            oldValue
        }, ['Name', 'New', 'Old'])

        input.value = newValue
    })

    const input = ce('input', {
        value: GM_getValue(STORAGE_NAME) || 0,
        onkeypress: (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                GM_setValue(STORAGE_NAME, input.value)
            }
        }
    })

    const addButton = ce('button', {
        innerHTML: 'Add',
        onclick: () => {
            let value = GM_getValue<number>(STORAGE_NAME) || 0
            GM_setValue(STORAGE_NAME, ++value)
        }
    })

    const resetButton = ce('button', {
        innerHTML: 'Reset',
        onclick: () => GM_setValue(STORAGE_NAME, 0)
    })

    createContainer('GM_addValueChangeListener', [
        input,
        addButton,
        resetButton
    ])
}