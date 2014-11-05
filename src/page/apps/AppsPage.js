/// <reference path="../../references.d.ts" />
var AppsPage = (function () {
    function AppsPage() {
        this.title = "Apps";
        this.component = "apps-page";
        this.icon = "bookmark-o";
        ko.track(this);
    }
    return AppsPage;
})();
//require('./AppsPage.less');
ko.components.register('apps-page', {
    template: require('./AppsPage.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof AppsPage ? params : params.option;
        }
    }
});
module.exports = AppsPage;
