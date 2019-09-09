import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import Snippet from './Snippet'

const SortableItem = ({
  language,
  theme,
  column,
  id,
  title,
  snippet,
  renderHeader,
  renderSnippet,
  renderActions,
  ...rest
}) => {
  return (
    <Snippet
      language={language}
      theme={theme}
      index={column}
      renderHeader={renderHeader}
      renderSnippet={renderSnippet}
      renderActions={renderActions}
      {...rest}
    />
  )
}

export default SortableElement(SortableItem)
