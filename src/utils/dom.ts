interface HTMLAttributes extends EventHandlersType {
    alt?: string
    async?: boolean
    accept?: string
    autoComplete?: 'on' | 'off'
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

interface IAttributes extends HTMLAttributes {
    style?: CSSStyle
}

type createElement = (
    tagName: keyof HTMLElementTagNameMap,
    attributes?: IAttributes
) => HTMLElementTagNameMap[typeof tagName]

/**
 * 
 * @param tagName
 * @param attributes
 */
const ce: createElement = (tagName, attributes) => {
    const elem = document.createElement(tagName)

    Object.assign(elem, attributes)
    Object.assign(elem.style, attributes?.style)

    return elem
}

/**
 * 
 * @param e
 */
const qs = (e: string) => (<HTMLElement>document.querySelector(e))

/**
 * 
 * @param e
 */
const qsa = (e: string) => <NodeListOf<HTMLElement>>document.querySelectorAll(e)

/**
 * 
 * @param elem
 * @param style
 */
const css = (elem: HTMLElement, style: CSSStyle) => Object.assign(elem.style, style)

export {
    ce,
    qs,
    css,
    qsa
}