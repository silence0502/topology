// import typescript from 'typescript';
// import typescriptPlugin from 'rollup-plugin-typescript';

import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import path from 'path';
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import license from 'rollup-plugin-license'

// import { version } from "./package.json";

const dev = 'development';
const prod = 'production';

const nodeEnv = parseNodeEnv(process.env.NODE_ENV);

const plugins = [
  replace({
    // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
  postcss({
    plugins: [
      cssnano()
    ],
    extensions: ['.less'],
    extract: true
  }),
  // // nodeResolve makes rollup look for dependencies in the node_modules directory
  nodeResolve({
    jsnext: true,
    // module: false,
    // browser: true,
    main: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
    preferBuiltins: true,
  }),
  globals(),
  builtins(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: [
      'node_modules/**',
      'src/rappid/**'
    ],
    namedExports: {
      // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
      // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
      // Just add the mentioned file / export here
      'node_modules/react-dom/index.js': [
        'render',
      ],
      'node_modules/react/react.js': [
        'Component',
        'PropTypes',
        'createElement',
      ],
    },
  }),
  // typescriptPlugin({
  //   typescript
  // }),
  typescript({
  }),
  filesize({
    render: function (options, size) {
      return size;
    }
  }),
];


if (nodeEnv === dev) {
  plugins.push(serve({
    contentBase: '',
    port: 3000,
    historyApiFallback: true,
  }));
  plugins.push(livereload());
}

if (nodeEnv === prod) {
  plugins.push(uglify());
  plugins.push(
    license({
      banner: {
        file: path.join(__dirname, 'LICENSE'),
        encoding: 'utf-8',
      }
    })
  )
}

const sourceMap = nodeEnv === dev ? 'inline' : false;

export default {
  plugins,
  input: 'src/topology_instance.tsx',
  output: {
    name: 'topology_instance',
    format: 'umd',
    file: 'lib/topology_instance.js',
    sourcemap: sourceMap,
    globals: {
      jquery: '$',
      lodash: '_',
      backbone: 'Backbone',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'ws': 'WebSocket',
      'joint': 'joint',
    }
  },
  external: [
    'jquery',
    'lodash',
    'backbone',
    'react',
    'react-dom',
    'ws',
    path.resolve('./src/rappid/rappid.min.js')
  ]
};

function parseNodeEnv(nodeEnv) {
  if (nodeEnv === prod || nodeEnv === dev) {
    return nodeEnv;
  }
  return dev;
}