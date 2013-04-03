/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"dojo"
],function(dojo) {
	return {
		log : function(/*String*/str){
			//	summary:
			//		logs a string onto any console that is open
			//	
			//	str:
			//		the string to log onto the consoles
			str = dojo.toJson(str);
			dojo.query(".consoleoutput").forEach(function(elem){
				elem.innerHTML += "<div>"+str+"</div>";
			});
			console.log(str);
		}	
	};
});	
