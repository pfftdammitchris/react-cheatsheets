import React from 'react'
import { Grid, Header, Loader, Ref, Segment } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Context, { CheatsheetContextProvider } from './Context'
import CodeBox from './CodeBox'
import { getListStyle, getItemStyle, stylesheets, trim } from './utils'
import { ColumnItem, DraggableProps } from './types'
import styles from './styles.css'
import 'semantic-ui-css/semantic.min.css'

interface ReactCheatsheetProps {
  render: (args: any) => any
}

const Column = React.memo(
  ({
    label,
    content,
    innerRef,
    draggableProps,
    dragHandleProps,
    isDragging,
    theme,
  }: DraggableProps) => (
    <div
      ref={innerRef}
      {...draggableProps}
      style={getItemStyle(isDragging, draggableProps.style)}
      {...dragHandleProps}
    >
      <Header className={styles.boxLabel} size='small'>
        {label}
      </Header>
      <CodeBox theme={theme}>{trim(content)}</CodeBox>
    </div>
  ),
)

const ReactCheatsheet: React.FC<ReactCheatsheetProps> = ({ render }) => {
  const ref = React.createRef<any>()
  const ctx = React.useContext(Context)
  const {
    columns,
    columnCount,
    columnWidth,
    theme,
    onDragEnd,
    onThemeChange,
  } = ctx

  const Cheatsheet: React.FC<any> = (props) => (
    <Segment style={{ minHeight: 300 }} basic>
      {columns === null ? (
        <Loader size='big' inline='centered' active>
          Loading...
        </Loader>
      ) : (
        <DragDropContext onDragEnd={onDragEnd} {...props}>
          <Ref innerRef={ref}>
            <Grid columns={columnCount} centered>
              <Grid.Row>
                {columns &&
                  columns.map((column: ColumnItem[], index: number) => (
                    <Grid.Column key={`col${index}`}>
                      <Droppable droppableId={index + 1}>
                        {(
                          { innerRef, droppableProps, placeholder }: any,
                          { isDraggingOver }: any,
                        ) => (
                          <div
                            ref={innerRef}
                            style={getListStyle(isDraggingOver, {
                              columnWidth,
                            })}
                            {...droppableProps}
                          >
                            {column.map(
                              (
                                { id, label, content }: ColumnItem,
                                index: number,
                              ) => (
                                <Draggable
                                  key={`draggableId${id}`}
                                  draggableId={id}
                                  index={index}
                                >
                                  {(provided: any, snapshot: any) => (
                                    <Column
                                      index={index}
                                      label={label}
                                      content={content}
                                      theme={theme}
                                      {...provided}
                                      {...snapshot}
                                    />
                                  )}
                                </Draggable>
                              ),
                            )}
                            {placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </Ref>
        </DragDropContext>
      )}
    </Segment>
  )

  return render({
    Cheatsheet,
    ref,
    columns,
    columnWidth,
    theme,
    stylesheets,
    onThemeChange,
  })
}

export default ({ render, ...props }: any) => (
  <CheatsheetContextProvider {...props}>
    <ReactCheatsheet render={render} />
  </CheatsheetContextProvider>
)
