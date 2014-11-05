/// <reference path="../../references.d.ts" />
var Widget = (function () {
    function Widget(title) {
        this.title = title;
        ko.track(this);
    }
    Widget.prototype.link = function (element) {
        this.element = element;
        //$(element).draggable();
    };
    return Widget;
})();
require('./Widget.less');
ko.components.register('widget', {
    template: require('./Widget.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            var vm = params instanceof Widget ? params : ko.utils.unwrapObservable(params.option);
            vm.link(componentInfo.element);
            return vm;
        }
    }
});
module.exports = Widget;
