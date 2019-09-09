import * as React from 'react'
import SortableRow from './SortableRow'
import CheatsheetsContext from './Context'
import CheatsheetsContextProvider from './Provider'
import * as types from './types'
import styles from './styles.css'

interface ReactCheatsheetProps {
  language?: string
  theme?: types.stylesheet
  renderHeader?: () => React.ReactNode
  renderSnippet?: () => React.ReactNode
  renderActions?: () => React.ReactNode
}

const ReactCheatsheet: React.FC<ReactCheatsheetProps> = () => {
  const ctx = React.useContext(CheatsheetsContext)
  const { rows, language, theme, onSortEnd } = ctx

  return (
    <div className={styles.rcsRoot}>
      {Array.isArray(rows) &&
        rows.map((snippets: types.Snippet[], rowIndex: number) => (
          <SortableRow
            key={`row${rowIndex}`}
            axis='xy'
            onSortEnd={onSortEnd}
            rowIndex={rowIndex}
            rowSnippets={snippets}
            language={language}
            theme={theme}
          />
        ))}
    </div>
  )
}

export default ({ children, ...props }: any) => (
  <CheatsheetsContextProvider {...props}>
    <ReactCheatsheet />
  </CheatsheetsContextProvider>
)
