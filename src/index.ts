import {
    addStyle,
    addValueChangeListener,
    listValues
} from './tampermonkey'

import './style.scss'

(() => {
    addStyle()
    addValueChangeListener()
    listValues()
})()