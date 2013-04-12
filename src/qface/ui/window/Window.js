/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "dojo",
	"dojo/_base/declare",
    "dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/_base/array",
    "dojo/query",
    "dojo/dom-style",
	"dojo/dom-geometry",
    "dojo/dom-class",
	"dojo/dom-construct",
    "dojo/topic",
	"dojo/Deferred",
	"dojo/on",
	"dojo/dom",
    "dijit",
	"dijit/_TemplatedMixin",
	"dijit/layout/BorderContainer",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/CheckedMenuItem",
	"dijit/MenuSeparator",
	"dojox/fx/easing",
	"dojox/layout/ResizeHandle",
	"qface/util/Enum",
  	"dojo/i18n!./nls/window"
],function(dojo,declare,lang,connect,array,query,domStyle,domGeometry,domClass,domConstruct,topic,Deferred,on,dom,dijit,_TemplatedMixin,BorderContainer,Menu,MenuItem,CheckedMenuItem,MenuSeparator,easing,ResizeHandle,Enum,nlsWindow) {
    var _container = null;
	
	var ContainerBase = declare(null,{
		addWindow : function(win,args){
			scene._area.addChild(win);
			return scene._windowList.newItem(args);
		},
		removeWindow : function(win,item){
	        scene._area.removeChild(win);
	        scene._windowList.deleteItem(item)
		},
		updateWindowTitle : function(item,title){
			scene._windowList.setValue(item, "label", title);
		},
		getBox : function(win,item){
			return scene._area.getBox(win,item);
		},
		restrictWindow : function(win){
		}
		
		
	});
	
	var Window =  declare( [BorderContainer, _TemplatedMixin], {
		//	summary:
		//		The window widget
		//	
		//	|	require([
		//	|	 "dojo/_base/lang"
		//	|	 "qface/ui/window/Window",
		//	|	 "dijit/layout/ContentPane"
		//	|	],function(lang,Window,ContentPane) {
		//	|		var win = new Window({
		//	|			title: "Sample",
		//	|			height: "200px",
		//	|			width: "400px"
		//	|		});
		//	|		var widget = new ContentPane();
		//	|		widget.setContent("baz");
		//	|		win.addChild(widget);
		//	|		win.show();
		//	|		win.startup();
		//	|		setTimeout(lang.hitch(win, "close"), 1000*5);
		//	|	}
		templateString:"<div class=\"win\"  data-dojo-attach-event=\"onmousedown:bringToFront,onfocus:bringToFront\" tabindex=\"0\" waiState=\"labelledby-${id}_title\" waiRole=\"window\">\n\t<div data-dojo-attach-point=\"titleBarNode\" class=\"win-tl\">\n\t\t<div class=\"win-tr\">\n\t\t\t<div class=\"win-tc\" data-dojo-attach-event=\"onmousedown: bringToFront\">\n\t\t\t\t<div dojoattachpoint=\"handle\" class=\"win-title\">\n\t\t\t\t\t<div class=\"win-icon ${iconClass}\"></div>\n\t\t\t\t\t<div data-dojo-attach-point=\"titleNode\" class=\"win-title-label\" id=\"${id}_title\">${title}</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"win-buttons\">\n\t\t\t\t\t<div data-dojo-attach-point=\"closeNode\" data-dojo-attach-event=\"onmouseup: close\" class=\"win-close\"></div>\n\t\t\t\t\t<div data-dojo-attach-point=\"maxNode\" data-dojo-attach-event=\"onmouseup: _toggleMaximize\" class=\"win-max\"></div>\n\t\t\t\t\t<div data-dojo-attach-point=\"minNode\" data-dojo-attach-event=\"onmouseup: minimize\" class=\"win-min\"></div>\n\t\t\t\t\t<div data-dojo-attach-point=\"fullNode\" data-dojo-attach-event=\"onmouseup: full\" class=\"win-full\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"win-bmw\" role=\"presentation\">\n\t\t<div class=\"win-ml\" role=\"presentation\">\n\t\t\t<div class=\"win-mr\" role=\"presentation\">\n\t\t\t\t<div class=\"win-mc\" style=\"overflow: hidden;\" dojoattachpoint=\"containerNode\" waiRole=\"\"></div>\n\t\t\t\t<div class=\"win-mc\" style=\"display: none;\" dojoattachpoint=\"dragContainerNode\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"win-bl\">\n\t\t\t<div class=\"win-br\">\n\t\t\t\t<div class=\"win-bc\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div dojoattachpoint=\"sizeHandle\" class=\"win-resize\"></div>\n\t</div>\n</div>\n",
		
		//	_winListItem: storeItem
		//		The store item that represents this window on scene.ui._windowList
		_winListItem: null,
		
		_started: false,
		
		//	closed: Boolean
		//		Is the window closed?
		closed: false,
	    
	    //  shown: Boolean
	    //      Is the window shown?
	    shown: false,
	    
	    //  main: Boolean?
	    //      Is this the main window for this application?
	    main: false,
		
		//	iconClass: String?
		//		the class to give the icon node
		iconClass: "",
		
		//	liveSplitters: Boolean
		//		specifies whether splitters resize as you drag (true) or only upon mouseup (false)
		liveSplitters: false,
		
		onClose: function(){
			//	summary:
			//		What to do on destroying of the window
		},
		
		onResize: function(){
			//	summary:
			//		What to do on the resizing of the window
		},
		
		onMinimize: function(){
			//	summary:
			//		What to do on the minimizing of the window
		},
		
		/*
		 * Property: onMaximize
		 * 
		 * What to do upon maximize of window
		 */
		onMaximize: function(isFull){
			//	summary:
			//		What to do upon maximize of window
		},
		
		gutters: false,
		
		//	showMaximize: Boolean
		//		Whether or not to show the maximize button
		showMaximize: true,
		
		//	showMinimize: Boolean
		//		Whether or not to show the minimize button
		showMinimize: true,
		
		//	showFull: Boolean
		//		Whether or not to show the full button
		showFull: true,
		
		//	showClose: Boolean
		//		Whether or not to show the close button
		showClose: true,
		
		//	maximized: Boolean
		//		Whether or not the window is maximized
		maximized: false,
		
		//	minimized: Boolean
		//		Whether or not the window is minimized
		minimized: false,

		//	fulled: Boolean
		//		Whether or not the window is fulled
		fulled: false,
		
		//	alwaysOnTop: boolean
		//		Whether or not the window is to always stay on top of other windows
		alwaysOnTop: false,	 	 	 
		
		//	height: String
		//		The window's height in px, or %.
		height: "480px",
		
		//	width: String
		//		The window's width in px, or %.
		width: "600px",
		
		//	title: String
		//		The window's title
		title: "(untitled)",
		
		//	resizable: Boolean
		//		Weather or not the window is resizable.
		resizable: true,
		
		//	pos: Object
		//		Internal variable used by the window maximizer
		pos: {top: 0, left: 0, width: 0, height: 0},
		
		//  minPos: Object
	    //      Same as pos, but when the window is minimized
	    minPos: {top: 0, left: 0, width: 0, height: 0},
	    
	    config: {fx:3,window:{animSpeed:275,constrain:false}},
	    
	    //	_minimizeAnim: Boolean
		//		Set to true when the window is in the middle of a minimize animation.
		//		This is to prevent a bug where the size is captured mid-animation and restores weird.
		_minimizeAnim: false,
		
		_locked : false,
		
		
		//app   : null,
		scene : null,
		
		constructor : function(params) {
			this.borderStyle = Window.BorderStyle.Normal;
			
			if (!params.scene && params.app) {
				this.scene = params.app.scene;
			}
		},
		
		postCreate: function(){
			
			dom.setSelectable(this.titleNode, false);
			this.domNode.title="";
			this.makeDragger();
			this.shown = false;
			this.closed = false;
			this.sizeHandle = new ResizeHandle({
				targetContainer: this.domNode,
				activeResize: (this.config.fx >= 2),
				animateSizing: false,
				animateDuration: this.config.window.animSpeed
			}, this.sizeHandle);
			if(!this.resizable)	{
				this.killResizer();
			}
			domClass.add(this.sizeHandle.domNode, "win-resize");
			on(this.sizeHandle.domNode, "mousedown", lang.hitch(this, function(e){
				this._resizeEnd = on(document, "mouseup", lang.hitch(this, function(e){
					this._resizeEnd.remove();
					this.resize();
				}));
			}));
			
//			if(dojo.isIE){
//				on(this.domNode,'resize',lang.hitch(this,"_onResize"));
//			}
			domStyle.set(this.domNode, "position", "absolute"); //override /all/ css values for this one
	        this.pos = {top: 0, left: 0, width: 0, height: 0};
	        this.minPos = {top: 0, left: 0, width: 0, height: 0};

	        this._makeMenu();

			this.inherited(arguments);
		},
		
	    _makeMenu: function(){
	        //  summary:
	        //      Makes the context menu for the window title
	        var nls = nlsWindow;
	        var menu = this._menu = new Menu();
	        this._menuItems = {};
	        menu.addChild(this._menuItems.min = new MenuItem({
	            label: nls.minimize,
	            onClick: lang.hitch(this, "minimize"),
	            disabled: !this.showMinimize
	        }));

	        menu.addChild(new MenuSeparator({}));
	        menu.addChild(this._menuItems.max = new MenuItem({
	            label: nls.maximize,
	            onClick: lang.hitch(this, "maximize"),
	            disabled: !this.showMaximize
	        }));

	        menu.addChild(new MenuSeparator({}));
	        menu.addChild(this._menuItems.full = new MenuItem({
	            label: nls.full,
	            onClick: lang.hitch(this, "full"),
	            disabled: !this.showFull
	        }));

	        menu.addChild(new MenuSeparator({}));
	        menu.addChild(new CheckedMenuItem({
	            label: nls.alwaysOnTop,
	            onChange: lang.hitch(this, function(val){
	                this.alwaysOnTop = val;
	                this.bringToFront();
	            })
	        }));
	        menu.addChild(new MenuSeparator({}));
	        menu.addChild(new MenuItem({
	            label: nls.close,
	            onClick: lang.hitch(this, "close"),
	            disabled: !this.showClose
	        }));
	        menu.bindDomNode(this.titleNode);
	        this._fixMenu();
	    },
	    
	    _fixMenu: function(){
	        var nls = nlsWindow;
	        var items = this._menuItems;
	        if(this.fulled){
	        	items.full.attr("label", nls.unfull);
	          items.full.onClick = lang.hitch(this, "unfull");
	        }else{
	        	items.full.attr("label", nls.full);
	        	items.full.onClick = lang.hitch(this,"full");
	        }

	        if(this.maximized){
	            items.max.attr("label", nls.unmaximize);
	            items.max.onClick = lang.hitch(this, "unmaximize");
	        }else{
	            items.max.attr("label", nls.maximize);
	            items.max.onClick = lang.hitch(this, "maximize");
	        }
	        if(this.minimized){
	            items.min.attr("label", nls.restore);
	            items.min.onClick = lang.hitch(this, "restore");
	        }else{
	            items.min.attr("label", nls.minimize);
	            items.min.onClick = lang.hitch(this, "minimize");
	        }
	    },
	    
	    
		show: function(){
			//	summary:
			//		Shows the window

	        if(this.shown)
	           return;
	        this.shown = true;
	        
	        this._winListItem = this.scene.addWindow(this,{
				label: this.title,
				icon: this.iconClass,
				id: this.id
			});
			
			this.scene.restrictWindow(this);
	        // fix close/min/max buttons
	        if (this.borderStyle == Window.BorderStyle.None) {
				domStyle.set(this.titleBarNode,"display","");
		      	query('.win-bl',this.domNode).style("display","none");
		      	query('.win-bmw',this.domNode).style("top",0);
		      	query('.win-mc',this.domNode).style("marginBottom",0);
	        } else {
		        if(!this.showClose){
		            domStyle.set(this.closeNode, "display", "nonethis.borderStyle == Window.BorderStyle.None"); // overridable in the theme with !important
		            domClass.add(this.closeNode, "win-button-hidden");
		        }
		        if(!this.showMaximize){
		            domStyle.set(this.maxNode, "display", "none");
		            domClass.add(this.maxNode, "win-button-hidden");
		        }
		        if(!this.showMinimize){
		            domStyle.set(this.minNode, "display", "none");
		            domClass.add(this.minNode, "win-button-hidden");
		        }

		        if(!this.showFull){
		            domStyle.set(this.fullNode, "display", "none");
		            domClass.add(this.fullNode, "win-button-hidden");
		        }
		    }

			
			this.titleNode.innerHTML = this.title;
			
			if (this.maximized) {
				var fulled = (this.fulled || this.borderStyle == Window.BorderStyle.None);
				this.maximized = false;
				this.fulled = false;
				
				this._maxfull(fulled);
			
			}
			
			domStyle.set(this.domNode, "display", "block");
	        this.resize({
	            width: this.width,
	            height: this.height
	        });
			//calculate the middle of the scene.ui.Area container
	        var calcWidth = this.domNode.offsetWidth;
			var calcHeight = this.domNode.offsetHeight;
			var bodyWidth = this.containerNode.offsetWidth;
			var bodyHeight = this.containerNode.offsetHeight;
			//var viewport = dijit.getViewport(); //modified by LWF
			var viewport = this.scene.getBox(this,this._winListItem);
			var topCount = 0;
			query(".scenePanelTop", this.scene.domNode).forEach(function(panel){
				topCount += panel.offsetHeight;
			});
			var topStyle = viewport.t + ((viewport.h/2) - (((calcHeight - bodyHeight)+calcHeight)/2));
			domStyle.set(this.domNode, {
				top: (topStyle > topCount ? topStyle : topCount)+"px",
				left: viewport.l + ((viewport.w/2) - (((calcWidth - bodyWidth)+calcWidth)/2))+"px"
			});
			if (this.config.fx >= 2){
				if (this.config.fx < 3) this._toggleBody(false);
				domStyle.set(this.domNode, "opacity", 0);
				var anim = dojo.fadeIn({
					node: this.domNode,
					duration: this.config.window.animSpeed
				});
				on(anim, "End", lang.hitch(this, function(){
					if (this.config.fx < 3) this._toggleBody(true);
					this.resize();
				}));
				anim.play();
			} else this.resize();
			this.bringToFront();
	        if(!this._started){
				this.startup();
			}

		},
		
		_toggleBody: function(/*Boolean*/show){
			//	summary:
			//		Toggles the display of the window's body
			//	show:
			//		If true the body is shown, if false then the body is hidden.
			if(show){
				domStyle.set(this.containerNode, "display", "block");
				domStyle.set(this.dragContainerNode, "display", "none");
			}
			else {
				domStyle.set(this.containerNode, "display", "none");
				domStyle.set(this.dragContainerNode, "display", "block");
			}
		},
		
		_setTitleAttr: function(/*String*/title){
			//	summary:
			//		Sets window title after window creation
			//	title:
			//		The new title
			this.titleNode.innerHTML = title;
			if(this._winListItem)
			    this.scene.updateWindowTitle(this._winListItem,title);
			this.title = title;
		},
		

		
		_getPoints: function(/*Object*/box){
			//	summary:
			//		Get the points of a box (as if it were on an xy plane)
			//	box:
			//		the box. {x: 24 (x position), y: 25 (y position), w: 533 (width), h: 435 (height)}
			return {
				tl: {x: box.x, y: box.y},
				tr: {x: box.x+box.w, y: box.y},
				bl: {x: box.x, y: box.y+box.h},
				br: {x: box.x+box.w, y: box.y+box.h}
			}
		},
		
		_onTaskClick: function(){
			//	summary:
			//		Called when the task button on a panel is clicked on
			//		Minimizes/restores the window
			var s = this.domNode.style.display;
			if(s == "none")	{
				this.restore();
				this.bringToFront();
			}	else	{
				if(!this.bringToFront()) this.minimize();
			}
		},
		
		_toggleMaximize: function(){
			//	summary:
			//		Toggles the window being maximized
			if(this.maximized == true) this.unmaximize();
			else this.maximize();
		},
		
		makeResizer: function(){
			//	summary:
			//		Internal method that makes a resizer for the window.
			domStyle.set(this.sizeHandle.domNode, "display", "block");
//		    query('.win-mc',this.domNode).style("marginBottom",0);
		    
//		    if (this._containerNodMmarginBottom !== undefined) {
// 			   domStyle.set(this.containerNode, "marginBottom", this._containerNodMmarginBottom);
//			}
		},
		
		killResizer: function()	{
			//	summary:
			//Internal method that gets rid of the resizer on the window.
			domStyle.set(this.sizeHandle.domNode, "display", "none");
			//this._containerNodMmarginBottom = domStyle.get(this.containerNode, "marginBottom");
			//domStyle.set(this.containerNode, "marginBottom", "0");
		},
		
		minimize: function(){
			//	summary:
			//		Minimizes the window to the taskbar
			if(this._minimizeAnim && this.config.fx >= 2) return;
			this.onMinimize();
			if(this.config.fx >= 2)	{
				this._minimizeAnim = true;
				if(this.config.fx < 3) this._toggleBody(false);

				this.minPos.top = domStyle.get(this.domNode, "top");
				this.minPos.left = domStyle.get(this.domNode, "left");
				this.minPos.width = domStyle.get(this.domNode, "width");
				this.minPos.height = domStyle.get(this.domNode, "height");

				var taskbar = dijit.byNode(query(".sceneTaskbarApplet",this.scene.domNode)[0].parentNode);
				if(taskbar) var pos = domGeometry.getContentBox(taskbar._buttons[this.id]);
				else var pos = {x: 0, y: 0, w: 0, h: 0};
				var anim = dojo.animateProperty({
					node: this.domNode,
					duration: this.config.window.animSpeed,
					properties: {
						opacity: {end: 0},
						top: {end: pos.t},
						left: {end: pos.l},
						height: {end: pos.h},
						width: {end: pos.w}
					},
					easing: easing.easeIn
				});
				on(anim, "End", lang.hitch(this, function(){
					domStyle.set(this.domNode, "display", "none");
					if(this.config.fx < 3) this._toggleBody(true);
					this._minimizeAnim = false;
				}));
				anim.play();
			}	else	{
				domStyle.set(this.domNode, "opacity", 100)
				domStyle.set(this.domNode, "display", "none");
			}
	        this.minimized = true;
	        this._fixMenu();
		},
		

		restore: function()	{
			//	summary:
			//		Restores the window from the taskbar
			if(this._minimizeAnim && this.config.fx >= 2) return;
			this.domNode.style.display = "inline";
			if(this.config.fx >= 2)	{
				this._minimizeAnim = true;
				if(this.config.fx < 3) this._toggleBody(false);
	            
	            var taskbar = dijit.byNode(query(".sceneTaskbarApplet",this.scene.domNode)[0].parentNode);
				if(taskbar) var startpos = dojo.coords(taskbar._buttons[this.id], true);
				else var startpos = {x: 0, y: 0, w: 0, h: 0};

				var anim = dojo.animateProperty({
					node: this.domNode,
					duration: this.config.window.animSpeed,
					properties: {
						opacity: {end: 100},
						top: {start: startpos.y, end: this.minPos.top},
						left: {start: startpos.x, end: this.minPos.left},
						height: {start: startpos.h, end: this.minPos.height},
						width: {start: startpos.w, end: this.minPos.width}
					},
					easing: easing.easeOut
				});
				on(anim, "End", lang.hitch(this, function(){
					if(this.config.fx < 3) this._toggleBody(true);
					this.resize();
					this._minimizeAnim = false;
				}));
				anim.play();
			}
			this.minimized = false;
	        this._fixMenu();
		},

		_maxfull: function(isFull)	{
			if (this.maximized && this.fulled === !!isFull) {
				return ;
			}	
			//	summary:
			//		Maximizes the window
			this.onMaximize(isFull);
	        this._fixMenu();
			
			if(this._drag) /*this._drag.onMouseUp(window.event);*/ this._drag.destroy();
			if (!this.maximized) {
				this.killResizer();
				domClass.add(this.domNode, "win-maximized");
				this.pos.top = domStyle.get(this.domNode, "top");
				this.pos.left = domStyle.get(this.domNode, "left");
				this.pos.width = domStyle.get(this.domNode, "width");
				this.pos.height = domStyle.get(this.domNode, "height");
			}	
			
			if (isFull) {
				domStyle.set(this.titleBarNode,"display","none");

				var winNode = query(".win-bmw",this.domNode)[0];
				this._oldWinStyle = {
					"top": winNode.style.top,
					"bottom": winNode.style.bottom,
					"background-color": winNode.style.backgroundColor,
					"border": winNode.style.border,
					"border-radius": winNode.style.borderRadius
				};
				query(".win-bl",this.domNode).style("display","none");
				query(".win-bmw",this.domNode).style({
					"top": "2px",
					"bottom": "2px",
					"background-color": "rgba(242, 242, 243, 0.81)",
					"border": "1px solid #E7F3E7",
					"border-radius": "3px 3px / 3px 3px"
				});
			   this._containerNodMmarginBottom = domStyle.get(this.containerNode, "marginBottom");
			   domStyle.set(this.containerNode, "marginBottom", "0");
				
			} else {
				if (this.fulled) {
					domStyle.set(this.titleBarNode,"display","");
					query(".win-bl",this.domNode).style("display","");
					query(".win-bmw",this.domNode).style(this._oldWinStyle);
				    if (this._containerNodMmarginBottom !== undefined) {
		 			   domStyle.set(this.containerNode, "marginBottom", this._containerNodMmarginBottom);
					}
				}	
			}
			var win = this.domNode;
			var max = this.scene.getBox(this,this._winListItem);
			if(this.config.fx >= 2)	{
				//scene.log("maximizing... (in style!)");
				if(this.config.fx < 3) this._toggleBody(false);
				var anim = dojo.animateProperty({
					node: this.domNode,
					properties: {
						top: {end: max.t},
						left: {end: max.l},
						width: {end: max.w},
						height: {end: max.h}
					},
					duration: this.config.window.animSpeed
				});
				on(anim, "End", lang.hitch(this, function(){
					if(this.config.fx < 3) this._toggleBody(true);
					this.resize();
				}));
				anim.play();
			}	else	{
				//scene.log("maximizing...");
	            domStyle.set(win, {
	                top: max.t+"px",
	                left: max.l+"px",
	                width: (max.w)+"px",
	                height: (max.h)+"px"
	            });
				this.resize();
			}
			this.maximized = true;
			this.fulled = !!isFull;
		},
		
		makeDragger: function()
		{
			//	summary:
			//		internal method to make the window moveable
			if(this.config.window.constrain) 
			{
				this._drag = new dojo.dnd.move.parentConstrainedMoveable(this.domNode, {
					handle: this.handle
				});
			}
			else
			{
				this._drag = new dojo.dnd.Moveable(this.domNode, {
					handle: this.handle
				});
			}
			this._dragStartListener = dojo.connect(this._drag, "onMoveStart", lang.hitch(this, function(mover){
				if(this.config.fx < 3) this._toggleBody(false);
			}));
			this._dragStopListener = dojo.connect(this._drag, "onMoveStop", lang.hitch(this, function(mover){
				if (domStyle.get(this.domNode, "top") < 0) {
					domStyle.set(this.domNode, "top","0px") 
				}
				if (domStyle.get(this.domNode, "left")<0) {
					domStyle.set(this.domNode, "left","0px") 
				}

				if (this.config.fx < 3){
					this._toggleBody(true);
					this.resize();
				}
			}));
		},

		full: function()	{
		
			this._maxfull(true);
			topic.publish("/qface/ui/window/Window/full",this,true);
		},

		unfull: function(){
			this.unmaximize();
			topic.publish("/qface/ui/window/Window/full",this,false);
		},

		maximize: function()	{
			this._maxfull(false);
		},
		
		makeDragger: function()
		{
			//	summary:
			//		internal method to make the window moveable
			if(this.config.window.constrain) 
			{
				this._drag = new dojo.dnd.move.parentConstrainedMoveable(this.domNode, {
					handle: this.handle
				});
			}
			else
			{
				this._drag = new dojo.dnd.Moveable(this.domNode, {
					handle: this.handle
				});
			}
			this._dragStartListener = dojo.connect(this._drag, "onMoveStart", lang.hitch(this, function(mover){
				if(this.config.fx < 3) this._toggleBody(false);
			}));
			this._dragStopListener = dojo.connect(this._drag, "onMoveStop", lang.hitch(this, function(mover){
				if (domStyle.get(this.domNode, "top") < 0) {
					domStyle.set(this.domNode, "top","0px") 
				}
				if (domStyle.get(this.domNode, "left")<0) {
					domStyle.set(this.domNode, "left","0px") 
				}

				if (this.config.fx < 3){
					this._toggleBody(true);
					this.resize();
				}
			}));
		},
		unmaximize: function()
		{
			//	summary:
			//		Unmaximizes the window
			if (this.fulled) {
				domStyle.set(this.titleBarNode,"display","");
				query(".win-bl",this.domNode).style("display","");
				query(".win-bmw",this.domNode).style(this._oldWinStyle);
				this.fulled = false;
			}

			domClass.remove(this.domNode, "win-maximized");
			this.makeDragger();
			if(this.resizable == true)
			{		
				this.makeResizer();
			}
			if(this.config.fx >= 2)
			{
				if(this.config.fx < 3) this._toggleBody(false);
				var anim = dojo.animateProperty({
					node: this.domNode,
					properties: {
						top: {end: this.pos.top},
						left: {end: this.pos.left},
						width: {end: this.pos.width},
						height: {end: this.pos.height}
					},
					duration: this.config.window.animSpeed
				});
				on(anim, "End", lang.hitch(this, function(e){
					if(this.config.fx < 3) this._toggleBody(true);
					this.resize();
				}));
				void(anim); //fixes a weird ass IE bug. Don't ask me why :D
				anim.play();
			}
			else
			{
				domStyle.set(this.domNode, {
					top: this.pos.top+"px",
					left: this.pos.left+"px",
					height: this.pos.height+"px",
					width: this.pos.width+"px"
				});
				setTimeout(lang.hitch(this, "resize"), 100)
			}
			this.maximized = false;
	        this._fixMenu();
		},
		bringToFront: function()
		{
			//	summary:
			//		Brings the window to the front of the stack
			//	returns:
			//		true if it had to be raised
			//		false if it was already on top
			var maxZindex = 11;
			var topWins = [];	// Array of reffernces to win widgets with 'alwaysOnTop' property set to true
			var winWidget;			// Reffernce to window widget by dom node
			array.forEach(this.getParent().getChildren(), function(wid){
	            if(typeof wid == "undefined") return;
	            
				var node = wid.domNode;
				if (domClass.contains(node,"win")) {  // only window
					var zindex = domStyle.get(node, "zIndex")
					if(zindex > maxZindex && zindex != "auto"){
						maxZindex = zindex;
					}
				}	
				if(wid.alwaysOnTop){
					topWins.push(wid);
				}
			});
			var zindex = domStyle.get(this.domNode, "zIndex");
			if(maxZindex != zindex)
			{
				maxZindex++;
				domStyle.set(this.domNode, "zIndex", maxZindex);
				// Check for win widgets with 'alwaysOnTop' property set to true
				if(topWins.length > 0){
					array.forEach(topWins, function(win){
						maxZindex++;
						domStyle.set(win.domNode, "zIndex", maxZindex);
					});
				}
				return true;
			}
			return false;
		},
		uninitialize: function(){
			if(!this.closed) {
				this.close();
				return;
			}	
			this.scene.removeWindow(this,this._winListItem);
			if(this._drag) this._drag.destroy();
	        if(this._menu) this._menu.destroy();
			if(this.sizeHandle) this.sizeHandle.destroy();
		},
		close: function()
		{
			//	summary:
			//		closes the window
			if (this.fulled) {
				this.unfull();
			}
			if (!this.closed){
				this.closed = true;
				this.onClose();
				if (this.config.fx >= 2){
					if(this.config.fx < 3) this._toggleBody(false);
					var anim = dojo.fadeOut({
						node: this.domNode,
						duration: this.config.window.animSpeed,
	                    onEnd: lang.hitch(this, function(){
	                        this.destroy();
	                    })
					});
					anim.play();
				}
				else this.destroy();
			}
		},
		layout: function(){
			//	summary:
			//		Layout the widgets
			
			//hack so we don't have to deal with BorderContainer's method using this.domNode
			var oldNode = this.domNode;
			this.domNode = this.containerNode;
	        try{
	    		this.inherited(arguments);
	        }
	        finally{
	    		this.domNode = oldNode;
	        }
		},
		resize: function(/*Object?*/size){
	        // resize the window
	        if(size){
	            domStyle.set(this.domNode, {
	                width: size.width,
	                height: size.height
	            });
	            // offset the window size so that the container is the exact size specified
			    var calcWidth = this.domNode.offsetWidth;
			    var calcHeight = this.domNode.offsetHeight;
			    var bodyWidth = this.containerNode.offsetWidth;
			    var bodyHeight = this.containerNode.offsetHeight;
			    domStyle.set(this.domNode, "width", ((calcWidth - bodyWidth)+calcWidth)+"px");
			    domStyle.set(this.domNode, "height", ((calcHeight - bodyHeight)+calcHeight)+"px");
	        }
			//hack so we don't have to deal with BorderContainer's method using this.domNode
			var oldNode = this.domNode;
			this.domNode = this.containerNode;
	        try{
	    		this.inherited(arguments);
	        }
	        finally{
	    		this.domNode = oldNode;
	        }
			array.forEach(this.getChildren(), function(wid){
	            if(typeof wid != "undefined" && typeof wid.resize == "function")
	                wid.resize();
	        });
	        this.onResize();
		},
		_onResize: function(e){
			//	summary:
			//		Event handler. Resizes the window when the screen is resized.
			if(this.maximized && !this.minimized){
				var max = this.scene.getBox(this,this._winListItem);
				var c = dojo.coords(this.domNode);
				//var v = dijit.getViewport(); //modified by LWF
				domStyle.set(this.domNode, {
	                width: (max.w)+"px",
	                height: (max.h)+"px"
	            });
			}
			else if(this.maximized && this.minimized){
				var max = this.scene.getBox(this,this._winListItem);
				//var v = dijit.getViewport();
				this.minPos.width = max.w ;
				this.minPos.height = max.h;
			}
			this.resize();
		}
	});
	
	Window.BorderStyle = Enum.declare(["Normal","None"]);
	
	lang.mixin(Window, {
	  initContainer : function(/*ContainerBase*/container) {
	    _container = container;
	  },
	});
	
	return Window;

});


