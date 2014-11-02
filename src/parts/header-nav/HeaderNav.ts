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

$("head").append(
	$("<style>").html(require('./HeaderNav.less'))
);

ko.components.register('header-nav',{
	template: require('./HeaderNav.html'),
	viewModel:{
		createViewModel: function(params, componentInfo){
			return params instanceof HeaderNav ? params : params.option;
		}
	}
});
