/// <reference path="../../references.d.ts" />
var Widget = require('../../parts/widget/Widget');
var WidgetHolder = require('../../parts/widget/WidgetHolder');
var DashboardPage = (function () {
    function DashboardPage() {
        this.title = undefined;
        this.icon = "tachometer";
        this.component = "dashboard-page";
        this.id = undefined;
        this.widgetHolder = undefined;
        this.message = undefined;
        ko.track(this);
    }
    DashboardPage.prototype.load = function (id) {
        this.id = id;
        var base = $("base").attr("href").slice(0, -1);
        var endpoint = "{base}/api/dashboard/{id}.json".assign({ base: base, id: id });
        var dashboard = this;
        return $.getJSON(endpoint).done(function (data) {
            //DEMO GithubPageでのテストデモ用に、localstorageから復帰するよ。
            var restore = localStorage.getItem(endpoint);
            if (restore) {
                data = JSON.parse(restore);
            }
            //～ forDEMO
            dashboard.title = data.title;
            dashboard.widgetHolder = new WidgetHolder(data.widgets.map(function (widget) { return ({
                widget: new Widget(widget.data),
                size_x: widget.size_x,
                size_y: widget.size_y,
                col: widget.col,
                row: widget.row
            }); }));
        });
    };
    DashboardPage.prototype.save = function () {
        var widgetHolder = this.widgetHolder;
        var serialized = {
            title: this.title,
            widgets: []
        };
        serialized.widgets = widgetHolder.gridster.serialize().map(function (widgetLayout, index) { return ({
            type: "text",
            data: widgetHolder.widgets[index].widget.title,
            size_x: widgetLayout.size_x,
            size_y: widgetLayout.size_y,
            col: widgetLayout.col,
            row: widgetLayout.row
        }); });
        var base = $("base").attr("href").slice(0, -1);
        var endpoint = "{base}/api/dashboard/{id}.json".assign({ base: base, id: this.id });
        //GithubPageでのテストデモ用に、localstorageに退避するよ
        localStorage.setItem(endpoint, JSON.stringify(serialized));
        this.message = "Save success.";
        /*
        $.ajax({
            type: "post",
            url:endpoint,
            data: JSON.stringify(serialized),
            contentType: 'application/json'
        }).done(function(){

        }).fail(function(){

        });
        */
    };
    return DashboardPage;
})();
require('./DashboardPage.less');
ko.components.register('dashboard-page', {
    template: require('./DashboardPage.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof DashboardPage ? params : params.option;
        }
    }
});
module.exports = DashboardPage;
