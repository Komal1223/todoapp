const config = require('./webpack.config.js');

const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

console.info('loading webpack production environment');

// eslint-disable-next-line no-use-before-define
module.exports = (env = { }) => {
  const isDev = env.isDev;

  config.mode = 'production';
  config.target = 'node';
  config.devtool = isDev ? 'eval-source-map' : false;
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: isDev,
      }),
    ],
    splitChunks: {
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.[hash].js',
    },
  };
  config.plugins = [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({ patterns: [
      { from: 'build/locales', to: 'locales/' },
      { from: 'src/assets/favicon.png', to: 'assets/' },
    ] },
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Code splitting
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
    }),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];

  return config;
};
