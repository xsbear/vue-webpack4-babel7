'use strict';

const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = module.exports = (env = {})=> {
  return merge(base, {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env':  { NODE_ENV: '"production"' }
      }),
      new OptimizeCSSPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
      // new MinifyPlugin()
    ]
  });
};
