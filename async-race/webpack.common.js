const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT = {
  title: 'Async-Race',
  lang: 'en',
  isEmptyBodyRequired: true,
};

const getTemplate = (subtitle) => `<!DOCTYPE html>
<html lang="${PROJECT.lang}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${PROJECT.title}${subtitle ? ' | ' + subtitle : ''}</title>
  </head>
  <body class="body">${PROJECT.isEmptyBodyRequired ? '' : '\n    <div class="root" id="root"></div>'}
  </body>
</html>`;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },

  plugins: [
    new ESLintPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate(),
      fileName: 'index.html',
      favicon: path.resolve('src', 'assets', 'icons', 'favicon.webp'),
      chunks: ['app'],
    }),
  ],

  module: {
    rules: [
      { test: /\.(ts|tsx)$/i, loader: 'ts-loader', exclude: ['/node_modules/'] },
      { test: /\.(css|s[ac]ss)$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i, type: 'asset' },
    ],
  },

  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '...'] },
};
