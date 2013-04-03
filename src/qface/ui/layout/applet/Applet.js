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
    "dijit/_Widget",
  	"dijit/_TemplatedMixin",
  	"dijit/_Container",
  	"dijit/_Contained",
  	"dijit/Menu",
  	"dijit/MenuItem",
  	"./AppletMoveable"
],function(declare,lang,array,domStyle,domClass,_Widget,_TemplatedMixin,_Container,_Contained,Menu,MenuItem,AppletMoveable) {
    return declare([_Widget, _TemplatedMixin, _Container,_Contained], {
		//	summary:
		//		An applet that can be added to a panel
		templateString: "<div class=\"sceneApplet\" dojoAttachEvent=\"onmouseover:_mouseover,onmouseout:_mouseout\"><div class=\"sceneAppletHandle\" data-dojo-attach-point=\"handleNode\"></div><div class=\"sceneAppletContent\" data-dojo-attach-point=\"containerNode\"></div></div>",
		//	settings: Object
		//		An object with settings for the applet. This is persistant.
		settings: {},
		//	locked: Boolean
		//		Weather or not the applet is locked on the panel.
		locked: false,
		//	pos: Float
		//		The position of the applet on the panel.
		//		Horizontally, 0 would be on the left, and 1 would be on the right.
		//		Vertically, 0 would be on the top, 1 would be on the bottom.
		pos: 0,
		//	fullspan: Boolean
		//		When set to true, the applet will take up as much space as possible without overlapping the next applet.
		fullspan: false,
		//	dispName: String
		//		The name that is displayed on the "Add to panel" dialog.
		dispName: "Applet",
		//	appletIcon: String
		//		The applet's iconClass on the "Add to panel" dialog.
		appletIcon: "icon-32-categories-applications-other",
		
		scene : null,
		
		postCreate: function(){
			this._moveable = new AppletMoveable(this.domNode, {
				handle: this.handleNode,
				constraints: lang.hitch(this, function(){
					var c = {};
					if (this.getParent().getOrientation() == "horizontal"){
						c = {
							t: 0,
							l: 0,
							w: domStyle.get(this.getParent().domNode, "width") - (this.fullspan ? 0 : domStyle.get(this.domNode, "width")),
							h: 0
						};
					}
					else {
						c = {
							t: 0,
							l: 0,
							w: 0,
							h: domStyle.get(this.getParent().domNode, "height") - (this.fullspan ? 0 : domStyle.get(this.domNode, "height"))
						};
					}
					return c;
				})
			});
			this._moveable.onMoved = lang.hitch(this, function(e, f){
				var pos = domStyle.get(this.domNode, (this.getParent().getOrientation() == "horizontal" ? "left" : "top"));
				var barSize = domStyle.get(this.getParent().domNode, (this.getParent().getOrientation() == "horizontal" ? "width" : "height"));
				this.pos = pos/barSize;
				array.forEach(this.getParent().getChildren(), function(item){
					item._calcSpan();
				});
				this._onMoved();
			});
			if(this.fullspan) domClass.add(this.domNode, "sceneAppletFullspan");
			var menu = this.menu = new Menu({});
			this.menu.bindDomNode(this.handleNode);
			array.forEach([
				{
					label: "Remove from panel",
					iconClass: "icon-16-actions-list-remove",
					onClick: lang.hitch(this, function(){
						this.destroy();
						this._onDeleted();
					})
				}
			], function(args){
				var item = new MenuItem(args);
				menu.addChild(item);
			});
			//TODO: get it so that applets don't overlap eachother
		},
		
		_onMoved : function() {
		},
		
		_onDeleted : function() {
		},
		
		resize: function(){
			//	summary:
			//		fixes orientation and size of the applet
			var size = domStyle.get(this.getParent().domNode, this.getParent().getOrientation() == "horizontal" ? "width" : "height");
			domStyle.set(this.domNode, (this.getParent().getOrientation() == "horizontal" ? "left" : "top"), (this.pos*size)+"px");
			domStyle.set(this.domNode, (this.getParent().getOrientation() != "horizontal" ? "left" : "top"), "0px");
			this._calcSpan(size);
		},
		_calcSpan: function(/*Integer?*/size){
			//	summary:
			//		If the fullspan property is true, this calculates the width or height of the applet,
			//		so that it is as big as possible without overlapping the next applet
			//	size:
			//		an optional argument to save an extra dojo.style call. This is the width/height of the parent panel (depending on orientation).
			if(this.fullspan){
				if(!size) size = domStyle.get(this.getParent().domNode, this.getParent().getOrientation() == "horizontal" ? "width" : "height");
				var nextApplet = size;
				var children = this.getParent().getChildren();
				for(var a in children){
					var child = children[a];
					if(child.pos > this.pos){
						nextApplet = child.pos*size;
						break;
					}
				}
				domStyle.set(this.domNode, this.getParent().getOrientation() == "horizontal" ? "width" : "height", ((nextApplet - (this.pos*size)) - 1)+"px");
				domStyle.set(this.domNode, this.getParent().getOrientation() == "horizontal" ? "height" : "width", "100%");
			}
		},
		uninitalize: function(){
			this._moveable.destroy();
		},
		_mouseover: function(){
			//	summary:
			//		Event handler for when the onmouseover event
			//		Shows the repositioning handle if the applet is unlocked
			if(!this.locked) domClass.add(this.handleNode, "sceneAppletHandleShow");
		},
		_mouseout: function(){
			//	summary:
			//		Event handler for the onmouseout event
			//		Hides the repositioning handle
			domClass.remove(this.handleNode, "sceneAppletHandleShow");
		},
		lock: function(){
			//	summary:
			//		Locks the applet
			this.locked=true;
		},
		unlock: function(){
			//	summary:
			//		Unlocks the applet
			this.locked=false;
		},
		setOrientation: function(/*String*/orientation){
			//	summary:
			//		Add any special things you need to do in order to change orientation in this function.
			//	orientation:
			//		will either be "horizontal" or "vertical"
		}
	});

});


