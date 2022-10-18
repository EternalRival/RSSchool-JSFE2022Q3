const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Gem Puzzle",
      favicon: "./src/assets/icons/favicon.ico",
    }),
  ],
};
