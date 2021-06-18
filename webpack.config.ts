import url from 'url'
import path from 'path'
import webpack from 'webpack'
import WebpackUserscript from 'webpack-userscript'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { UserScriptConfig } from './userscript.config'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { scriptHeaders, scriptVersion, scriptHomePage, scriptFileName } = UserScriptConfig
const publicFolder = path.resolve(__dirname, 'public')
const outputPath = path.resolve(__dirname, 'dist')
const isDev = process.env.NODE_ENV === 'development'
const port = 8080

module.exports = {
  mode: process.env.NODE_ENV,
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
    minimize: !isDev
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true
                    }
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
    new webpack.DefinePlugin({
      DEV_MODE: JSON.stringify(process.env.NODE_ENV),
      APP_VERSION: JSON.stringify(scriptVersion),
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
} as webpack.Configuration