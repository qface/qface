/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/declare"
	"dojo/dom-style",
	"dojo/dom-class",
   "./Applet"
],function(declare,domStyle,domClass,,Applet) {


	return declare([Applet], {
		//	summary:
		//		A basic Separator applet
		dispName: "Separator",
		
		postCreate: function(){
			domClass.add(this.containerNode, "separator");
			domStyle.set(this.handleNode, "background", "transparent none");
			domStyle.set(this.handleNode, "zIndex", "100");
			domStyle.set(this.containerNode, "zIndex", "1");
			this.inherited(arguments);
		}
	});

});
