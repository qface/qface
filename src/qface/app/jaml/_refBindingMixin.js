/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/has",
	"./sync"
], function(array, lang, declare, has, sync){
	var resolve = function(/*String*/ target, /*dojo/Stateful?*/ models){
		// summary:
		//		Find a dojo/Stateful for the target.
		// description:
		//		If target is not a string, return target itself.
		//		If target is "widget:widgetid", returns the widget whose ID is widgetid.
		//		If target is "rel:object.path", or target is other string, returns an object under parent (if specified) or under global scope.
		// target: dojo/Stateful|String
		//		The data binding to resolve.
		// container: dojo/Stateful?
		//		The parent data binding. Used when the data binding is defined inside repeat.
		if (lang.isString(target)) {
			return  models.getSubModel(target);
		} else {
			return target;
		}	
	};


	function getParent(/*dijit/_WidgetBase*/ w){
		// summary:
		//		Returns parent widget having data binding target for relative data binding.
		// w: dijit/_WidgetBase
		//		The widget.

		// Usage of dijit/registry module is optional. Return null if it's not already loaded.
		var registry;
		try{
			registry = require("dijit/registry");
		}catch(e){
			return;
		}
		var pn = w.domNode && w.domNode.parentNode, pw, pb;
		while(pn){
			pw = registry.getEnclosingWidget(pn);
			if(pw){
				var relTargetProp = pw._relTargetProp || "target", pt = lang.isFunction(pw.get) ? pw.get(relTargetProp) : pw[relTargetProp];
				if(pt || relTargetProp in pw.constructor.prototype){
					return pw; // dijit/_WidgetBase
				}
			}
			pn = pw && pw.domNode.parentNode;
		}
	}
	
	function getApp(target) {
		var widget = target;
		while (widget) {
			if (widget.app) {
				return widget.app;
			}
			widget = widget.getParent();	
		}
	
	}

	function bind(/*dojo/Stateful|String*/ source, /*String*/ sourceProp, /*dijit/_WidgetBase*/ target, /*String*/ targetProp, /*dojox/mvc/sync.options*/ options){
		// summary:
		//		Resolves the data binding literal, and starts data binding.
		// source: dojo/Stateful|String
		//		Source data binding literal or dojo/Stateful to be synchronized.
		// sourceProp: String
		//		The property name in source to be synchronized.
		// target: dijit/_WidgetBase
		//		Target dojo/Stateful to be synchronized.
		// targetProp: String
		//		The property name in target to be synchronized.
		// options: dojox/mvc/sync.options
		//		Data binding options.

		var _handles = {}, parent = getParent(target), app = getApp(target),relTargetProp = parent && parent._relTargetProp || "target";

		function resolveAndBind(){
			_handles["Two"] && _handles["Two"].unwatch();
			delete _handles["Two"];

			var relTarget = parent && (lang.isFunction(parent.get) ? parent.get(relTargetProp) : parent[relTargetProp]),
			 resolvedSource = resolve(source, app.models),
			 resolvedTarget = resolve(target, app.models);

			if(!resolvedSource || !resolvedTarget){ return; }
			if((!resolvedSource.set || !resolvedSource.watch) && sourceProp == "*"){
				return;
			}

			if(sourceProp == null){
				// If source property is not specified, it means this handle is just for resolving data binding target.
				// (For dojox/mvc/Group and dojox/mvc/Repeat)
				// Do not perform data binding synchronization in such case.
				lang.isFunction(resolvedTarget.set) ? resolvedTarget.set(targetProp, resolvedSource) : (resolvedTarget[targetProp] = resolvedSource);
			}else{
				// Start data binding
				_handles["Two"] = sync(resolvedSource, sourceProp, resolvedTarget, targetProp, options); // dojox/mvc/sync.handle
			}
		}

		resolveAndBind();
		if(parent && /^rel:/.test(source) || /^rel:/.test(target) && lang.isFunction(parent.set) && lang.isFunction(parent.watch)){
			_handles["rel"] = parent.watch(relTargetProp, function(name, old, current){
				if(old !== current){
					resolveAndBind();
				}
			});
		}
		var h = {};
		h.unwatch = h.remove = function(){
			for(var s in _handles){
				_handles[s] && _handles[s].unwatch();
				delete _handles[s];
			}
		};
		return h;
	}

	// TODO: Like _DataBindingMixin, this should probably just be a plain Object rather than a Class
	var _refBindingMixin = declare("qface/app/jaml/_refBindingMixin", null, {
		// summary:
		//		The mixin for dijit/_WidgetBase to support data binding.

		// qfaceDataBindArr: String
		//		The attribute name for data binding.
		qfaceDataBindArr: "data-qface-bindings",

		_refpostscript: function(/*Object?*/ params, /*DomNode|String*/ srcNodeRef){
			// summary:
			//		See if any parameters for this widget are dojox/mvc/at handles.
			//		If so, move them under this._refs to prevent widget implementations from referring them.

			var refs = this._refs = (params || {}).refs || {};
			for(var prop in params){
				if((params[prop] || {}).atsignature == "qface.app.jaml.ref"){
					var h = params[prop];
					delete params[prop];
					refs[prop] = h;
				}
			}
		},

		_startRefWatchHandles: function(){
			// summary:
			//		Establish data bindings based on dojox/mvc/at handles.

			var refs = this._refs;
			if(refs){
				var refWatchHandles = this._refWatchHandles = this._refWatchHandles || {};

				// Clear the cache of properties that data binding is established with
				this._excludes = null;

				// First, establish non-wildcard data bindings
				for(var prop in refs){
					if(!refs[prop] || prop == "*"){ continue; }
					refWatchHandles[prop] = bind(refs[prop].target, refs[prop].targetProp, this, prop, {bindDirection: refs[prop].bindDirection, converter: refs[prop].converter});
				}

				// Then establish wildcard data bindings
				if((refs["*"] || {}).atsignature == "qface.app.jaml.ref"){
					refWatchHandles["*"] = bind(refs[prop].target, refs["*"].targetProp, this, "*", {bindDirection: refs["*"].bindDirection, converter: refs["*"].converter});
				}
			}
		},

		_stopRefWatchHandles: function(){
			// summary:
			//		Stops data binding synchronization handles as widget is destroyed.

			for(var s in this._refWatchHandles){
				this._refWatchHandles[s].unwatch();
				delete this._refWatchHandles[s];
			}
		},

		_setRefWatchHandle: function(/*String*/ name, /*Anything*/ value){
			// summary:
			//		Called if the value is a dojox/mvc/at handle.
			//		If this widget has started, start data binding with the new dojox/mvc/at handle.
			//		Otherwise, queue it up to this._refs so that _dbstartup() can pick it up.

			if(name == "ref"){
				throw new Error(this + ": 1.7 ref syntax used in conjuction with 1.8 dojox/mvc/at syntax, which is not supported.");
			}

			// Claen up older data binding
			var refWatchHandles = this._refWatchHandles = this._refWatchHandles || {};
			if(refWatchHandles[name]){
				refWatchHandles[name].unwatch();
				delete refWatchHandles[name];
			}

			// Claar the value
			this[name] = null;

			// Clear the cache of properties that data binding is established with
			this._excludes = null;

			if(this._started){
				// If this widget has been started already, establish data binding immediately.
				refWatchHandles[name] = bind(value.target, value.targetProp, this, name, {bindDirection: value.bindDirection, converter: value.converter});
			}else{
				// Otherwise, queue it up to this._refs so that _dbstartup() can pick it up.
				this._refs[name] = value;
			}
		},

		_setBind: function(/*Object*/ value){
			// summary:
			//		Sets data binding described in data-mvc-bindings.

			var list = eval("({" + value + "})");
			for(var prop in list){
				var h = list[prop];a
				if((h || {}).atsignature != "qface.app.jaml.ref"){
					console.warn(prop + " in " + qfaceDataBindArr + " is not a data binding handle.");
				}else{
					this._setRefWatchHandle(prop, h);
				}
			}
		},

		_getExcludesAttr: function(){
			// summary:
			//		Returns list of all properties that data binding is established with.

			if(this._excludes){ 
				return this._excludes;  // String[] 
			}
			var list = [];
			for(var s in this._refWatchHandles){
				if(s != "*"){ list.push(s); }
			}
			return list; // String[]
		},

		_getPropertiesAttr: function(){
			// summary:
			//		Returns list of all properties in this widget, except "id".
			// returns: String[]
			//		 The list of all properties in this widget, except "id"..

			if(this.constructor._attribs){
				return this.constructor._attribs; // String[]
			}
			var list = ["onClick"].concat(this.constructor._setterAttrs);
			array.forEach(["id", "excludes", "properties", "ref", "binding"], function(s){
				var index = array.indexOf(list, s);
				if(index >= 0){ list.splice(index, 1); }
			});
			return this.constructor._attribs = list; // String[]
		}
	});

	_refBindingMixin.prototype[_refBindingMixin.prototype.qfaceDataBindArr] = ""; // Let parser treat the attribute as string
	return _refBindingMixin;
});
