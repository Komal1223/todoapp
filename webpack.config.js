const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: './src/index.js',
    vendor: [
      'axios',
      '@babel/polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    preferRelative: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/todoApp/',
    path: path.resolve(__dirname, 'dist/todoApp'),
    filename: '[name].bundle.[hash].js',
  },
  devServer: {
    port: 8081,
    contentBase: 'dist',
    // Host for testing in VM
    allowedHosts: ['10.0.2.2'],
    watchContentBase: true,
    inline: false,
    proxy: {
      '/**': {
        target: '/todoApp/index.html',
        secure: false,
        changeOrigin: true,
        // eslint-disable-next-line consistent-return
        bypass: (req) => {
          // eslint-disable-next-line max-len
          if (req.path.indexOf('.js') !== -1 || req.path.indexOf('.css') !== -1 || req.path.indexOf('img/') !== -1 || req.path.indexOf('assets/') !== -1 || req.path.indexOf('fonts/') !== -1) {
            return '/todoApp';
          }
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/todoApp/index.html';
          }
        },
      },

    },
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.png',
    }),
    new CopyWebpackPlugin({ patterns: [
      { from: 'src/assets/favicon.png', to: 'assets/' },
      { from: 'build/locales', to: 'locales/' },
      { from: 'src/app-config.js', to: './' },
    ] },
    ),
    // Code splitting
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
    }),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Watch translation files
    new WebpackShellPluginNext({ onBuildStart: ['node scripts/i18n-scanner --watch'] }),
  ],
  optimization: {
    // automatically split chunks
    splitChunks: {
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.[hash].js',
    },
  },
};
