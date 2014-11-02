/// <reference path="references.d.ts" />
import SideNav = require('parts/side-nav/SideNav');
import HeaderNav = require('parts/header-nav/HeaderNav');
import MenuItem = require('parts/MenuItem');

import AppsPage = require('page/apps/AppsPage');
import HomePage = require('page/home/HomePage');
import ErrorPage = require('page/error/ErrorPage');

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
			'error': new ErrorPage()
		};

		// Init Common Parts VM
		this.sideNav =  new SideNav(
			[
				new MenuItem(pages.home,'#/'),
				new MenuItem(pages.apps,'#/app'),
				new MenuItem('ErrorSample','warning','#/hogehoge')
			]
		);
		this.headerNav  = new HeaderNav(
			this.sideNav
		);

		ko.track(this);
	}

	public contents():string{
		return (this.page||'home')+'-page';
	}
}
export=Application;

class ApplicationRouter{
	constructor(
		private app:Application
	){
		var router = new Router(); // http://www.ramielcreations.com/projects/router-js/
		router
			.addRoute('#**',function(req,next){
				app.href = req.href;
				next();
			})
			.addRoute('#/',   (req,next)=>{ app.page='home' })
			.addRoute('#/app',(req,next)=>{ app.page='apps' })
			.addRoute('#**',function(req,next){
				next( new Error('Route Not Found.'), 404);
			})
			.errors(404,function(err:Error,href:string){
				var errorPage = (<ErrorPage>app.pages['error']);
				errorPage.code = 404;
				errorPage.message = err.message;
				app.page='error';
			})
			.run(location.hash);
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

