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
		},
		
		launchHandler: function(/*String?*/file, /*Object?*/args, /*String?*/format){
			//	summary:
			//		Launches an app to open a certain file
			//		You must specify either the file *or* it's format
			//		You must also manually pass the app the file's path through the arguments if you want it to actually open it.
			//	file:
			//		the full path to the file
			//	args:
			//		arguments to pass to the app
			//	format:
			//		the mimetype of the file to save bandwidth checking it on the server
			if(!args) args = {};
			if(file){
				var l = file.lastIndexOf(".");
				var ext = file.substring(l + 1, file.length);
				if (ext == "scene"){
					srvFilesystem.readFileContents(file, dojo.hitch(this, function(content){
						var c = content.split("\n");
						this.launch(c[0], dojo.fromJson(c[1]));
					}));
					return;
				}
			}
			if(!format){
				srvFilesystem.info(file, dojo.hitch(this, function(f){
					var type = f.type;
					this._launchHandler(file, type, args);
				}));
			}
			else {
				this._launchHandler(file, format, args);
			}
		},
		_launchHandler: function(/*String*/file, /*String*/type, /*Object?*/args){
			//	summary:
			//		Internal method that is used by the main launchHandler method.
			//		This is what actually launches the app.
			//	file:
			//		the full path to the file
			//	type:
			//		the file's mimetype
			//	args:
			//		arguments to pass to the app
			if (type == "text/directory"){
				for (app in srvApp.appList){
					for (key in srvApp.appList[app].filetypes){
						if (srvApp.appList[app].filetypes[key] == "text/directory"){
							if(file) args.path = file;
							this.launch(srvApp.appList[app].sysname, args);
							return;
						}
					}
				}
			}
			else {
				var typeParts = type.split("/");
				for (app in srvApp.appList){
					for (key in srvApp.appList[app].filetypes){
						var parts = srvApp.appList[app].filetypes[key].split("/");
						if (parts[0] == typeParts[0] && (parts[1] == typeParts[1])){
							if(file) args.file = file;
							this.launch(srvApp.appList[app].sysname, args);
							return;
						}
					}
				}
				var typeParts = type.split("/");
				for (app in srvApp.appList){
					for (key in srvApp.appList[app].filetypes){
						var parts = srvApp.appList[app].filetypes[key].split("/");
						if (parts[0] == typeParts[0] && (parts[1] == "*" || parts[1] == typeParts[1])){
							if(file) args.file = file;
							this.launch(srvApp.appList[app].sysname, args);
							return;
						}
					}
				}
			}
			dialog.alert({
				title: "Error",
				message: "Cannot open " + file + ", no app associated with " + type
			});
		},
		
		
		
	});
	

	return Scene;

});

