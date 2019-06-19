function setPageFlag ($, pageFlag) {
    var classes = $(document.body).attr('class') || '';
    classes = classes
        .split(/\s+/)
        .filter((item) => /^l\d+-[\w-]+/.test(item))
        .join(' ');
    $(document.body)
        .removeClass(classes)
        .addClass(pageFlag);
}

require(['jquery'], function ($) {
    if (window.pageFlagClass) {
        // eslint-disable-next-line no-undef
        setPageFlag($, pageFlagClass);
    }
});
