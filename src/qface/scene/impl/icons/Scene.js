/**
 * qface/scene/impl/icons/Scene
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "dojo",
	"dojo/data/ItemFileWriteStore",
	"qface/ui/window/Window",
	"qface/scene/_SceneBase",
	"./Area",
	"./Panel"
],function(dojo,ItemFileWriteStore,Window,_SceneBase,Area,Panel) {
	var Scene = dojo.declare([_SceneBase],{
		//	_windowList: dojo.data.ItemFileWriteStore
		//		A dojo.data.ItemFileWriteStore containing a list of windows
		_windowList: null,
		//	_drawn: Boolean
		//		true after the UI has been drawn
		
		constructor : function() {
			this._windowList = new ItemFileWriteStore({
						data: {identifer: "id", items: []}
			});
				
		},
		
		_drawn: false,
		
		init: function(config){
			//	summary:
			//		creates a openstar.scene.Area widget and places it on the screen
			//		waits for the config to load so we can get the locale set right
			if(this._drawn === true) return;
			this._drawn = true;
			this._config = config;
			this.makeArea();
			this.makePanels();
		},
		
		makeArea : function() {
			this._area = new Area({
				style:"width:100%;height:100%",
				name :this.name,
				items : this._config.apps,
				scene:this
			});
			this.addChild(this._area);
			this._area.updateWallpaper(this._config.wallpaper);
		
		},
		
		//	drawn: Boolean
		//		have the panels been drawn yet?
		makePanels: function(){
			//	summary:
			//		the first time it is called it draws each panel based on what's stored in the configuration,
			//		after that it cycles through each panel and calls it's _place(); method
	        if(this.drawn){
		        dojo.query(".scenePanel",this._area.domNode).forEach(function(panel){
			       var p = dijit.byNode(panel);
			       p._place();
		        }, this);
	            return;
	        }
	        this.drawn = true;
	        var panels = this._config.panels;
			dojo.forEach(panels, dojo.hitch(this,function(panel){
				var args = {
					thickness: panel.thickness,
					span: panel.span,
					placement: panel.placement,
					opacity: panel.opacity,
					scene: this
				}
				var p = new Panel(args);
				if(panel.locked) p.lock();
				else p.unlock();
				p.restore(panel.applets);
				this._area.addChild(p);
//				p.startup();
			}));
			this._area.resize();
		},
		save: function(){
			//	summary:
			//		Cylces through each panel and stores each panel's information in srvConfig
			//		so it can be restored during the next login
			var panels = this._config.panels = [];
			dojo.query(".scenePanel",this._area.domNode).forEach(function(panel, i){
				var wid = dijit.byNode(panel);
				panels[i] = {
					thickness: wid.thickness,
					span: wid.span,
					locked: wid.locked,
					placement: wid.placement,
					opacity: wid.opacity,
					applets: wid.dump()
				};
			});
		},
		
		resize : function() {
			if (this._area) {
				this._area.resize();
			}	
		},
		
		addWindow : function(win,args){
			this._area.addChild(win);
			return this._windowList.newItem(args);
		},
		
		removeWindow : function(win,item){
	        this._area.removeChild(win);
	        this._windowList.deleteItem(item)
		},
		
		updateWindowTitle : function(item,title){
			this._windowList.setValue(item, "label", title);
		},
		
		getBox : function(){
			return this._area.getBox();
		}
		
	});
	

	return Scene;

});

