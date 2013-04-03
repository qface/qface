/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
  "require",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  "dojox/json/schema",
  "dojox/json/ref",
  "../Application",
  "./Window",
  "./View",
  "./Model",
  "dojo/text!./schema/application.json",
  "./_patches"
],function(require,declare,lang,deferred,schema,jsonRef,_App,JsonAMLWindow,View,Model,txtAppSchema) {
	var appSchema = jsonRef.fromJson(txtAppSchema);

	
	var _JsonAMLApplication =  declare( [_App], {
		meta : null,
		
		views	: null,
		models	: null,
		stores	: null,
 		
		createView	: function(name) {
			var viewCtoc = this.meta.loadView(name);
			if (viewCtoc) {
				return new viewCtoc({
					app : this
				});
			}
		},
		
		
		init: function(args){
			this.models = new Model(this.meta.config.models);
			this.stores = this.meta.stores;
			
			var win = this.winMain = new JsonAMLWindow({
				title: this.meta.config.title,
				width: "420px",
				height: "500px",
				iconClass: this.iconClass,
				defaultView:this.meta.config.defaultView,
				defaultTransition:this.meta.config.defaultTransition,
				app      : this,
				onClose: lang.hitch(this, this.kill)
			});
			
			this.winMain.show();
            this.winMain.startup();
    	},

		// load default view and startup the default view
        start: function(applicaton){
            var child = this.loadChild();

            deferred.when(child, lang.hitch(this, function(){
                this.startup();

                //set application status to STARTED
                this.setStatus(this.lifecycle.STARTED);
            }));
        }
    });
	

	_JsonAMLApplication._Meta = declare(null,{
        config		: null,
		views   	: null,
		models  	: null,
		stores		: null,
		
   
		_parseConfig : function(config){

			var modules = config.modules.concat(config.dependencies);

			if (config.template){
				modules.push("dojo/text!" + "app/" + config.template);
			}
			
			var self = this;
			require({async:false},modules, function(){
			   self.config = config;
			   lang.mixin(self,config);
			});
			
			this.views = {
			};

			this.stores = {};
			
			if(config.stores){
			    //create stores in the configuration.
			    for (var item in config.stores){
			        if(item.charAt(0)!=="_"){//skip the private properties
			            var type = config.stores[item].type? config.stores[item].type : "dojo.store.Memory";
			            var params = {};
			            if(config.stores[item].params){
			                lang.mixin(params, config.stores[item].params);
			            }
			            var storeCtor = lang.getObject(type);
			            if(params.data && lang.isString(params.data)){
			                //get the object specified by string value of data property
			                //cannot assign object literal or reference to data property
			                //because json.ref will generate __parent to point to its parent
			                //and will cause infinitive loop when creating StatefulModel.
			                params.data = lang.getObject(params.data);
			            }
			            config.stores[item].store = new storeCtor(params);
			        }
			    }
			}
			
		},
	
		constructor: function(txtConfig){
			if (!txtConfig){
				throw Error("App Config Missing");
			}
			
			var config = jsonRef.fromJson(txtConfig);

			if (config.validate){
				if (!schema.validate(config,appSchema)){
					throw Error("App Config Missing");
				}	
			}
			this._parseConfig(config);		
		},
		
		
		loadView : function(name) {
		 	
		    var self = this;
			if (!this.views[name]) {
				if (this.config.views&& this.config.views[name]){
					var conf = this.config.views[name];
					if (!conf.dependencies){conf.dependencies=[];}
					var deps = conf.handler? conf.dependencies.concat(["apps/"+this.config.name.replace(/[.]/g, "/")+"/"+conf.handler]) :
							conf.dependencies.concat([]);
					var idxHandler = conf.handler?deps.length-1:-1;
					
					var tplPathUrl = require.toUrl("apps/"+this.config.name.replace(/[.]/g, "/"));
					deps = conf.template? deps.concat(["dojo/text!apps/"+this.config.name.replace(/[.]/g, "/")+"/"+conf.template]) :
							deps.concat([]);
				
					var idxTemplate = conf.template?deps.length-1:-1;

					require({async:false},deps,function(){
						var tmpStr = idxTemplate>-1?arguments[idxTemplate]:"<div></div>";
						var handler = idxHandler>-1?arguments[idxHandler]:null;
						
						var ctoc = declare([View],{
							templateString:tmpStr,
							constructor : function() {
								if (handler) {
									this._handler  = new handler({view:this});
								}
							},
							
							destroy : function() {
								if (this._handler) {
									this._handler.destroy();
									this._handler = null;
								}
							}
							
						
						});
						
						self.views[name] = ctoc;
						
					});
				}
			} 
			
			return this.views[name];
		}
	});
	
	return _JsonAMLApplication;
});
