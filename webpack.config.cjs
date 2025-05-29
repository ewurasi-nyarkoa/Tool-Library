const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.s?css$/,use: [ 'style-loader','css-loader',{loader:'sass-loader',options: { sourceMap: true }}
  ] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
