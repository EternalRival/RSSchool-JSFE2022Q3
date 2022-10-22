/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: {
      dry: false,
      keep: /\.git/,
    },
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'hidden-source-map',
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    port: 4567,
    open: false,
    hot: false,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|svg|otf|ogg)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gem Puzzle',
      inject: 'head',
      filename: 'index.html',
      favicon: './src/assets/favicon.png',
    }),
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../cache'),
    hashAlgorithm: 'md5',
    buildDependencies: {
      config: [path.join(__dirname, './webpack.config.js')],
    },
  },
};
