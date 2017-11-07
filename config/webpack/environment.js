const { environment } = require('@rails/webpacker')

environment.loaders.set('js', {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: 'babel-loader',
})

environment.loaders.set('css', {
  test: /\.css$/,
  use: 'style-loader!css-loader',
})

module.exports = environment
