const path = require('path')
const webpack = require('webpack')

let vendors = [
    'vue/dist/vue.esm.js',
    'vuex/dist/vuex.esm.js',
    'vue-router/dist/vue-router.esm.js',
    'axios'
]

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}