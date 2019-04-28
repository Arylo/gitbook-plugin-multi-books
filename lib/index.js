const cheerio = require('cheerio');

const getAddNameScriptTpl = pageName => `
setTimeout(function () {
    require(['gitbook','jquery'], function(gitbook, $) {
        console.log($(document.body));
        $(document.body).removeClass().addClass("${pageName}");
    });
}, 100);
`;

const wrapPageTags = (page, gitbook) => {
    const $ = cheerio.load(page.content);

    const pageNames = page.path
        .replace('.md', '')
        .split('/')
        .map((item, index, arr) => {
            return `l${Math.abs(index - arr.length) - 1}-${item}`;
        });

    if (gitbook.options.pluginsConfig['getme-page-flag']) {
        const prefixName =
            gitbook.options.pluginsConfig['getme-page-flag']['prefixName'] ||
            'wrap-';
        pageNames.map(pageName => `${prefixName}${pageName}`);
    }
    page.content =
        $.html() +
        `<script>${getAddNameScriptTpl(pageNames.join(' '))}</script>`;

    return page;
};

module.exports = {
    hooks: {
        page: function (page) {
            return wrapPageTags.call(this, page, this);
        }
    }
};
