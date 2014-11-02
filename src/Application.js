/// <reference path="references.d.ts" />
var SideNav = require('parts/side-nav/SideNav');
var HeaderNav = require('parts/header-nav/HeaderNav');
var MenuItem = require('parts/MenuItem');
var AppsPage = require('page/apps/AppsPage');
var HomePage = require('page/home/HomePage');
var ErrorPage = require('page/error/ErrorPage');
var Application = (function () {
    function Application() {
        this.page = "home";
        this.href = "";
        // Init Page VMs
        var pages = this.pages = {
            'home': new HomePage(),
            'apps': new AppsPage(),
            'error': new ErrorPage()
        };
        // Init Common Parts VM
        this.sideNav = new SideNav([
            new MenuItem(pages.home, '#/'),
            new MenuItem(pages.apps, '#/app'),
            new MenuItem('ErrorSample', 'warning', '#/hogehoge')
        ]);
        this.headerNav = new HeaderNav(this.sideNav);
        ko.track(this);
    }
    Application.prototype.contents = function () {
        return (this.page || 'home') + '-page';
    };
    return Application;
})();
var ApplicationRouter = (function () {
    function ApplicationRouter(app) {
        this.app = app;
        var router = new Router(); // http://www.ramielcreations.com/projects/router-js/
        router.addRoute('#**', function (req, next) {
            app.href = req.href;
            next();
        }).addRoute('#/', function (req, next) {
            app.page = 'home';
        }).addRoute('#/app', function (req, next) {
            app.page = 'apps';
        }).addRoute('#**', function (req, next) {
            next(new Error('Route Not Found.'), 404);
        }).errors(404, function (err, href) {
            var errorPage = app.pages['error'];
            errorPage.code = 404;
            errorPage.message = err.message;
            app.page = 'error';
        }).run(location.hash);
    }
    return ApplicationRouter;
})();
KnockoutElse.init(); // knockout-else    : https://github.com/brianmhunt/knockout-else
ko.punches.enableAll(); // knockout-punches : https://github.com/mbest/knockout.punches
$(function () {
    var app = new Application();
    //window['app'] = app; //for Console Debug.
    new ApplicationRouter(app);
    ko.applyBindings(app, $('html')[0]);
});
module.exports = Application;
