import url from 'url'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import WebpackUserscript from 'webpack-userscript'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { DefinePlugin, Configuration } from 'webpack'
import { UserScriptConfig } from './userscript.config'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { scriptHeaders, scriptVersion, scriptHomePage, scriptFileName } = UserScriptConfig
const publicFolder = path.resolve(__dirname, 'public')
const outputPath = path.resolve(__dirname, 'dist')
const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development'
const port = 8080

module.exports = {
  mode,
  target: 'web',
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: outputPath,
    filename: `${scriptFileName}.js`
  },
  devServer: {
    port,
    https: true,
    writeToDisk: true,
    disableHostCheck: true,
    contentBase: outputPath
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: { comments: false },
          compress: true
        }
      })
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      VERSION: JSON.stringify(scriptVersion),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BASE_PATH: JSON.stringify(isDev ? `https://localhost:${port}/` : scriptHomePage)
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicFolder,
          to: outputPath
        }
      ]
    }),
    new WebpackUserscript({
      headers: scriptHeaders,
      proxyScript: {
        baseUrl: url.pathToFileURL(outputPath).toString(),
        enable: isDev
      }
    })
  ]
} as Configuration
