import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnBeforeCaptureResponder,
  OnBeforeDragStartResponder,
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from 'react-beautiful-dnd'
import {
  filterBadSnippets,
  formatSnippets,
  getRowIndex,
  getRowStyle,
  getRowSnippets,
  getSnippetStyle,
  isArr,
  isFnc,
  isObj,
  isNum,
  moveToColumn,
  reorder,
} from './utils'
import SnippetBox from './Snippet'
import * as t from './types'

const DEFAULT_COLUMN_COUNT = 3
const DEFAULT_THEME = 'coy'

export const Context = React.createContext<t.ReactCheatsheetsContext>(
  {} as t.ReactCheatsheetsContext,
)

export interface ReactCheatsheetsProps {
  columnCount?: number
  language?: string
  getRowStyle?: (
    isDragging: boolean,
    { index }: { index?: number },
  ) => React.CSSProperties
  getSnippetStyle?: (
    isDragging: boolean,
    draggableStyle: React.CSSProperties,
    { index }: { index?: number },
  ) => React.CSSProperties
  theme?: t.stylesheet
  onThemeChange?: () => void
  rows?: t.Snippet[][]
  renderHeader?: () => React.ReactNode
  renderSnippet?: () => React.ReactNode
  renderActions?: () => React.ReactNode
  snippets: t.Snippet[]
}

export const initialState = {
  columnCount: DEFAULT_COLUMN_COUNT,
  rows: [] as t.Snippet[][],
  theme: DEFAULT_THEME as t.stylesheet,
}

function ReactCheatsheets({
  columnCount = DEFAULT_COLUMN_COUNT,
  language: languageProp = 'jsx',
  getRowStyle: getRowStyleProp,
  getSnippetStyle: getSnippetStyleProp,
  rows = [],
  renderHeader,
  renderSnippet,
  renderActions,
  snippets = [],
  theme = DEFAULT_THEME,
  ...props
}: ReactCheatsheetsProps) {
  const [state, setState] = React.useState(() => {
    return {
      ...initialState,
      columnCount,
      rows: formatSnippets(filterBadSnippets(snippets), columnCount),
      theme,
    }
  })

  /**
   * A drag is about to start and dimensions have not been collected from the DOM
   */
  const onBeforeCapture: OnBeforeCaptureResponder = React.useCallback(
    (args) => {
      // console.log(`[onBeforeCapture] args`, args)
    },
    [],
  )

  const onBeforeDragStart: OnBeforeDragStartResponder = React.useCallback(
    (args) => {
      // console.log(`[onBeforeDragStart] args`, args)
    },
    [],
  )

  const onDragStart: OnDragStartResponder = React.useCallback((args) => {
    // console.log(`[onDragStart] args`, args)
  }, [])

  const onDragEnd: OnDragEndResponder = React.useCallback(
    (dropResult, provided) => {
      // console.log(`[onDragEnd]`, { dropResult, provided })
      if (!dropResult.destination) return
      const { source, destination } = dropResult
      const isSameRow = source.droppableId === destination.droppableId
      let nextRows = state.rows.slice()

      if (isSameRow) {
        const rowIndex = getRowIndex(source.droppableId)
        const nextRowItems = reorder(
          getRowSnippets(state.rows, source.droppableId),
          source.index,
          destination.index,
        )
        nextRows[rowIndex] = nextRowItems
        ctx.setRows(nextRows)
      }
      // Item is being dragged to a separate column
      else {
        const result = moveToColumn(
          getRowSnippets(state.rows, source.droppableId),
          getRowSnippets(state.rows, destination.droppableId),
          source,
          destination,
        )
        const rowIndexFrom = getRowIndex(source.droppableId)
        const rowIndexTo = getRowIndex(destination.droppableId)
        nextRows[rowIndexFrom] = result[source.droppableId]
        nextRows[rowIndexTo] = result[destination.droppableId]
        ctx.setRows(nextRows)
      }
    },
    [state.rows],
  )

  const onDragUpdate: OnDragUpdateResponder = React.useCallback(
    (update, provided) => {
      // console.log(`[onDragUpdate]`, { update, provided })
    },
    [],
  )

  const ctx: t.ReactCheatsheetsContext = {
    ...state,
    language: languageProp,
    snippets,
    setColumnCount: React.useCallback((columnCount: number) => {
      setState((prevState) => ({ ...prevState, columnCount }))
    }, []),
    setRows: React.useCallback((rows: t.Snippet[][]) => {
      setState((prevState) => ({ ...prevState, rows }))
    }, []),
    setTheme: React.useCallback((theme: t.stylesheet) => {
      setState((prevState) => ({ ...prevState, theme }))
    }, []),
  }

  React.useEffect(() => {
    let updates: Partial<t.ReactCheatsheetsState> | undefined

    if (theme && state.theme !== theme) {
      updates = { ...updates, theme }
    }

    if (isNum(columnCount) && state.columnCount !== columnCount) {
      updates = { ...updates, columnCount }
    }

    if (updates) {
      setState((prevState) => ({ ...prevState, ...updates }))
    }
  }, [state.columnCount, columnCount, state.theme, theme])

  return (
    <Context.Provider value={ctx}>
      <div>
        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onBeforeDragStart={onBeforeDragStart}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragUpdate={onDragUpdate}
          {...props}
        >
          {isArr(state.rows)
            ? state.rows.map((row, rowIndex: number) => {
                const initialRow = row[0] || {}
                return (
                  <Droppable
                    key={initialRow.id || initialRow.title || rowIndex}
                    droppableId={String(rowIndex + 1)}
                    direction="horizontal"
                  >
                    {(
                      { innerRef, droppableProps, placeholder }: any,
                      { isDraggingOver }: any,
                    ) => (
                      <div
                        {...droppableProps}
                        ref={innerRef}
                        style={
                          getRowStyleProp
                            ? getRowStyleProp(isDraggingOver, {
                                index: rowIndex,
                              })
                            : getRowStyle(isDraggingOver, {
                                index: rowIndex,
                              })
                        }
                      >
                        {row.map((props: t.Snippet, snippIndex: number) => {
                          const draggableId = `snippet_${rowIndex}${snippIndex}`
                          return (
                            <Draggable
                              key={draggableId}
                              draggableId={draggableId}
                              index={snippIndex}
                            >
                              {(provided, snapshot) => (
                                <SnippetBox
                                  language={languageProp}
                                  theme={state.theme}
                                  index={snippIndex}
                                  innerRef={provided.innerRef}
                                  draggableProps={provided.draggableProps}
                                  dragHandleProps={provided.dragHandleProps}
                                  isDragging={snapshot.isDragging}
                                  getSnippetStyle={
                                    getSnippetStyleProp || getSnippetStyle
                                  }
                                  renderHeader={renderHeader}
                                  renderSnippet={renderSnippet}
                                  renderActions={renderActions}
                                  {...props}
                                />
                              )}
                            </Draggable>
                          )
                        })}
                        {placeholder}
                      </div>
                    )}
                  </Droppable>
                )
              })
            : null}
        </DragDropContext>
      </div>
    </Context.Provider>
  )
}

export default ReactCheatsheets
