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
	

return declare([_App], {
	kill: function(){
		if(!this.win.closed) this.win.close();
	},
	
	init: function(){
		var app = nlsApp;
		var win = this.win = new Window({
        	app  : this,
			title: app.title,
			width: "200px",
			height: "270px",
			iconClass: "icon-16-apps-accessories-calculator",
			onClose: dojo.hitch(this, "kill")
		});
		var textbox = new TextBox({
			region: "top",
			style: "text-align: right;"
		});
		win.addChild(textbox);
		var client = new ContentPane({
			region: "center"
		});
		dojo.style(client.domNode, "overflow","hidden");
		win.addChild(client);
		var table = document.createElement("table");
		var c = document.createElement("tbody");
		dojo.style(table, {
			borderColor: "transparent",
			width: "100%",
			height: "100%"
		});
		dojo.forEach([
			["(", ")",  "", "C"],
			["7", "8", "9", "/"],
			["4", "5", "6", "*"],
			["1", "2", "3", "-"],
			["0", ".", "=", "+"]
		], function(row){
			var rowNode = document.createElement("tr");
			dojo.forEach(row, function(cell){
				var cellNode = document.createElement("td");
				dojo.style(cellNode, "padding", "0px");
				if(cell != ""){
					var button = new Button({
						style: "width: 100%; height: 100%; margin: 0px;",
						label: cell,
						onClick: dojo.hitch(this, function(){
							if((parseInt(cell)+"" != "NaN" || cell == ".") && this.answerShown) this.clear(textbox); 
							if(cell == "=") return this.onSubmit(textbox);
							if(cell == "C") return this.clear(textbox);
							this.answerShown = false;
							textbox.setValue(textbox.getValue() + cell);
						})
					});
					dojo.query("span.dijitReset.dijitInline", button.domNode).style({
						width: "inherit",
						height: "inherit",
						paddingLeft: "0px",
						paddingRight: "0px"
					});
                    cellNode.appendChild(button.domNode);
				}
				else {
					this.eNode = document.createElement("div");
					dojo.style(this.eNode, {
						textAlign: "center",
						color: "red",
						fontWeight: "bold"
					});
					cellNode.appendChild(this.eNode);
				}
				rowNode.appendChild(cellNode);
			}, this);
			c.appendChild(rowNode);
		}, this);
		table.appendChild(c);
		client.setContent(table);
		win.show();
		win.startup();
	},
	clear: function(t){
		this.answerShown = false;
		util.textContent(this.eNode, "");
		t.setValue("");
	},
	answerShown: false,
	onSubmit: function(tb){
		this.answerShown = true;
		var v = tb.getValue().replace(/([0-9])\(/, "$1*(").replace(/\)([0-9])/, ")*$1")
		if(!this.validate(v)) return this.eNode.innerHTML = "E";
		else this.eNode.innerHTML = "";
		tb.setValue(eval("("+v+")"));
	},
	
	validate: function(v){
		//Check for matching parenthesis
		if(v.split("(").length != v.split(")").length) return false;
		//Check for invalid characters
		for(var i=0; i < v.length; i++){
			var c = v.charAt(i);
			if(!(!isNaN(parseInt(c))
			|| c == ")"
			|| c == "("
			|| c == "/"
			|| c == "*"
			|| c == "+"
			|| c == "-"
			|| c == "."
			)) return false;
		}
		//Check for stray decimal points
		var parts = v.split(".");
		for(var i=0; i<parts.length;i++){
			if(parts[i] == "" && i!=0) return false;
			if(isNaN(parseInt(parts[i].charAt(0))) && i != 0) return false;
		}
		return true;
	}
});

});
