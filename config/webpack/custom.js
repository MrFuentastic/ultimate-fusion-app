module.exports = {
  // target: 'node',
  // node: {
  //   fs: 'empty',
  //   net: 'empty'
  // },
  entry: '../../app/javascript/src/client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
}