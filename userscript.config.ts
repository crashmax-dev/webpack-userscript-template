import WebpackUserscript from 'webpack-userscript'
import pkg from './package.json'

const dev = process.env.NODE_ENV === 'development'
const path = dev ? 'https://localhost:8080' : pkg.homepage

interface IWebpackUserScript {
    /* development mode */
    isDev: boolean

    /* current development browser (using for Tampermonkey) */
    isChrome: boolean

    /* development homepage path */
    devPath: string

    /* http port */
    devPort: number

    /* script file name, without file extension */
    scriptFileName: string

    /** 
     * userscript headers
     * including script name, description, match url, grants and so on
     * see https://www.tampermonkey.net/documentation.php for details
     **/
    scriptHeaders: WebpackUserscript.WPUSOptions['headers']
}

export const UserScriptConfig: IWebpackUserScript = {
    isDev: process.env.NODE_ENV === 'development',
    isChrome: true,
    devPath: path,
    devPort: 8080,
    scriptFileName: pkg.name,
    scriptHeaders: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        author: pkg.author.name,
        match: '*://(example.com|github.com)/*'
    }
}