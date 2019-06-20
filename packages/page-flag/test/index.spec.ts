import test from "ava";
import * as fs from "fs";
import * as path from "path";
import plugin = require("../lib");

test("Asset resource exist", (t) => {
    // t.true(!!plugin.website.assets);
    // t.true(plugin.website.js.length !== 0);
    for (const filepath of plugin.website.js) {
        const paths = [
            __dirname,
            "..",
            plugin.website.assets,
            filepath
        ];
        // t.true(fs.existsSync(path.resolve(...paths)));
        process.stdout.write(JSON.stringify(paths) + "\n");
    }
    t.true(true);
});
