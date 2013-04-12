define([
	"dojo/_base/array", // array.forEach
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.extend lang.isArray
	"dojo/_base/kernel", // kernel.deprecated
	"dojo/topic",
	"dijit/_Widget",
	"dijit/_TemplatedMixin",
	"dijit/form/_FormValueWidget",
	"dijit/form/Button",
	"dijit/form/TextBox",
	"dijit/Toolbar",
	"dijit/layout/ContentPane",
	"qface/app/Application",
	"qface/ui/window/Window",
	"qface/ui/window/StatusBar",
	"qface/ui/av/CubeVideo",
	"dojo/i18n!./nls/app"
],function(array, declare, lang, dojo,topic,_Widget,_TemplatedMixin,_FormValueWidget,Button,TextBox,Toolbar,ContentPane,_App,Window,StatusBar,CubeVideo,nlsApp) {


   return declare([_App],{ 
   		video : null,
		copy: null,
		copycanvas: null,
		outputcanvas:null,
		draw: null,

        kill: function(){
            if(!this.win.closed){ this.win.close(); }
        },
        init: function(args)    {
            var app = nlsApp;
            //var cm = nlsCommon;
            this.win = new Window({
                app  : this,
                title: app.title,
                iconClass: "icon-16-apps-internet-web-browser",
                onClose: dojo.hitch(this, "kill")
            });

            var player = this.player =  new CubeVideo();
            this.win.addChild(player);
            this.win.show();
            this.win.startup();
            
            player.play("BigBuckBunny_640x360.mp4");
            
            if (args.paused) {
            	player.pause();
            }
            
            var self = this;
            topic.subscribe("/qface/scene/hide",function(scene){
            	if (self.scene == scene) {
            		self.player.pause();
            	}	
            });
            
            topic.subscribe("/qface/scene/show",function(scene){
            	if (self.scene == scene) {
            		self.player.play();
            	}	
            });
        }


    });
});
