var SideNav = (function () {
    function SideNav(menu) {
        this.menu = menu;
        this.isShown = true;
        ko.track(this);
    }
    SideNav.prototype.toggle = function () {
        this.isShown = !this.isShown;
    };
    return SideNav;
})();
require('./SideNav.less');
ko.components.register('side-nav', {
    template: require('./SideNav.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof SideNav ? params : ko.unwrap(params.option);
        }
    }
});
module.exports = SideNav;
