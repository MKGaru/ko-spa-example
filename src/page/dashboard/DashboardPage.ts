/// <reference path="../../references.d.ts" />

import Widget = require('../../parts/widget/Widget');
import WidgetHolder = require('../../parts/widget/WidgetHolder');

class DashboardPage implements IPage{
	public title:string = undefined;
	public icon = "tachometer";
	public component = "dashboard-page";

	public id:string=undefined;
	public widgetHolder:WidgetHolder = undefined;

	public message=undefined;
	constructor(){
		ko.track(this);
	}

	public load(id:string){
		this.id = id;
		var base = $("base").attr("href").slice(0,-1);
		var endpoint = "{base}/api/dashboard/{id}.json".assign({base:base,id:id});
		var dashboard = this;

		return $.getJSON(endpoint)
			.done(function(data){
				//DEMO GithubPageでのテストデモ用に、localstorageから復帰するよ。
				var restore = localStorage.getItem(endpoint);
				if(restore){
					data = JSON.parse(restore);
				}
				//～ forDEMO

				dashboard.title = data.title;
				dashboard.widgetHolder = new WidgetHolder(data.widgets.map(widget=>({
					widget: new Widget(widget.data),
					size_x:widget.size_x,
					size_y:widget.size_y,
					col:widget.col,
					row:widget.row
				})))
			})
	}
	private save(){
		var widgetHolder = this.widgetHolder;
		var serialized = {
			title: this.title,
			widgets:[]
		};
		serialized.widgets = widgetHolder.gridster.serialize().map((widgetLayout,index)=>({
			type:"text",
			data: widgetHolder.widgets[index].widget.title,
			size_x:widgetLayout.size_x,
			size_y:widgetLayout.size_y,
			col:widgetLayout.col,
			row:widgetLayout.row
		}));

		var base = $("base").attr("href").slice(0,-1);
		var endpoint = "{base}/api/dashboard/{id}.json".assign({base:base,id:this.id});

		//GithubPageでのテストデモ用に、localstorageに退避するよ
		localStorage.setItem(endpoint,JSON.stringify(serialized));

		this.message="Save success.";

		/*
		$.ajax({
			type: "post",
			url:endpoint,
			data: JSON.stringify(serialized),
			contentType: 'application/json'
		}).done(function(){

		}).fail(function(){

		});
		*/

	}
}
export = DashboardPage;

require('./DashboardPage.less');
ko.components.register('dashboard-page',{
	template: require('./DashboardPage.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			return params instanceof DashboardPage ? params : params.option;
		}
	}
});

