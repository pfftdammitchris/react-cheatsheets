# react-csheets

## Generate cheat sheets using React

Lots of todos to be done but it can still be used. Documentation is ongoing. Feel free to contribute in the mean time!

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
```

## Props

### **snippets**: `Array<Snippet[]>` (required)

An array of `Snippet` objects to be rendered in the cheat sheet. Before it gets shown in the interface, it will go through a final formatting stage where the output will be an array of arrays of snippet objects.

For example:

```js
const snippets = [
  [
    { id: 'id1', title: '...', snippet: '...' },
    { id: 'id2', title: '...', snippet: '...' },
    { id: 'id3', title: '...', snippet: '...' },
  ],
  [
    { id: 'id4', title: '...', snippet: '...' },
    { id: 'id5', title: '...', snippet: '...' },
    { id: 'id6', title: '...', snippet: '...' },
  ],
  [{ id: 'id7', title: '...', snippet: '...' }],
]
```

### **columnCount**: `number` (optional) defaults to 3

`columnCount` will update the amount of columns that are shown in the cheat sheet.

### **language**: `string` (optional) defaults to `jsx`

Changes the language syntax of the snippets. You can check all of the available options [here](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD). This will reflect through all of the snippets in the cheat sheet.

### **theme**: `stylesheet` (optional) defaults to `'coy'`

Changing the theme can dramatically change the look and feel of the cheat sheets accordingly to you or user's likings.

### **onDragEnd**: `(rows: Array<Snippet[]>) => void` (optional)

Optional callback to call when a snippet box was dragged.

The argument will be passed in the new rows as the first argument

### **renderHeader**: `({ title?: React.ReactNode, isDragging: boolean, index: number }) => React.ReactNode` (optional)

Optionally pass this in to override the rendering of the header

### **renderSnippet**: `({ snippet: string, popup: Popup, index: number, isDragging: boolean }) => React.ReactNode` (optional)

Optionally pass this in to override the rendering of the snippet box

### **renderActions**: `({ snippet: string, index: number, isDragging: boolean }) => React.ReactNode` (optional)

Optionally pass this in to override the rendering of action buttons/icons (shares the same block as the header)

## Dependencies

- react-beautiful-dnd
- react-syntax-highlighter

## License

MIT © [pfftdammitchris](https://github.com/pfftdammitchris)
