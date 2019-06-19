export function isPromise(obj: any): obj is Promise<any> {
    if (!!obj && typeof obj.then === "function" && typeof obj.catch === "function") {
        return true;
    }
    return false;
}
