const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isCI = process.env.CI === 'CI';

const entry = {
  ligero: './index',
};
if (!isCI) {
  entry['ligero.min'] = './index';
}

const config = {
  entry,
  output: {
    filename: '[name].js',
    library: 'ligero',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist'),
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
  },
  optimization: isCI
    ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            include: /\.min\.js$/,
          }),
          new CssMinimizerPlugin({
            include: /\.min\.js$/,
          }),
        ],
      }
    : { concatenateModules: false },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env', '@babel/react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  ],
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = config;
