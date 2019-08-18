import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import json from 'rollup-plugin-json'
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      abortOnError: false,
      clean: true,
      rollupCommonJSResolveHack: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': [
          'isForwardRef',
          'isValidElementType',
          'isContextConsumer',
        ],
      },
    }),
  ],
}
