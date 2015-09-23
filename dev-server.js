var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

config.entry.app.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server'
);

config.output.publicPath = 'http://localhost:8080' + config.output.publicPath;

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: true
});
server.listen(8080);
