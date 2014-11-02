/// <reference path="../references.d.ts" />

class MenuItem{
	public label:string;
	public icon:string;
	public href:string;

	constructor(page:IPage,href:string);
	constructor(label:string,	icon: string, href: string);
	constructor(arg1,arg2,arg3?)
	{
		if(typeof arg1 =="string"){
			this.label = arg1;
			this.icon = arg2;
			this.href = arg3;
		}else{
			this.label = (<IPage>arg1).title;
			this.icon = (<IPage>arg1).icon;
			this.href = arg2;
		}
		ko.track(this);
	}
}

export = MenuItem;