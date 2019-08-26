import * as React from 'react'
import { UseCheatsheetState as State } from './types'

export const context: State = {
  rows: [],
  columnCount: 3,
  theme: 'coy',
}

const CheatsheetContext = React.createContext<any>(context)

export default CheatsheetContext
