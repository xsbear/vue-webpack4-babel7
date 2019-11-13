'use strict';

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production';

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve(''),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          prettify: false,
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
          // 'postcss-loader',
          // 'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:  'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:  'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
};
