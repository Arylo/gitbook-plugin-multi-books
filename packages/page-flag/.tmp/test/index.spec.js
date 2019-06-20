"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
ava_1.default("Asset JS Files", (t) => {
    const data = require("../lib");
    t.true(data.website.js.length !== 0);
});
//# sourceMappingURL=index.spec.js.map