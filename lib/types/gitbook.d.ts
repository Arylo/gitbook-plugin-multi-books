export interface IPageObject {
    // Parser named
    type: string;

    // File Path relative to book root
    path: string;

    // Absolute file path
    rawpath: string;

    // Title of the page in the SUMMARY
    title: string;

    // Content of the page
    // Markdown/Asciidoc in "page:before"
    // HTML in "page"
    content: string;
}
