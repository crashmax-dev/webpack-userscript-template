// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { EventEmitter } from 'events'
import type TypedEmitter from 'typed-emitter'

type Emitter = TypedEmitter<any>

const IGNORED_HTML_TAGS = new Set([
  'BR',
  'HEAD',
  'LINK',
  'META',
  'SCRIPT',
  'STYLE'
])

interface ParsedResult {
  partialSelector: string
  selector: string
  options?: {
    attributes?: boolean
    useParentNode?: boolean
    useTargetNode?: boolean
  }
}

let observer: MutationObserver
const observedIds: Record<string, ParsedResult[]> = Object.create(null)
const observedClassNames: Record<string, ParsedResult[]> = Object.create(null)
const attributeObservers = new Map()

function parseSelector(selector: string) {
  const partialSelectors = selector.split(',').map((s) => s.trim())
  const ids = []
  const classNames = []

  for (const partialSelector of partialSelectors) {
    if (partialSelector.startsWith('#')) {
      ids.push({
        key: partialSelector.split(' ')[0].split('#')[1],
        partialSelector
      })
    } else if (partialSelector.startsWith('.')) {
      classNames.push({
        key: partialSelector.split(' ')[0].split('.')[1],
        partialSelector
      })
    }
  }

  return { ids, classNames }
}

function startAttributeObserver(observedType: ParsedResult, emitter: Emitter, node: Element): void {
  const attributeObserver = new MutationObserver(() =>
    emitter.emit(observedType.selector, node, node.isConnected)
  )
  attributeObserver.observe(node, { attributes: true, subtree: true })
  attributeObservers.set(observedType, attributeObserver)
}

function stopAttributeObserver(observedType: ParsedResult) {
  const attributeObserver = attributeObservers.get(observedType)

  if (!attributeObserver) {
    return
  }

  attributeObserver.disconnect()
  attributeObservers.delete(observedType)
}

function processObservedResults(emitter: Emitter, target: Element, node: Element, results: ParsedResult[]) {
  if (!results || results.length === 0) {
    return
  }

  for (const observedType of results) {
    const { partialSelector, selector, options } = observedType
    let foundNode = partialSelector.includes(' ') ? node.querySelector(selector) : node

    if (!foundNode) {
      continue
    }

    if (options && options.useParentNode) {
      foundNode = node
    }

    if (options && options.useTargetNode) {
      foundNode = target
    }

    const { isConnected } = foundNode

    if (options && options.attributes) {
      if (isConnected) {
        startAttributeObserver(observedType, emitter, foundNode)
      } else {
        stopAttributeObserver(observedType)
      }
    }

    emitter.emit(selector, foundNode, isConnected)
  }
}

function processMutations(emitter: Emitter, nodes: Node[][]) {
  if (!nodes || nodes.length === 0) {
    return
  }

  for (const [target, node] of nodes) {
    let nodeId = node.id

    if (typeof nodeId === 'string' && nodeId.length > 0) {
      nodeId = nodeId.trim()
      processObservedResults(emitter, target, node, observedIds[nodeId])
    }

    const nodeClassList = node.classList
    if (nodeClassList && nodeClassList.length > 0) {
      for (let className of nodeClassList) {
        className = className.trim()
        processObservedResults(emitter, target, node, observedClassNames[className])
      }
    }
  }
}

class DOMObserver extends (EventEmitter as new () => Emitter) {
  constructor() {
    super()

    observer = new MutationObserver((mutations) => {
      const pendingNodes: Node[][] = []

      for (const { addedNodes, removedNodes, target } of mutations) {
        if (!addedNodes || !removedNodes || (addedNodes.length === 0 && removedNodes.length === 0)) {
          continue
        }

        for (let i = 0; i < 2; i++) {
          const nodes = i === 0 ? addedNodes : removedNodes

          for (const node of nodes) {
            if (node.nodeType !== Node.ELEMENT_NODE || IGNORED_HTML_TAGS.has(node.nodeName)) {
              continue
            }

            pendingNodes.push([target, node])
            if (node.childElementCount === 0) {
              continue
            }

            for (const childNode of node.querySelectorAll('[id],[class]')) {
              pendingNodes.push([target, childNode])
            }
          }
        }
      }

      if (pendingNodes.length === 0) {
        return
      }

      processMutations(this, pendingNodes)
    })

    observer.observe(document, { childList: true, subtree: true })
  }

  on(
    selector: string,
    callback: (node: Element, isConnected: boolean) => void,
    options?: { attributes?: boolean, useParentNode?: boolean }
  ) {
    const parsedSelector = parseSelector(selector)
    const initialNodes = []

    for (const selectorType of Object.keys(parsedSelector)) {
      let observedSelectorType

      switch (selectorType) {
        case 'ids':
          observedSelectorType = observedIds
          break
        case 'classNames':
          observedSelectorType = observedClassNames
          break
        default:
          break
      }

      for (const { key, partialSelector } of parsedSelector[selectorType]) {
        const currentObservedTypeSelectors = observedSelectorType[key]
        const observedType = { partialSelector, selector, options }

        if (!currentObservedTypeSelectors) {
          observedSelectorType[key] = [observedType]
        } else {
          currentObservedTypeSelectors.push(observedType)
        }

        if (observedSelectorType === observedIds) {
          initialNodes.push(...document.querySelectorAll(`#${key}`))
        } else if (observedSelectorType === observedClassNames) {
          initialNodes.push(...document.getElementsByClassName(key))
        }
      }
    }

    const result = super.on(selector, callback)
    processMutations(this, initialNodes.map((node) => [node.parentElement, node]))

    return result
  }

  off(
    selector: string,
    callback: (node: Element, isConnected: boolean) => void
  ) {
    this.removeListener(selector, callback)

    if (this.listenerCount(selector) > 0) {
      return
    }

    const parsedSelector = parseSelector(selector)

    for (const selectorType of Object.keys(parsedSelector)) {
      let observedSelectorType
      switch (selectorType) {
        case 'ids':
          observedSelectorType = observedIds
          break
        case 'classNames':
          observedSelectorType = observedClassNames
          break
        default:
          break
      }

      for (const { key } of parsedSelector[selectorType]) {
        const currentObservedTypeSelectors = observedSelectorType[key]

        if (!currentObservedTypeSelectors) {
          continue
        }

        const observedTypeIndex = currentObservedTypeSelectors.findIndex(
          (observedType) => observedType.selector === selector
        )

        if (observedTypeIndex === -1) {
          continue
        }

        const observedType = currentObservedTypeSelectors[observedTypeIndex]
        stopAttributeObserver(observedType)
        currentObservedTypeSelectors.splice(observedTypeIndex)

        if (currentObservedTypeSelectors.length === 0) {
          delete observedSelectorType[key]
        }
      }
    }
  }
}

export default new DOMObserver()
