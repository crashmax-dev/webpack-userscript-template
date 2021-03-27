import WebpackUserscript from 'webpack-userscript'
import pkg from './package.json'

interface IWebpackUserScript {
    /* development mode */
    isDev: boolean

    /* http port */
    PORT: number

    /**
     * userscript version
     */
    scriptVersion: string

    /**
     * homepage url (github pages)
     */
    scriptHomepage: string

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
    PORT: 8080,
    scriptVersion: pkg.version,
    scriptHomepage: pkg.homepage,
    scriptFileName: pkg.name,
    scriptHeaders: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        author: pkg.author.name,
        include: '/^(http|https)://(example.com|example.org|example.edu).*$/'
    }
}