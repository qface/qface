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
	"dojo/_base/declare", // lang.trim
	"dojo/_base/lang", // lang.trim
	"dojo/Deferred",
	"qface/util/Enum",
	"./_Desktop"
],function(require,declare,lang,Deferred,Enum,_Desktop) {
	var desktop;

	require.on("error", function(error){
	  console.log(error.src, error.id);
	});
	
	var Runtime = declare(null,{

	});
			
	Runtime.TermMode = _Desktop.TermMode;

 	lang.mixin(Runtime, { 		
 		run : function(Desktop,config,callback) {
 			desktop = new Desktop();
 			
 			desktop.init(config).then(
 				function() {
 					desktop.start();
 					if (callback) {
 						callback();
 					}	
 				}
 			);		
 			
 		},
 	
		log : function(/*String*/str){
			//	summary:
			//		logs a string onto any console that is open
			//	
			//	str:
			//		the string to log onto the consoles
			desktop.log(str);
		},
		
		getTermMode : function() {
			return desktop.getTermMode();
		},
		
		changeTermMode : function(termMode) {
			desktop.changeTermMode(termMode);
		},
		
	     addDojoCss : function(/*String*/path){
	     	desktop.addDojoCss(path);
	    },
    
		addDojoJs : function(/*String*/path){
	     	desktop.addDojoCss(path);
	    },

		getTheme : function(scene) {
			return desktop.getTheme(scene);
		},
		
		changeTheme: function(scene,/*String*/theme)	{
			desktop.changeTheme(scene,theme);
		},
		
		
		enableTheme: function(/*String*/theme)	{
			return desktop.enableTheme(theme);
		},

		disableTheme: function(/*String*/theme)	{
			desktop.disableTheme(theme);
		},

		listThemes : function() {
			return desktop.listThemes();
		}
			
	});
	
	
	return Runtime;
});	
