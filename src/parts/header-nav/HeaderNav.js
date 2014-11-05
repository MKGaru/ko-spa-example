var HeaderNav = (function () {
    function HeaderNav(sideNav) {
        this.sideNav = sideNav;
        ko.track(this);
    }
    return HeaderNav;
})();
require('./HeaderNav.less');
ko.components.register('header-nav', {
    template: require('./HeaderNav.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof HeaderNav ? params : ko.unwrap(params.option);
        }
    }
});
module.exports = HeaderNav;
