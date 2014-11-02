/// <reference path="../references.d.ts" />
var MenuItem = (function () {
    function MenuItem(arg1, arg2, arg3) {
        if (typeof arg1 == "string") {
            this.label = arg1;
            this.icon = arg2;
            this.href = arg3;
        }
        else {
            this.label = arg1.title;
            this.icon = arg1.icon;
            this.href = arg2;
        }
        ko.track(this);
    }
    return MenuItem;
})();
module.exports = MenuItem;
