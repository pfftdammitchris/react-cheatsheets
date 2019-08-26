# react-cheatsheets

## Generate cheat sheets using React

Lots of todos to be done but it can still be used. Documentation is ongoing.

![react-cheatsheets thumbnail](https://pfftdammitchris-react.s3-us-west-1.amazonaws.com/react-cheatsheets/thumbnail.jpg)

## Install

```bash
npm install --save react-cheatsheets
```

## Usage

**This package requires React v16.9.0 or above**

```tsx
import React from 'react'
import ReactCheatsheets from 'react-cheatsheets'
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

type Popup = {
  context?: any
  timeout?: number
  onOpen?: (args?: any) => void
  onClose?: (args?: any) => any
}

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

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
