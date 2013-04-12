/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "require",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/on", 
	"dojo/dom",
    "dojo/query",
	"dojo/data/ItemFileReadStore",
    "dijit/_Widget",
  	"dijit/_TemplatedMixin",
  	"dijit/_Container",
  	"dijit/_Contained",
	"dijit/form/TextBox",
	"dijit/form/Button",
	"dijit/Tree",
	"dijit/layout/_LayoutWidget", 
    "dijit/layout/ContentPane",
    "dijit/form/FilteringSelect",
    "qface/ui/window/Window",
 	"qface/util/html"
	
],function(require,lang,declare,array,domStyle,domClass,on,dom,query,ItemFileReadStore,_Widget,_TemplatedMixin,_Container,_Contained,TextBox,Button,Tree,_LayoutWidget,ContentPane,FilteringSelect,Window,utilHtml) {

	var ListView = declare([_LayoutWidget], {
	
		//	textShadow: boolean
		//		Should the items have text shadows
		textShadow: false,
		//	vertical: boolean
		//		should the icons be arranged vertically? if not, then they are placed horizontally.

		vertical: false,
		//	subdirs: boolean
		//		should the scene navigate through subdirs?

		scene:null,
		
		
		postCreate: function(){
			this.connect(this.domNode, "onmousedown", "_onClick");
			this.connect(this.domNode, "oncontextmenu", "_onRightClick");
			
			
			var sNode = this.scrollNode = document.createElement("div");
			domStyle.set(sNode, "position", "relative");
			this.domNode.appendChild(sNode);
			domStyle.set(this.domNode, "overflow", "auto");
		},
		
		
		_loadStart: function(){
			//	summary:
			//		a hook for when the filearea begins to fetch data.
		},
		
		_loadEnd: function(){
			//	summary:
			//		a hook for when the filearea finishes to fetch data.
		},
		
		checkForItem: function(/*String*/name){
			//	summary:
			//		checks for a file in this directory with the name provided
			//	name: the full name (NOT the path) of the file
			//	returns: true if the file does exist, false if not.
			var children = this.getChildren();
			for(var i=0; i < children.length; i++){
				if(!children[i]) continue;
				if(children[i].name == name) return true;
			}
			return false;
		},
		
		onItem: function(/*String*/appSysname,/*String*/name){
			//	summary:
			//		Called when an item is open
			//		You can overwrite this with your own function.
			//		Defaults to opening the file
			//	appSysname:
			//		the sysname to the app
		},
		
		onHighlight: function(path){
			//	summary:
			//		Called when a file is highlighted
		},
		
		_onClick: function(e){
			var w = dijit.getEnclosingWidget(e.target);
			if (w.isInstanceOf(ListViewItem)){
				w._dragStart(e);
				if (domClass.contains(e.target, "listItemIcon")) {
					w._onIconClick(e);
				} else {
					if (!(domClass.contains(e.target, "shadowFront") ||
					domClass.contains(e.target, "shadowBack") ||
					domClass.contains(e.target, "iconLabel"))) 
						w._onIconClick(e);
				}		
			} else {
				//we could put a dragbox selection hook here
				array.forEach(this.getChildren(), function(item){
					item.unhighlight(e);
				});
			}
		},
		
		_onRightClick: function(e){
			//	summary:
			//		Event Handler
			//		passes click event to the appropriate child widget
			//		if a widget wasn't clicked on, we open our own menu
			var w = dijit.getEnclosingWidget(e.target);
	        if(!w) return;
			if (w.isInstanceOf(ListViewItem)){
//				w.menu._contextMouse();
			this.menu._openMyself({"target":e.target, "coords":{x: e.pageX, y: e.pageY}});
			}
			else
			{
//				this.menu._contextMouse();
			this.menu._openMyself({"target":e.target, "coords":{x: e.pageX, y: e.pageY}});
			}
		},
		

		updateItems: function(/*Array*/items){
			
			//clear the area
			array.forEach(this.getChildren(), function(item){
	            if(item){
	                this.removeChild(item);
	    			item.destroy();
	            }
			}, this);
			
			//cancel the current xhr if there is one
			if(this._lsHandle) this._lsHandle.cancel();
			//list the path
			this._loadStart();
			array.forEach(items, function(item){
				var name = item.name;
				var p = name.lastIndexOf(".");
				var ext = name.substring(p+1, name.length);
				//var icon = //srvConfig.filesystem.icons[ext.toLowerCase()];
				var wid = new ListViewItem({
					sysname:item.sysname,
					label: name,
					name: name,
					path: item.path,
					type: item.type,
					iconClass: item.icon
//					iconClass: (item.type=="text/directory" ? "icon-32-places-folder" : (icon || "icon-32-mimetypes-text-x-generic"))
				});
				this.addChild(wid);
				wid.startup();
			}, this);
			
			//invoke a layout so that everything is positioned correctly
			this.layout();
			this._loadEnd();
		},
		
		layout: function(){
			//	summary:
			//		Lays out the icons vertically or horizontally depending on the value of the 'vertical' property
			var width = this.domNode.offsetWidth;
			var height = this.domNode.offsetHeight;
			var hspacing = 100;
			var vspacing = 70;
			var wc = 0; //width counter
			var hc = 0; //height counter
			var children = this.getChildren();
			for(var key in children){
				var w = children[key];
				if(!w.declaredClass) continue;
				domStyle.set(w.domNode, {
					position: "absolute",
					top:  hc+"px",
					left: wc+"px"
				});
				
				if (this.vertical) {
					hc += vspacing;
					if(hc >= (height - vspacing)){
						hc = 0;
						wc += hspacing;
					}
				} else {
					wc += hspacing;
					if(wc >= (width - hspacing)){
						wc = 0;
						hc += vspacing;
					}
				}
			};
			domStyle.set(this.scrollNode, (this.vertical ? "height" : "width"), hc+"px");
		},
		
		_fixDuplicateFilename: function(name, type){
			var i=2;
			var nameOrig = name;
			//TODO: this could be bad if the filearea hasn't been refreshed recently...
			var p = name.lastIndexOf(".");
			var ext = name.substring(p+1, name.length);
			var hideExt = (type != "text/directory" && p != -1);
			if(hideExt){
				nameOrig = name.substring(0, p);
			}
			while(this.checkForItem(name)){
				name = nameOrig + " "+i;
				if(hideExt){
					name += "."+ext;
				}
				i++;
			}
			return name;
		}
	});


	var ListViewItem  = declare([_Widget, _TemplatedMixin, _Contained], {
		templateString:"<div class='listItem' style='width: 80px; height: 50px; padding: 10px;' data-dojo-attach-point='focusNode'>\n\t<div class='listItemIcon ${iconClass}' data-dojo-attach-point='iconNode'></div>\n\t<div class='iconLabel' data-dojo-attach-point='labelNode'>\n\t\t<div data-dojo-attach-point='textFront' class='shadowFront'>${label}</div>\n\t\t<div data-dojo-attach-point='textBack' class='shadowBack'>${label}</div>\n\t\t<div data-dojo-attach-point='textHidden' class='shadowHidden'>${label}</div>\n\t</div>\n</div>\n",

		//	label: string
		//		The label shown underneath the icon
		label: "File",

		//	type: string
		//		the mimetype of this file
		type: "text/directory",

		//	iconClass: string
		//		the CSS class of the icon displayed
		iconClass: "icon-32-places-folder",

		//	highlighted: boolean
		//		is the file currently highlighted? (read-only)
		highlighted: false,
		
		//	name: string
		//		the file's full name
		name: "",
		
		//	_clickOrigin: object
		//		the origin of the mouse when we are clicked. Used for DnD.
		_clickOrigin: {x: 0, y: 0},
		
		//	_docNode: domNode
		//		the domNode that is on the document. Used for DnD.
		_docNode: null,

		//	_dragTopicPublished: Boolean
		//		set to true when the icon has been dragged more then five pixels
		//		and the drag start topic has been published
		_dragTopicPublished: false,
		
		postCreate: function(){
			
			on(this.iconNode, "click", lang.hitch(this,this._onClick));
			on(this.labelNode, "dblclick", lang.hitch(this,this.rename));
			
			on(this.domNode,"mouseover",lang.hitch(this,function(){
					domClass.add(this.domNode,"actived");
				})
			);
		    
			on(this.domNode,"mouseout",lang.hitch(this,function(){
					domClass.remove(this.domNode,"actived");
				})
			);
			
			
			query("*", this.labelNode).forEach(function(node){
				dom.setSelectable(node, false);
			})
			
			var con = {};
			
		},
		
		uninitialize: function(){
			array.forEach(this._subscriptions, dojo.unsubscribe);
	        if(typeof this._win != "undefined" && !this._win.closed)
	            this._win.close();
		},
		
		
		_dragStart: function(e){
			dojo.stopEvent(e);
		},
		_onMove: function(e){
		},
		_onRelease: function(e){
		},

		_formatLabel: function(name){
			return name;
		},
		
		_onClick: function(e){
			this.getParent().onItem(this.sysname,this.name);
		},
		highlight: function(){
			//	summary:
			//		highlights the icon
			this.highlighted = true;
//			domClass.add(this.labelNode, "selectedItem");
//			domClass.add(this.iconNode, "listItemIconSelected");
			var p = this.getParent();
			p.onHighlight(this.name);
		},
		_onIconClick: function(){
			array.forEach(this.getParent().getChildren(), function(item){
				item.unhighlight();
			});
			this.highlight();
		},
		rename: function(){
		},

		unhighlight: function(){
			//	summary:
			//		unhighlights the icon
			this.highlighted = false;
			domClass.remove(this.labelNode, "selectedItem");
			domClass.remove(this.iconNode, "listItemIconSelected");
		},
		
		startup: function(){
			this.label = this._formatLabel(this.label);
			this.fixStyle();
		},
		
		fixStyle: function(){
			if(!this.getParent().textShadow){
				domClass.remove(this.textFront, "shadowFront");
				domClass.add(this.textFront, "iconLabel");
				domStyle.set(this.textBack, "display", "none");
				domStyle.set(this.textHidden, "display", "none");
			}
			else {
				domClass.add(this.textFront, "shadowFront");
				domClass.remove(this.textFront, "iconLabel");
				domStyle.set(this.textBack, "display", "block");
				domStyle.set(this.textHidden, "display", "block");
			}
			array.forEach([
				this.textFront,
				this.textBack,
				this.textHidden
			], function(node){
				utilHtml.textContent(node, this.label);
			}, this);
		}
	});


	return ListView;

});


