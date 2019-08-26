export type Destination = {
  droppableId: number | string
  index: number
}

export type DraggableProps = {
  id: string
  label: string
  content: string
  innerRef: any
  draggableProps: any
  dragHandleProps: any
  isDragging: boolean
  theme: stylesheet
  onCopy: (label: string, content: string) => void
}

export type Mode = 'FLUID'

export type onDragEndResult = {
  combine: null | any
  source: {
    droppableId: string
    index: number
  }
  destination: {
    droppableId: string
    index: number
  }
  draggableId: string
  mode: string
  reason: string
  type: string
}

export type Reason = 'DROP'

export type Snippet = {
  id: string
  title: string
  snippet: string
}

export type Snippets = Array<Snippet[]>

export type Source = Destination

export type stylesheet =
  | 'coy'
  | 'dark'
  | 'funky'
  | 'okaidia'
  | 'solarizedlight'
  | 'tomorrow'
  | 'twilight'
  | 'prism'
  | 'atomDark'
  | 'base16AteliersulphurpoolLight'
  | 'cb'
  | 'darcula'
  | 'duotoneDark'
  | 'duotoneEarth'
  | 'duotoneForest'
  | 'duotoneLight'
  | 'duotoneSea'
  | 'duotoneSpace'
  | 'ghcolors'
  | 'hopscotch'
  | 'pojoaque'
  | 'vs'
  | 'xonokai'

export type UseCheatsheetAction =
  | { type: 'set-column-count'; columnCount: number }
  | { type: 'set-rows'; rows: Array<Snippet[]> }
  | { type: 'set-theme'; theme: stylesheet }

export type UseCheatsheetState = {
  rows: Array<Snippet[]>
  columnCount: number
  theme: stylesheet
}
