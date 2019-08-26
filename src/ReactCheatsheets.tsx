import * as React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CheatsheetsContext from './Context'
import CheatsheetsContextProvider from './Provider'
import SnippetBox from './Snippet'
import { getRowStyle, getSnippetStyle } from './utils'
import * as types from './types'
import styles from './styles.css'

interface ReactCheatsheetProps {
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
  theme?: types.stylesheet
  onThemeChange?: () => void
  renderHeader?: () => React.ReactNode
  renderSnippet?: () => React.ReactNode
  renderActions?: () => React.ReactNode
}

const ReactCheatsheet: React.FC<ReactCheatsheetProps> = ({
  language,
  getRowStyle: getRowStyleProp,
  getSnippetStyle: getSnippetStyleProp,
  renderHeader,
  renderSnippet,
  renderActions,
  ...props
}) => {
  const ctx = React.useContext(CheatsheetsContext)
  const { rows, theme, onDragEnd } = ctx

  return (
    <div className={styles.rcsRoot}>
      <DragDropContext onDragEnd={onDragEnd} {...props}>
        {Array.isArray(rows) &&
          rows.map((row: types.Snippet[], rowIndex: number) => (
            <Droppable
              key={`row${rowIndex}`}
              droppableId={String(rowIndex + 1)}
              direction='horizontal'
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
                      ? getRowStyleProp(isDraggingOver, { index: rowIndex })
                      : getRowStyle(isDraggingOver, {
                          index: rowIndex,
                        })
                  }
                >
                  {row.map((props: types.Snippet, snippIndex: number) => {
                    const draggableId = `snippet_${rowIndex}${snippIndex}`
                    return (
                      <Draggable
                        key={draggableId}
                        draggableId={draggableId}
                        index={snippIndex}
                      >
                        {(provided: any, snapshot: any) => (
                          <SnippetBox
                            language={language}
                            theme={theme}
                            index={snippIndex}
                            draggableId={draggableId}
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
          ))}
      </DragDropContext>
    </div>
  )
}

export default ({ children, ...props }: any) => (
  <CheatsheetsContextProvider {...props}>
    <ReactCheatsheet />
  </CheatsheetsContextProvider>
)
