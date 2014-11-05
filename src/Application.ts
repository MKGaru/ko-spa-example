/// <reference path="references.d.ts" />
import SideNav = require('parts/side-nav/SideNav');
import HeaderNav = require('parts/header-nav/HeaderNav');
import MenuItem = require('parts/MenuItem');

import Widget = require('parts/widget/Widget');

import AppsPage = require('page/apps/AppsPage');
import DashboardPage =require('page/dashboard/DashboardPage');
import HomePage = require('page/home/HomePage');
import ErrorPage = require('page/error/ErrorPage');

require('sugar');               //http://sugarjs.com/api
require('html5-history-api'); //https://github.com/devote/HTML5-History-API
var page = require('page');    //https://github.com/visionmedia/page.js

class Application{
	public sideNav:SideNav;
	public headerNav:HeaderNav;

	public pages:{[name:string]:IPage};
	public page="home";
	public href="";

	constructor(){
		// Init Page VMs
		var pages = this.pages ={
			'home': new HomePage(),
			'apps': new AppsPage(),
			'dashboard': undefined, //Dynamic Gen
			'error': new ErrorPage()
		};
		ko.track(pages);

		// Init Common Parts VM
		this.sideNav =  new SideNav(
			[
				new MenuItem(pages.home,       ''),
				new MenuItem('1stDashboard','tachometer','dashboard/1'),
				new MenuItem('2ndDashboard','tachometer','dashboard/2'),
				new MenuItem(pages.apps,       'app'),
				new MenuItem('ErrorSample','warning','hogehoge')
			]
		);
		this.headerNav  = new HeaderNav(
			this.sideNav
		);

		ko.track(this);
	}
}
export=Application;

class ApplicationRouter{
	constructor(
		private app:Application
	){
		page.base($("base").attr("href"));

		page('*',(ctx,next)=>{
			app.href = ctx.pathname.substr(1);
			next();
		});
		page('',   (ctx,next)=>{app.page='home'});
		page('dashboard/:id', (ctx,next)=>{
			var dashboardPage = new DashboardPage();
			dashboardPage.load(ctx.params.id)
				.done(data=>{
					app.pages['dashboard'] = dashboardPage;
					app.page='dashboard';
				})
				.fail(err=>{
					next();
				});
		});
		page('app',(ctx,next)=>{app.page='apps'});
		page('*',(ctx,next)=>{
			var errorPage = (<ErrorPage>app.pages['error']);
			errorPage.code = 404;
			errorPage.message = "Route Not Found";
			app.page='error';
		});
		page();
	}
}

KnockoutElse.init();  // knockout-else    : https://github.com/brianmhunt/knockout-else
ko.punches.enableAll(); // knockout-punches : https://github.com/mbest/knockout.punches


$(function(){
	var app = new Application();
	//window['app'] = app; //for Console Debug.
	new ApplicationRouter(app);
	ko.applyBindings(app,$('html')[0]);
});

