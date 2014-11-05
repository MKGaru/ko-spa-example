/// <reference path="../../references.d.ts" />
import Widget = require('./Widget');

class WidgetHolder{
	private element:Element;
	public gridster:any;
	constructor(
		public widgets:{widget:Widget;size_x:number;size_y:number;row:number;col:number;}[]
	){
		ko.track(this);
	}

	public link(element:Element){
		var holder = this;
		this.element = element;

		this.gridster = $(this.element).gridster({
			widget_margins: [10, 10],
			widget_base_dimensions: [250, 250],
			widget_selector: 'widget',
			auto_init:true,
			autogenerate_stylesheet:false,
			resize: {
				enabled: true,
				handle_append_to:'footer'
			},
			draggable:{
				items: 'widget',
				handle: 'header'
			}
		}).data('gridster');


		this.widgets.forEach((widget,i)=>{
			holder.gridster.add_widget('<widget params="option:widgets['+i+'].widget" class="panel panel-info"></widget>',
				widget.size_x,
				widget.size_y,
				widget.col,
				widget.row
			)
		});
	}
}
export = WidgetHolder;

require('./WidgetHolder.less');
ko.components.register('widget-holder',{
	template: '<!-- empty -->',
	viewModel:{
		createViewModel(params, componentInfo){
			var vm:WidgetHolder = params instanceof WidgetHolder ? params : ko.unwrap(params.option);
			vm.link(componentInfo.element);
			return vm;
		}
	}
});
