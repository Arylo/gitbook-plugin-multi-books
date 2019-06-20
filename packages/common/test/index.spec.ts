import test from "ava";

import { isPromise } from "../lib";

test("isPromise", (t) => {
    t.true(isPromise(Promise.resolve()));
});
