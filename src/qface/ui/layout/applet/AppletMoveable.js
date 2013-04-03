/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/declare", 
   "dojo/dnd/move"
],function(declare,dndMove) {
	return declare([dndMove.constrainedMoveable], {
		//	summary:
		//		A subclassed dojo.dnd.move.constrainedMoveable for scene.ui.Applet
		onMove: function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop){
			//	summary: called during every move notification,
			//		should actually move the node, can be overwritten.
			var c = this.constraintBox;
			leftTop.l = leftTop.l < c.l ? c.l : c.r < leftTop.l ? c.r : leftTop.l;
			leftTop.t = leftTop.t < c.t ? c.t : c.b < leftTop.t ? c.b : leftTop.t;
			dojo.marginBox(mover.node, leftTop);
			this.onMoved(mover, leftTop);
		}
	});
});
