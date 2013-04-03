/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define( [
	"dojo/_base/declare"
], function(declare){

	var ComponentMixin =  declare(null, {

		_components		: null,
		
		
		/**
		 * @function
		 * @returns
		 */
		getOwner		: function() {
			return this._owner;
		},
		
		isOwner			: function() {
			return false;
		},

		/**
		 * @function
		 * @returns
		 */
		getName 			: function() {
		},

		/**
		 * @function
		 * @returns
		 */
		setName				: function(sName) {
		},
		
		/**
		 * @function
		 * @returns
		 */
		addComponent 	: function(name,oComp) {
			this._components[name] = oComp;
			this[name] = oComp;
			
		},

		/**
		 * @function
		 * @returns
		 */
		removeComponent	: function(name) {
			delete this._components[name];
			delete this[name];
		}		

	});

	return ComponentMixin;	
});

