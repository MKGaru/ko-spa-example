/// <reference path="../../references.d.ts" />
import MenuItem = require('../MenuItem');
import SideNav = require('../side-nav/SideNav');

class HeaderNav{
	constructor(
		private sideNav:SideNav
	){
		ko.track(this);
	}
}
export = HeaderNav;

require('./HeaderNav.less');
ko.components.register('header-nav',{
	template: require('./HeaderNav.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof HeaderNav ? params : ko.unwrap(params.option);
		}
	}
});
