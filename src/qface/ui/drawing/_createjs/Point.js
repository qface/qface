/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
/*
* Point
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

define( [
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/declare"
], function(dojo,lang,declare){


	// namespace:
	dojo.global.createjs = dojo.global.createjs||{};
	
	var Point = delcare(null,{
		/**
		 * Represents a point on a 2 dimensional x / y coordinate system.
		 *
		 * <h4>Example</h4>
		 *      var point = new Point(0, 100);
		 *
		 * @class Point
		 * @constructor
		 * @param {Number} [x=0] X position.
		 * @param {Number} [y=0] Y position.
		 **/
		constructor : function(x, y) {
		  this.initialize(x, y);
		},
		
	// public properties:

		/** 
		 * X position. 
		 * @property x
		 * @type Number
		 **/
		x : 0,
		
		/** 
		 * Y position. 
		 * @property y
		 * @type Number
		 **/
		y : 0,
		
	// constructor:
		/** 
		 * Initialization method.
		 * @method initialize
		 * @protected
		*/
		initialize : function(x, y) {
			this.x = (x == null ? 0 : x);
			this.y = (y == null ? 0 : y);
		},
		
	// public methods:
		/**
		 * Returns a clone of the Point instance.
		 * @method clone
		 * @return {Point} a clone of the Point instance.
		 **/
		clone : function() {
			return new Point(this.x, this.y);
		},

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		toString : function() {
			return "[Point (x="+this.x+" y="+this.y+")]";
		}
		
	});
	
	
	return dojo.global.createjs.Point = Point;
});