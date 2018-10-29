const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const dotenv = require('dotenv');
const webpack = require('webpack');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    main: './src/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', { modules: false }],
              'react',
              'stage-2',
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-assign',
            ],
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'dist', 'speedrun-stats.json'),
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
