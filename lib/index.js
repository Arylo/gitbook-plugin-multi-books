const cheerio = require('cheerio');

const getAddNameScriptTpl = pageName => `
    var pageFlagClass = "${pageName}";
    if (window.require) {
        require(['jquery'], function($) {setPageFlag($, pageFlagClass);});
    }
`;

const wrapPageTags = function (page, gitbook) {
    const $ = cheerio.load(page.content);

    const pageNames = page.path
        .replace('.md', '')
        .split('/')
        .map((item, index, arr) => {
            return `l${Math.abs(index - arr.length) - 1}-${item}`;
        });

    const nextPage = this.navigation[page.path].next;
    if (!nextPage || /\bREADME\.md$/.test(nextPage.path)) {
        pageNames.push('l709394-last');
    }
    if (gitbook.options.pluginsConfig['getme-page-flag']) {
        const prefixName =
            gitbook.options.pluginsConfig['getme-page-flag']['prefixName'] ||
            'wrap-';
        pageNames.map(pageName =>
            `${prefixName}${pageName}`.replace(/\s/g, '')
        );
    }
    page.content =
        $.html() +
        `<script>${getAddNameScriptTpl(pageNames.join(' '))}</script>`;

    return page;
};

module.exports = {
    website: {
        assets: './lib/assets',
        js: ['pageflag.js']
    },
    hooks: {
        page: function (page) {
            return wrapPageTags.call(this, page, this);
        }
    }
};
