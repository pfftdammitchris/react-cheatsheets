# react-csheets

## Generate cheat sheets using React

Originally planned to be named _react-cheatsheets_ but "cheat" was forbidden in the registry, so we now have `react-csheets`!

![react-csheets thumbnail](https://s3.us-west-1.amazonaws.com/christran.dev/posts/react-csheet/react-cheatsheet1.png)

## Install

```bash
npm install --save react-csheets
```

## Usage

**This package requires React v16.9.0 or above**

```tsx
import React from 'react'
import Cheatsheets from 'react-csheets'

const snippets = [
  {
    id: 'snipp1',
    title: 'Fragments',
    snippet: `
// Does not support key attribute
const App = () => (
  <>
    <MyComponent />
  </>
)
// Supports key attribute
const App = () => (
  <React.Fragment key="abc123">
    <MyComponent />
  </React.Fragment>
)`,
  },
  {
    id: 'snipp2',
    title: 'Default Props',
    snippet: `
// Function component
const MyComponent = (props) => <div {...props} />
MyComponent.defaultProps = { fruit: 'apple' }

// Class component
class MyComponent extends React.Component {
  static defaultProps = { fruit: 'apple' }
  render() { return <div {...this.props} /> }
}  
`,
  },
  {
    id: 'snipp3',
    title: 'Imports / Exports',
    snippet: `
// default export
const App = (props) => <div {...props} />
export default App
import App from './App'

// named export
export const App = (props) => <div {...props} />
import { App } from './App'
`,
  },
  {
    id: 'snipp4',
    title: 'Return Types',
    snippet: `
const App = () => 'a basic string'    // string
const App = () => 1234567890          // number
const App = () => true                // boolean 
const App = () => null                // null
const App = () => <div />             // react element
const App = () => <MyComponent />     // component
const App = () => [                   // array
  'a basic string',
  1234567890,
  true,
  null,
  <div />,
  <MyComponent />,
]
`,
  },
]

const App = () => {
  function onDragEnd(rows) {
    console.log('new rows: ', rows)
  }

  return (
    <Cheatsheets
      snippets={snippets}
      columnCount={3}
      language='jsx'
      theme='coy'
      onDragEnd={onDragEnd}
    />
  )
}

export default App
```

## TypeScript

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

type RenderHeader = ({ title?: React.ReactNode, isDragging: boolean, index: number }) => React.ReactNode

type RenderSnippet ({ snippet: string, popup: Popup, index: number, isDragging: boolean }) => React.ReactNode

type RenderActions = ({ snippet: string, index: number, isDragging: boolean }) => React.ReactNode
```

## Props

| **Prop**                | **Type**                           | **Default** | **Description**                                                                                                                                                                                     |
| ----------------------- | ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| snippets (**Required**) | `Snippet[]`                        | undefined   | An array of `Snippet` objects. Before it gets sent to the interface it will go through a final formatting stage in which the output becomes an array of arrays of snippet objects.                  |
| columnCount             | `number`                           | 3           | Updates the number of columns in the cheat sheet.                                                                                                                                                   |
| language                | `string`                           | jsx         | Changes the language syntax of the snippets. You can check all of the available options [here](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD). |
| theme                   | `string`                           | coy         | Changes the stylesheet of the snippets. This can dramatically change the look and feel of the cheat sheet.                                                                                          |
| onDragEnd               | `(rows: Array<Snippet[]>) => void` | OnDragEnd   | Optional callback to call when the snippet box was dragged. The new rows will be passed in as the first argument.                                                                                   |
| renderHeader            | `RenderHeader`                     | undefined   | Optionally pass this in to override the rendering of the header                                                                                                                                     |
| renderSnippet           | `RenderSnippet`                    | undefined   | Optionally pass this in to override the rendering of the snippet box                                                                                                                                |
| renderActions           | `RenderActions`                    | undefined   | Optionally pass this in to override the rendering of action buttons/icons (shares the same block as the header)                                                                                     |

## Dependencies

- react-beautiful-dnd
- react-syntax-highlighter

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
