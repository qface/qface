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
	"dijit/Calendar",
	"dijit/form/DropDownButton",
	"./Applet",
],function(lang,declare,Calendar,DropDownButton,Applet) {

	return declare([Applet], {
		//	summary:
		//		A clock applet with a drop-down calendar
		dispName: "Clock",
		postCreate: function(){
	        dojo.attr(this.containerNode, "aria-live", "off");
			var calendar = new Calendar({});
			this.button = new DropDownButton({
				label: "loading...",
				dropDown: calendar
			}, this.containerNode);
			var old = "";
			this.clockInterval = setInterval(dojo.hitch(this, function(){
				var p = dojo.date.locale.format(new Date());
				/*if(this.getParent().getOrientation() == "vertical"){
					var v = "";
					for(var i=0; i<p.length; i++){
						v += "<div style='text-align: center;'>" + p.charAt(i) + "</div>";
					}
					p = v;
				}*/
				if(p != old){
					old=p;
					this.button.set("label",p);
				}
			}), 1000);
			this.inherited("postCreate", arguments);
		},
		uninitialize: function(){
			clearInterval(this.clockInterval);
			this.inherited(arguments);
		}
	});

});