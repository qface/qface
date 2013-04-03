/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */

define( [
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/declare""
], function(dojo,lang,declare){
    var canvas = document.createElement('canvas'), 
        context = canvas.getContext('2d'), 
        devicePixelRatio = window.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1, 
        _pixelRatio = devicePixelRatio / backingStoreRatio;

	var Canvas = declare(null,{
	    /**
	     * Canvas Renderer constructor
	     * @constructor
	     * @param {Number} width
	     * @param {Number} height
	     */
		constructor : function(params) {
	        this.pixelRatio = params.pixelRatio || _pixelRatio;
	        this.width = params.width;
	        this.height = params.height;
	        this.element = document.createElement('canvas');
	        this.element.style.position = params.position?params.position:"absolute";
	        this.element.style.left = params.left?params.left:"0px";
	        this.element.style.top = params.top?params.top:"0px";
	        this.element.style.padding = 0;
	        this.element.style.margin = 0;
	        this.element.style.border = 0;
	        this.element.style.background = 'transparent';
	        this.context = this.element.getContext('2d');
	        this.setSize(width || 0, height || 0);
		},
		
        /**
         * clear canvas
         * @name clear
         * @methodOf Canvas.prototype
         */
        clear: function() {
            var context = this.getContext();
            var el = this.getElement();
            context.clearRect(0, 0, el.width, el.height);
        },
        
        /**
         * get canvas element
         * @name getElement
         * @methodOf Canvas.prototype
         */
        getElement: function() {
            return this.element;
        },

        /**
         * get canvas context
         * @name getContext
         * @methodOf Canvas.prototype
         */
        getContext: function() {
            return this.context;
        },

        /**
         * set width
         * @name setWidth
         * @methodOf Canvas.prototype
         * @param {Number} width
         */
        setWidth: function(width) {
            this.width = width;
            // take into account pixel ratio
            this.element.width = width * this.pixelRatio;
            this.element.style.width = width + 'px';
        },

        /**
         * set height
         * @name setHeight
         * @methodOf Canvas.prototype
         * @param {Number} height
         */
        setHeight: function(height) {
            this.height = height;
            // take into account pixel ratio
            this.element.height = height * this.pixelRatio;
            this.element.style.height = height + 'px';
        },

        /**
         * get width
         * @name getWidth
         * @methodOf Canvas.prototype
         */
        getWidth: function() {
            return this.width;
        },


        /**
         * get height
         * @name getHeight
         * @methodOf Canvas.prototype
         */
        getHeight: function() {
            return this.height;
        },


        /**
         * set size
         * @name setSize
         * @methodOf Canvas.prototype
         * @param {Number} width
         * @param {Number} height
         */
        setSize: function(width, height) {
            this.setWidth(width);
            this.setHeight(height);
        },

        /**
         * to data url
         * @name toDataURL
         * @methodOf Canvas.prototype
         * @param {String} mimeType
         * @param {Number} quality between 0 and 1 for jpg mime types
         */
        toDataURL: function(mimeType, quality) {
            try {
                // If this call fails (due to browser bug, like in Firefox 3.6),
                // then revert to previous no-parameter image/png behavior
                return this.element.toDataURL(mimeType, quality);
            }
            catch(e) {
                try {
                    return this.element.toDataURL();
                }
                catch(e) {
                    Global.warn('Unable to get data URL. ' + e.message)
                    return '';
                }
            }
        }
		
		
	});


	returen Canvas;
});