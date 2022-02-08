module.exports = {
  publicPath: '/you-ss/', // Путь в подкаталог для домена Github page
  outputDir: 'docs', // Имя директории для сборки, для Github page
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
  }
}