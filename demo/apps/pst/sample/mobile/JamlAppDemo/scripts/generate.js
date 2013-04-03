define([
  "dojo/_base/kernel", 
  "dojo/_base/declare",
  "dojo/_base/lang", 
  "qface/app/jaml/Model",
  "qface/app/jaml/Controller"
], function(dojo, declare,lang,Model,Controller){
        return declare([Controller], {
            // used in the Generate View demo
 
            updateModel : function () {
                try {
                    var modeldata = dojo.fromJson(this._view.modelArea.get("value"));
                    var genmodel = new Model(modeldata );
                    this._view.app.models.set("names",genmodel);
                }catch(err){
                    console.error("Error parsing json from model: "+err);
                }
            },

            // used in the Generate View demo
            showModel : function () {
                this._view.modelArea.focus(); // hack: do this to force focus off of the textbox, bug on mobile?
                this._view.modelArea.set("value",(dojo.toJson(this._view.app.models.names.toPlainObject(), true)));
            },
            

            updateBtn_click : function(){
            	this.updateModel();
            },
            activate : function() {
            	this.showModel();
            }
       });
});