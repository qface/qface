/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */

define( [
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/_base/declare",
	"dojox/gfx/canvasWithEvents"
], function(dojo,lang,declare,canvasWithEvents){
	var Canvas = declare(canvasWithEvents.Surface,{
		/*setDimensions*/
		
		
	});


	Canvas.Shape = declare(canvasWithEvents.Shape, {});
	
	Canvas.Group = declare(canvasWithEvents.Group, {});

	Canvas.Image = declare(canvasWithEvents.Group, {});

	Canvas.Text = declare(canvasWithEvents.Group, {});
	
	Canvas.Rect = declare([canvasWithEvents.Shape, canvas.Rect], {});
	
	Canvas.Circle = declare([canvasWithEvents.Shape, canvas.Circle], {});
	
	Canvas.Ellipse = declare([canvasWithEvents.Shape, canvas.Ellipse],{});
	
	Canvas.Line = declare([canvasWithEvents.Shape, canvas.Line],{});
	
	Canvas.Polyline = declare([canvasWithEvents.Shape, canvas.Polyline],{});
	
	Canvas.Path = declare([canvasWithEvents.Shape, canvas.Path],{});
	
	Canvas.TextPath = declare([canvasWithEvents.Shape, canvas.TextPath],{});

	returen Canvas;
});