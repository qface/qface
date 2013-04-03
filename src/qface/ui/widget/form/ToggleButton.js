/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/declare", // declare
	"dojo/dom-class",
	"dijit/form/ToggleButton"
], function(declare,domClass,DjtToggleButton){

	return declare([DjtToggleButton], {

		_setCheckedAttr: function(){
			this.inherited(arguments);
			var newStateClasses = (this.baseClass+' '+this["class"]).replace(/(\S+)\s*/g, "$1Checked ").split(" ");
			domClass[this.checked ? "add" : "remove"](this.focusNode || this.domNode, newStateClasses);
		}
	
	});


});

