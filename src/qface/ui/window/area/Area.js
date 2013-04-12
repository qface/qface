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
	"dojo/dom-geometry",
	"dojo/_base/html",
	"dojo/dom-style",
    "dojo/query",
    "dijit",
	"dijit/_Widget",
	"dijit/_TemplatedMixin",
	"dijit/_Container"
],function(declare,lang,domGeometry,html,domStyle,query,dijit,_Widget,_TemplatedMixin,_Container) {
	return declare([_Widget, _TemplatedMixin, _Container], {
		//	summary:
		//		the main UI area of the scene. This is where panels, wallpaper, and most other things are drawn.
		templateString:"<div class=\"uiArea\">\n\t<div data-dojo-attach-point=\"widgetNode\" class=\"uiArea uiAreaWidget\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"uiArea uiAreaContainer\" style=\"overflow:hidden;\"></div>\n\t<div data-dojo-attach-point=\"wallpaperNode\" class=\"uiArea wallpaper\"></div>\n</div>\n",
		drawn: false,
		getBox: function(){
		 	var box =  domGeometry.getContentBox(this.domNode);
			return box;
		},
		resize: function(e){
			var max = this.getBox();
			query("div.win", this.containerNode).forEach(function(win){
				var wid = dijit.byNode(win);
				//if(wid.maximized) wid._onResize(); //TODO will be modified
				 wid._onResize();
				
			}, this);
		},
		updateWallpaper: function(wallpaper){
			//	summary:
			//		Updates the wallpaper based on what's in scene.config. Called when the configuration is applied.
			var image = wallpaper.image;
			var color = wallpaper.color;
			var style = wallpaper.style;
			
			domStyle.set(this.wallpaperNode, "backgroundColor", color);
			if(image == ""){
				if(this.wallpaperImageNode){
					 this.wallpaperImageNode.parentNode.removeChild(this.wallpaperImageNode);
					 this.wallpaperImageNode = false;
				}
				domStyle.set(this.wallpaperNode, "backgroundImage", "none");
				return;
			}
			else if(style == "centered" || style == "tiled")
				domStyle.set(this.wallpaperNode, "backgroundImage", "url('"+image+"')");
				if(this.wallpaperImageNode){
					 this.wallpaperImageNode.parentNode.removeChild(this.wallpaperImageNode);
					 this.wallpaperImageNode = false;
				}
			if(style == "centered")
				domStyle.set(this.wallpaperNode, "backgroundRepeat", "no-repeat");
			else if(style == "tiled")
				domStyle.set(this.wallpaperNode, "backgroundRepeat", "repeat");
			else if(style == "fillscreen"){
				domStyle.set(this.wallpaperNode, "backgroundImage", "none");
				if(!this.wallpaperImageNode){
					this.wallpaperImageNode = document.createElement("img");
					domStyle.set(this.wallpaperImageNode, "width", "100%");
					domStyle.set(this.wallpaperImageNode, "height", "100%");
					this.wallpaperNode.appendChild(this.wallpaperImageNode);
				}
				this.wallpaperImageNode.src = image;
			}
		}
	});
	
});

