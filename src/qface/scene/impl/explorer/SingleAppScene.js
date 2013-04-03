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
	"dijit/Tree",
	"dijit/tree/ForestStoreModel",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/layout/SplitContainer",
	"dijit/layout/AccordionContainer",
	"dijit/layout/AccordionPane",
	"dijit/layout/TabContainer",
	"dojox/layout/ToggleSplitter",
	"dojox/layout/ExpandoPane",
	"qface/ui/window/Window",
	"qface/scene/_SceneBase",
	"qface/ui/window/area/Area"
],function(lang,declare,dojo,arrayUtil,domConstruct,query,ItemFileWriteStore,Tree,ForestStoreModel,BorderContainer,ContentPane,SplitContainer,AccordionContainer,AccordionPane,TabContainer,ToggleSplitter,ExpandoPane,Window,_SceneBase,Area) {

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
			
			this._makeMainBorder();
			this._makeTabContent()

			this._makeTree();
		},

		_makeMainBorder: function(){


			this._favApp = new ContentPane({title:"favourite Applications"});
			
			this._allApp = new ContentPane({title:"All Applications"});
			
			this._aC = new AccordionContainer({region: 'leading',splitter:true,minSize:"20", style:"width:230px;"});

			this._mainBorder = new BorderContainer({
				liveSplitters: false,
				
				style:"width: 100%; height: 100%;"
			});
			this._mainBorder._splitterClass = "dojox.layout.ToggleSplitter";


			this._aC.addChild(this._allApp);
			this._aC.addChild(this._favApp);
			
			this._mainBorder.addChild(this._aC);
			
			this.addChild(this._mainBorder);
			
		},

		_makeTabContent: function(){

			this._fullAC = new ContentPane({region:'center'});
			
			this._mainBorder.addChild(this._fullAC);
		},

		_makeTree: function (){
		    var config = this._config;
			
			var treeData = config.apps;
			var treeStore = new ItemFileWriteStore({data: treeData});
			var treeModel = new ForestStoreModel({
				store: treeStore,
				query: {type:'folder'},
				rootLabel: "application",
				labelAttr:"label" ,
				label:"application",
				childrenAttrs: ["folders"]

			});

			var self = this;
			var tree = new dijit.Tree({
				model: treeModel,
				showRoot: true,
				onClick: function(item){
					var sysname = treeStore.getValue(item,"sysname");
					if(sysname){
						self.launch(sysname, {})
					}
				}
			});
			this._allApp.addChild(tree);
		},
		
		addWindow : function(win,args){
				this._winLists.push(win);
				this._addWindowToFullStyle(win);
				return this._windowList.newItem(args);
		},


		_addWindowToFullStyle: function(win){
			// remove current app window
			while (this._area.containerNode.hasChildNodes()) {
		    	this._area.containerNode.removeChild(this._area.containerNode.lastChild);
			}
			this._area.addChild(win);

			this._fullAC.addChild(this._area);
			this._fullAC.startup();
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
			win.showMaximize = false;
			win.showMinimize = false;
			win.showFull = false;
			win.maximized = true;
		}		
		
		
	});
	
	
	return Scene;

});

