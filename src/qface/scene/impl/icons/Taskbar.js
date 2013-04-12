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
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/dom",
	"dojo/topic",
	 "qface/util/html",
	 "qface/ui/layout/applet/Applet"
],function(lang,declare,array,domStyle,domClass,dom,topic,utilHtml,Applet) {
	
	return declare([Applet], {
		//	summary:
		//		A window list applet that you can minimize windows to
	    config: {fx:2,window:{animSpeed:275,constrain:false}},
		dispName: "Window List",
		fullspan: true,
		
		_buttons: {},
		_labels: {},
		_storeconnects: [],
		_winconnects: [],

		postCreate: function(){
			domClass.add(this.containerNode, "sceneTaskbarApplet");
			var tbl = document.createElement("table");
			var tbody = document.createElement("tbody");
			var tr = this.trNode = document.createElement("tr");
			tbody.appendChild(tr);
			tbl.appendChild(tbody);
			this.containerNode.appendChild(tbl);
			this.inherited(arguments);
		},
		
		startup: function(){
			var store = this.scene._windowList;
			this._storeconnects = [
				dojo.connect(store, "onNew", this, "onNew"),
				dojo.connect(store, "onDelete", this, "onDelete"),
				dojo.connect(store, "onSet", this, "onSet")
			];
			store.fetch({
				onItem: lang.hitch(this, "onNew")
			});
	        this.setupLaunchApp();
		},
		
		uninitialize: function(){
			array.forEach(this._storeconnects, function(e){
				dojo.disconnect(e);
			});
	        topic.unsubscribe(this._onLaunch);
			this.inherited(arguments);
		},
		
		onSet: function(item, attribute, oldValue, v){
			var store = this.scene._windowList;
			if(attribute != "label") return;
			if(v.length >= 18){
				v = v.slice(0, 18) + "...";
			}
			utilHtml.textContent(this._labels[store.getValue(item, "id")], v);
		},
		
		onNew: function(item){
			var store = this.scene._windowList;
			var domNode=document.createElement("td");
			dom.setSelectable(domNode, false);
			domClass.add(domNode, "taskBarItem");
			if(this.getParent().getOrientation() == "horizontal") domClass.add(domNode, "taskBarItemHorizontal");
			else domClass.add(domNode, "taskBarItemVertical");
			
			var v = store.getValue(item, "label");
			if(v.length >= 18){
				v = v.slice(0, 18) + "...";
			}
			
			if(store.hasAttribute(item, "icon")) domNode.innerHTML = "<div class='"+store.getValue(item, "icon")+"' style='float: left;'></div>";
			
			var labelNode = document.createElement("div");
			utilHtml.textContent(labelNode, v);
			domNode.appendChild(labelNode);
			
	        if(store.getValue(item, "id").indexOf("load") == -1)
			    this._winconnects[store.getValue(item, "id")] = dojo.connect(domNode, "onclick", dijit.byId(store.getValue(item, "id")), "_onTaskClick");
			
			this._buttons[store.getValue(item, "id")] = domNode;
			this._labels[store.getValue(item, "id")] = labelNode;
			this.trNode.appendChild(domNode);
			if(this.config.fx > 0){
				domStyle.set(domNode, "opacity", 0);
				dojo.fadeIn({node: domNode, duration: this.config.window.animSpeed}).play();
			}
	        if(store.getValue(item, "id").indexOf("load") == -1)
	            dijit.byId(store.getValue(item, "id"))._menu.bindDomNode(domNode);
		},
		
		onDelete: function(item){
			var node = this._buttons[item.id[0]];
	        if(item.id[0].indexOf("load") == -1)
			    dojo.disconnect(this._winconnects[item.id[0]]);
			var onEnd = function(){
				node.parentNode.removeChild(node);
				node=null;
			}
			if (this.config.fx >= 1){
				var fade = dojo.fadeOut({
					node: node,
					duration: this.config.window.animSpeed
				});
				var slide = dojo.animateProperty({
					node: node,
					duration: 1000,
					properties: {
						width: {
							end: 0
						},
						height: {
							end: 0
						}
					}
				});
				var anim = dojo.fx.chain([fade, slide]);
				dojo.connect(slide, "onEnd", null, onEnd);
				anim.play();
			}
			else onEnd();
		},
	    setupLaunchApp: function(){
	        this._onLaunch = topic.subscribe("/qface/scene/launchApp", lang.hitch(this, function(scene,sysname,name){
		        	if (this.scene !== scene) {
		        		return;
		        	};	
		            var id = (new Date()).toString();
		            var item = store.newItem({
		                id: "load_"+id,
		                icon: "icon-loading-indicator",
		                label: "loading "+name,
		                load: true
		            }
			        );
		            var onEnd = topic.subscribe("/qface/scene/launchAppEnd",function(){
						topic.unsubscribe(onEnd);
						store.deleteItem(item);
					});
				})
	        );
	    }
		
	});

});
