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
	 "dojo/data/ItemFileReadStore",
	 "dijit/form/Button",
	 "dijit/form/FilteringSelect",
	 "qface/Runtime",
	"./Applet",
],function(lang,declare,ItemFileReadStore,Button,FilteringSelect,Runtime,Applet) {

	return declare([Applet], {
		//	summary:
		//		A clock applet with a drop-down calendar
		dispName: "Theme",
		postCreate: function(){
	        dojo.attr(this.containerNode, "aria-live", "off");
	        dojo.style(this.domNode,"width","150px");

			var button = this.button = new Button({
				label: "theme",
				onClick: lang.hitch(this, function(){
							this._themeChanged(this._theme);
						})
			}) ;
			this.addChild(button );
			
			var dropdown = this.dropdown = new FilteringSelect({
				autoComplete: true,
				searchAttr: "label",
				style: "width: 80px; font-size: small",
				store: new ItemFileReadStore({
					data: {
						identifier: "value",
						items:Runtime.listThemes()
					}
				}),
				onChange: lang.hitch( this, function(val){
					if ( typeof val == "undefined" ) return;
					if (this._theme == val) return;
					this._theme = val;
					this._themeChanged(val);
				})
			});
			
			this.addChild( dropdown );
			//dropdown.set("value",Runtime.getTheme());

			this.inherited("postCreate", arguments);
		},
		
		uninitialize: function(){
			clearInterval(this.clockInterval);
			this.inherited(arguments);
		},
		
		updateTheme  : function(theme) {
			this._theme = theme;
			this.dropdown.set("value",theme);
		},
		
		_themeChanged : function(theme) {
			 setTimeout(lang.hitch(this,function(){
			 	this.onChangeTheme(theme);
			 }));
		},
		
		onChangeTheme: function(theme){
			
		}
		
	});

});