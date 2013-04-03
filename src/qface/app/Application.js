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
	"dojo/aspect"
],function(declare,lang,aspect) {
	var Application = declare( null, {
		name: "",
		sysname: "",
		version: "",
		instance: -1,
		status: "",
		iconClass: "",
		compatible: "",
		
		constructor: function(info){
			this.status = "init";
			this.name = info.name;
			aspect.after(this, "kill", lang.hitch(this, function(){
		            this.status = "killed";
					var pid = this.instance;
					//allow the garbage collector to free up memory
					setTimeout(lang.hitch(this,function(){
						this.scene.instances[pid]=undefined;
					}),10000);
	        	})
	        );
			this.instance = info.instance;
			this.compatible = info.compatible;
			this.scene = info.scene;
		},
		
		init: function(args){
			//	summary:
			//		start the app
			
			//since this is a base class for an app, we'll just kill ourselves
			//to prevent it from showing up on the task manager if it is
			//accidentally launched
			this.kill();
		},
		
		kill: function(){
			//	summary:
			//		cleanup ui, disconnect events, etc.
		}
	});

  return Application;
});
