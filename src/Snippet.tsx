import React from 'react'
import * as stylesheets from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { trim } from './utils'
import * as t from './types'
import styles from './styles.css'

export interface SnippetProps {
  language?: string
  theme: t.stylesheet
  title: React.ReactNode
  snippet: string
  index: number
  popup?: any
  innerRef: any
  draggableProps: any
  dragHandleProps: any
  isDragging: any
  getSnippetStyle: (
    isDragging: boolean,
    draggableStyle: React.CSSProperties,
    { index }: { index?: number },
  ) => React.CSSProperties
  renderHeader?: (options?: {
    title?: React.ReactNode
    isDragging: boolean
    index: number
  }) => React.ReactNode
  renderSnippet?: (props: any) => React.ReactNode
  renderActions?: (props: any) => React.ReactNode
}

function SnippetContent({
  children,
  theme,
  language,
}: React.PropsWithChildren<
  Pick<t.ReactCheatsheetsContext, 'language' | 'theme'>
>) {
  return (
    <div>
      <SyntaxHighlighter
        language={language}
        style={stylesheets[theme]}
        codeTagProps={{}}
        customStyle={{
          fontSize: '0.8rem',
          lineHeight: 0.95,
          padding: 4,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

function Snippet({
  language = 'jsx',
  theme,
  title,
  snippet,
  index,
  popup,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  getSnippetStyle,
  renderHeader,
  renderSnippet,
  renderActions,
}: SnippetProps) {
  return (
    <span
      ref={innerRef}
      {...draggableProps}
      style={getSnippetStyle(isDragging, draggableProps.style, { index })}
      {...dragHandleProps}
    >
      {renderHeader ? (
        renderHeader({ title, isDragging, index })
      ) : (
        <span className={styles.snippetTitle}>
          <div>{title}</div>
          {renderActions &&
            renderActions({
              snippet,
              index,
              isDragging,
            })}
        </span>
      )}
      <SnippetContent language={language} theme={theme}>
        {renderSnippet
          ? renderSnippet({
              snippet,
              popup,
              index,
              isDragging,
            })
          : trim(snippet)}
      </SnippetContent>
    </span>
  )
}

export default Snippet
