import * as utils from '../utils'

function genSnippets(length = 12) {
  return Array(length)
    .fill(null)
    .map((_, index) => ({
      id: `id${index}`,
      title: `title${index}`,
      snippet: `snippet${index}`,
    }))
}

let snippets: any

beforeEach(() => {
  snippets = genSnippets()
})

describe('snippets', () => {
  describe('.formatSnippets', () => {
    it('')
    // Jest puts each item in the 2nd level array as arguments to test func
    //    So we must wrap them with an additional array layer to fit our data structure
    // it.each(utils.formatSnippets(genSnippets(), 3).map((s) => [s]))(
    //   `each item in snippets should be an array`,
    //   (snippetsList) => {
    //     expect(Array.isArray(snippetsList)).toBe(true)
    //   },
    // )
    // it.each(utils.formatSnippets(genSnippets(), 4).map((s) => [s]))(
    //   'each item in snippets should not contain more than the columnCount given',
    //   (snippetsList) => {
    //     expect(snippetsList.length).toBeLessThanOrEqual(4)
    //   },
    // )
  })
})
