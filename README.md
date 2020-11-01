🚀 Webpack userscript template
===============================

![TypeScript](https://aleen42.github.io/badges/src/typescript.svg)
![Webpack](https://aleen42.github.io/badges/src/webpack.svg)
![License](https://img.shields.io/github/license/crashmax-off/webpack-userscript-template?label=License&color=blue)

> Создан на базе [Webpack](https://github.com/webpack/webpack) и [webpack-userscript](https://github.com/momocow/webpack-userscript), написано на [TypeScript](https://github.com/microsoft/TypeScript).

Разработка:
-----------
1. Установите зависимости `npm install`
2. Запустить сервер для разработки `npm run dev`
3. Откройте `https://localhost:8080/webpack-userscript-template.proxy.user.js` в браузере (нажмите `Advanced` -> `continue`, если отображается предупреждение безопасности), чтобы установить прокси-скрипт
4. Код для разработки находится в папке `src`, для применения изменений обновляйте страницу браузера

Конфигурация Google Chrome (рекомендуется):
-----------------------------------
1. В файле `userscript.config.ts` значение `isChrome` должно быть `true`
2. Включите insecure-localhost: перейдите к `chrome://flags/#allow-insecure-localhost` и включите insecure-localhost.
3. Включите доступ к URL-адресу файла для расширения: перейдите к `chrome://extensions/?id=dhdgffkkebhmkfjojejmpbldmpobfkfo` (Страница управления [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)) и включите `Allow access to file URLs` (если вам нужно вручную перезагрузить страницу браузера при разработке скрипта, см. [#475](https://github.com/Tampermonkey/tampermonkey/issues/475#issuecomment-348594785) для более подробной информации)

Конфигурация Mozilla Firefox:
--------------------------------------
1. В файле `userscript.config.ts` значение `isChrome` должно быть `false`
2. Для установки расширения используйте [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
3. Для обновления внесенных изменений требуется несколько раз обновлять страницу браузера (не самый продуктивный браузер для разработки)