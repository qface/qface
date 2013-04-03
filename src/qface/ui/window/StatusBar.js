/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/lang", 
	"dojo/_base/declare", 
	"dojo/dom-style",
	"dojo/on", 
	"dojo/dom",
	"dijit/_Widget", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin"	
],function(lang,declare,domStyle,on,dom,_Widget,_TemplatedMixin,_WidgetsInTemplateMixin ) {

	return declare([_Widget, _TemplatedMixin,_WidgetsInTemplateMixin ], {
		label: "&nbsp;",
		
		templateString: "<div class='sceneStatusBar'>"
		+"<div data-dojo-attach-point='labelNode'>${label}</div>"
		+"<div data-dojo-attach-point='progressBar' data-dojo-type='dijit/ProgressBar' style='display: none;'></div>"
		+"</div>",
		
		widgetsInTemplate: true,
		
		// showProgress: Boolean
		//  Determines whether or not the progress bar should be shown
		showProgress: false,
		
		// progress: String (Percentage or Number)
		// 	initial progress value.
		// 	with "%": percentage value, 0% <= progress <= 100%
		// 	or without "%": absolute value, 0 <= progress <= maximum
		progress: "0",

		// maximum: Float
		// 	max sample number
		maximum: 100,

		// places: Number
		// 	number of places to show in values; 0 by default
		places: 0,

		// indeterminate: Boolean
		// 	If false: show progress.
		// 	If true: show that a process is underway but that the progress is unknown
		indeterminate: false,
		
		attributeMap: lang.mixin(dojo.clone(_Widget.prototype.attributeMap), {
			label: {node: "labelNode", type: "innerHTML"}
		}),
		
		postCreate: function(){
			dom.setSelectable(this.domNode, false);
			this.update({progress: this.progress, maximum: this.maximum, places: this.places, indeterminate: this.indeterminate});
			on(this.progressBar, "Change", lang.hitch(this, this.onChange));
		},
		
		_setShowProgressAttr: function(value){
	        domStyle.set(this.progressBar.domNode, "display", (value ? "block" : "none"));
		},
		
		update: function(/*Object?*/attributes){
			// summary: update progress information
			//
			// attributes: may provide progress and/or maximum properties on this parameter,
			//	see attribute specs for details.
			this.progressBar.update(attributes);
		},
		
		onChange: function(){
			// summary: User definable function fired when progress updates.
		}
	});
});
