define([
	"dojo/aspect",
	"dojo/_base/lang",
	"dijit/_WidgetBase",
	"../_ComponentMixin"
], function(aspect,lang,_WidgetBase,_ComponentMixin,Canvas){
	lang.extend(_WidgetBase, /*===== {} || =====*/ _ComponentMixin.prototype);
	
	aspect.before(_WidgetBase.prototype, "postscript", function(/*Object?*/ params, /*DomNode|String*/ srcNodeRef){
		if (this.isOwner && this.isOwner()) {
			this._components = {};
		}
	});
		// Monkey patch dijit._WidgetBase.startup to get data binds set up
	aspect.before(_WidgetBase.prototype, "startup", function(){

		var name = this.getName(),owner = this.getOwner();
		if (name && owner) {
			owner.addComponent(name,this);
		}
	});

	// Monkey patch dijit._WidgetBase.destroy to remove watches setup in _DataBindingMixin
	aspect.before(_WidgetBase.prototype, "destroy", function(){
		var name = this.getName(),owner = this.getOwner();
		if (name && owner) {
			owner.removeComponent(name);
		}
		if (this.isOwner && this.isOwner()) {
			this._components = null;
		}
	});

	aspect.around(_WidgetBase.prototype, "getOwner", function(oldComponentGetOwner){
		return function(){
			var parent = this.getParent();
			while (parent) {
				if (parent.isOwner && parent.isOwner()) {
					return parent;
				}
				parent = parent.getParent();	
			}
		};
	});
	
	aspect.around(_WidgetBase.prototype, "getName", function(oldComponentGetName){
		return function(){
			return this.name;
		};
	});
	

});
