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
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/dom-construct", // domConstruct.create
	"dojo/dom-geometry",
	"dojo/_base/fx", // fx.Animation
	"dojo/_base/html",
	"dojo/on",
	"dojo/dnd/Source",
	"dojo/has",
	"qface/ui/layout/applet/Applet"
], function(declare,lang,domClass,domStyle,domConstruct,domGeom,dojoFx,domHtml,on,dndSource,has,QApplet){
	// module:
	//		openstar
	// summary:
	//		The openstar package main module

	var MultiSceneNaviBar = declare([QApplet],{
		sceneContainer : null,
		_sceneIconsMap : null,
		_currentSceneName : "",
		
		constructor : function(params) {
			this._sceneIconsMap = new Array();
		},
		
		postCreate: function(){
			domClass.add(this.containerNode, "navBar");
			
			var tbl = domConstruct.create("table");
			var tbody = domConstruct.create("tbody");
			var tr = this.trNode = domConstruct.create("tr");
			domClass.add(tr,"scene-list");
			tbody.appendChild(tr);
			tbl.appendChild(tbody);
			this.containerNode.appendChild(tbl);
			
			this.inherited(arguments);
		},
		
		
		addScene : function(name,scene) {
			var td = domConstruct.create("td");
			this.trNode.appendChild(td);
			
			var domNode=domConstruct.create("a");
			domHtml.setSelectable(domNode, false);
			
			domClass.add(domNode,"ui-droppable");
			
			td.appendChild(domNode);
			
			on(domNode,"click",lang.hitch(this,function() {
				this.selectScene(name);
			}));
			
			var dskInfo = {
							name : name,
							scene : scene,
							icon : domNode
						  };
			this._sceneIconsMap.push(dskInfo);
			this._sceneIconsMap[name] = dskInfo;
			
		},
		
		removeScene : function() {
		},
		
		selectScene : function(/*String|Number*/name) {
			if (!lang.isString(name)) {
				name = this._sceneIconsMap[name].name;
			}
			if (this._currentSceneName) {
				var preIcon = this._sceneIconsMap[this._currentSceneName].icon;
				domClass.remove(preIcon,"currTab");
				
			}
			this.sceneContainer.selectChild(this._sceneIconsMap[name].scene,true);
			this._currentSceneName = name;
			var icon = this._sceneIconsMap[name].icon;
			domClass.add(icon,"currTab");
		},
		
		nextScene : function() {
		},
		
		
		searchScene : function ()	{
			var currentValue = domStyle.get('search-form','display');
			if (currentValue == "none"){
			  domStyle.set('search-form', 'display', 'block');
			} else {
			  domStyle.set('search-form', 'display', 'none');
			}
		},
		
		currentScene : function() {
			return this._sceneIconsMap[this._currentSceneName].scene;
		}
						
						
	});



	return MultiSceneNaviBar;
});
