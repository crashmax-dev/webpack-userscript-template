import WebpackUserscript from 'webpack-userscript'
import pkg from './package.json'

interface IWebpackUserScript {
    /* development mode */
    isDev: boolean

    /* current development browser */
    isChrome: boolean

    /* http port */
    PORT: number

    /* script file name, without file extension */
    scriptFileName: string

    /** 
     * user script headers
     * including script name, description, match url, grants and so on
     * see https://www.tampermonkey.net/documentation.php for details
     **/
    scriptHeaders: WebpackUserscript.WPUSOptions['headers']
}

export const UserScriptConfig: IWebpackUserScript = {
    isDev: process.env.NODE_ENV === 'development',
    isChrome: true,
    PORT: 8080,
    scriptFileName: pkg.name,
    scriptHeaders: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        author: pkg.author.name,
        match: '*://(example.com|github.com)/*'
    }
}