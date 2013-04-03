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
	"qface/ui/window/Window",
	"qface/scene/_SceneBase",
	"qface/ui/window/area/Area"
],function(lang,declare,dojo,arrayUtil,domConstruct,query,ItemFileWriteStore,Tree,ForestStoreModel,BorderContainer,ContentPane,SplitContainer,AccordionContainer,AccordionPane,TabContainer,ToggleSplitter,Window,_SceneBase,Area) {

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


			this._favApp = new ContentPane({title:"favourite Applications",id:"favapp"});
			
			this._allApp = new ContentPane({title:"All Applications",id:"allapp"});
			
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
			this._tabAC = new TabContainer({id:"tableWindow",region:'center', tabStrip:'true',style:"display:'';overflow:hidden;"});

			this._fullAC = new ContentPane({id:"fullWindow",region:'center',style:"display:none;"});
			
			this._multipleAC = new ContentPane({id:"multipleWindow",region:'center',style:"display:none;overflow:hidden;"});
	
			this._mainBorder.addChild(this._tabAC);
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
	   		var area = this._addWindowToTabStyle(win);
			return this._windowList.newItem(lang.mixin(args,{_area: area}));
		},

		_addWindowToTabStyle: function(win){
			var area = this._area = new Area({title:win.title,closable:true});

			area.addChild(win);
			this._tabAC.addChild(area);
			this._tabAC.selectChild(area);
			//win.maximize();
			return area;
		},

		removeWindow : function(win,item){
		  var area = this._windowList.getValue(item,"_area");
		  if (area) {
	      	area.removeChild(win);
			this._windowList.setValue(item, "_area", null);
	      	
	      }	
	      this._windowList.deleteItem(item)
		},

		updateWindowTitle : function(item,title){
			this._windowList.setValue(item, "label", title);
		},
		
		getBox : function(win,item){
		
		  if (item) {
			  var area = this._windowList.getValue(item,"_area");
			  if (area) {
				return area.getBox();
			  }
		  } else {
				return this._area.getBox();
		  }
		},

		restrictWindow : function(win){
			//win.borderStyle = Window.BorderStyle.None;
			win.maximized = true;
			win.fulled = true;
		}
		
	});
	
	
	return Scene;

});

