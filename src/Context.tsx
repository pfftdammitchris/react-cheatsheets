import React from 'react'
import {
  getColumnIndex,
  moveToColumn,
  reorder,
  toChunks,
  stylesheets,
} from './utils'
import {
  ColumnItem,
  UseCheatsheetAction as Action,
  UseCheatsheetState as State,
  onDragEndResult,
  stylesheet,
} from './types'

const lscKey = 'rcs16columns'
const lstKey = 'rcs16theme'

const getFromStorage = (key: string, json: boolean = true) => {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV !== 'development') {
      try {
        const val = window.localStorage.getItem(key)
        if (!val) return false
        if (json) return JSON.parse(val) || false
        return val
      } catch (error) {
        console.error(error)
        return false
      }
    }
  }
}

const context: State = {
  columns: null,
  columnWidth: 350, // default
  columnCount: 1,
  theme: 'coy',
}

const CheatsheetContext = React.createContext<any>(context)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-columns':
      return { ...state, columns: action.columns }
    case 'set-column-width':
      return { ...state, columnWidth: action.width }
    case 'set-theme':
      return { ...state, theme: action.theme }
    default:
      return state
  }
}

const useCheatsheet = ({
  columnCount,
  sections,
}: {
  columnCount: number
  sections: Array<ColumnItem[]>
}) => {
  let initialColumns = getFromStorage(lscKey)
  if (!initialColumns) {
    initialColumns = toChunks(
      sections,
      Math.ceil(sections.length / columnCount),
    )
  }
  const [state, dispatch] = React.useReducer(reducer, {
    ...context,
    theme: getFromStorage(lstKey, false) || context.theme,
    columns: initialColumns,
    columnCount,
  })

  function onThemeChange(theme: stylesheet) {
    if (theme) {
      window.localStorage.setItem(lstKey, theme)
      dispatch({ type: 'set-theme', theme })
    }
  }

  // We made the droppableId always start at 1 instead of 0
  function getColumnItems(
    droppableId: number | string,
    index?: number,
  ): ColumnItem[] {
    index = typeof index === 'number' ? index : getColumnIndex(droppableId)
    return state.columns ? state.columns[index] : []
  }

  function onDragEnd(result: onDragEndResult) {
    const { source, destination } = result
    if (!destination) {
      return
    }
    const isSameColumn = source.droppableId === destination.droppableId
    let nextColumns = state.columns ? state.columns.slice() : []
    if (isSameColumn) {
      const columnIndex = getColumnIndex(source.droppableId)
      const nextColumnItems = reorder(
        getColumnItems(source.droppableId),
        source.index,
        destination.index,
      )
      nextColumns[columnIndex] = nextColumnItems
      dispatch({ type: 'set-columns', columns: nextColumns })
    }
    // Item is being dragged to a separate column
    else {
      const result = moveToColumn(
        getColumnItems(source.droppableId),
        getColumnItems(destination.droppableId),
        source,
        destination,
      )
      const columnIndexFrom = getColumnIndex(source.droppableId)
      const columnIndexTo = getColumnIndex(destination.droppableId)
      nextColumns[columnIndexFrom] = result[source.droppableId]
      nextColumns[columnIndexTo] = result[destination.droppableId]
      dispatch({ type: 'set-columns', columns: nextColumns })
    }
    window.localStorage.setItem(lscKey, JSON.stringify(nextColumns))
  }

  React.useEffect(() => {
    const computeNextWidth = () => {
      dispatch({
        type: 'set-column-width',
        width: Math.floor(window.innerWidth / columnCount),
      })
    }
    computeNextWidth()
    window.addEventListener('resize', computeNextWidth)
    return () => {
      window.removeEventListener('resize', computeNextWidth)
    }
    // prettier-disable
  }, [])

  return {
    ...state,
    onDragEnd,
    onThemeChange,
    stylesheets,
  }
}

export const CheatsheetContextProvider = ({ children, ...props }: any) => (
  <CheatsheetContext.Provider value={useCheatsheet(props)}>
    {children}
  </CheatsheetContext.Provider>
)

export default CheatsheetContext
