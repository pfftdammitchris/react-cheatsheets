import React from 'react'
import ReactCheatsheet from 'react-cheatsheet'
import * as snippet from './snippets'

const sections = [
  {
    id: 'contextRefs',
    label: 'Context, Refs, memo, lazy, Suspense',
    content: snippet.methods,
  },
  {
    id: 'returnTypes',
    label: 'Valid Return Types',
    content: snippet.returnTypes,
  },
  { id: 'error', label: 'Error', content: snippet.errors },
  {
    id: 'strict',
    label: 'Strict mode (detecting deprecations, side effects)',
    content: snippet.modes,
  },
  { id: 'fragments', label: 'Fragment', content: snippet.fragments },
  { id: 'hooks', label: 'Hooks', content: snippet.hooks },
  { id: 'defaultProps', label: 'Default Props', content: snippet.defaultProps },
  { id: 'states', label: 'Component States', content: snippet.states },
  { id: 'importing', label: 'Importing Components', content: snippet.imports },
  { id: 'rendering', label: 'Rendering Components', content: snippet.renders },
  { id: 'statics', label: 'Static Methods', content: snippet.statics },
  {
    id: 'pointerEvents',
    label: 'Pointer Events',
    content: snippet.pointerEvents,
  },
  {
    id: 'test',
    label: 'Test utils (act)',
    content: snippet.testing,
  },
]

const filename = 'reactv16cheatsheet'

const ReactCheatsheetPage = () => {
  function wrappedOnThemeChange(onThemeChange) {
    return (e, data) => onThemeChange(data.value)
  }

  const columnCount = 3

  return (
    <ReactCheatsheet
      columnCount={columnCount}
      sections={sections}
      render={({ Cheatsheet, ref, onThemeChange }) => (
        <div style={{ width: '100%' }}>
          <Cheatsheet />
        </div>
      )}
    />
  )
}

export default ReactCheatsheetPage
