/// <reference path="../../references.d.ts" />

class ErrorsPage implements IPage{
	public title ="Error";
	public icon = "warning";

	public code:number=500;
	public message:string = '';

	constructor(
	){
		ko.track(this);
	}
}
export = ErrorsPage;

/*
 $("head").append(
 $("<style>").html(require('./ErrorPage.less'))
 );
 */

ko.components.register('error-page',{
	template: require('./ErrorPage.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof ErrorsPage ? params : params.option;
		}
	}
});

