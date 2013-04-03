/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/aspect",
	"dojo/_base/lang",
	"dijit/_WidgetBase",
	"./_refBindingMixin",
	"dijit/registry"
], function(aspect, lang, _WidgetBase, _refBindingMixin){
	// Apply the at binding mixin to all dijits, see mixin class description for details.
	// Hiding this from the doc viewer since it's too much to display for every single widget.
	lang.extend(_WidgetBase, /*===== {} || =====*/ _refBindingMixin.prototype);

	// Monkey patch dijit._WidgetBase.postscript to get the list of dojox/mvc/at handles before startup
	aspect.before(_WidgetBase.prototype, "postscript", function(/*Object?*/ params, /*DomNode|String*/ srcNodeRef){
		this._refpostscript(params, srcNodeRef);
	});

	// Monkey patch dijit._WidgetBase.startup to get data binds set up
	aspect.before(_WidgetBase.prototype, "startup", function(){
		this._startRefWatchHandles();
	});

	// Monkey patch dijit._WidgetBase.destroy to remove watches setup in _DataBindingMixin
	aspect.before(_WidgetBase.prototype, "destroy", function(){
		this._stopRefWatchHandles();
	});

	// Monkey patch dijit._WidgetBase.set to establish data binding if a qface/app/jaml/at handle comes
	aspect.around(_WidgetBase.prototype, "set", function(oldWidgetBaseSet){
		return function(/*String*/ name, /*Anything*/ value){
			if(name == _refBindingMixin.prototype.dataBindAttr){
				return this._setBind(value);
			}else if((value || {}).atsignature == "qface.app.jaml.ref"){
				return this._setRefWatchHandle(name, value);
			}
			return oldWidgetBaseSet.apply(this, lang._toArray(arguments));
		};
	});
});
