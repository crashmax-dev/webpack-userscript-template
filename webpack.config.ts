import url from 'url'
import path from 'path'
import WebpackUserscript from 'webpack-userscript'
import { UserScriptConfig } from './userscript.config'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { isDev, PORT, scriptFileName, scriptHeaders } = UserScriptConfig
const outputPath = path.resolve(__dirname, 'dist')

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
                test: /\.ts?$/,
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
        contentBase: outputPath,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackUserscript({
            headers: scriptHeaders,
            proxyScript: {
                baseUrl: url.pathToFileURL(outputPath).toString(),
                enable: isDev
            }
        })
    ]
}