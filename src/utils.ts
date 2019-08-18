import { ColumnItem, Destination, Source } from './types'

let html2canvas: any, html2pdf: any

if (typeof window !== 'undefined') {
  html2canvas = require('html2canvas')
  html2pdf = require('html2pdf.js')
}

export function download(data: Blob, { filename }: { filename?: string } = {}) {
  const dlLink = window.URL.createObjectURL(data)
  const linkEl = document.createElement('a')
  linkEl.download = filename || ''
  linkEl.href = dlLink
  linkEl.click()
  linkEl.remove()
  window.URL.revokeObjectURL(dlLink)
}

export function createPdfFile(blob: Blob, options: { filename?: string } = {}) {
  const data = new FormData()
  data.append('file', blob, options.filename)
  // @ts-ignore
  const appendData = (key: string) => data.append(key, options[key])
  Object.keys(options).forEach(appendData)
  return data.get('file')
}

export function generatePdf(filename: string) {
  return async (elem: HTMLElement) => {
    await html2pdf(elem, {
      filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        x: 0,
        y: -25,
        width: 900,
        windowWidth: 900,
      },
    })
  }
}

export function generateJPEG(filename: string) {
  return async (elem: HTMLElement) => {
    try {
      const canvas = await generateCanvas(elem)
      canvas.toBlob((blob: Blob) => {
        download(blob, { filename: `${filename}.png` })
      })
    } catch (error) {
      throw error
    }
  }
}

export function generateCanvas(elem: HTMLElement, options?: any) {
  return html2canvas(elem, {
    x: 0,
    y: 250,
    width: 1440,
    windowWidth: 1440,
    ...options,
  })
}

export function getColumnIndex(droppableId: string | number) {
  return Number(droppableId) - 1
}

export function getItemStyle(isDragging: any, draggableStyle: any) {
  return {
    userSelect: 'none',
    background: isDragging ? '#eef5f9' : undefined,
    outline: 'none',
    ...draggableStyle,
  }
}

export function getListStyle(isDraggingOver: any, options: any = {}) {
  return {
    background: isDraggingOver ? '#333' : undefined,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    width: '100%',
    // maxWidth: options.columnWidth,
  }
}

// Moves an item to a separate column
export function moveToColumn(
  source: ColumnItem[],
  destination: ColumnItem[],
  droppableSource: Source,
  droppableDestination: Destination,
) {
  const sourceClone = source.slice()
  const destClone = destination.slice()
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export function reorder(columnItems: ColumnItem[], start: number, end: number) {
  const result = columnItems.slice()
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
]

export function toChunks(array: any[], size: number) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

export function trim(str: string) {
  return str && str.trim()
}
