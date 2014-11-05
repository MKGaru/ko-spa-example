var WidgetHolder = (function () {
    function WidgetHolder(widgets) {
        this.widgets = widgets;
        ko.track(this);
    }
    WidgetHolder.prototype.link = function (element) {
        var holder = this;
        this.element = element;
        this.gridster = $(this.element).gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [250, 250],
            widget_selector: 'widget',
            auto_init: true,
            autogenerate_stylesheet: false,
            resize: {
                enabled: true,
                handle_append_to: 'footer'
            },
            draggable: {
                items: 'widget',
                handle: 'header'
            }
        }).data('gridster');
        this.widgets.forEach(function (widget, i) {
            holder.gridster.add_widget('<widget params="option:widgets[' + i + '].widget" class="panel panel-info"></widget>', widget.size_x, widget.size_y, widget.col, widget.row);
        });
    };
    return WidgetHolder;
})();
require('./WidgetHolder.less');
ko.components.register('widget-holder', {
    template: '<!-- empty -->',
    viewModel: {
        createViewModel: function (params, componentInfo) {
            var vm = params instanceof WidgetHolder ? params : ko.unwrap(params.option);
            vm.link(componentInfo.element);
            return vm;
        }
    }
});
module.exports = WidgetHolder;
