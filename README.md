# 🚀 Webpack userscript template

![TypeScript](https://img.shields.io/badge/TypeScript-informational?style=flat-square&logo=typescript&logoColor=ffffff&color=007acc)
![WebPack](https://img.shields.io/badge/Webpack-informational?style=flat-square&logo=webpack&logoColor=ffffff&color=1c78c0)

> This template is based on [Webpack](https://github.com/webpack/webpack) and [webpack-userscript](https://github.com/momocow/webpack-userscript), written in [TypeScript](https://github.com/microsoft/TypeScript).

## Usage

### Install a userscript manager

> To use user scripts you need to first install a user script manager. Which user script manager you can use depends on which browser you use.

* Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
* Firefox: [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/), or [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
* Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
* Microsoft Edge: [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)
* Opera: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/) or [Violentmonkey](https://violentmonkey.github.io/get-it/)
* Maxthon: [Violentmonkey](http://extension.maxthon.com/detail/index.php?view_id=1680)
* Dolphin: [Tampermonkey](https://play.google.com/store/apps/details?id=net.tampermonkey.dolphin)
* UC: [Tampermonkey](https://www.tampermonkey.net/?browser=ucweb&ext=dhdg)

### Install this userscript

> [webpack-userscript-template.user.js](https://crashmax-dev.github.io/webpack-userscript-template/webpack-userscript-template.user.js)

## Development

### Change settings of Google Chrome

* Navigate to `chrome://flags/#allow-insecure-localhost`, enable insecure localhost
* Navigate to `chrome://extensions/?id=dhdgffkkebhmkfjojejmpbldmpobfkfo` (Chrome manage extensions page of `Tampermonkey`) and enable `Allow access to file URLs` (you need to manual reload page when dev userscript, see [#475](https://github.com/Tampermonkey/tampermonkey/issues/475#issuecomment-348594785) for more detail)
* `pnpm install`
* `pnpm dev`
* Open `https://localhost:8080/webpack-userscript-template.proxy.user.js` in browser (click Advanced -> proceed if it shows a security warning) to install the proxy script.
