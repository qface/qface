/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/declare",
	"qface/_Component"
], function(lang, array, declare, _Component){
	/*=====
		declare = dojo.declare;
		Stateful = dojo.Stateful;
	=====*/

	var Controller = declare([_Component], {


		//////////////////////// PRIVATE INITIALIZATION METHOD ////////////////////////

		constructor: function(/*Object*/ args){
			this._view = args.view;
		},
		
		destroy : function() {
			this.view = null;
		}


	});

	return Controller;
});
