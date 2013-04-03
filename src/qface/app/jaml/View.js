/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/declare", 
	"dojo/_base/lang", 
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-class",
	"dijit/_WidgetBase", 
	"dijit/_Container", 
	"dijit/_Contained",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"qface/ui/_patches"
],function(declare,lang,array,dstyle,cls,Widget,Container,Contained,TemplatedMixin,WidgetsInTemplateMixin){
	return declare("qface.app.jaml.View", [Widget,TemplatedMixin,Container,Contained, WidgetsInTemplateMixin], {
		/*
			event handler hashmap.
			syntex:	{
						"control name" :	{
												"event name"	: function() {
												},
												...
											},
						...
					}
			ex: {
					
				}
		*/
		_handler	: null,
		
		isView  : true,
		
		selected: false,
		keepScrollPosition: true,
		baseClass: "applicationView mblView",
		config:null,
		widgetsInTemplate: true,
		templateString: '<div></div>',
		
		
		toString: function(){
			return this.id;
		},
		
		activate:function(){
			this.onactivate();
		},
		
		deactivate: function(){
			this.ondeactivate();
		},
		
		isOwner : function() {
			return true;
		},
		
		//Temporary work around for getting a null when calling getParent
		getParent: function(){
			return null;
		},
		
		buildRendering: function(){
			this.inherited(arguments);
			dstyle.set(this.domNode, {width: "100%", "height": "100%"});
			cls.add(this.domNode,"dijitContainer");
		},
		
		startup : function() {
			if(this._started){ return; }

			this.inherited(arguments);
			
			this._setupEventHandler();
			
		},
		
		onactivate : function(){
		},
		
		ondeactivate : function(){
		},
		
		_setupEventHandler : function() {
			if (this._handler) {
				for (var wename in this._handler) {
					if (lang.isFunction(this._handler[wename])) {
						var names = wename.split("_");
						if (names.length==2) {
							var wname = names[0],ename=names[1];
							if (this[wname] && this[wname].on) {
								this[wname].on(ename,lang.hitch(this._handler,this._handler[wename]));
							}
						}else if (wename == "activate" || wename == "deactivate") {
							this.on(wename,lang.hitch(this._handler,this._handler[wename]));
						}
					}	
				}
			}	
		}
		
	});
});
