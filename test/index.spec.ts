import test from "ava";

test("Asset JS Files", (t) => {
    const data = require("../lib");
    t.true(data.website.js.length !== 0);
});
