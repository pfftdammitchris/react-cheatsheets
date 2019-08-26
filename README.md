# react-csheets

## Generate cheat sheets using React

Lots of todos to be done but it can still be used. Documentation is ongoing.

Originally planned to be named _react-cheatsheets_ but "cheat" was forbidden in the registry, so we now have `react-csheets`!

![react-csheets thumbnail](https://pfftdammitchris-react.s3-us-west-1.amazonaws.com/react-cheatsheets/thumbnail.jpg)

## Install

```bash
npm install --save react-csheets
```

## Usage

**This package requires React v16.9.0 or above**

```tsx
import React from 'react'
import ReactCheatsheets from 'react-csheets'
import snippets from './snippets'

const App = () => {
  function onThemeChange() {
    console.log('theme changed')
  }

  function onDragEnd(result) {
    console.log('results: ', result)
  }

  return (
    <ReactCheatsheets
      snippets={snippets}
      columnCount={3}
      language='jsx'
      theme='coy'
      onThemeChange={onThemeChange}
      onDragEnd={onDragEnd}
    />
  )
}

export default App
```

## Interfaces

```ts
type Snippet = {
  id: string
  title: string
  snippet: string
}

type stylesheet =
  | 'coy'
  | 'dark'
  | 'funky'
  | 'okaidia'
  | 'solarizedlight'
  | 'tomorrow'
  | 'twilight'
  | 'prism'
  | 'atomDark'
  | 'base16AteliersulphurpoolLight'
  | 'cb'
  | 'darcula'
  | 'duotoneDark'
  | 'duotoneEarth'
  | 'duotoneForest'
  | 'duotoneLight'
  | 'duotoneSea'
  | 'duotoneSpace'
  | 'ghcolors'
  | 'hopscotch'
  | 'pojoaque'
  | 'vs'
  | 'xonokai'

type RenderProps = ({
  snippet: Snippet,
  popup: Popup,
  index: number,
  isDragging: boolean,
  draggableId: string,
  ...draggableProps,
  ...dragHandleProps
}) => React.ReactNode

// For more info visit https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/types.md

type OnDragEnd = (
  result: {
    destination: {
      droppableId: string
      index: number
    } | null
    draggableId: string
    type: string
    source: {
      droppableId: string
      index: number
    }
    mode: 'FLUID' | 'SNAP'
    combine: {
      draggableId: string
      droppableId: string
    }
    reason: 'DROP' | 'CANCEL'
  },
  provided: ResponderProvided,
) => void
```

## Props

> snippets: Array<Snippet[]> (required)

> columnCount: number (optional) defaults to 3

> language: string (optional) defaults to `jsx`

> theme: stylesheet (optional) defaults to `'coy'`

> onThemeChange: () => void (optional)

> onDragEnd: OnDragEnd (optional)

> renderHeader: (props: RenderProps) => React.ReactNode (optional)

> renderSnippet: (props: RenderProps) => React.ReactNode (optional)

> renderActions: (props: RenderProps) => React.ReactNode (optional)

## Dependencies

- react-beautiful-dnd
- react-syntax-highlighter

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
