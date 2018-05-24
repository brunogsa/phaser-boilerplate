'use strict';

const common = require('./webpack.common.js');

const webpack = require('webpack');
const merge = require('webpack-merge');

const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const version = require('../package.json').version;

const colors = require('colors/safe');
const colorize = str => colors.bold( colors.blue(str) );

const PORT = 5000;

const compiler = webpack(merge(common, {
  mode: 'development',

  entry: {
    game: [
      // Live-reload
      `webpack-dev-server/client?http://localhost:${ PORT }`,
    ],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      // Enable both canvas and WebGL for better support
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),

      // Development env
      '_DEV_': JSON.stringify(true),
      '_VERSION_': JSON.stringify(version),
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
  ],
}));

const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true,
  },
});

server.listen(PORT, null, function() {
  console.log(`Project is running at: ${ colorize('http://localhost:' + PORT) }`);
});
