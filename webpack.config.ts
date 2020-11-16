import url from 'url'
import path from 'path'
import WebpackUserscript from 'webpack-userscript'
import { UserScriptConfig } from './userscript.config'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { isDev, isChrome, devPath, devPort, scriptFileName, scriptHeaders } = UserScriptConfig
const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        path: outputPath,
        filename: `${scriptFileName}.js`
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
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
        port: devPort,
        writeToDisk: true,
        contentBase: outputPath,
        hot: false,
        inline: false,
        liveReload: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackUserscript({
            headers: scriptHeaders,
            proxyScript: {
                // file:/// using for Google Chrome else https:// for Mozilla Firefox
                baseUrl: isChrome ? url.pathToFileURL(outputPath).toString() : devPath,
                enable: isDev
            }
        })
    ]
}