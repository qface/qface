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
    "dojo/dom-style",
    "dojo/dom-class",
	"dojo/dom-construct", 
    "dojo/on",
	"./Applet"
],function(lang,declare,domStyle,domClass,domConstruct,on,Applet) {

	return declare([Applet], {
		dispName: "Full Screen",

		postCreate: function(){
			domStyle.set(this.containerNode,"padding","3px");
			
			var div = this.div = domConstruct.create('div',{
				title : this.dispName
			}, this.containerNode);
			
			domClass.add(div, "icon-16-actions-view-fullscreen");
			
			on(div,"click",lang.hitch(this,this.fullScreen));

			on(div,"mouseover",function(){
				domClass.add(div,"actived");
			});
		    
			on(div,"mouseout",function(){
				domClass.remove(div,"actived");
			});

		    this.inherited(arguments);
		},


		// html5 fullscreen API
		fullScreen : function() {
				var docElm = document.documentElement;
				if (!document.fullscreenElement &&    // alternative standard method
		  		!document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
					if (docElm.requestFullscreen) {
						docElm.requestFullscreen();
					}
					else if (docElm.mozRequestFullScreen) {
						docElm.mozRequestFullScreen();
					}
					else if (docElm.webkitRequestFullScreen) {
						docElm.webkitRequestFullScreen();
					}
				} else{
				if (document.cancelFullScreen) {
			      document.cancelFullScreen();
			    } else if (document.mozCancelFullScreen) {
			      docElm.mozCancelFullScreen();
			    } else if (document.webkitCancelFullScreen) {
			      document.webkitCancelFullScreen();
			    }
				}
		}
	});

});
