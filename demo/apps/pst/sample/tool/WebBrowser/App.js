define([
     "dojo/_base/array", // array.forEach
     "dojo/_base/declare", // declare
     "dojo/_base/lang", // lang.extend lang.isArray
     "dojo/_base/kernel", // kernel.deprecated
     "dojo/i18n", // i18n.getLocalization
     "dijit/form/_FormValueWidget",
     "dijit/form/Button",
     "dijit/form/TextBox",
     "dijit/Toolbar",
     "dijit/layout/ContentPane",
     "qface/app/Application",
     "qface/ui/window/Window",
     "qface/ui/window/StatusBar",
     "dojo/i18n!./nls/app"
     
],function(array, declare, lang, dojo,i18n,_FormValueWidget,Button,TextBox,Toolbar,ContentPane,_App,Window,StatusBar,nlsApp) {
    
   return declare([_App],{ 
        kill: function(){
            if(!this.win.closed){ this.win.close(); }
        },
        init: function(args)
        {
            var app = nlsApp;//i18n.getLocalization("scene", "apps",this.lang);
            //var cm = nlsCommon;//i18n.getLocalization("scene", "common",this.lang);
            this.win = new Window({
                app  : this,
                title: app.title,
                iconClass: "icon-16-apps-internet-web-browser",
                onClose: dojo.hitch(this, "kill")
            });
            this.Iframe = document.createElement("iframe");
            dojo.style(this.Iframe, "width", "100%");
            dojo.style(this.Iframe, "height", "100%");
            dojo.style(this.Iframe, "border", "0px");
            this.urlbox = new TextBox({style: "width: 80%;"});
            var form = new Toolbar({region: "top"});
            form.addChild(this.urlbox);
            form.addChild(new Button({iconClass: "icon-22-actions-go-jump", label: app.go, onClick: dojo.hitch(this, this.go), style: "width: 10%;"}));
            form.startup();
            this.win.addChild(form);
            var client = new ContentPane({region: "center"}, document.createElement("div"));
            client.setContent(this.Iframe);
            this.win.addChild(client);
            this.win.show();
            if(args.url) this.go(args.url);
            else this.go("http://www.yahoo.co.jp/");
            /*this.interval = setInterval(dojo.hitch(this, function(){
                var loc = this.Iframe.contentWindow.location;
                this.Iframe.top = {
                    location: loc
                };
                if(loc != "about:blank") this.urlbox.setValue(loc);
            }), 500);*/
            this.win.startup();
        },
        
        go: function(url)
        {
            var URL = (typeof url == "string" ? url : this.urlbox.getValue());
            if(!(URL.charAt(4) == ":" && URL.charAt(5) == "/" && URL.charAt(6) == "/"))
            {
                //but wait, what if it's an FTP site?
                if(!(URL.charAt(3) == ":" && URL.charAt(4) == "/" && URL.charAt(5) == "/"))
                {
                    //if it starts with an "ftp.", it's most likely an FTP site.
                    if((URL.charAt(0) == "F" || URL.charAt(0) == "f") && (URL.charAt(1) == "T" || URL.charAt(1) == "t") && (URL.charAt(2) == "P" || URL.charAt(2) == "p") && URL.charAt(3) == ".")
                    {
                        URL = "ftp://"+URL;
                    }
                    else
                    {
                        //ok, it's probably a plain old HTTP site...
                        URL = "http://"+URL;
                    }
                }
            }
            this.Iframe.src = URL;
            this.urlbox.setValue(URL);
            return;
        }
    });
});
