/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: lihongwang
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/lang", 
	"dojo/_base/declare", 
  	"dojo",
  	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/data/ItemFileWriteStore",
	"qface/scene/_SceneBase",
	"qface/ui/window/area/Area"
],function(lang,declare,dojo,arrayUtil,domConstruct,query,ItemFileWriteStore,_SceneBase,Area) {

	var Scene = declare([_SceneBase],{
		//	_windowList: dojo.data.ItemFileWriteStore
		//		A dojo.data.ItemFileWriteStore containing a list of windows
		_windowList: null,
		
		_winLists: null,
		//	_drawn: Boolean
		//		true after the UI has been drawn
		_drawn: false,
		
		constructor : function() {
			this._windowList = new ItemFileWriteStore({
						data: {identifer: "id", items: []}
			});
			
			this._winLists = [];
				
		},
		

		init: function(config){
			this._config = config;
			var area = this._area = new Area({});
			
			this.addChild(area);

		    var app = config.app;
		    
		    this.launch(app.sysname,app.name,app.args||{});
		},
		
		addWindow : function(win,args){
			this._winLists.push(win);
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

		restrictWindow : function(win){
			win.maximized = true;
			win.fulled = true;
		}		
		
		
	});
	
	
	return Scene;

});

