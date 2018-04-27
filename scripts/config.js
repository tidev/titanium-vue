const path = require('path')
const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * Titanium-Vue.js v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' Axway Appcelerator\n' +
  ' * Released under the Apache 2.0 License.\n' +
  ' */'

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  // Runtime only (ES Modules). Used by bundlers that support ES Modules,
  // e.g. Rollup & Webpack 2
  'titanium-runtime': {
    entry: resolve('titanium/entry-runtime.js'),
    dest: resolve('dist/titanium-vue.runtime.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler build
  'titanium-full': {
    entry: resolve('titanium/entry-runtime-with-compiler.js'),
    dest: resolve('dist/titanium-vue.js'),
    format: 'es',
    banner
  },
  // Titanium compiler (CommonJS). Used used as a custom template compiler for the vue-loader.
  'titanium-compiler': {
    entry: resolve('titanium/entry-compiler.js'),
    dest: resolve('packages/titanium-vue-template-compiler/build.js'),
    format: 'cjs'
    //external: Object.keys(require('../packages/titanium-vue-template-compiler/package.json').dependencies)
  }
}

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      replace({
        __WEEX__: false,
        __VERSION__: version,
        'process.env.NODE_ENV': '\'development\'',
        'let _isServer': 'let _isServer = false'
      }),
      flow(),
      babel(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Titanium Vue'
    }
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
