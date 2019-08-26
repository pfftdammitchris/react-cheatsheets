import * as React from 'react'
import * as stylesheets from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { trim } from './utils'
import { stylesheet } from './types'
import styles from './styles.css'

interface SnippetProps {
  language?: string
  theme: stylesheet
  title: React.ReactNode
  snippet: string
  index: number
  draggableId: string
  popup: any
  innerRef: any
  draggableProps: any
  dragHandleProps: any
  isDragging: any
  getSnippetStyle: (
    isDragging: boolean,
    draggableStyle: React.CSSProperties,
    { index }: { index?: number },
  ) => React.CSSProperties
  renderHeader?: (props: any) => React.ReactNode
  renderSnippet?: (props: any) => React.ReactNode
  renderActions?: (props: any) => React.ReactNode
}

const SnippetContent: React.FC<{ theme: stylesheet; language: string }> = ({
  children,
  theme,
  language,
}) => (
  <div>
    <SyntaxHighlighter
      language={language}
      style={stylesheets[theme]}
      codeTagProps={{}}
      customStyle={{
        lineHeight: 0.95,
        padding: 4,
      }}
    >
      {children}
    </SyntaxHighlighter>
  </div>
)

const Snippet: React.FC<SnippetProps> = ({
  language = 'jsx',
  theme,
  title,
  snippet,
  index,
  popup,
  draggableId,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  getSnippetStyle,
  renderHeader,
  renderSnippet,
  renderActions,
}) => {
  const renderProps = {
    snippet,
    popup,
    index,
    isDragging,
    draggableId,
    ...draggableProps,
    ...dragHandleProps,
  }

  return (
    <span
      ref={innerRef}
      {...draggableProps}
      style={getSnippetStyle(isDragging, draggableProps.style, { index })}
      {...dragHandleProps}
    >
      {renderHeader ? (
        renderHeader(renderProps)
      ) : (
        <span className={styles.snippetTitle}>
          <div>{title}</div>
          {renderActions && renderActions(renderProps)}
        </span>
      )}
      <SnippetContent language={language} theme={theme}>
        {renderSnippet ? renderSnippet(renderProps) : trim(snippet)}
      </SnippetContent>
    </span>
  )
}

export default Snippet
