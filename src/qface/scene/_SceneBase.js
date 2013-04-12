/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "dojo",
	"dojo/dom-class",
    "dojo/topic",
	"dijit/_Widget",
	"dijit/_TemplatedMixin",
	"dijit/_Container",
	"dijit/layout/_LayoutWidget",
	"dijit/layout/StackContainer",
	"qface/util/logger"
],function(dojo,domClass,topic,_Widget,_TemplatedMixin,_Container,_LayoutWidget,StackContainer,logger) {

	var _SceneBase = dojo.declare([_LayoutWidget,_TemplatedMixin],{
		templateString:"<div class=\"uiScene\" style=\"position:absolute;left:0px;top:0px;width:100%;height:100%\">\n\t<div data-dojo-attach-point=\"widgetNode\" class=\"uiScene uiSceneWidget\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"uiScene uiSceneContainer\" style=\"width:100%;height:100%\"></div>\n\t<div data-dojo-attach-point=\"wallpaperNode\" class=\"uiScene wallpaper\"></div>\n</div>\n",

		//	summary:
		//		Contains all the app functions of the scene
		//	appList: Array,
		//		Contains a list of each app's information (loaded on startup)
		appList: [],
		//	instances: Array
		//		Contains each instance of all apps
		instances: [],
		//	instanceCount: Int
		//		A counter for making new instances of apps
		instanceCount: 0,
	    //  currentApp: String
	    //      the current application that is running
	    currentApp: "",
	    
	    // isScene : Boolean
	    isScene : true,
	    
	    _getThemeAttr : function() {
	    	return this._theme;
	    },
	    
	    _setThemeAttr : function(theme) {
	    	if (theme) {
	    		theme = theme.toLowerCase();
	    	}
	    	if (this._theme != theme) {
	    		var oldTheme = this._theme;
	    		if (!oldTheme) {
	    			domClass.add(this.domNode,theme);
	    		} else {
	    			domClass.replace(this.domNode,theme,oldTheme);
	    		}
	    		this._theme = theme;
	    	}
	    },
	    
	    
		launch: function(/*String*/sysname, /*String*/name,/*Object?*/args, /*Function?*/onComplete, /*Function?*/onError){
			//	summary:
			//		Fetches an app if it's not in the cache, then launches it. Returns the process ID of the application.
			//	name:
			//		the app's name
			//	args:
			//		the arguments to be passed to the app
			//	onComplete:
			//		a callback once the app has initiated
	        //	onError:
	        //	    if there was a problem launching the app, this will be called
			topic.publish("/qface/scene/launchApp", [this,sysname,name]);
			logger.log("launching app "+name);
	        var d = new dojo.Deferred();
	        if(onComplete) d.addCallback(onComplete);
	        if(onError) d.addErrback(onError);
	        
	        var path = "apps/"+sysname.replace(/[.]/g, "/");
	      	require([path],dojo.hitch(this,function(Application){
				var pid = false;
				try {
					pid = this.instances.length;
					var realName = "";
					var icon = "";
					var compatible = "";
//					dojo.forEach(this.appList, function(item){
//						if(item.sysname != name) return;
//						realName = item.name;
//						icon = item.icon;
//						compatible = item.compatible;
//					})
					var instance = this.instances[pid] = new Application({
//						sysname: app.sysname,
//						name: app.name,
//						instance: pid,
//						compatible: app.compatible,
//						icon: app.icon,
						args: args,
						scene: this
					});
					try {
						instance.init(args||{});
					}
					catch(e){
			            topic.publish("/qface/scene/launchAppEnd", [this,sysname,name,false]);
						console.error(e);
		                d.errback(e);
		                return;
					}
					instance.status = "active";
				}
				catch(e){
		            topic.publish("/qface/scene/launchAppEnd", [this,sysname,name,false]);
					console.error(e);
		            d.errback(e);
		            return;
				}
				d.callback(instance);
		        topic.publish("/qface/scene/launchAppEnd", [this,sysname,name,true]);
			}));
		},
		//PROCESS MANAGEMENT FUNCTIONS
		getInstances: function(){
			//	summary:
			//		Returns an array of the current valid instances
			returnObject = [];
			for(var x = 0; x<this.instances.length; x++){
				if (this.instances[x] != 'null'){
					try { if(typeof this.instances[x].status == "string")
						returnObject.push(this.instances[x]);
					} catch(e){ }
				}
			}
			return returnObject;
		},
		getInstancesStatus: function(){
			//	summary:
			//		Returns an array of the current valid instances status
			var returnObject = [];
			for(var x = 0; x<this.instances.length; x++){
					if (this.instances[x] != null){
						var i = this.instances[x];
						returnObject.push({
							instance: x,
							status: i.status,
							sysname: i.sysname,
							name: i.name,
							version: i.version
						});
					}
			}
			return returnObject;
		},
		getInstance: function(/*Integer*/instance){
			//	summary:
			//		Returns an instance
			//	instance:
			//		the instance ID to fetch
			return this.instances[instance];
		},
		kill: function(/*Integer*/instance){
			//	summary:
			//		Kills an instance
			//	instance:
			//		the instance ID to kill
			try {
				logger.log("procSystem: killing instance "+instance);
				this.instances[instance].kill();	//Pre-Kill the instance
				return true;
			}
			catch(err){
				logger.log("procSystem: killing instance "+instance+" failed. setting status to zombie.");
				console.error(err);
				this.instances[instance].status = "zombie";
				return false;
			}
		},
		
		resize: function(){
			dojo.forEach(this.getChildren(), function(item){
				item.resize();
			});
		},
		
		run : function(){
			this.startup();
		},
		
		hide: function(){
		},
		
		show: function(){
		},
		
		lauchApp  : function() {
		},
		
		killApp   : function() {
		},
		
		addWindow : function(win,args){
		},
		removeWindow : function(win,item){
		},
		updateWindowTitle : function(item,title){
		},
		getBox : function(){
		},
		restrictWindow : function(win){
		}
		
	});

	_SceneBase.MultiSceneContainer = dojo.declare([StackContainer],{
	    duration : 1000,
		
			
		_transition: function(/*dijit/_WidgetBase?*/ newWidget, /*dijit/_WidgetBase?*/ oldWidget, /*Boolean*/ animate){
			// Overrides StackContainer._transition() to provide sliding of title bars etc.

			if(has("ie") < 8){
				// workaround animation bugs by not animating; not worth supporting animation for IE6 & 7
				animate = false;
			}

			if(this._animation){
				// there's an in-progress animation.  speedily end it so we can do the newly requested one
				this._animation.stop(true);
				delete this._animation;
			}

			var self = this;


			if(newWidget){

				var d = this._showChild(newWidget);	// prepare widget to be slid in

				// Size the new widget, in case this is the first time it's being shown,
				// or I have been resized since the last time it was shown.
				// Note that page must be visible for resizing to work.
				if(this.doLayout && newWidget.resize){
					newWidget.resize();
				}
			}

			if(oldWidget){
				if(!animate){
					this._hideChild(oldWidget);
				}
			}

			if(animate){
				var newContents = newWidget.domNode,
					oldContents = oldWidget.domNode;

//				dojo.replaceClass(newContents,"dijitVisible", "dijitHidden");
				var box = domGeom.getContentBox(this.containerNode);
					
								
				newContents.style.left = (box.w) + "px";
						
				this._animation = new dojoFx.Animation({
					node: newContents,
					duration: this.duration,
					curve: [1, box.w],
					onAnimate: function(value){
						value = Math.floor(value);	// avoid fractional values
						oldContents.style.left = (0 - value) + "px";
						newContents.style.left = (box.w - value) + "px";
					},
					onEnd: function(){
						delete self._animation;
						newContents.style.left = "0px";
						self._hideChild(oldWidget);
						self._showChild(newWidget);	// prepare widget to be slid in
					}
				});
				this._animation.onStop = this._animation.onEnd;
				

				this._animation.play();
			}

			return true;	
		},
	});

	return _SceneBase;
	
});

