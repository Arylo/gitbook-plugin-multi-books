function setPageFlag (pageFlag) {
    // eslint-disable-next-line no-undef
    $(document.body)
        .removeClass()
        .addClass(pageFlag);
}

require(['jquery'], function ($) {
    if (window.pageFlagClass) {
        // eslint-disable-next-line no-undef
        setPageFlag(pageFlagClass);
    }
});
