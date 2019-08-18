export const hooks = `
// useState (Use over useReducer for basic state)
    const [state, setState] = React.useState(initialState)
// useEffect (Runs after components have mounted)
    React.useEffect(() => {...}, [])
// useContext (Global state)
    const Context = React.createContext({ loaded: false })
    React.useContext(Context)
// useReducer (Use over useState for more complex state)
    const initialState = { loaded: false }
    const reducer = (state = initialState, action) => {...}
    const [state, dispatch] = React.useReducer(
      reducer,
      initialState
    )
// useCallback (Memoize functions)
    const handleClick = React.useCallback((e) => {...}, [])
// useMemo (Memoize values)
    import { compute } from '../utils'
    const memoize = React.useMemo(() => compute(miles, b), [b])
// useRef
    const timeoutRef = React.useRef()
    timeoutRef.current = setTimeout(() => {...}, 2000)
// useImperativeHandle (Customizes an assigned useRef)
    const MyComponent = (props, ref) => {
      const inputRef = useRef(null)
      React.useImperativeHandle(ref, () => inputRef.current)
      return <input type="text" name="someName" ref={inputRef} />
    }
// useLayoutEffect (Fires after all DOM mutations)
    React.useLayoutEffect(() => {...}, [])
// useDebugValue
    React.useDebugValue(10)
`

export const methods = `
// createContext
const WeatherContext = React.createContext({ day: 3 })
const App = ({ children }) => {
  const [weather, setWeather] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    api.getWeather(...)
      .then(setWeather)
      .catch(setError)
  }, [])
  const contextValue = { weather, error }
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}
const SomeChild = () => {
  const { weather } = React.useContext(WeatherContext)
  console.log(weather)
  return null
}

// createRef (Obtain a reference to a react node)
const App = () => {
  const ref = React.createRef()
  React.useEffect(() => { console.log(ref.current) }, [])
  return <div ref={ref} />
}

// forwardRef (Pass the ref down to a child)
const Remote = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} />
))
const App = () => {
  const ref = React.createRef()
  return <Remote ref={ref} />
}

// memo (Optimize your components to avoid wasteful renders)
const App = () => {...}
const propsAreEqual = (props, nextProps) => {
  return props.id === nextProps.id
} // Does not re-render if id is the same
export default React.memo(App, propsAreEqual)

// lazy -> Dynamic import. Reduces bundle size
// + Code splitting
const MyComponent = React.lazy(() => import('./MyComponent))
const App = () => <MyComponent />

// Suspend rendering while components are waiting for something
// + Code splitting
import LoadingSpinner from '../LoadingSpinner'
const App = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <MyComponent />
  </React.Suspense>
)
`

export const fragments = `
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
)
`

export const defaultProps = `
// Function component
const MyComponent = (props) => <div {...props} />
MyComponent.defaultProps = { fruit: 'apple' }

// Class component
class MyComponent extends React.Component {
  static defaultProps = { fruit: 'apple' }
  render() { return <div {...this.props} /> }
}
`

export const states = `
// Class component state
class MyComponent extends React.Component {
  state = { loaded: false }
  componentDidMount = () => this.setState({ loaded: true })
  render() {
    if (!this.state.loaded) return null
    return <div {...this.props} />
  }
}

// Function component state (useState/useReducer)
const MyComponent = (props) => {
  // With useState
  const [loaded, setLoaded] = React.useState(false)
  // With useReducer
  const [state, dispatch] = React.useReducer(reducer, initialState)
  if (!loaded) return null
  React.useEffect(() => void setLoaded(true))
  return <div {...props} />
}`

export const renders = `
// Ways to render Card
const Card = (props) => <div {...props} />

const App = ({ items = [] }) => {
  const renderCard = (props) => <Card {...props} />
  return items.map(renderCard)
  // or return items.map((props) => renderCard(props))
}

const App = (props) => <Card {...props} />

class App extends React.Component {
  render() { return <Card {...this.props} /> }
}

const MyComp = ({ component: Component }) => <Component />
const App = () => <MyComp component={Card} />
`

export const imports = `
// default export
const App = (props) => <div {...props} />
export default App
import App from './App'

// named export
export const App = (props) => <div {...props} />
import { App } from './App'
`

export const returnTypes = `
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
`

export const errors = `
// Error boundary
class MyErrorBoundary extends React.Component {
  state = { hasError: false }
  componentDidCatch(error, info) {...}
  render() {
    if (this.state.hasError) return <SomeErrorUI />
    return this.props.children
  }
}
const App = () => (
  <MyErrorBoundary>
    <Main />
  </MyErrorBoundary>
)
`

export const statics = `
// Returning object = New props require state update
// Returning null = New props do not require state update
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {...}
  state = {...}
}

// Return value is passed as 3rd argument to componentDidUpdate
class MyComponent extends React.Component {
  static getSnapshotBeforeUpdate(prevProps, prevState) {...}
}

// Listening to context from a class component
import SomeContext from '../SomeContext'
class MyCompmonent extends React.Component {
  static contextType = SomeContext
  componentDidMount() { console.log(this.context) }
}

// Enables rendering fallback UI before render completes
class MyComponent extends React.Component {
  state getDerivedStateFromError() {...}
  state = { error: null }
  componentDidCatch(error, info) {...}
}
`

export const modes = `
const App = () => (
  <React.StrictMode>
    <div>
      <MyComponent />
      <OtherComponent />
    </div>
  </React.StrictMode>
)
`

export const pointerEvents = `
onPointerUp           onPointerDown
onPointerMove         onPointerCancel
onGotPointerCapture   onLostPointerCapture
onPointerEnter        onPointerLeave
onPointerOver         onPointerOut

const App = () => {
  const onPointerDown = (e) => console.log(e.pointerId)
  return <div onPointerDown={onPointerDown} />
}
`

export const testing = `
import { act } from 'react-dom/test-utils'
import MyComponent from './MyComponent'
const container = document.createElement('div')

// Synchronous
it('renders and adds new item to array', () => {
  act(() => {
    ReactDOM.render(<MyComponent />, container)
  })
  const btn = container.querySelector('button')
  expect(btn.textContent).toBe('one item')
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  expect(btn.textContent).toBe('two items')
})

// Asynchronous
it('does stuff', async () => {
  await act(async () => {
    // code
  })
})
`
