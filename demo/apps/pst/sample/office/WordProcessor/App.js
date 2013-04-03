define([
	 "dojo", // dojo
	 "dijit/form/_FormValueWidget",
	 "dijit/form/Button",
	 "dijit/form/TextBox",
	 "dijit/Toolbar",
	 "dijit/Editor",
	 "dijit/layout/ContentPane",	 
	 "qface/app/Application",
	 "qface/ui/window/Window",
	 "qface/ui/window/StatusBar",
	 "dojo/i18n!qface/nls/common",
	 "dojo/i18n!./nls/app",
//	 "dijit/_editor/plugins/AlwaysShowToolbar",
//	 "dijit/_editor/plugins/EnterKeyHandling",
//	 "dijit/_editor/plugins/FontChoice",
	 "dijit/_editor/plugins/FullScreen",
//	 "dijit/_editor/plugins/LinkDialog",
	 "dijit/_editor/plugins/NewPage",
	 "dijit/_editor/plugins/Print",
	 "dijit/_editor/plugins/TabIndent",
	 "dijit/_editor/plugins/TextColor",
//	 "dijit/_editor/plugins/ToggleDir",
	 "dijit/_editor/plugins/ViewSource"

],function(dojo,_FormValueWidget,Button,TextBox,Toolbar,Editor,ContentPane,_App,Window,StatusBar,nlsCommon,nlsApp) {

return dojo.declare([_App], {
	newAs: false,
	editing: false,
	fileEditing: "",
	kill: function(){
	    if (!this.window.closed)
	        this.window.close();
	},
	init: function(args){
		var cm = nlsCommon;
		var app = nlsApp;
		
	    this.window = new Window({
        	app  : this,
			title: app.title,
			iconClass: "icon-16-mimetypes-x-office-document",
	        onClose: dojo.hitch(this, this.kill)
	    });
	    var toolbar = new Toolbar({
	        region: "top"
	    });
	    toolbar.addChild(new Button({
	        label: cm["new"],
	        onClick: dojo.hitch(this, this.processNew),
	        iconClass: "icon-16-actions-document-open"
	    }));
	    toolbar.addChild(new Button({
	        label: cm.open,
	        onClick: dojo.hitch(this, this.processOpen),
	        iconClass: "icon-16-actions-document-open"
	    }));
	    toolbar.addChild(new Button({
	        label: cm.save,
	        onClick: dojo.hitch(this, this.processSave),
	        iconClass: "icon-16-actions-document-save"
	    }));
	    toolbar.addChild(new Button({
	        label: cm.saveAs,
	        onClick: dojo.hitch(this, this.processSaveAs),
	        iconClass: "icon-16-actions-document-save-as"
	    }));
	    toolbar.addChild(new Button({
	        label: cm.close,
	        onClick: dojo.hitch(this, this.processClose),
	        iconClass: "icon-16-actions-process-stop"
	    }));
	    this.window.addChild(toolbar);
	    var box = new ContentPane({
	        region: "center"
	    },
	    document.createElement("div"));
	    this.statusbar = new StatusBar({
	        region: "bottom"
	    });
	    this.statusbar.attr("label", "no file opened");
	    this.window.addChild(this.statusbar);
	    var editor = this.editor = new Editor({
	    	region: "center",
	    	extraPlugins: [
	    	    "|",
	    	    "fullScreen",
	    	    "print",
	    	    "viewSource",
	    	    "|",
	    	    "newPage",
	    	    "|",
                "createLink",
                "insertImage",
                "|",
                "fontName",
                "fontSize",
                "formatBlock",
                "foreColor",
                "|",
                'tabIndent'
	    	],
            isTabIndent: true
	    }, document.body.appendChild(document.createElement("div")));
		editor.startup();
		this.window.addChild(editor);
	    this.window.show();
	    this._new = false;
	    this.window.startup();
	    this.window.onClose = dojo.hitch(this, this.kill);
	
		setTimeout(dojo.hitch(this, function(){
			editor = dijit.byId(editor.id);
			editor.extraPlugins = [];
			delete editor.toolbar;
			editor.postCreate();
			if(args.file) 
				this._processOpen(args.file);
			else {
				this.processNew();
			}
		}), 500);
	
	},
    updateTitle: function(path){
        var app = nlsApps;//i18n.getLocalization("scene", "apps",this.lang);
        if(!path) return this.window.attr("title", app["Text Editor"]);
        var files = path.split("/");
        this.window.attr("title", files[files.length-1]+" - "+app["Text Editor"]);
    },
	processNew: function(){
		var msg = nlsMessages;//i18n.getLocalization("scene", "messages",this.lang);
		var cmn = nlsCommon;//i18n.getLocalization("scene", "common",this.lang);
	    this.editor.setDisabled(false);
	    this.editor.replaceValue("");
	    this.editing = false;
	    this.fileEditing = "";
	    this.newAs = true;
	    this.updateTitle(cmn.untitled);
	},
	processClose: function(){
	    this.editor.replaceValue("");
	    this.editor.setDisabled(true);
	    this.newAs = false;
	    this.editing = false;
	    this.fileEditing = "";
	    this.updateTitle(false);
	},
	processOpen: function(){
	
	},
	
	_processOpen: function(path){
	
	},
	
	processSave: function(){
	},
	processSaveAs: function(){
	
	}
});

});
