import * as pluginItem from "./plugin";

export = {
    website: Object.assign({ assets: "./assets" }, pluginItem.assets),
    hooks: {
        page(p) {
            return pluginItem.page(p, this);
        }
    },
    pluginItem
};
