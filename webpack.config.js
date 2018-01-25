let path = require('path');
let SRC_DIR = path.join(__dirname, '/client/src');
let PUBLIC_DIR = path.join(__dirname, './public')
module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: './bundle.js',
    path: PUBLIC_DIR
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file-loader?prefix=fonts/' },
      { test: /\.eot$/, loader: 'file-loader?prefix=fonts/' },
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  }
};
