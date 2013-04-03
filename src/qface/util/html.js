/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "dojo/_base/lang"
],function(lang) {
    var html = {};
	lang.mixin(html , {
		textContent: function(/*DomNode|String*/node, /*String?*/text){
			//	summary:
			//		sets the textContent of a domNode if text is provided
			//		gets the textContent if a domNode if text is not provided
			//		if dojo adds this in the future, grep though
			//		the js code and replace it with dojo's method
			//	node:
			//		the node to set/get the text of
			//	text:
			//		the text to use
			node = dojo.byId(node);
			var attr = typeof node.textContent == "string" ? "textContent" : "innerText";
			if(arguments.length == 1)
				return node[attr];
			else
				node[attr] = text;
		}
	});
	return html;
});	
