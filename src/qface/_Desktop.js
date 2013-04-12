define([
	"require",
	"dojo/_base/declare", // lang.trim
	"dojo/_base/lang", // lang.trim
	"dojo/_base/array", // lang.trim
	"dojo/dom-class",
	"dojo/Deferred",
	"dojo/DeferredList",
	"dojo/on",
	"dijit/layout/BorderContainer",
	"qface/scene/_MultiSceneContainer",
	"qface/util/Enum"
],function(require,declare,lang,array,domClass,Deferred,DeferredList,on,BorderContainer,_MultiSceneContainer,Enum) {
	
	var _Desktop = declare(null,{
		fileList: ["dijit", "dojox","theme", "window", "icons"],
		_config 	: null,
		
		_loadedThemes : null,
		
		constructor : function(config) {
			this._config = config;
			this._loadedThemes = [];
			this._termMode = _Desktop.TermMode.PC;

		},
		
		_createHost : function(){
			var mbc = this.mbc = new BorderContainer({
				design: "headline",
				gutters: false,
				liveSplitters: false,
				style:"width:100%;height:100%"
			});

			//domClass.add(mbc.domNode,"dijit soria tundra tsunami");		

			document.body.appendChild(mbc.domNode);
			
			mbc.startup();

		},
		
		_createSystemToolBar : function() {
		},
		
		_createSceneContainer : function() {
			var dsc = this.dsc = new _MultiSceneContainer({
					region:'center',
					controllerWidget: "dijit.layout.StackController"
			});
			
			
			this.mbc.addChild(dsc);
			
			return dsc;

		},
		
		init : function(config) {
			this._config = config;
			var deferred = new Deferred();
			
			var deferredHost = new Deferred();
			
			this._createHost();
			
			dojo.dnd.autoScroll = function(e){} //in order to prevent autoscrolling of the window
			on(window,"resize",lang.hitch(this,this.resize));

			var html =  dojo.doc.documentElement;
			var tmClass = this._termMode == _Desktop.TermMode.PC?"pc":"mobile";
			
			domClass.add(html,tmClass);		
		
			deferredHost.then(lang.hitch(this,function(){
				var dsc  = this._createSceneContainer();
				this._createSystemToolBar();
				
				var config = this._config;
				
	
				var defs=[];
				if (config.scene) {
					var dcfg = config.scene
					var deferredScene = new Deferred();
					defs.push(deferredScene);
					var dClass = require(dcfg.type);
					require([dcfg.type],function(dClass) {
						var pd = new dClass({name:dname});
						this.addScene(pd);
						pd.init(dcfg);
						deferredScene.resolve();
					});	
				
				} else if (config.scenes) {
					for (var dname in config.scenes){
				        if(dname.charAt(0)!=="_"){//skip the private properties
							var dcfg = config.scenes[dname];
							var deferredScene = new Deferred();
							defs.push(deferredScene);
							var self = this;
							var dTheme = dcfg.theme;
							
							require([dcfg.type],function(dClass) {
								var pd = new dClass({name:dname,theme:dTheme});
								self.addScene(pd);
								pd.init(dcfg);
								deferredScene.resolve();
							});	
						}	
					}
				} else {
					throw new Error("invalid config!");
				}	
				var sceneDeferredList = new DeferredList(defs);
				sceneDeferredList.then(function() {
					deferred.resolve();
				});
			}));
			
			var themes = [];
			themes.push(config.theme ? config.theme : "soria");
			
			for (var dname in config.scenes){
		        if(dname.charAt(0)!=="_"){//skip the private properties
					var dcfg = config.scenes[dname];
					if (dcfg.theme && themes.indexOf(dcfg.theme)<0) {
						themes.push(dcfg.theme);
					}
				}
			}		
					
			var f = function(){
				deferredHost.resolve();
			};
			
			if (themes.length>0) {
				this.enableTheme(themes).then(f);
			} else {
				setTimeout(f, 100);
			}
		
			return deferred;
		},
		
		
		start : function() {
			
		},
		
		addScene : function(scene) {
			this.dsc.addChild(scene);
		},
		
		resize : function () {
			if (this.mbc) {
				this.mbc.resize();
			}	
		},
		
		
		log : function(/*String*/str){
			//	summary:
			//		logs a string onto any console that is open
			//	
			//	str:
			//		the string to log onto the consoles
			str = dojo.toJson(str);
			dojo.query(".consoleoutput").forEach(function(elem){
				elem.innerHTML += "<div>"+str+"</div>";
			});
			console.log(str);
		},
		
		getTermMode : function() {
			return this._termMode;
		},
		
		changeTermMode : function(termMode) {
			if (termMode && termMode.isInstanceOf(_Desktop.TermMode) && termMode != this._termMode) {
				this._termMode = termMode;
				
				var oldtmClass = termMode == _Desktop.TermMode.PC ? "mobile":"pc";
				var newtmClass = termMode == _Desktop.TermMode.PC ? "pc":"mobile";
				
				var html =  dojo.doc.documentElement;
				
				domClass.replace(html,newtmClass,oldtmClass);		
			}	
		},
		
	     addDojoCss : function(/*String*/path){
				//	summary:
				//		Adds an additional dojo CSS file (useful for the dojox modules)
				//
				//	path:
				//		the path to the css file (the path to dojo is placed in front)
				//	
				//	example:
				//	|	api.addDojoCss("/dojox/widget/somewidget/foo.css");
				var cssUrl =  require.toUrl(path);
				
				var element = document.createElement("link");
				element.rel = "stylesheet";
				element.type = "text/css";
				element.media = "screen";
				element.href = cssUrl;
				document.getElementsByTagName("head")[0].appendChild(element);
	    },
    
		addDojoJs : function(/*String*/path){
				var jsUrl =  require.toUrl(path);
			var jsElement = document.createElement("script");
			jsElement.type =  "text/javascript";
			jsElement.src = jsUrl;
			document.getElementsByTagName("head")[0].appendChild(jsElement);
	    },

		getTheme   : function(scene) {
			return scene.get("theme");
		},
			
		changeTheme: function(scene,/*String*/theme)	{
			var self = this;
			this.enableTheme(theme).then(function(){
				scene.set("theme",theme);
				self.resize();
			});	
		},
		
		enableTheme: function(/*String|Array*/theme)	{
			var themes;
			if(lang.isString(theme)) {
				themes = [theme];
			} else if (lang.isArray(theme)){
				themes = theme;
			}
			var deferred = new Deferred();
			
			if (!themes) {
				themes = array.filter(themes,function(item,index,array) {
						return (this._loadedThemes.indexOf(theme)<0) ;
					},this);
			}
			
			if (!themes || themes.length==0) {
				deferred.resolve();
				return deferred;
			}
			
			var defs=[];
			
			array.forEach(themes,function(theme) {
				array.forEach(this.fileList, function(e)	{
					var linkId = "qface_theme_"+theme+"_"+e;
					if (document.getElementById(linkId)) {
						return;
					}	
					var deferredCss = new Deferred();
					defs.push(deferredCss);

					var element = document.createElement("link");
					element.rel = "stylesheet";
					element.type = "text/css";
					element.media = "screen";
					element.href = dojo.moduleUrl("qface.resources.themes."+theme, e+".css");
					element.id = linkId;
					document.getElementsByTagName("head")[0].appendChild(element);
					element.onload = function() {
						deferredCss.resolve();
					};
					element.onerror = function() {
						deferredCss.cancel();
					};
				});
				this._loadedThemes.push(theme);
			},this);	
				
			
			var cssDeferredList = new DeferredList(defs);
			cssDeferredList.then(function() {
				deferred.resolve();
			},function(){
				deferred.cancel();
			});
			
			return deferred;
		},

		disableTheme: function(/*String*/theme)	{
			
		},
		
		applyTheme : function(theme) {
			if (this._theme == theme) {
				return;
			}	
			if (this._theme) {
				domClass.replace(document.body,theme,this._theme);
			} else {
				domClass.add(document.body,theme);
			}
			this._theme = theme;
		},


		listThemes : function() {
 			var themes =[
							{ label: "soria", value : "soria" },
							{ label: "tsunami", value: "tsunami" },
							{ label: "tundra", value: "tundra" }
						];
						
			return themes;
		}
		
	});
			
	_Desktop.TermMode = Enum.declare(["PC","MOBILE"]);

	
	return _Desktop;
});	
