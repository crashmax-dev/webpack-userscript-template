import url from 'url'
import path from 'path'
import webpack from 'webpack'
import WebpackUserscript from 'webpack-userscript'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { UserScriptConfig } from './userscript.config'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const {
    scriptHeaders,
    scriptVersion,
    scriptHomePage,
    scriptFileName
} = UserScriptConfig

/* webpack configuration */
const assetsFolder = path.resolve(__dirname, 'assets')
const outputPath = path.resolve(__dirname, 'dist')
const isDev = process.env.NODE_ENV === 'development'
const PORT = 8080

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: [
        'regenerator-runtime/runtime.js',
        path.join(__dirname, 'src/index.ts')
    ],
    output: {
        path: outputPath,
        filename: `${scriptFileName}.js`
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
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
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        minimize: !isDev
    },
    devServer: {
        https: true,
        port: PORT,
        writeToDisk: true,
        disableHostCheck: true,
        contentBase: outputPath
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            DEV_MODE: JSON.stringify(process.env.NODE_ENV),
            APP_VERSION: JSON.stringify(scriptVersion),
            BASE_PATH: JSON.stringify(isDev ? `https://localhost:${PORT}/` : scriptHomePage)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: assetsFolder,
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
}