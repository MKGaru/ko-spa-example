/// <reference path="../../references.d.ts" />

class Widget{
	private element:Element;
	constructor(
		public title
	){
		ko.track(this);
	}
	public link(element:Element){
		this.element = element;
		//$(element).draggable();
	}
}
export = Widget;

require('./Widget.less');
ko.components.register('widget',{
	template: require('./Widget.html'),
	viewModel:{
		createViewModel(params, componentInfo){
			var vm:Widget = params instanceof Widget ? params : ko.utils.unwrapObservable(params.option);
			vm.link(componentInfo.element);
			return vm;
		}
	}
});
