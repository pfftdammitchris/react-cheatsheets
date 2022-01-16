import React from 'react'
import { Snippet } from '.'
import * as t from './types'

export const isArr = (value: unknown): value is any[] => Array.isArray(value)

export const isFnc = <
  O extends (...args: any[]) => any = (...args: any[]) => any,
>(
  fn: unknown,
): fn is O => typeof fn === 'function'

export const isObj = (value: unknown): value is Record<string, any> =>
  !!value && !isArr(value) && typeof value === 'object'

export const isNum = (value: unknown): value is number =>
  typeof value === 'number'

export function filterBadSnippets(snippets: t.Snippet[]): t.Snippet[] {
  return snippets.filter((o) => {
    if (!o.id && !o.title && !o.snippet) {
      console.warn(
        'Found an invalid snippet. It was not included in the cheat sheet',
      )
      return false
    }
    return true
  })
}

export function formatSnippets(
  snippets: t.Snippet[],
  columnCount: number,
): t.Snippet[][] {
  const reducer = (acc: t.Snippet[][], snippet: t.Snippet) => {
    const lastColumn = last(acc)

    // Maximum items of each row is the value of columnCount
    if (lastColumn.length < columnCount) {
      lastColumn.push(snippet)
    } else {
      // Instantiate a new row when current row has reached its max
      acc.push([snippet])
    }
    return acc
  }
  const result = snippets.reduce(reducer, [[]])
  return result
}

// We made the droppableId always start at 1 instead of 0
export function getRowSnippets(
  rows: Snippet[][],
  droppableId: number | string,
  index?: number,
): Snippet[] {
  index = isNum(index) ? index : getRowIndex(droppableId)
  return rows[index]
}

export function getRowStyle(
  isDraggingOver: boolean,
  { index }: { index?: number } = {},
) {
  return {
    display: 'flex',
    outline: 'none',
    background: isDraggingOver ? 'teal' : undefined,
  }
}

export function getSnippetStyle(
  isDragging: boolean,
  draggableStyle: React.CSSProperties,
  { index }: { index?: number } = {},
): React.CSSProperties {
  return {
    padding: 8,
    margin: 3,
    flexGrow: 1,
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    userSelect: 'none',
    fontSize: '0.85rem',
    boxShadow: '3px 6px 14px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(40, 60, 190, 0.17)',
    background: isDragging ? '#D0FFE0' : undefined,
    ...draggableStyle,
  }
}

export function getRowIndex(droppableId: string | number) {
  return Number(droppableId) - 1
}

// Retrieves the last item in an array
export function last(arr: any[]) {
  const length = arr ? arr.length : 0
  return length ? arr[length - 1] : undefined
}

export function reorder(row: t.Snippet[], start: number, end: number) {
  const result = row.slice()
  const [removed] = result.splice(start, 1)
  result.splice(end, 0, removed)
  return result
}

export const stylesheets = [
  'coy',
  'dark',
  'funky',
  'okaidia',
  'solarizedlight',
  'tomorrow',
  'twilight',
  'prism',
  'atomDark',
  'base16AteliersulphurpoolLight',
  'cb',
  'darcula',
  'duotoneDark',
  'duotoneEarth',
  'duotoneForest',
  'duotoneLight',
  'duotoneSea',
  'duotoneSpace',
  'ghcolors',
  'hopscotch',
  'pojoaque',
  'vs',
  'xonokai',
] as const

// Moves an item to a separate column
export function moveToColumn(
  source: t.Snippet[],
  destination: t.Snippet[],
  droppableSource: t.Source,
  droppableDestination: t.Destination,
) {
  const sourceClone = source.slice()
  const destClone = destination.slice()
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {} as Record<string, any>
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export function trim(str: string) {
  if (typeof str === 'string') return str.trim()
  return str
}

export function copyToClipboardPolyfill(text: string) {
  const elem = document.createElement('textarea')
  elem.innerText = text
  document.body.appendChild(elem)
  elem.select()
  document.execCommand('copy')
  elem.remove()
}

export function copyToClipboard(
  text: string,
  onError?: (error: null | any) => void,
) {
  if (typeof window !== 'undefined') {
    if (text) {
      let copy
      const splitText = text.split('\n').join('\n')
      // Browser supports new Clipboard API
      if (navigator) {
        navigator.permissions
          // @ts-ignore
          .query({ name: 'clipboard-write' })
          .then(({ state }: { state: string }) => {
            if (state === 'granted') {
              navigator.clipboard.writeText(text)
            } else {
              copyToClipboardPolyfill(splitText)
            }
          })
      }
      // Fallback for older browsers
      else {
        copyToClipboardPolyfill(splitText)
      }
    } else {
      let msg = 'Tried to copy text to clipboard but the text was empty'
      console.warn(msg)
      if (isFnc(onError)) onError(new Error(msg))
    }
  }
}
