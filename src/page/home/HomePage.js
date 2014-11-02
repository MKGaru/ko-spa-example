/// <reference path="../../references.d.ts" />
var HomePage = (function () {
    function HomePage() {
        this.title = "System";
        this.icon = "tachometer";
        this.resources = null;
        ko.track(this);
        this.fetchResources();
    }
    HomePage.prototype.fetchResources = function () {
        var page = this;
        $.getJSON('api/resources.json', function (resources) {
            page.resources = resources;
        });
    };
    return HomePage;
})();
$("head").append($("<style>").html(require('./HomePage.less')));
ko.components.register('home-page', {
    template: require('./HomePage.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof HomePage ? params : params.option;
        }
    }
});
module.exports = HomePage;
