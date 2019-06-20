import { IPageObject, IPluginItem, isPromise  } from "gitbook-plugin-common";
import pageFlag = require("gitbook-plugin-page-flag");

const pluginItems: IPluginItem[] = [ pageFlag.pluginItem ];

const getAssetJsFiles = () => {
    const arr: string[] = [];
    pluginItems.forEach((pluginItem) => {
        if (pluginItem.assets && pluginItem.assets.js && Array.isArray(pluginItem.assets.js)) {
            arr.push(...pluginItem.assets.js);
        }
    });
    return arr;
};

const runHookInit = async () => {
    for (const pluginItem of pluginItems) {
        if (typeof pluginItem.init === "function") {
            const data = pluginItem.init();
            if (isPromise(data)) {
                await data;
            }
        }
    }
};

const runHookFinishBefore = async () => {
    for (const pluginItem of pluginItems) {
        if (typeof pluginItem.finishBefore === "function") {
            const data = pluginItem.finishBefore();
            if (isPromise(data)) {
                await data;
            }
        }
    }
};

const runHookFinish = async () => {
    for (const pluginItem of pluginItems) {
        if (typeof pluginItem.finish === "function") {
            const data = pluginItem.finish();
            if (isPromise(data)) {
                await data;
            }
        }
    }
};

const runHookPageBefore = async (p: IPageObject, gitbook) => {
    for (const pluginItem of pluginItems) {
        if (typeof pluginItem.pageBefore === "function") {
            const data = pluginItem.pageBefore(p, gitbook);
            if (isPromise(data)) {
                p = await data;
            } else {
                p = data;
            }
        }
    }
    return p;
};

const runHookPage = async (p: IPageObject, gitbook) => {
    for (const pluginItem of pluginItems) {
        if (typeof pluginItem.page === "function") {
            const data = pluginItem.page(p, gitbook);
            if (isPromise(data)) {
                p = await data;
            } else {
                p = data;
            }
        }
    }
    return p;
};

export = {
    website: {
        assets: "./assets",
        js: getAssetJsFiles()
    },
    hooks: {
        "init"() {
            runHookInit();
        },
        "finishBefore"() {
            runHookFinishBefore();
        },
        "finish"() {
            runHookFinish();
        },
        "page:before"(p: IPageObject) {
            return runHookPageBefore(p, this);
        },
        "page"(p: IPageObject) {
            return runHookPage(p, this);
        }
    }
};
