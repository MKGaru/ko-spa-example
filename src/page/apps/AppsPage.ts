/// <reference path="../../references.d.ts" />

class AppsPage implements IPage{
	public title ="Apps";
	public component="apps-page";
	public icon = "bookmark-o";

	constructor(
	){
		ko.track(this);
	}
}
export = AppsPage;


//require('./AppsPage.less');
ko.components.register('apps-page',{
	template: require('./AppsPage.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof AppsPage ? params : params.option;
		}
	}
});

