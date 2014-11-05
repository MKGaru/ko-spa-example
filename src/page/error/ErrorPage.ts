/// <reference path="../../references.d.ts" />

class ErrorPage implements IPage{
	public title ="Error";
	public component ="error-page";
	public icon = "warning";

	public code:number=500;
	public message:string = '';

	constructor(
	){
		ko.track(this);
	}
}
export = ErrorPage;

//require('./ErrorPage.less');
ko.components.register('error-page',{
	template: require('./ErrorPage.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof ErrorPage ? params : params.option;
		}
	}
});

