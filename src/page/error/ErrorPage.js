/// <reference path="../../references.d.ts" />
var ErrorsPage = (function () {
    function ErrorsPage() {
        this.title = "Error";
        this.icon = "warning";
        this.code = 500;
        this.message = '';
        ko.track(this);
    }
    return ErrorsPage;
})();
/*
 $("head").append(
 $("<style>").html(require('./ErrorPage.less'))
 );
 */
ko.components.register('error-page', {
    template: require('./ErrorPage.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof ErrorsPage ? params : params.option;
        }
    }
});
module.exports = ErrorsPage;
