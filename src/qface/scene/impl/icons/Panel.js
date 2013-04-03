define([
      "dojo",
      "require",
      "dijit/layout/ContentPane",
      "dijit/Menu",
      "dijit/MenuItem",
      "dijit/MenuSeparator",
      "dijit/form/Button",
      "qface/ui/window/Window",
 	  "qface/util/html",
 	  "qface/ui/layout/applet/Panel",
 	  "qface/ui/window/dialog",
 	  "dojo/i18n!qface/nls/common",
 	  "dojo/i18n!./nls/panel"
],function(dojo,require,ContentPane,Menu,MenuItem,MenuSeparator,Button,Window,utilHtml,QPanel,dialog,nlsCommon,nlsPanel) {

	return dojo.declare("openstar.scene.Panel", [QPanel], {
	
		//	summary:
		//		A customizable toolbar that you can reposition and add/remove/reposition applets on
		templateString: "<div class=\"scenePanel\" dojoAttachEvent=\"onmousedown:_onClick, oncontextmenu:_onRightClick\"><div class=\"scenePanel-start\"><div class=\"scenePanel-end\"><div class=\"scenePanel-middle\" data-dojo-attach-point=\"containerNode\"></div></div></div></div>",
		//	span: Float
		//		a number between 0 and 1 indicating how far the panel should span accross (1 being the whole screen, 0 being none)
		span: 1,
		//	opacity: Float
		//		a number between 0 and 1 indicating how opaque the panel should be (1 being visible, 0 being completely transparent)
		opacity: 1,
		//	thickness: Integer
		//		how thick the panel should be in pixels
		thickness: 24,
		//	locked: Boolean
		//		are the applets and the panel itself be repositionable?
		locked: false,
		//	placement: String
		//		where the panel should be placed on the screen. 
		//		acceptible values are "BL", "BR", "BC", "TL", "TR", "TC", "LT", "LB", "LC", "RT", "RB", or "RC".
		//		The first character indicates the edge, the second character indicates the placement.
		//		R = right, L = left, T = top, and B = bottom.
		//		So LT would be on the left edge on the top corner.
		placement: "BL",
		
	    config: {fx:2,window:{animSpeed:10,constrain:false}},
		
		scene : null,
		
		
		constructor : function() {
			//this.config.fx = srvConfig.fx;
			//this.config.window.animSpeed = srvConfig.window.animSpeed;
		},
		
		getOrientation: function(){
			//	summary:
			//		Gets the orientation of the panel
			//	returns:
			//		"horizontal" or "vertical"
			var s = this.placement.charAt(0);
			return (s == "B" || s == "T") ? "horizontal" : "vertical";
		},

		_onRelease: function(){
			//	summary:
			//		Disconnects the event handlers that were created in _onClick
			dojo.disconnect(this._onDragEvent);
			dojo.disconnect(this._docMouseUpEvent);
			dojo.disconnect(this._onOutEvent); //just to be sure...
			dojo.forEach(this._docEvents, dojo.disconnect);
		},
		uninitialize: function(){
			dojo.forEach(this.getChildren(), function(item){
				item.destroy();
			});
			setTimeout(dojo.hitch(this.scene._area, "resize"), 1000);
			if(this.window) this.window.close();
		},
		_place: function(){
			//	summary:
			//		Updates the position and size of the panel
			//var areaBox = dijit.getViewport();
			var area = this.getParent();
			var areaBox = dojo.getContentBox(area.containerNode);
			var s = {};

			dojo.style(this.domNode, (this.getOrientation() == "horizontal" ? "width" : "height"), (this.span*areaBox[(this.getOrientation() == "horizontal" ? "w" : "h")])+"px");
			dojo.style(this.domNode, (this.getOrientation() == "vertical" ? "width" : "height"), this.thickness+"px");

			if(this.placement.charAt(0) == "T" || this.placement.charAt(0) == "B"){
				this._makeHorizontal();
				if(this.placement.charAt(1) == "R") 
					s.left = (areaBox.w - this.domNode.offsetWidth);
				if(this.placement.charAt(1) == "L") 
					s.left = 0;//areaBox.x;
				if(this.placement.charAt(1) == "C"){
					if(this.span != 1){
						s.left = (areaBox.w - (this.span*areaBox.w)) / 2;
					}
					else 
						s.left = 0;//areaBox.x;
				}
				
				if(this.placement.charAt(0) == "B") 
					s.top = areaBox.h - this.domNode.offsetHeight;//(areaBox.h + areaBox.y) - this.domNode.offsetHeight;
				else 
					if(this.placement.charAt(0) == "T") 
						s.top = 0;//areaBox.y;
			}
			else {
				//we need a completely different layout algorytm :D
				this._makeVertical();
				if(this.placement.charAt(1) == "C"){
					if(this.span != 1){
						var span = dojo.style(this.domNode, "height");
						s.top = (areaBox.h - span)/2;
					}
				}
				else if(this.placement.charAt(1) == "B"){
					s.top = areaBox.h- this.domNode.offsetHeight;//(areaBox.h + areaBox.y) - this.domNode.offsetHeight;
				}
				else {
					s.top = 0;//areaBox.y;
				}
				if(this.placement.charAt(0) == "L"){
					s.left = 0;//areaBox.x;
				}
				else {
					s.left = areaBox.w - this.domNode.offsetWidth;//(areaBox.w + areaBox.x) - this.domNode.offsetWidth;
				}
			}
			var sides = {
				T: "Top",
				L: "Left",
				R: "Right",
				B: "Bottom"
			};
			for(var sk in sides){
				dojo.removeClass(this.domNode, "scenePanel"+sides[sk]);
			}
			dojo.addClass(this.domNode, "scenePanel"+sides[this.placement.charAt(0)]);
			
			var count = 0;
			//check for other panels in the same slot as us
			dojo.query(".scenePanel",area.containerNode).forEach(dojo.hitch(this, function(panel){
				var panel = dijit.byNode(panel);
				if(panel.id != this.id){
					if(this.placement.charAt(0) == panel.placement.charAt(0) && (panel.span==1 || this.span==1)) count += panel.thickness;
					else if(panel.placement == this.placement)
						count += panel.thickness;
				}
			}));
			if(this.placement.charAt(0) == "L" || this.placement.charAt(0) == "T") s[this.getOrientation() == "horizontal" ? "top" : "left"] += count;
			else s[this.getOrientation() == "horizontal" ? "top" : "left"] -= count;
			if(this.config.fx){
				var props = {};
				for(var key in s){
					props[key] = {end: s[key], unit: "px"};
				}
				dojo.animateProperty({
					node: this.domNode,
					properties: props,
					duration: this.config.window.animSpeed
				}).play();
			}
			else {
				for(var key in s){
					dojo.style(this.domNode, key, s[key]+"px");
				}
			}
			dojo.forEach(this.getChildren(), function(item){
				item.resize();
			});
			
			this.scene.save();
			
		},
		resize: function(){
			//	summary:
			//		Called when the window is resized. Resizes the panel to the new window height
			//var areaBox = dijit.getViewport();
			//var area = this.getParent();
			//var areaBox = dojo.position(area.containerNode);
			//dojo.style(this.domNode, (this.getOrientation() == "horizontal" ? "width" : "height"), (this.span*areaBox[(this.getOrientation() == "horizontal" ? "w" : "h")])+"px");
			//dojo.style(this.domNode, (this.getOrientation() == "vertical" ? "width" : "height"), this.thickness+"px");
			//dojo.forEach(this.getChildren(), function(item){
			//	item.resize();
			//});
			this._place();
		},
		_makeVertical: function(){
			//	summary:
			//		Orients the panel's applets vertically
			dojo.removeClass(this.domNode, "scenePanelHorizontal");
			dojo.addClass(this.domNode, "scenePanelVertical");
			//this.resize();
		},
		_makeHorizontal: function(){
			//	summary:
			//		Orients the panel's applets horizontally
			dojo.removeClass(this.domNode, "scenePanelVertical");
			dojo.addClass(this.domNode, "scenePanelHorizontal");
			//this.resize();
		},
		startup: function(){
			dojo.setSelectable(this.domNode, false);
			if(this.config.fx){
				//TODO: add to areaBox when there are other panels around!
				//var areaBox = dijit.getViewport();
				var area = this.getParent();
				var areaBox = dojo.position(area.domNode);
				if(this.placement.charAt(0) == "B"){
					dojo.style(this.domNode, "top", (areaBox.h + this.thickness)+"px");
				}
				else if(this.placement.charAt(0) == "T"){
					dojo.style(this.domNode, "top", (-(this.thickness))+"px")
				}
				else if(this.placement.charAt(0) == "R"){
					dojo.style(this.domNode, "left", (areaBox.w + this.thickness)+"px");
				}
				else {
					dojo.style(this.domNode, "left", (-(this.thickness))+"px");
				}
				
				if(this.placement.charAt(1) == "T"){
					dojo.style(this.domNode, "top", "0px");
				} else if(this.placement.charAt(1) == "B"){
					dojo.style(this.domNode, "top", (areaBox.h - this.domNode.offsetHeight)+"px");
				} else if(this.placement.charAt(1) == "L"){
					dojo.style(this.domNode, "left", "0px");
				} else if(this.placement.charAt(1) == "R"){
					dojo.style(this.domNode, "left", (areaBox.w - this.domNode.offsetWidth)+"px");
				}
				else {
					if(this.getOrientation() == "horizontal")
						dojo.style(this.domNode, "left", (( areaBox.w - (areaBox.w*this.span))/2)+"px");
					else
						dojo.style(this.domNode, "top", ((areaBox.h - (this.span*areaBox.h)) / 2)+"px");
				}
			}
			dojo.style(this.domNode, "opacity", this.opacity);

			this._place();
			//if(this.getOrientation() == "horizontal") this._makeHorizontal();
			//else this._makeVertical();
		},
		

		
		_onClick: function(e){
			//	summary:
			//		Event handler for when the mouse is pressed. Makes various event connections.
			if(!this.locked){
				this._docMouseUpEvent = dojo.connect(document, "onmouseup", this, "_onRelease");
				this._onOutEvent = dojo.connect(this.domNode, "onmouseout", this, function(){
					dojo.disconnect(this._onOutEvent);
					this._onDragEvent = dojo.connect(document, "onmousemove", this, "_onMove");
					this._docEvents = [
						dojo.connect(document, "ondragstart", dojo, "stopEvent"),
						dojo.connect(document, "onselectstart", dojo, "stopEvent")
					];
					this._docMouseUpEvent = dojo.connect(document, "onmouseup", this, "_onRelease");
				});
			}
			dojo.stopEvent(e);
		},
		
		_onRightClick: function(e){
			//	summary:
			//		Event handler for when the right mouse button is pressed. Shows the panel's context menu.
			var l = nlsPanel;//dojo.i18n.getLocalization("scene.ui", "panel");
			if(this.menu) this.menu.destroy();
			this.menu = new Menu({});
//			this.menu.addChild(new MenuItem({label: l.addToPanel, iconClass: "icon-16-actions-list-add", onClick: dojo.hitch(this, this.addDialog)}));
			this.menu.addChild(new MenuItem({label: l.properties, iconClass: "icon-16-actions-document-properties", onClick: dojo.hitch(this, this.propertiesDialog)}));
			this.menu.addChild(new MenuItem({label: l.deletePanel, iconClass: "icon-16-actions-edit-delete", disabled: (typeof dojo.query(".scenePanel")[1] == "undefined"), onClick: dojo.hitch(this, function(){
				//TODO: animate?
				this.destroy();
			})}));
			this.menu.addChild(new MenuSeparator);
			if(this.locked){
				this.menu.addChild(new MenuItem({label: l.unlock, onClick: dojo.hitch(this, this.unlock)}));
			}
			else {
				this.menu.addChild(new MenuItem({label: l.lock, onClick: dojo.hitch(this, this.lock)}));
			}
			this.menu.addChild(new MenuSeparator);
			this.menu.addChild(new MenuItem({label: l.newPanel, iconClass: "icon-16-actions-document-new", onClick: dojo.hitch(this, function(){
				var p = new openstar.scene.Panel({scene:this.scene});
				this.scene._area.domNode.appendChild(p.domNode);
				p.startup();
			})}));
//			this.menu._contextMouse();
			this.menu._openMyself({"target":e.target, "coords":{x: e.pageX, y: e.pageY}});
			//TODO: destroy menu when blurred?
		},
		
		propertiesDialog: function(){
			//	summary:
			//		Shows a small properties dialog for the panel.
			var l = nlsPanel;//dojo.i18n.getLocalization("scene.ui", "panel");
			var c = nlsCommon;//dojo.i18n.getLocalization("scene", "common");
			if(this.propertiesWin){
				this.propertiesWin.bringToFront();
				return;
			}
			var win = this.propertiesWin = new Window({
				scene: this.scene,
				title: l.panelProperties,
				width: "180px",
				height: "200px",
				onClose: dojo.hitch(this, function(){
					this.propertiesWin = false;
				})
			});
			var client = new ContentPane({region: "center", style: "padding: 5px;"});
			var div = document.createElement("div");
			var rows = {
				width: {
					widget: "HorizontalSlider",
					params: {
						maximum: 1,
						minimum: 0.01,
						value: this.span,
						showButtons: false,
						onChange: dojo.hitch(this, function(value){
							this.span = value;
							this._place();
						})
					}
				},
				thickness: {
					widget: "NumberSpinner",
					params: {
						constraints: {min: 20, max: 200},
						value: this.thickness,
						style: "width: 60px;",
						onChange: dojo.hitch(this, function(value){
							this.thickness = value;
							dojo.style(this.domNode, this.getOrientation() == "horizontal" ? "width" : "height", this.thickness+"px");
							this._place();
						})
					}
				},
				opacity: {
					widget: "HorizontalSlider",
					params: {
						maximum: 1,
						minimum: 0.1,
						value: this.opacity,
						showButtons: false,
						onChange: dojo.hitch(this, function(value){
							this.opacity = value;
							dojo.style(this.domNode, "opacity", value);
						})
					}
				}
			};
			for(var key in rows){
				var row = document.createElement("div");
				dojo.style(row, "marginBottom", "5px");
				row.innerHTML = (l[key] || key)+":&nbsp;";
				row.appendChild(new dijit.form[rows[key].widget](rows[key].params).domNode);
				div.appendChild(row);
			};
			client.setContent(new dijit.form.Form({}, div).domNode);
			win.addChild(client);
			var bottom = new ContentPane({region: "bottom", style: "height: 40px;"});
			var button = new Button({label: c.close});
			bottom.setContent(button.domNode);
			win.addChild(bottom);
			dojo.connect(button, "onClick", this, function(){
				this.propertiesWin.close();
			});
			win.show();
			win.startup();
		},

		dump: function(){
			//	summary:
			//		Returns a javascript object that can be used to restore the panel using the restore method
			var applets = [];
			var myw = dojo.style(this.domNode, "width"), myh = dojo.style(this.domNode, "height");
			dojo.forEach(this.getChildren(), dojo.hitch(this, function(item){
				var left=dojo.style(item.domNode, "left"), top=dojo.style(item.domNode, "top");
				var pos = (this.getOrientation() == "horizontal" ? left : top);
				pos = pos / (this.getOrientation() == "horizontal" ? myw : myh);
				var applet = {
					settings: item.settings,
					pos: pos,
					declaredClass: item.declaredClass
				};
				applets.push(applet);
			}));
			return applets;
		},
		restore: function(/*Array*/applets){
			//	summary:
			//		Restores the panel's applets
			//	applets:
			//		an array of applets to restore (generated by the dump method)
			var size = dojo.style(this.domNode, this.getOrientation() == "horizontal" ? "width" : "height");
			dojo.forEach(applets, dojo.hitch(this, function(applet){
				var panel = this;
				//dojo["require"](applet.declaredClass);
				require({async:false},[applet.declaredClass.replace(/[.]/g, "/")],function(Applet){
					var construct = Applet;
					var a = new construct({settings: applet.settings, pos: applet.pos,scene:panel.scene});
					if(panel.locked) a.lock();
					else a.unlock();
					panel.addChild(a);
					a.startup();
			   });
			}));
		},
		_onMove: function(e){
			//	summary:
			//		Event handler for when the panel is being dragged.
			//		gets nearest edge, moves the panel there if we're not allready, and re-orients itself
			//		also checks for any panels allready placed on that edge
			dojo.stopEvent(e);
			//var areaBox = dijit.getViewport();
			var area = this.getParent();
			var areaBox = dojo.position(area.domNode);
			var newPos;
			
			if((e.clientY-areaBox.y) < areaBox.h/3 && (e.clientX-areaBox.x) < areaBox.w/3){
				if((e.clientX-areaBox.x) / (areaBox.w/3) >(e.clientY-areaBox.y) / (areaBox.h/3)) newPos = "TL";
				else newPos = "LT";
			}
			else if((e.clientY-areaBox.y) > (areaBox.h/3)*2 && (e.clientX-areaBox.x) < areaBox.w/3){
				if((e.clientX-areaBox.x) / (areaBox.w/3) > ((areaBox.h/3)-((e.clientY-areaBox.y)-(areaBox.h/3)*2)) / (areaBox.h/3))
					newPos = "BL";
				else
					newPos = "LB";
				
			}
			else if((e.clientY-areaBox.y) < areaBox.h/3 && (e.clientX-areaBox.x) > (areaBox.w/3)*2){
				if(((areaBox.w/3)-((e.clientX-areaBox.x)-(areaBox.w/3)*2)) / (areaBox.w/3) > (e.clientY-areaBox.y) / (areaBox.h/3))
					newPos = "TR";
				else
					newPos = "RT";
			}
			else if((e.clientY-areaBox.y) > (areaBox.h/3)*2 && (e.clientX-areaBox.x) > (areaBox.w/3)*2){
				if(((e.clientX-areaBox.x) - (areaBox.w/3)*2) / (areaBox.w/3) > ((e.clientY-areaBox.y) - (areaBox.h/3)*2) / (areaBox.h/3)) newPos = "RB";
				else newPos = "BR";
			}
			else {
				if((e.clientY-areaBox.y) < areaBox.h/3) newPos = "TC";
				else if((e.clientX-areaBox.x) < areaBox.w/3) newPos = "LC";
				else if((e.clientY-areaBox.y) > (areaBox.h/3)*2) newPos = "BC";
				else if((e.clientX-areaBox.x) > (areaBox.w/3)*2) newPos = "RC";
				else newPos = this.placement;
			}
			if (this.placement != newPos){
				this.placement = newPos;
				this.scene._area.resize();
				this._place();
			}
		}
	});

});


