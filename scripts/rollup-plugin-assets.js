'use strict';

const fs = require('fs');
const path = require('path');

const cpy = require('cpy');

const { SOURCE_DIRECTORY, DISTRIBUTION_DIRECTORY } = require('./shared');

function buildHTML(bundle) {
    let htmlContent = fs.readFileSync(path.resolve(SOURCE_DIRECTORY, 'index.html'), 'utf-8');
   
    const mainName = Object.keys(bundle).find(name => name.startsWith('main-') && bundle[name].isEntry);
    const mainChunk = bundle[mainName];

    htmlContent = htmlContent.replace(
        '{{HEADER}}',
        mainChunk.dynamicImports.map(moduleName => `<link rel="modulepreload" href="/js/${moduleName}">`).join('\n'),
    );
    htmlContent = htmlContent.replace(
        '{{FOOTER}}',
        [
            `<script type="module" src="/js/${mainName}"></script>`,
            ...mainChunk.imports.map(moduleName => `<script type="module" src="/js/${moduleName}"></script>`),
        ].join('\n'),
    );

    fs.writeFileSync(path.resolve(DISTRIBUTION_DIRECTORY, 'index.html'), htmlContent);
}

module.exports = function assetsPlugin() {
    return {
        async generateBundle(_options, bundle) {
            await cpy('**', DISTRIBUTION_DIRECTORY, {
                cwd: path.resolve(SOURCE_DIRECTORY, 'assets'),
                parents: true,
            });
            await buildHTML(bundle);
        },
    };
};