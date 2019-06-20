import { IPageObject } from "./gitbook";

export interface IPluginItem {
    assets?: Partial<{
        js: string[];
        css: string[];
    }>;
    init?: () => any;
    finishBefore?: () => any;
    finish?: () => any;
    page?: (p: IPageObject, gitbook) => IPageObject | Promise<IPageObject>;
    pageBefore?: (p: IPageObject, gitbook) => IPageObject | Promise<IPageObject>;
}
