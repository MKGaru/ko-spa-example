/// <reference path="../../references.d.ts" />
import MenuItem = require('../MenuItem');
import SideNav = require('../directory-tree/DirectoryTree');

class DirectoryTree{
	public isOpened = true;
	constructor(
		public name:string,
		public description:string,
	    public sub: {name:string;description:string}[]
	){
		ko.track(this);
	}
}
export = DirectoryTree;

$("head").append(
	$("<style>").html(require('./DirectoryTree.less'))
);

ko.components.register('directory-tree',{
	template: require('./DirectoryTree.html'),
	viewModel:{
		createViewModel: function(params, componentInfo){
			return params instanceof DirectoryTree ? params : params.option;
		}
	}
});
