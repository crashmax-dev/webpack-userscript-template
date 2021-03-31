import {
    addStyle,
    addValueChangeListener
} from './tampermonkey'

import './style.scss'

(() => {
    addStyle()
    addValueChangeListener()
})()