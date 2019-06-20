import cheerio = require("cheerio");
import { IPageObject } from "gitbook-plugin-common";

const getAddNameScriptTpl = (pageName) => `
    if (window.require) {
        require(['jquery'], function($) {setPageFlag($, "${pageName}");});
    }
`;

function wrapPageTags(p: IPageObject, gitbook) {
    const $ = cheerio.load(p.content);

    const pageNames = p.path
        .replace(".md", "")
        .split("/")
        .map((item, index, arr) => {
            return `l${Math.abs(index - arr.length) - 1}-${item}`;
        });

    const nextPage = gitbook.navigation[p.path].next;
    if (!nextPage || /\bREADME\.md$/.test(nextPage.path)) {
        pageNames.push("l709394-last");
    }
    let prefixName = "wrap-";
    try {
        const options = gitbook.options.pluginsConfig["book-page-flag"];
        if (options) {
            prefixName = options.prefixName;
        }
    } catch (error) {
        gitbook.log.error(error);
    }
    pageNames.map((pageName) => `${prefixName}${pageName}`.replace(/\s/g, ""));
    p.content = `${$.html()}<script>${getAddNameScriptTpl(pageNames.join(" "))}</script>`;

    return p;
}

export const assets = {
    js: ["pageFlag/index.js"]
};

export function page(p: IPageObject, gitbook) {
    return wrapPageTags(p, gitbook);
}
