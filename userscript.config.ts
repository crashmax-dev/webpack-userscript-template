import WebpackUserscript from 'webpack-userscript'
import pkg from './package.json'

interface IWebpackUserScript {
    /* userscript version */
    scriptVersion: string

    /* homepage url (github pages) */
    scriptHomePage: string

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
    scriptVersion: pkg.version,
    scriptHomePage: pkg.homepage,
    scriptFileName: pkg.name,
    scriptHeaders: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        author: pkg.author.name,
        include: '/^(http|https)://(example.com|example.org|example.edu).*$/'
    }
}