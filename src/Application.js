/// <reference path="references.d.ts" />
var SideNav = require('parts/side-nav/SideNav');
var HeaderNav = require('parts/header-nav/HeaderNav');
var MenuItem = require('parts/MenuItem');
var AppsPage = require('page/apps/AppsPage');
var DashboardPage = require('page/dashboard/DashboardPage');
var HomePage = require('page/home/HomePage');
var ErrorPage = require('page/error/ErrorPage');
require('sugar'); //http://sugarjs.com/api
require('html5-history-api'); //https://github.com/devote/HTML5-History-API
var page = require('page'); //https://github.com/visionmedia/page.js
var Application = (function () {
    function Application() {
        this.page = "home";
        this.href = "";
        // Init Page VMs
        var pages = this.pages = {
            'home': new HomePage(),
            'apps': new AppsPage(),
            'dashboard': undefined,
            'error': new ErrorPage()
        };
        ko.track(pages);
        // Init Common Parts VM
        this.sideNav = new SideNav([
            new MenuItem(pages.home, '/'),
            new MenuItem('1stDashboard', 'tachometer', '/dashboard/1'),
            new MenuItem('2ndDashboard', 'tachometer', '/dashboard/2'),
            new MenuItem(pages.apps, '/app'),
            new MenuItem('ErrorSample', 'warning', '/hogehoge')
        ]);
        this.headerNav = new HeaderNav(this.sideNav);
        ko.track(this);
    }
    return Application;
})();
var ApplicationRouter = (function () {
    function ApplicationRouter(app) {
        this.app = app;
        page.base($("base").attr("href").slice(0, -1));
        page('*', function (ctx, next) {
            app.href = ctx.pathname;
            next();
        });
        page('/', function (ctx, next) {
            app.page = 'home';
        });
        page('/dashboard/:id', function (ctx, next) {
            var dashboardPage = new DashboardPage();
            dashboardPage.load(ctx.params.id).done(function (data) {
                app.pages['dashboard'] = dashboardPage;
                app.page = 'dashboard';
            }).fail(function (err) {
                next();
            });
        });
        page('/app', function (ctx, next) {
            app.page = 'apps';
        });
        page('*', function (ctx, next) {
            var errorPage = app.pages['error'];
            errorPage.code = 404;
            errorPage.message = "Route Not Found";
            app.page = 'error';
        });
        page();
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
