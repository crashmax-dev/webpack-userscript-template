interface HTMLAttributes extends EventHandlersType {
    alt?: string
    async?: boolean
    accept?: string
    autoComplete?: string
    autoFocus?: boolean
    autoPlay?: boolean
    capture?: boolean | string
    cellPadding?: number | string
    cellSpacing?: number | string
    className?: string
    checked?: boolean
    cols?: number
    colSpan?: number
    controls?: boolean
    coords?: string
    defer?: boolean
    disabled?: string | boolean
    download?: string
    encType?: string
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    height?: number | string
    htmlFor?: string
    href?: string
    id?: string
    innerHTML?: string
    label?: string
    loop?: boolean
    max?: number | string
    maxLength?: number
    media?: string
    mediaGroup?: string
    method?: string
    min?: number | string
    minLength?: number
    multiple?: boolean
    muted?: boolean
    name?: string
    pattern?: string
    placeholder?: string
    readOnly?: boolean
    rel?: string
    required?: boolean
    reversed?: boolean
    rows?: number
    rowSpan?: number
    sandbox?: string
    scope?: string
    scoped?: boolean
    selected?: boolean
    shape?: string
    size?: number
    sizes?: string
    span?: number
    src?: string
    start?: number
    step?: number | string
    summary?: string
    target?: string
    title?: string
    type?: string
    value?: string | string[] | number
    width?: number | string
}

type EventHandlersType = {
    [key in keyof GlobalEventHandlers]?: Function
}

type CSSStyle = {
    [key in keyof CSSStyleDeclaration]?: string | number
}

interface Attributes extends HTMLAttributes {
    style?: CSSStyle
}

/**
 * 
 * @param tagName 
 * @param attributes 
 * @returns 
 */
function ce<K extends keyof HTMLElementTagNameMap>(tagName: K, attributes?: Attributes) {
    const elem = document.createElement(tagName)

    Object.assign(elem, attributes)
    Object.assign(elem.style, attributes?.style)

    return elem
}

/**
 * 
 * @param elem 
 * @param style 
 * @returns 
 */
const css = (elem: HTMLElement, style: CSSStyle) => Object.assign(elem.style, style)

const qs = document.querySelector.bind(document)

const qsa = document.querySelectorAll.bind(document)

export {
    ce,
    qs,
    css,
    qsa
}