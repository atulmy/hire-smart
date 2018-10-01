// Imports
import path from 'path'
import Dotenv from 'dotenv-webpack'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

// Config
const config = {
  entry: {
    app: './src/setup/client/index.js'
  },

  output: {
    path: path.join(__dirname, 'public', 'js', 'bundles'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },

  cache: true,

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendor', chunks: 'all' }
      }
    }
  },

  plugins: [
    new Dotenv(),
    new HardSourceWebpackPlugin({
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package.json', 'package-lock.json', 'yarn.lock', '.env']
      }
    })
  ],

  node: {
    fs: 'empty'
  }
}

export default config
