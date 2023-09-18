/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const getTemplate = (title, lang) => `<!DOCTYPE html>
<html lang="${lang ?? 'en'}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SongBird${title ? ' | ' + title : ''}</title>
  </head>
  <body></body>
</html>`;

const config = {
  entry: {
    main: path.resolve('src', 'js', 'main'),
    quiz: path.resolve('src', 'js', 'quiz'),
    result: path.resolve('src', 'js', 'result'),
  },
  output: {
    path: path.resolve('dist'),
    clean: true,
    /*  assetModuleFilename: '[name][ext]', */
  },
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    open: true,
    port: 4567,
    host: 'localhost',
    hot: true,
    compress: true,
  },
  plugins: [
    new FaviconsWebpackPlugin(path.resolve('src', 'assets', 'favicon.png')),
    new HtmlWebpackPlugin({
      templateContent: getTemplate(),
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate('Quiz'),
      filename: 'quiz.html',
      chunks: ['quiz'],
    }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate('Result'),
      filename: 'result.html',
      chunks: ['result'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};


/**
"@babel/core": "^7.18.9",
"@babel/preset-env": "^7.18.9",
"@webpack-cli/generators": "^2.5.0",
"babel-loader": "^8.2.5",
"favicons": "^7.0.2",
"html-webpack-plugin": "^5.5.0",
"prettier": "^2.7.1",
"sass": "^1.55.0",
"sass-loader": "^13.1.0",
"webpack-dev-server": "^4.11.1",
"workbox-webpack-plugin": "^6.5.4"
 */