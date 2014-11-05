/// <reference path="../../references.d.ts" />
var ErrorPage = (function () {
    function ErrorPage() {
        this.title = "Error";
        this.component = "error-page";
        this.icon = "warning";
        this.code = 500;
        this.message = '';
        ko.track(this);
    }
    return ErrorPage;
})();
//require('./ErrorPage.less');
ko.components.register('error-page', {
    template: require('./ErrorPage.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof ErrorPage ? params : params.option;
        }
    }
});
module.exports = ErrorPage;
