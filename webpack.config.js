var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    app: [path.resolve(__dirname, 'src/main.js')]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loaders: ['babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};
