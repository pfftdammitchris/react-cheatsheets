import * as React from 'react'
import * as stylesheets from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { trim } from './utils'
import { stylesheet } from './types'
import styles from './styles.css'

interface SnippetProps {
  language?: string
  theme: stylesheet
  id: string
  title: React.ReactNode
  content: string
  index: number
  popup: any
  renderHeader?: (options?: {
    title?: React.ReactNode
    index: number
  }) => React.ReactNode
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
        fontSize: '0.8rem',
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
  id,
  title,
  content,
  index,
  popup,
  renderHeader,
  renderSnippet,
  renderActions,
}) => (
  <span>
    {renderHeader ? (
      renderHeader({ title, index })
    ) : (
      <span className={styles.snippetTitle}>
        <div>{title}</div>
        {renderActions &&
          renderActions({
            content,
            title,
            index,
          })}
      </span>
    )}
    <SnippetContent language={language} theme={theme}>
      {renderSnippet
        ? renderSnippet({
            content,
            popup,
            index,
          })
        : content}
    </SnippetContent>
  </span>
)

export default Snippet
