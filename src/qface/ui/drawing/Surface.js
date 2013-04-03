/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */

define([
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojox/gfx/_base",
	"dojox/gfx/canvasWithEvents"
], function(dojo,lang,declare,gfxBase,canvasWithEvents){

	gfxBase.switchTo(canvasWithEvents);
	
	gfxBase.switchTo = function(){};
	
	var Surface = canvasWithEvents.Surface;
	
	Surface.fromWidget = function(widget,width,height) {
/*
		var p = widget.containerNode ? widget.containerNode : widget.domNode;
		var c = widget._canvas;
		if (!c) {
			c = widget._canvas = document.createElement("canvas");
			c.style.position = "absolute";
	        c.style.left = "0px";
	        c.style.top =  "0px";
	        c.style.padding = 0;
	        c.style.margin = 0;
	        c.style.border = 0;
	        c.style.background = "transparent";
	        c.width = width?width:"100%";
	        c.height = height?height:"100%";
			p.appendChild(c);	
					
		}
		var s = new Surface();
	
		s.rawNode = c;
		s._parent = p;
		s.surface = s;
		return s;	
		
		var c = widget
*/			
		var s = widget._surface;
		if (!s) {
			var p = widget.containerNode ? widget.containerNode : widget.domNode;
			s = widget._surface = canvasWithEvents.createSurface(p,width,height);
		
		}
		return s;
	};


	return Surface;
	
});