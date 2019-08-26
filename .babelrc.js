const babelPresetFlowVue = {
  plugins: [
    require('@babel/plugin-proposal-class-properties'),
    require('@babel/plugin-transform-flow-strip-types')
  ]
}

module.exports = {
  presets: [
    [ '@babel/preset-env', {
      "targets": {
        "chrome": 73,
        "ios": 9
      }
    } ],
    babelPresetFlowVue
  ],
  ignore: [
    'dist/*.js',
    'packages/**/*.js'
  ]
}
