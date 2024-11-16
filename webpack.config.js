const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js', // точка входа сборщика webpack
  output: {
    clean: true,
    path: path.resolve(__dirname, 'prod'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer:{
    historyApiFallback: true,
  },
  plugins: [
    // HtmlWebpackPlugin создает index.html в директории с бандлом и автоматически добавляет в него ссылку на бандл.
    new HtmlWebpackPlugin({
      template: 'index.html', // откуда брать шаблон
    }),
  ],
};
