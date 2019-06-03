module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/CSS-Grids/'
    : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
