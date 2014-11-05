var DirectoryTree = (function () {
    function DirectoryTree(name, description, sub) {
        this.name = name;
        this.description = description;
        this.sub = sub;
        this.isOpened = true;
        ko.track(this);
    }
    return DirectoryTree;
})();
require('./DirectoryTree.less');
ko.components.register('directory-tree', {
    template: require('./DirectoryTree.html'),
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return params instanceof DirectoryTree ? params : ko.unwrap(params.option);
        }
    }
});
module.exports = DirectoryTree;
