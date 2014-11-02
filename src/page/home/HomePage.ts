/// <reference path="../../references.d.ts" />

class HomePage implements IPage{
	public title = "System";
	public icon = "tachometer";

	public resources:any =null;
	constructor(
	){
		ko.track(this);
		this.fetchResources();
	}
	public fetchResources(){
		var page = this;
		$.getJSON('api/resources.json', function (resources) {
			page.resources = resources;
		})
	}

}
export = HomePage;


$("head").append(
	$("<style>").html(require('./HomePage.less'))
);


ko.components.register('home-page',{
	template: require('./HomePage.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof HomePage ? params : params.option;
		}
	}
});

