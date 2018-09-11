const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  mode: 'none',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ]
};