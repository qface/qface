define([
   "dojo/_base/declare", // declare
  "qface/Runtime",
  "qface/app/jaml/Application",
  "dojo/text!./config.json"
],function(declare,Runtime,_JsonAMLApplication,config) {
	var meta = new _JsonAMLApplication._Meta(config);

    Runtime.addDojoCss("dojox/mobile/themes/iphone/base.css");

	return declare([_JsonAMLApplication], {
		init: function(args){
		    this.meta = meta;
			this.inherited(arguments);
		}
		
	});
	
});