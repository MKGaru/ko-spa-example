/// <reference path="../../references.d.ts" />
import MenuItem = require('../MenuItem');

class SideNav{
	public isShown = true;
	constructor(
		public menu:MenuItem[]
	){
		ko.track(this);
	}

	public toggle(){
		this.isShown = !this.isShown;
	}
}
export = SideNav;

$("head").append(
	$("<style>").html(require('./SideNav.less'))
);

ko.components.register('side-nav',{
	template: require('./SideNav.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof SideNav ? params : params.option;
		}
	}
});

