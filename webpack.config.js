const path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  mode: 'none',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};