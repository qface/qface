/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: lihongwang
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/lang", 
	"dojo/_base/declare", 
	"dojo/aspect", 
    "dojo/dom-class",
    "dojo/Deferred",
	"./Applet"
],function(lang,declare,aspect,domClass,Deferred,Applet) {

	return declare([Applet], {
		//	summary:
		//		A network monitor applet that blinks when an xhr is made
		dispName: "Network Monitor",
		appletIcon: "icon-32-status-network-transmit-receive",
		postCreate: function(){
			domClass.add(this.containerNode, "icon-22-status-network-idle");
			this._xhrStart = aspect.after(dojo,"_ioSetArgs",lang.hitch(this,function(m)	{
					this.removeClasses();
					var f = Math.random();
					if(f <= (1/3))  domClass.add(this.containerNode, "icon-22-status-network-receive");
					else if(f <= (2/3))  domClass.add(this.containerNode, "icon-22-status-network-transmit");
					else domClass.add(this.containerNode, "icon-22-status-network-transmit-receive");
					return m;
				})
			); 
			
			this._xhrEnd = aspect.after(Deferred.prototype,"_fire",lang.hitch(this,function(m)	{
					this.removeClasses();
					domClass.add(this.containerNode, "icon-22-status-network-idle");
					return m;
				})
			); 
			this.inherited(arguments);
		},
		removeClasses: function(){
			domClass.remove(this.containerNode, "icon-22-status-network-receive");
			domClass.remove(this.containerNode, "icon-22-status-network-transmit");
			domClass.remove(this.containerNode, "icon-22-status-network-transmit-receive");
			domClass.remove(this.containerNode, "icon-22-status-network-idle");
		},
		uninitialize: function(){
			this._xhrStart.remove();
			this._xhrEnd.remove();
			this.inherited(arguments);
		}
	});

});
