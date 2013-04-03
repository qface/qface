/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array"
],function(declare,lang,array) {
	var _CS_ENUM_CREATING = 0,
		_CS__ENUM_CREATED = 1,
		_CS_ENUM_METAS = {};

	var Enum = declare(null,{
		_value: 0,
		
		constructor : function(opt) {
			var enumMeta = _CS_ENUM_METAS[this.constructor];;
			if (!enumMeta || enumMeta.status!==_CS_ENUM_CREATING) {
				throw new Error("invalid operation!!");
			}
			var options = enumMeta["options"] || new Array();
			options.push(opt);
			options[opt] = this;
			this._value = options.length-1;
			enumMeta["options"]  = options;
		},
		
		getValue : function() {
			return this._value;
		},
		
		getText  : function() {
			var enumMeta = _CS_ENUM_METAS[this.constructor];;
			    options = enumMeta["options"];
			return options[this._value];
		},
		
		toString : function() {
			return this.getText();
		}
	});
	
	lang.mixin(Enum,{
		declare : function(name,options) {
			if (!options) {
				options = name;
				name = null;
			}
			var c = declare([Enum],{});
			var enumMeta = _CS_ENUM_METAS[c] = {};
			enumMeta.status = _CS_ENUM_CREATING;
			dojo.mixin(c,{
				parseString : function(s){
					var enumMeta = _CS_ENUM_METAS[c],
					    options =enumMeta["options"] ;
					return options[s];
				}
			});

			array.forEach(options,function(opt,i){
				c[opt] = new c(opt);
			});
			enumMeta.status = _CS__ENUM_CREATED;
			return c;	
			
		}
		
	});
	
	return Enum;
	
});	