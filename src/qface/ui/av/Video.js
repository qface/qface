define([
	"require",
	"dojo/_base/declare", // declare
	"dojo/dom-class", // domClass.toggle
	"dojo/has",			// has("dijit-legacy-requires")
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/_base/lang", // lang.trim
	"./_AVBase",
	"./templates/video.html"
], function(require, declare, domClass, has, kernel, lang, _AVBase,tplVideo){



	return declare([_AVBase], {
		templateString : tplVideo
		
	});


});

