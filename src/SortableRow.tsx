import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import * as types from './types'
import Snippet from './Snippet'

const SortableSnippet = SortableElement(Snippet)

// TODO: use rowIndex for page-break in printable pdfs
const SortableRow = ({ language, theme, rowIndex, rowSnippets }) => {
  return (
    <div>
      {rowSnippets.map((props: types.Snippet, index: number) => (
        <SortableSnippet
          key={`snipp${index}`}
          collection={rowIndex}
          index={index}
          language={language}
          theme={theme}
          {...props}
        />
      ))}
    </div>
  )
}

export default SortableContainer(SortableRow)
