import test from "ava";

test("Import Check", (t) => {
    t.true(require("../lib").website.js.length !== 0);
});
