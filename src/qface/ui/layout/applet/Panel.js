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
	"dijit/_Widget",
	"dijit/_TemplatedMixin",
	"dijit/_Container"
],function(declare,lang,array,domStyle,_Widget,_TemplatedMixin,_Container) {

	return declare([_Widget, _TemplatedMixin, _Container], {
		//	summary:
		//		A customizable toolbar that you can reposition and add/remove/reposition applets on
		templateString: "<div style=\"width:100%;height:24px\"><div style=\"width:100%;height:100%\" data-dojo-attach-point=\"containerNode\"></div></div>",
		//	span: Float
		//		a number between 0 and 1 indicating how far the panel should span accross (1 being the whole screen, 0 being none)
		span: 1,
		//	opacity: Float
		//		a number between 0 and 1 indicating how opaque the panel should be (1 being visible, 0 being completely transparent)
		opacity: 1,
		//	thickness: Integer
		//		how thick the panel should be in pixels
		thickness: 24,
		//	locked: Boolean
		//		are the applets and the panel itself be repositionable?
		locked: false,
	
		getOrientation: function(){
			return "horizontal";
		},
		
		lock: function(){
			//	summary:
			//		Locks the panel
			this.locked = true;
			array.forEach(this.getChildren(), function(item){
				item.lock();
			});
		},
		unlock: function(){
			//	summary:
			//		Unlocks the panel
			this.locked = false;
			array.forEach(this.getChildren(), function(item){
				item.unlock();
			});
		},
		dump: function(){
			//	summary:
			//		Returns a javascript object that can be used to restore the panel using the restore method
			var applets = [];
			var myw = domStyle.get(this.domNode, "width"), myh = domStyle.get(this.domNode, "height");
			array.forEach(this.getChildren(), lang.hitch(this, function(item){
				var left=domStyle.get(item.domNode, "left"), top=domStyle.get(item.domNode, "top");
				var pos = (this.getOrientation() == "horizontal" ? left : top);
				pos = pos / (this.getOrientation() == "horizontal" ? myw : myh);
				var applet = {
					settings: item.settings,
					pos: pos,
					declaredClass: item.declaredClass
				};
				applets.push(applet);
			}));
			return applets;
		},
		resize: function(){
			array.forEach(this.getChildren(), function(item){
				item.resize();
			});
		}		
		
		
	});

});


