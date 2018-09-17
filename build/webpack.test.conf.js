// This is the webpack config used for unit tests.

var utils = require('./utils')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders({
      sourceMap: true
    })
  },
  devtool: '#inline-source-map'
})

module.exports = webpackConfig
