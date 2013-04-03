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
    "dojo/dom-style",
    "dojo/dom-class",
	"dojo/dom-construct", 
    "dojo/on",
	"./Applet"
],function(lang,declare,domStyle,domClass,domConstruct,on,Applet) {

	return declare([Applet], {
		constructor: function(params){
			this.appWindow = params.appWindow;
		},

		dispName: "UnFull Scene",
		
		postCreate: function(){
			domStyle.set(this.containerNode,"padding","3px");
			
			var div = domConstruct.create('div',{
				title : this.dispName
			}, this.containerNode);
			
			domClass.add(div, "icon-16-actions-winbtn-normal");
			
			on(div,"click",lang.hitch(this,this.unFullScene));
		    
			on(div,"mouseover",function(){
				domClass.add(div,"actived");
			});
		    
			on(div,"mouseout",function(){
				domClass.remove(div,"actived");
			});

		    this.inherited(arguments);
		},

		unFullScene : function() {
			this.appWindow.unfull();
			this.onUnFull();
		},
		
		onUnFull : function() {
		},
	});

});
