/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo",
	"dojo/_base/lang", 
	"dojo/dom-style",
	"dojo/on", 
	"dojo/topic",
	"dojo/Deferred",
	"dijit/Dialog",
	"dijit/layout/ContentPane",
	"dijit/layout/SplitContainer",
	"dijit/form/TextBox",
	"dijit/form/Button",
	"dijit/form/FilteringSelect",
	"dijit/Toolbar",
	"dijit/Menu",
	"dijit/MenuItem",
	"qface/ui/window/Window",
	"dojo/i18n!../nls/common"
	
],function(dojo,lang,domStyle,on,topic,Deferred,Dialog,ContentPane,SplitContainer,TextBox,Button,FilteringSelect,Toolbar,Menu,MenuItem,Window,nlsCommon) {
	var  dialog = {};
	
	dojo.mixin(dialog , {
		//	summary:
		//		An API that provides things like dialogs and such
	    /*=====
	    _alertArgs: {
	        //  title: String
	        //      the title of the dialog
	        title: "",
	        //  message: String
	        //      the message to be shown in the body of the window
	        message: "",
	        //  onComplete: Function?
	        //      a function that is called when the dialog is closed
	        onComplete: function(){},
	        //  onError: Function?
	        //      since there's no way this can result in an error, this is never called. It's just here because this function uses dojo.Deferred.
	        onError: function(){}
	    },
	    =====*/
		alert: function(/*_alertArgs*/object)
		{
			//	summary:
			//		Shows a simple alert dialog
	        var d = new Deferred();
	        if(object.onComplete) d.addCallback(object.onComplete);
	        if(object.onError) d.addErrback(object.onError);

			var div = dojo.doc.createElement("div");
			div.innerHTML = "<center> "+(object.message||"")+" </center>";
			var box = new Dialog({title: object.title, style: object.style || ""}, div);
			box.show();
			on(box, 'unload', lang.hitch(d, "callback"));
	        return d; // dojo.Deferred
		},
	    /*=====
	    _inputArgs: {
	        //  title: String
	        //      the title of the dialog
	        title: "",
	        //  message: String
	        //      the message to display above the text field and buttons
	        message: "",
	        //  initial: String?
	        //      the initial contents fo the text field
	        initial: "",
	        //  onComplete: Function
	        //      a callback function, The first argument is the text that was inputted into the dialog
	        onComplete: function(text){},
	        //  onError: Function
	        //      if the user closed the dialog box or hit cancel, then this will be called.
	        onError: function(){}
	    },
	    =====*/
		input: function(/*_inputArgs*/object)
		{
			//	summary:
			//		A dialog with a text field
			//	example:
			//	|	scene.dialog.input({title: "UI Test", message: "What is your name?", onComplete: scene.log});
	        var d = new Deferred();
	        if(object.onComplete) d.addCallback(object.onComplete);
	        if(object.onError) d.addErrback(object.onError);

			var cm = nlsCommon;
			var dialog = new Window({scene:object.scene});
			dialog.title = object.title;
			dialog.width = "400px";
			dialog.height = "150px";
			var onClose = dojo.connect(dialog, "onClose", null, function(){d.errback();});
			var details = new ContentPane({region: "center"}, document.createElement("div"));
			var text = new TextBox({value: object.initial || ""});
			var all = document.createElement("div");
			var blah = new Button({label: cm.ok, onClick: dojo.hitch(this, function(){  dojo.disconnect(onClose); d.callback(text.getValue()); dialog.close(); })});
			var ablah = new Button({label: cm.cancel, onClick: dojo.hitch(this, function(){  dojo.disconnect(onClose); d.errback(); dialog.close(); })});
			var line = document.createElement("div");
	        var p = document.createElement("span");
			var q = document.createElement("span");
			p.innerHTML = "<center>"+(object.message||"")+"</center>";
			line.appendChild(p);
			all.appendChild(line);
			all.style.textAlign = "center";
			all.appendChild(text.domNode);
			all.appendChild(blah.domNode);
			all.appendChild(ablah.domNode);
			details.setContent(all);
			dialog.addChild(details);
			dialog.showClose = false;
			dialog.show();
			dialog.startup();
	        setTimeout(dojo.hitch(text, "focus"), 400);
	        on(text.domNode, "keyup", lang.hitch(this, function(e){
	            if(e.keyCode == dojo.keys.ENTER)
	                blah.onClick();
	        	})
	        );
	        return d; // dojo.Deferred
		},
	    /*=====
	    _yesnoArgs: {
	        //  title: String
	        //      the title of the dialog
	        title: "",
	        //  message: String
	        //      the message to display above the yes/no buttons
	        message: "",
	        //  onComplete: Function
	        //      called with what the user chose. The first argument is true if the user selected 'yes', or false if they selected 'no'.
	        onComplete: function(result){},
	        //  onError: Function?
	        //      if the user closed the dialog without choosing, this will be called.
	    },
	    =====*/
		yesno: function(/*_yesnoArgs*/object)
		{
			//	summary:
			//		A yes or no dialog
			//	example:
			//	|	scene.dialog.yesno({title: "UI Test", message: "Did you sign your NDA?", onComplete: function(p){
			//	|		if(p) alert("Good for you!");
			//	|		else alert("Then sign it allready!");
			//	|	}});
			
	        var d = new Deferred();
	        if(object.onComplete) d.addCallback(object.onComplete);
	        if(object.onError) d.addErrback(object.onError);
			var cm = nlsCommon;//dojo.i18n.getLocalization("scene", "common");
			var dialog = new Window();
			dialog.title = object.title;	
			dialog.width = "400px";
			dialog.height = "150px";
			var onClose = dojo.connect(dialog, "onClose", null, function(){d.errback();});
			var details = new ContentPane({region: "center"}, document.createElement("div"));
			var all = document.createElement("div");
			var blah = new Button({label: cm.yes, onClick: dojo.hitch(this, function(){ dojo.disconnect(onClose); d.callback(true); dialog.close(); })});
			var ablah = new Button({label: cm.no, onClick: dojo.hitch(this, function(){ dojo.disconnect(onClose); d.callback(false); dialog.close(); })});
			var line = document.createElement("div");
	        var p = document.createElement("span");
			var q = document.createElement("span");
			p.innerHTML = "<center>"+(object.message||"")+"</center>";
			line.appendChild(p);
			all.appendChild(line);
			all.style.textAlign = "center";
			all.appendChild(blah.domNode);
			all.appendChild(ablah.domNode);
			details.setContent(all);
			dialog.addChild(details);
			dialog.showClose = false;
			dialog.show();
			dialog.startup();
	        setTimeout(dojo.hitch(blah, "focus"), 400);
	        return d; // dojo.Deferred
		},
	    /*=====
	    _notifyArgs: {
	        //  message: String
	        //      the message to show
	        message: "",
	        //  type: String?
	        //      the type of message. can be "message", "warning", "error", or "fatal"
	        type: "message",
	        //  duration: Integer?
	        //      how long the message will be displayed in miliseconds
	        duration: 5000
	    },
	    =====*/
		notify: function(/*String|_notifyArgs*/message)
		{
			//	summary:
			//		Show a toaster popup (similar to libnotify)
			topic.publish("/qface/notification", [message]);
		}
	});
	
	return dialog;

});

