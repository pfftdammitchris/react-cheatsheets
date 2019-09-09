import * as React from 'react'
import CheatsheetContext, { context as initialState } from './Context'
import {
  filterBadSnippets,
  getRowIndex,
  moveToColumn,
  reorder,
  stylesheets,
  formatSnippets,
} from './utils'
import {
  Snippet,
  UseCheatsheetAction as Action,
  UseCheatsheetState as State,
  onDragEndResult,
  stylesheet,
} from './types'

interface UseCheatsheetsArgs {
  snippets: Snippet[]
  language?: string
  columnCount?: number
  theme?: stylesheet
  onThemeChange?: () => void
  onDragEnd?: (args: any) => void
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-column-count':
      return { ...state, columnCount: action.columnCount }
    case 'set-rows':
      return { ...state, rows: action.rows }
    case 'set-theme':
      return { ...state, theme: action.theme || initialState.theme }
    case 'set-language':
      return { ...state, language: action.language || state.language }
    default:
      return state
  }
}

function initSnippets(
  snippets: Snippet[],
  columnCount: number,
): Array<Snippet[]> {
  const args = Array.prototype.slice.call(arguments)
  if (!args.length) {
    throw new Error('"snippets" is required')
  } else if (snippets == null) {
    throw new Error('"snippets" is null or undefined')
  } else if (!Array.isArray(snippets)) {
    throw new Error('"snippets" is not an array')
  }
  const filtered = filterBadSnippets(snippets)
  return formatSnippets(filtered, columnCount)
}

const useCheatsheet = ({
  language,
  snippets,
  columnCount = initialState.columnCount,
  theme: themeProp,
  onThemeChange: onThemeChangeProp,
  onDragEnd: onDragEndProp,
  renderHeader,
  renderSnippet,
  renderActions,
}: UseCheatsheetsArgs) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    language,
    rows: initSnippets(snippets, columnCount),
    theme: themeProp || initialState.theme,
    columnCount,
  })

  function onSortEnd({ oldIndex, newIndex, collection, isKeySorting }, e) {
    dispatch({ type: 'set-rows', rows: [] })
    const isSameRow = collection
  }

  function onDragEnd(result: onDragEndResult) {
    const { source, destination } = result
    if (!destination) {
      return
    }
    const isSameRow = source.droppableId === destination.droppableId
    let nextRows = state.rows.slice()

    if (isSameRow) {
      const rowIndex = getRowIndex(source.droppableId)
      const nextRowItems = reorder(
        getRowSnippets(source.droppableId),
        source.index,
        destination.index,
      )
      nextRows[rowIndex] = nextRowItems
      dispatch({ type: 'set-rows', rows: nextRows })
    }
    // Item is being dragged to a separate column
    else {
      const result = moveToColumn(
        getRowSnippets(source.droppableId),
        getRowSnippets(destination.droppableId),
        source,
        destination,
      )
      const rowIndexFrom = getRowIndex(source.droppableId)
      const rowIndexTo = getRowIndex(destination.droppableId)
      nextRows[rowIndexFrom] = result[source.droppableId]
      nextRows[rowIndexTo] = result[destination.droppableId]
      dispatch({ type: 'set-rows', rows: nextRows })
    }
    if (typeof onDragEndProp === 'function') {
      onDragEndProp(nextRows)
    }
  }

  React.useEffect(() => {
    // Update the state if props.columnCount changed
    if (columnCount !== state.columnCount) {
      dispatch({ type: 'set-column-count', columnCount })
    }
  }, [state.columnCount, columnCount])

  React.useEffect(() => {
    // is controlled
    if (themeProp) {
      if (state.theme !== themeProp) {
        dispatch({ type: 'set-theme', theme: themeProp })
      }
    }
  }, [onThemeChangeProp, state.theme, themeProp])

  return {
    ...state,
    onDragEnd,
    stylesheets,
    renderHeader,
    renderSnippet,
    renderActions,
  }
}

export const CheatsheetContextProvider = ({ children, ...props }: any) => (
  <CheatsheetContext.Provider value={useCheatsheet(props)}>
    {children}
  </CheatsheetContext.Provider>
)

export default CheatsheetContextProvider
