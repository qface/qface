/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"dojo/uacss":function(){
define(["./dom-geometry","./_base/lang","./ready","./sniff","./_base/window"],function(_1,_2,_3,_4,_5){
var _6=_5.doc.documentElement,ie=_4("ie"),_7=_4("opera"),_8=Math.floor,ff=_4("ff"),_9=_1.boxModel.replace(/-/,""),_a={"dj_ie":ie,"dj_ie6":_8(ie)==6,"dj_ie7":_8(ie)==7,"dj_ie8":_8(ie)==8,"dj_ie9":_8(ie)==9,"dj_quirks":_4("quirks"),"dj_iequirks":ie&&_4("quirks"),"dj_opera":_7,"dj_khtml":_4("khtml"),"dj_webkit":_4("webkit"),"dj_safari":_4("safari"),"dj_chrome":_4("chrome"),"dj_gecko":_4("mozilla"),"dj_ff3":_8(ff)==3};
_a["dj_"+_9]=true;
var _b="";
for(var _c in _a){
if(_a[_c]){
_b+=_c+" ";
}
}
_6.className=_2.trim(_6.className+" "+_b);
_3(90,function(){
if(!_1.isBodyLtr()){
var _d="dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl ");
_6.className=_2.trim(_6.className+" "+_d+"dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl "));
}
});
return _4;
});
},"dojo/text":function(){
define(["./_base/kernel","require","./has","./_base/xhr"],function(_e,_f,has,xhr){
var _10;
if(1){
_10=function(url,_11,_12){
xhr("GET",{url:url,sync:!!_11,load:_12,headers:_e.config.textPluginHeaders||{}});
};
}else{
if(_f.getText){
_10=_f.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _13={},_14=function(_15){
if(_15){
_15=_15.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _16=_15.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_16){
_15=_16[1];
}
}else{
_15="";
}
return _15;
},_17={},_18={};
_e.cache=function(_19,url,_1a){
var key;
if(typeof _19=="string"){
if(/\//.test(_19)){
key=_19;
_1a=url;
}else{
key=_f.toUrl(_19.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_19+"";
_1a=url;
}
var val=(_1a!=undefined&&typeof _1a!="string")?_1a.value:_1a,_1b=_1a&&_1a.sanitize;
if(typeof val=="string"){
_13[key]=val;
return _1b?_14(val):val;
}else{
if(val===null){
delete _13[key];
return null;
}else{
if(!(key in _13)){
_10(key,true,function(_1c){
_13[key]=_1c;
});
}
return _1b?_14(_13[key]):_13[key];
}
}
};
return {dynamic:true,normalize:function(id,_1d){
var _1e=id.split("!"),url=_1e[0];
return (/^\./.test(url)?_1d(url):url)+(_1e[1]?"!"+_1e[1]:"");
},load:function(id,_1f,_20){
var _21=id.split("!"),_22=_21.length>1,_23=_21[0],url=_1f.toUrl(_21[0]),_24="url:"+url,_25=_17,_26=function(_27){
_20(_22?_14(_27):_27);
};
if(_23 in _13){
_25=_13[_23];
}else{
if(_24 in _1f.cache){
_25=_1f.cache[_24];
}else{
if(url in _13){
_25=_13[url];
}
}
}
if(_25===_17){
if(_18[url]){
_18[url].push(_26);
}else{
var _28=_18[url]=[_26];
_10(url,!_1f.async,function(_29){
_13[_23]=_13[url]=_29;
for(var i=0;i<_28.length;){
_28[i++](_29);
}
delete _18[url];
});
}
}else{
_26(_25);
}
}};
});
},"dijit/hccss":function(){
define("dijit/hccss",["dojo/dom-class","dojo/hccss","dojo/ready","dojo/_base/window"],function(_2a,has,_2b,win){
_2b(90,function(){
if(has("highcontrast")){
_2a.add(win.body(),"dijit_a11y");
}
});
return has;
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_2c,_2d){
return _2c("dijit._Contained",null,{_getSibling:function(_2e){
var _2f=this.domNode;
do{
_2f=_2f[_2e+"Sibling"];
}while(_2f&&_2f.nodeType!=1);
return _2f&&_2d.byNode(_2f);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"dijit/Viewport":function(){
define("dijit/Viewport",["dojo/Evented","dojo/on","dojo/ready","dojo/sniff","dojo/_base/window","dojo/window"],function(_30,on,_31,has,win,_32){
var _33=new _30();
_31(200,function(){
var _34=_32.getBox();
_33._rlh=on(win.global,"resize",function(){
var _35=_32.getBox();
if(_34.h==_35.h&&_34.w==_35.w){
return;
}
_34=_35;
_33.emit("resize");
});
if(has("ie")==8){
var _36=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_36){
_36=screen.deviceXDPI;
_33.emit("resize");
}
},500);
}
});
return _33;
});
},"dojo/parser":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./Deferred","./has","./query","./on","./ready"],function(_37,_38,_39,_3a,_3b,_3c,_3d,_3e,_3f,_40,_41,has,_42,don,_43){
new Date("X");
var _44=0;
_3f.after(_38,"extend",function(){
_44++;
},true);
function _45(_46){
var map=_46._nameCaseMap,_47=_46.prototype;
if(!map||map._extendCnt<_44){
map=_46._nameCaseMap={};
for(var _48 in _47){
if(_48.charAt(0)==="_"){
continue;
}
map[_48.toLowerCase()]=_48;
}
map._extendCnt=_44;
}
return map;
};
var _49={};
function _4a(_4b){
var ts=_4b.join();
if(!_49[ts]){
var _4c=[];
for(var i=0,l=_4b.length;i<l;i++){
var t=_4b[i];
_4c[_4c.length]=(_49[t]=_49[t]||(_38.getObject(t)||(~t.indexOf("/")&&require(t))));
}
var _4d=_4c.shift();
_49[ts]=_4c.length?(_4d.createSubclass?_4d.createSubclass(_4c):_4d.extend.apply(_4d,_4c)):_4d;
}
return _49[ts];
};
var _4e={_clearCache:function(){
_44++;
_49={};
},_functionFromScript:function(_4f,_50){
var _51="",_52="",_53=(_4f.getAttribute(_50+"args")||_4f.getAttribute("args")),_54=_4f.getAttribute("with");
var _55=(_53||"").split(/\s*,\s*/);
if(_54&&_54.length){
_39.forEach(_54.split(/\s*,\s*/),function(_56){
_51+="with("+_56+"){";
_52+="}";
});
}
return new Function(_55,_51+_4f.innerHTML+_52);
},instantiate:function(_57,_58,_59){
_58=_58||{};
_59=_59||{};
var _5a=(_59.scope||_37._scopeName)+"Type",_5b="data-"+(_59.scope||_37._scopeName)+"-",_5c=_5b+"type",_5d=_5b+"mixins";
var _5e=[];
_39.forEach(_57,function(_5f){
var _60=_5a in _58?_58[_5a]:_5f.getAttribute(_5c)||_5f.getAttribute(_5a);
if(_60){
var _61=_5f.getAttribute(_5d),_62=_61?[_60].concat(_61.split(/\s*,\s*/)):[_60];
_5e.push({node:_5f,types:_62});
}
});
return this._instantiate(_5e,_58,_59);
},_instantiate:function(_63,_64,_65){
var _66=_39.map(_63,function(obj){
var _67=obj.ctor||_4a(obj.types);
if(!_67){
throw new Error("Unable to resolve constructor for: '"+obj.types.join()+"'");
}
return this.construct(_67,obj.node,_64,_65,obj.scripts,obj.inherited);
},this);
if(!_64._started&&!_65.noStart){
_39.forEach(_66,function(_68){
if(typeof _68.startup==="function"&&!_68._started){
_68.startup();
}
});
}
return _66;
},construct:function(_69,_6a,_6b,_6c,_6d,_6e){
var _6f=_69&&_69.prototype;
_6c=_6c||{};
var _70={};
if(_6c.defaults){
_38.mixin(_70,_6c.defaults);
}
if(_6e){
_38.mixin(_70,_6e);
}
var _71;
if(has("dom-attributes-explicit")){
_71=_6a.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_71=_39.filter(_6a.attributes,function(a){
return a.specified;
});
}else{
var _72=/^input$|^img$/i.test(_6a.nodeName)?_6a:_6a.cloneNode(false),_73=_72.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_71=_39.map(_73.split(/\s+/),function(_74){
var _75=_74.toLowerCase();
return {name:_74,value:(_6a.nodeName=="LI"&&_74=="value")||_75=="enctype"?_6a.getAttribute(_75):_6a.getAttributeNode(_75).value};
});
}
}
var _76=_6c.scope||_37._scopeName,_77="data-"+_76+"-",_78={};
if(_76!=="dojo"){
_78[_77+"props"]="data-dojo-props";
_78[_77+"type"]="data-dojo-type";
_78[_77+"mixins"]="data-dojo-mixins";
_78[_76+"type"]="dojoType";
_78[_77+"id"]="data-dojo-id";
}
var i=0,_79,_7a=[],_7b,_7c;
while(_79=_71[i++]){
var _7d=_79.name,_7e=_7d.toLowerCase(),_7f=_79.value;
switch(_78[_7e]||_7e){
case "data-dojo-type":
case "dojotype":
case "data-dojo-mixins":
break;
case "data-dojo-props":
_7c=_7f;
break;
case "data-dojo-id":
case "jsid":
_7b=_7f;
break;
case "data-dojo-attach-point":
case "dojoattachpoint":
_70.dojoAttachPoint=_7f;
break;
case "data-dojo-attach-event":
case "dojoattachevent":
_70.dojoAttachEvent=_7f;
break;
case "class":
_70["class"]=_6a.className;
break;
case "style":
_70["style"]=_6a.style&&_6a.style.cssText;
break;
default:
if(!(_7d in _6f)){
var map=_45(_69);
_7d=map[_7e]||_7d;
}
if(_7d in _6f){
switch(typeof _6f[_7d]){
case "string":
_70[_7d]=_7f;
break;
case "number":
_70[_7d]=_7f.length?Number(_7f):NaN;
break;
case "boolean":
_70[_7d]=_7f.toLowerCase()!="false";
break;
case "function":
if(_7f===""||_7f.search(/[^\w\.]+/i)!=-1){
_70[_7d]=new Function(_7f);
}else{
_70[_7d]=_38.getObject(_7f,false)||new Function(_7f);
}
_7a.push(_7d);
break;
default:
var _80=_6f[_7d];
_70[_7d]=(_80&&"length" in _80)?(_7f?_7f.split(/\s*,\s*/):[]):(_80 instanceof Date)?(_7f==""?new Date(""):_7f=="now"?new Date():_40.fromISOString(_7f)):(_80 instanceof _3d)?(_37.baseUrl+_7f):_3e.fromJson(_7f);
}
}else{
_70[_7d]=_7f;
}
}
}
for(var j=0;j<_7a.length;j++){
var _81=_7a[j].toLowerCase();
_6a.removeAttribute(_81);
_6a[_81]=null;
}
if(_7c){
try{
_7c=_3e.fromJson.call(_6c.propsThis,"{"+_7c+"}");
_38.mixin(_70,_7c);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_7c+"'");
}
}
_38.mixin(_70,_6b);
if(!_6d){
_6d=(_69&&(_69._noScript||_6f._noScript)?[]:_42("> script[type^='dojo/']",_6a));
}
var _82=[],_83=[],_84=[],ons=[];
if(_6d){
for(i=0;i<_6d.length;i++){
var _85=_6d[i];
_6a.removeChild(_85);
var _86=(_85.getAttribute(_77+"event")||_85.getAttribute("event")),_87=_85.getAttribute(_77+"prop"),_88=_85.getAttribute(_77+"method"),_89=_85.getAttribute(_77+"advice"),_8a=_85.getAttribute("type"),nf=this._functionFromScript(_85,_77);
if(_86){
if(_8a=="dojo/connect"){
_82.push({method:_86,func:nf});
}else{
if(_8a=="dojo/on"){
ons.push({event:_86,func:nf});
}else{
_70[_86]=nf;
}
}
}else{
if(_8a=="dojo/aspect"){
_82.push({method:_88,advice:_89,func:nf});
}else{
if(_8a=="dojo/watch"){
_84.push({prop:_87,func:nf});
}else{
_83.push(nf);
}
}
}
}
}
var _8b=_69.markupFactory||_6f.markupFactory;
var _8c=_8b?_8b(_70,_6a,_69):new _69(_70,_6a);
if(_7b){
_38.setObject(_7b,_8c);
}
for(i=0;i<_82.length;i++){
_3f[_82[i].advice||"after"](_8c,_82[i].method,_38.hitch(_8c,_82[i].func),true);
}
for(i=0;i<_83.length;i++){
_83[i].call(_8c);
}
for(i=0;i<_84.length;i++){
_8c.watch(_84[i].prop,_84[i].func);
}
for(i=0;i<ons.length;i++){
don(_8c,ons[i].event,ons[i].func);
}
return _8c;
},scan:function(_8d,_8e){
var _8f=[],_90=[],_91={};
var _92=(_8e.scope||_37._scopeName)+"Type",_93="data-"+(_8e.scope||_37._scopeName)+"-",_94=_93+"type",_95=_93+"textdir",_96=_93+"mixins";
var _97=_8d.firstChild;
var _98=_8e.inherited;
if(!_98){
function _99(_9a,_9b){
return (_9a.getAttribute&&_9a.getAttribute(_9b))||(_9a.parentNode&&_99(_9a.parentNode,_9b));
};
_98={dir:_99(_8d,"dir"),lang:_99(_8d,"lang"),textDir:_99(_8d,_95)};
for(var key in _98){
if(!_98[key]){
delete _98[key];
}
}
}
var _9c={inherited:_98};
var _9d;
var _9e;
function _9f(_a0){
if(!_a0.inherited){
_a0.inherited={};
var _a1=_a0.node,_a2=_9f(_a0.parent);
var _a3={dir:_a1.getAttribute("dir")||_a2.dir,lang:_a1.getAttribute("lang")||_a2.lang,textDir:_a1.getAttribute(_95)||_a2.textDir};
for(var key in _a3){
if(_a3[key]){
_a0.inherited[key]=_a3[key];
}
}
}
return _a0.inherited;
};
while(true){
if(!_97){
if(!_9c||!_9c.node){
break;
}
_97=_9c.node.nextSibling;
_9d=_9c.scripts;
_9e=false;
_9c=_9c.parent;
continue;
}
if(_97.nodeType!=1){
_97=_97.nextSibling;
continue;
}
if(_9d&&_97.nodeName.toLowerCase()=="script"){
_a4=_97.getAttribute("type");
if(_a4&&/^dojo\/\w/i.test(_a4)){
_9d.push(_97);
}
_97=_97.nextSibling;
continue;
}
if(_9e){
_97=_97.nextSibling;
continue;
}
var _a4=_97.getAttribute(_94)||_97.getAttribute(_92);
var _a5=_97.firstChild;
if(!_a4&&(!_a5||(_a5.nodeType==3&&!_a5.nextSibling))){
_97=_97.nextSibling;
continue;
}
var _a6;
var _a7=null;
if(_a4){
var _a8=_97.getAttribute(_96),_a9=_a8?[_a4].concat(_a8.split(/\s*,\s*/)):[_a4];
try{
_a7=_4a(_a9);
}
catch(e){
}
if(!_a7){
_39.forEach(_a9,function(t){
if(~t.indexOf("/")&&!_91[t]){
_91[t]=true;
_90[_90.length]=t;
}
});
}
var _aa=_a7&&!_a7.prototype._noScript?[]:null;
_a6={types:_a9,ctor:_a7,parent:_9c,node:_97,scripts:_aa};
_a6.inherited=_9f(_a6);
_8f.push(_a6);
}else{
_a6={node:_97,scripts:_9d,parent:_9c};
}
_97=_a5;
_9d=_aa;
_9e=_a7&&_a7.prototype.stopParser&&!(_8e.template);
_9c=_a6;
}
var d=new _41();
if(_90.length){
if(has("dojo-debug-messages")){
console.warn("WARNING: Modules being Auto-Required: "+_90.join(", "));
}
require(_90,function(){
d.resolve(_39.filter(_8f,function(_ab){
if(!_ab.ctor){
try{
_ab.ctor=_4a(_ab.types);
}
catch(e){
}
}
var _ac=_ab.parent;
while(_ac&&!_ac.types){
_ac=_ac.parent;
}
var _ad=_ab.ctor&&_ab.ctor.prototype;
_ab.instantiateChildren=!(_ad&&_ad.stopParser&&!(_8e.template));
_ab.instantiate=!_ac||(_ac.instantiate&&_ac.instantiateChildren);
return _ab.instantiate;
}));
});
}else{
d.resolve(_8f);
}
return d.promise;
},_require:function(_ae){
var _af=_3e.fromJson("{"+_ae.innerHTML+"}"),_b0=[],_b1=[],d=new _41();
for(var _b2 in _af){
_b0.push(_b2);
_b1.push(_af[_b2]);
}
require(_b1,function(){
for(var i=0;i<_b0.length;i++){
_38.setObject(_b0[i],arguments[i]);
}
d.resolve(arguments);
});
return d.promise;
},_scanAmd:function(_b3){
var _b4=new _41(),_b5=_b4.promise;
_b4.resolve(true);
var _b6=this;
_42("script[type='dojo/require']",_b3).forEach(function(_b7){
_b5=_b5.then(function(){
return _b6._require(_b7);
});
_b7.parentNode.removeChild(_b7);
});
return _b5;
},parse:function(_b8,_b9){
var _ba;
if(!_b9&&_b8&&_b8.rootNode){
_b9=_b8;
_ba=_b9.rootNode;
}else{
if(_b8&&_38.isObject(_b8)&&!("nodeType" in _b8)){
_b9=_b8;
}else{
_ba=_b8;
}
}
_ba=_ba?_3b.byId(_ba):_3c.body();
_b9=_b9||{};
var _bb=_b9.template?{template:true}:{},_bc=[],_bd=this;
var p=this._scanAmd(_ba,_b9).then(function(){
return _bd.scan(_ba,_b9);
}).then(function(_be){
return _bc=_bc.concat(_bd._instantiate(_be,_bb,_b9));
}).otherwise(function(e){
console.error("dojo/parser::parse() error",e);
throw e;
});
_38.mixin(_bc,p);
return _bc;
}};
if(1){
_37.parser=_4e;
}
if(_3a.parseOnLoad){
_43(100,_4e,"parse");
}
return _4e;
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct"],function(_bf,_c0,_c1){
return _c0("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_c2,_c3){
var _c4=this.containerNode;
if(_c3&&typeof _c3=="number"){
var _c5=this.getChildren();
if(_c5&&_c5.length>=_c3){
_c4=_c5[_c3-1].domNode;
_c3="after";
}
}
_c1.place(_c2.domNode,_c4,_c3);
if(this._started&&!_c2._started){
_c2.startup();
}
},removeChild:function(_c6){
if(typeof _c6=="number"){
_c6=this.getChildren()[_c6];
}
if(_c6){
var _c7=_c6.domNode;
if(_c7&&_c7.parentNode){
_c7.parentNode.removeChild(_c7);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_c8,dir){
var _c9=this.getChildren(),idx=_bf.indexOf(this.getChildren(),_c8);
return _c9[idx+dir];
},getIndexOfChild:function(_ca){
return _bf.indexOf(this.getChildren(),_ca);
}});
});
},"dijit/a11yclick":function(){
define("dijit/a11yclick",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window"],function(on,_cb,_cc,_cd,has,_ce,win){
var _cf=null;
if(has("dom-addeventlistener")){
win.doc.addEventListener("keydown",function(evt){
_cf=evt.target;
},true);
}else{
(function(){
var _d0=function(evt){
_cf=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_d0);
_ce.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_d0);
});
})();
}
function _d1(e){
return (e.keyCode===_cc.ENTER||e.keyCode===_cc.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
return function(_d2,_d3){
if(/input|button/i.test(_d2.nodeName)){
return on(_d2,"click",_d3);
}else{
var _d4=[on(_d2,"keydown",function(e){
if(_d1(e)){
_cf=e.target;
e.preventDefault();
}
}),on(_d2,"keyup",function(e){
if(_d1(e)&&e.target==_cf){
_cf=null;
on.emit(e.target,"click",{cancelable:true,bubbles:true});
}
}),on(_d2,"click",function(e){
_d3.call(this,e);
})];
if(has("touch")){
var _d5;
_d4.push(on(_d2,"touchend",function(e){
var _d6=e.target;
_d5=setTimeout(function(){
_d5=null;
on.emit(_d6,"click",{cancelable:true,bubbles:true});
},600);
}),on(_d2,"click",function(e){
if(_d5){
clearTimeout(_d5);
}
}));
}
return {remove:function(){
_cb.forEach(_d4,function(h){
h.remove();
});
if(_d5){
clearTimeout(_d5);
_d5=null;
}
}};
}
};
return ret;
});
},"dijit/_base/scroll":function(){
define("dijit/_base/scroll",["dojo/window","../main"],function(_d7,_d8){
_d8.scrollIntoView=function(_d9,pos){
_d7.scrollIntoView(_d9,pos);
};
});
},"dijit/layout/_LayoutWidget":function(){
define("dijit/layout/_LayoutWidget",["dojo/_base/lang","../_Widget","../_Container","../_Contained","../Viewport","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_da,_db,_dc,_dd,_de,_df,_e0,_e1,_e2){
return _df("dijit.layout._LayoutWidget",[_db,_dc,_dd],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_e0.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _e3=this.getParent&&this.getParent();
if(!(_e3&&_e3.isLayoutContainer)){
this.resize();
this.own(_de.on("resize",_da.hitch(this,"resize")));
}
},resize:function(_e4,_e5){
var _e6=this.domNode;
if(_e4){
_e1.setMarginBox(_e6,_e4);
}
var mb=_e5||{};
_da.mixin(mb,_e4||{});
if(!("h" in mb)||!("w" in mb)){
mb=_da.mixin(_e1.getMarginBox(_e6),mb);
}
var cs=_e2.getComputedStyle(_e6);
var me=_e1.getMarginExtents(_e6,cs);
var be=_e1.getBorderExtents(_e6,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_e1.getPadExtents(_e6,cs);
this._contentBox={l:_e2.toPixelValue(_e6,cs.paddingLeft),t:_e2.toPixelValue(_e6,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_e7){
var cls=this.baseClass+"-child "+(_e7.baseClass?this.baseClass+"-"+_e7.baseClass:"");
_e0.add(_e7.domNode,cls);
},addChild:function(_e8,_e9){
this.inherited(arguments);
if(this._started){
this._setupChild(_e8);
}
},removeChild:function(_ea){
var cls=this.baseClass+"-child"+(_ea.baseClass?" "+this.baseClass+"-"+_ea.baseClass:"");
_e0.remove(_ea.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/_base":function(){
define("dijit/_base",["./main","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_eb){
return _eb._base;
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/sniff","dojo/window","../a11y"],function(_ec,_ed,_ee,_ef,_f0,_f1,has,_f2,_f3){
return _ed("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_f4){
this._set("disabled",_f4);
_ee.set(this.focusNode,"disabled",_f4);
if(this.valueNode){
_ee.set(this.valueNode,"disabled",_f4);
}
this.focusNode.setAttribute("aria-disabled",_f4?"true":"false");
if(_f4){
this._set("hovering",false);
this._set("active",false);
var _f5="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_ec.forEach(_f0.isArray(_f5)?_f5:[_f5],function(_f6){
var _f7=this[_f6];
if(has("webkit")||_f3.hasDefaultTabStop(_f7)){
_f7.setAttribute("tabIndex","-1");
}else{
_f7.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _f8=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_f9);
this.disconnect(_f8);
});
var _f9=this.connect(this.ownerDocumentBody,"onmouseup",function(){
this.disconnect(_f9);
this.disconnect(_f8);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_f2.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_ef.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(_fa,_fb){
if(typeof _fa=="number"&&typeof _fb=="number"){
return (isNaN(_fa)&&isNaN(_fb))?0:_fa-_fb;
}else{
if(_fa>_fb){
return 1;
}else{
if(_fa<_fb){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_fc,_fd){
if(this._lastValueReported==undefined&&(_fd===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_fc;
}
this._pendingOnChange=this._pendingOnChange||(typeof _fc!=typeof this._lastValueReported)||(this.compare(_fc,this._lastValueReported)!=0);
if((this.intermediateChanges||_fd||_fd===undefined)&&this._pendingOnChange){
this._lastValueReported=_fc;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_fc);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require","./main","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window"],function(_fe,_ff,_100,_101,_102,lang,on,has,win){
var _103=new function(){
var _104=[];
this.pop=function(){
var _105;
if(_104.length){
_105=_104.pop();
_105.style.display="";
}else{
if(has("ie")<9){
var burl=_100["dojoBlankHtmlUrl"]||_fe.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_105=win.doc.createElement(html);
}else{
_105=_101.create("iframe");
_105.src="javascript:\"\"";
_105.className="dijitBackgroundIframe";
_105.setAttribute("role","presentation");
_102.set(_105,"opacity",0.1);
}
_105.tabIndex=-1;
}
return _105;
};
this.push=function(_106){
_106.style.display="none";
_104.push(_106);
};
}();
_ff.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("ie")||has("mozilla")){
var _107=(this.iframe=_103.pop());
node.appendChild(_107);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,function(){
this.resize(node);
}));
}else{
_102.set(_107,{width:"100%",height:"100%"});
}
}
};
lang.extend(_ff.BackgroundIframe,{resize:function(node){
if(this.iframe){
_102.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_103.push(this.iframe);
delete this.iframe;
}
}});
return _ff.BackgroundIframe;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/sniff","./_FormWidgetMixin"],function(_108,_109,keys,has,_10a){
return _108("dijit.form._FormValueMixin",_10a,{readOnly:false,_setReadOnlyAttr:function(_10b){
_109.set(this.focusNode,"readOnly",_10b);
this.focusNode.setAttribute("aria-readonly",_10b);
this._set("readOnly",_10b);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_10c,_10d){
this._handleOnChange(_10c,_10d);
},_handleOnChange:function(_10e,_10f){
this._set("value",_10e);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
if(has("ie")<9||(has("ie")&&has("quirks"))){
e.preventDefault();
var node=e.srcElement,te=node.ownerDocument.createEventObject();
te.keyCode=keys.ESCAPE;
te.shiftKey=e.shiftKey;
node.fireEvent("onkeypress",te);
}
}
}});
});
},"dojo/Stateful":function(){
define(["./_base/declare","./_base/lang","./_base/array","dojo/when"],function(_110,lang,_111,when){
return _110("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
return (apn[name]={s:"_"+name+"Setter",g:"_"+name+"Getter"});
},postscript:function(_112){
if(_112){
this.set(_112);
}
},_get:function(name,_113){
return typeof this[_113.g]==="function"?this[_113.g]():this[name];
},get:function(name){
return this._get(name,this._getAttrNames(name));
},set:function(name,_114){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _115=this._getAttrNames(name),_116=this._get(name,_115),_117=this[_115.s],_118;
if(typeof _117==="function"){
_118=_117.apply(this,Array.prototype.slice.call(arguments,1));
}else{
this[name]=_114;
}
if(this._watchCallbacks){
var self=this;
when(_118,function(){
self._watchCallbacks(name,_116,_114);
});
}
return this;
},_changeAttrValue:function(name,_119){
var _11a=this.get(name);
this[name]=_119;
if(this._watchCallbacks){
this._watchCallbacks(name,_11a,_119);
}
return this;
},watch:function(name,_11b){
var _11c=this._watchCallbacks;
if(!_11c){
var self=this;
_11c=this._watchCallbacks=function(name,_11d,_11e,_11f){
var _120=function(_121){
if(_121){
_121=_121.slice();
for(var i=0,l=_121.length;i<l;i++){
_121[i].call(self,name,_11d,_11e);
}
}
};
_120(_11c["_"+name]);
if(!_11f){
_120(_11c["*"]);
}
};
}
if(!_11b&&typeof name==="function"){
_11b=name;
name="*";
}else{
name="_"+name;
}
var _122=_11c[name];
if(typeof _122!=="object"){
_122=_11c[name]=[];
}
_122.push(_11b);
var _123={};
_123.unwatch=_123.remove=function(){
var _124=_111.indexOf(_122,_11b);
if(_124>-1){
_122.splice(_124,1);
}
};
return _123;
}});
});
},"dojo/touch":function(){
define(["./_base/kernel","./_base/lang","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(dojo,lang,_125,dom,on,has,_126,_127,win){
var _128=has("touch");
var _129,_12a;
if(_128){
_127(function(){
_12a=win.body();
win.doc.addEventListener("touchstart",function(evt){
var _12b=_12a;
_12a=evt.target;
on.emit(_12b,"dojotouchout",{target:_12b,relatedTarget:_12a,bubbles:true});
on.emit(_12a,"dojotouchover",{target:_12a,relatedTarget:_12b,bubbles:true});
},true);
on(win.doc,"touchmove",function(evt){
var _12c=win.doc.elementFromPoint(evt.pageX-win.global.pageXOffset,evt.pageY-win.global.pageYOffset);
if(_12c&&_12a!==_12c){
on.emit(_12a,"dojotouchout",{target:_12a,relatedTarget:_12c,bubbles:true});
on.emit(_12c,"dojotouchover",{target:_12c,relatedTarget:_12a,bubbles:true});
_12a=_12c;
}
});
});
_129=function(node,_12d){
return on(win.doc,"touchmove",function(evt){
if(node===win.doc||dom.isDescendant(_12a,node)){
_12d.call(this,lang.mixin({},evt,{target:_12a}));
}
});
};
}
function _12e(type){
return function(node,_12f){
return on(node,type,_12f);
};
};
var _130={press:_12e(_128?"touchstart":"mousedown"),move:_128?_129:_12e("mousemove"),release:_12e(_128?"touchend":"mouseup"),cancel:_128?_12e("touchcancel"):_126.leave,over:_12e(_128?"dojotouchover":"mouseover"),out:_12e(_128?"dojotouchout":"mouseout"),enter:_126._eventHandler(_128?"dojotouchover":"mouseover"),leave:_126._eventHandler(_128?"dojotouchout":"mouseout")};
1&&(dojo.touch=_130);
return _130;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/window","./registry"],function(_131,_132,dom,_133,lang,on,_134,win,_135){
var _136=_132("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_131.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","_opened"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode,this.baseClass);
this._setStateClass();
},_cssMouseEvent:function(_137){
if(!this.disabled){
switch(_137.type){
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchstart":
this._set("active",true);
break;
case "mouseup":
case "touchend":
this._set("active",false);
break;
}
}
},_setStateClass:function(){
var _138=this.baseClass.split(" ");
function _139(_13a){
_138=_138.concat(_131.map(_138,function(c){
return c+_13a;
}),"dijit"+_13a);
};
if(!this.isLeftToRight()){
_139("Rtl");
}
var _13b=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_139(_13b);
}
if(this.state){
_139(this.state);
}
if(this.selected){
_139("Selected");
}
if(this._opened){
_139("Opened");
}
if(this.disabled){
_139("Disabled");
}else{
if(this.readOnly){
_139("ReadOnly");
}else{
if(this.active){
_139("Active");
}else{
if(this.hovering){
_139("Hover");
}
}
}
}
if(this.focused){
_139("Focused");
}
var tn=this.stateNode||this.domNode,_13c={};
_131.forEach(tn.className.split(" "),function(c){
_13c[c]=true;
});
if("_stateClasses" in this){
_131.forEach(this._stateClasses,function(c){
delete _13c[c];
});
}
_131.forEach(_138,function(c){
_13c[c]=true;
});
var _13d=[];
for(var c in _13c){
_13d.push(c);
}
tn.className=_13d.join(" ");
this._stateClasses=_138;
},_subnodeCssMouseEvent:function(node,_13e,evt){
if(this.disabled||this.readOnly){
return;
}
function _13f(_140){
_133.toggle(node,_13e+"Hover",_140);
};
function _141(_142){
_133.toggle(node,_13e+"Active",_142);
};
function _143(_144){
_133.toggle(node,_13e+"Focused",_144);
};
switch(evt.type){
case "mouseover":
_13f(true);
break;
case "mouseout":
_13f(false);
_141(false);
break;
case "mousedown":
case "touchstart":
_141(true);
break;
case "mouseup":
case "touchend":
_141(false);
break;
case "focus":
case "focusin":
_143(true);
break;
case "blur":
case "focusout":
_143(false);
break;
}
},_trackMouseState:function(node,_145){
node._cssState=_145;
}});
_134(function(){
function _146(evt){
if(!dom.isDescendant(evt.relatedTarget,evt.target)){
for(var node=evt.target;node&&node!=evt.relatedTarget;node=node.parentNode){
if(node._cssState){
var _147=_135.getEnclosingWidget(node);
if(_147){
if(node==_147.domNode){
_147._cssMouseEvent(evt);
}else{
_147._subnodeCssMouseEvent(node,node._cssState,evt);
}
}
}
}
}
};
function _148(evt){
evt.target=evt.srcElement;
_146(evt);
};
var body=win.body();
_131.forEach(["mouseover","mouseout","mousedown","touchstart","mouseup","touchend"],function(type){
if(body.addEventListener){
body.addEventListener(type,_146,true);
}else{
body.attachEvent("on"+type,_148);
}
});
on(body,"focusin, focusout",function(evt){
var node=evt.target;
if(node._cssState&&!node.getAttribute("widgetId")){
var _149=_135.getEnclosingWidget(node);
_149._subnodeCssMouseEvent(node,node._cssState,evt);
}
});
});
return _136;
});
},"dojo/_base/url":function(){
define(["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_14a=function(){
var n=null,_14b=arguments,uri=[_14b[0]];
for(var i=1;i<_14b.length;i++){
if(!_14b[i]){
continue;
}
var _14c=new _14a(_14b[i]+""),_14d=new _14a(uri[0]+"");
if(_14c.path==""&&!_14c.scheme&&!_14c.authority&&!_14c.query){
if(_14c.fragment!=n){
_14d.fragment=_14c.fragment;
}
_14c=_14d;
}else{
if(!_14c.scheme){
_14c.scheme=_14d.scheme;
if(!_14c.authority){
_14c.authority=_14d.authority;
if(_14c.path.charAt(0)!="/"){
var path=_14d.path.substring(0,_14d.path.lastIndexOf("/")+1)+_14c.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==(segs.length-1)){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_14c.path=segs.join("/");
}
}
}
}
uri=[];
if(_14c.scheme){
uri.push(_14c.scheme,":");
}
if(_14c.authority){
uri.push("//",_14c.authority);
}
uri.push(_14c.path);
if(_14c.query){
uri.push("?",_14c.query);
}
if(_14c.fragment){
uri.push("#",_14c.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_14a.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_14a;
});
},"dojo/hccss":function(){
define(["require","./_base/config","./dom-class","./dom-construct","./dom-style","./has","./ready","./_base/window"],function(_14e,_14f,_150,_151,_152,has,_153,win){
has.add("highcontrast",function(){
var div=win.doc.createElement("div");
div.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_14f.blankGif||_14e.toUrl("./resources/blank.gif"))+");";
win.body().appendChild(div);
var cs=_152.getComputedStyle(div),_154=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_154&&(_154=="none"||_154=="url(invalid-url:)"));
_151.destroy(div);
return hc;
});
_153(90,function(){
if(has("highcontrast")){
_150.add(win.body(),"dj_a11y");
}
});
return has;
});
},"dojo/string":function(){
define(["./_base/kernel","./_base/lang"],function(_155,lang){
var _156={};
lang.setObject("dojo.string",_156);
_156.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
_156.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_156.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_156.substitute=function(_157,map,_158,_159){
_159=_159||_155.global;
_158=_158?lang.hitch(_159,_158):function(v){
return v;
};
return _157.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_15a,key,_15b){
var _15c=lang.getObject(key,false,map);
if(_15b){
_15c=lang.getObject(_15b,false,_159).call(_159,_15c,key);
}
return _158(_15c,key).toString();
});
};
_156.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _156;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/sniff","./_FormWidget","./_FormValueMixin"],function(_15d,has,_15e,_15f){
return _15d("dijit.form._FormValueWidget",[_15e,_15f],{_layoutHackIE7:function(){
if(has("ie")==7){
var _160=this.domNode;
var _161=_160.parentNode;
var _162=_160.firstChild||_160;
var _163=_162.style.filter;
var _164=this;
while(_161&&_161.clientHeight==0){
(function ping(){
var _165=_164.connect(_161,"onscroll",function(){
_164.disconnect(_165);
_162.style.filter=(new Date()).getMilliseconds();
_164.defer(function(){
_162.style.filter=_163;
});
});
})();
_161=_161.parentNode;
}
}
}});
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/sniff","dojo/_base/unload","dojo/_base/window","./main"],function(_166,has,_167,win,_168){
var _169={},hash={};
var _16a={length:0,add:function(_16b){
if(hash[_16b.id]){
throw new Error("Tried to register widget with id=="+_16b.id+" but that id is already registered");
}
hash[_16b.id]=_16b;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_16c){
var id;
do{
id=_16c+"_"+(_16c in _169?++_169[_16c]:_169[_16c]=0);
}while(hash[id]);
return _168._scopeName=="dijit"?id:_168._scopeName+"_"+id;
},findWidgets:function(root,_16d){
var _16e=[];
function _16f(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _170=node.getAttribute("widgetId");
if(_170){
var _171=hash[_170];
if(_171){
_16e.push(_171);
}
}else{
if(node!==_16d){
_16f(node);
}
}
}
}
};
_16f(root);
return _16e;
},_destroyAll:function(){
_168._curFocus=null;
_168._prevFocus=null;
_168._activeStack=[];
_166.forEach(_16a.findWidgets(win.body()),function(_172){
if(!_172._destroyed){
if(_172.destroyRecursive){
_172.destroyRecursive();
}else{
if(_172.destroy){
_172.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_168.registry=_16a;
return _16a;
});
},"dijit/Destroyable":function(){
define("dijit/Destroyable",["dojo/_base/array","dojo/aspect","dojo/_base/declare"],function(_173,_174,_175){
return _175("dijit.Destroyable",null,{destroy:function(_176){
this._destroyed=true;
},own:function(){
_173.forEach(arguments,function(_177){
var _178="destroyRecursive" in _177?"destroyRecursive":"destroy" in _177?"destroy":"remove";
_177._odh=_174.before(this,"destroy",function(_179){
_177._odh.remove();
_177[_178](_179);
});
_174.after(_177,_178,function(){
_177._odh.remove();
});
},this);
return arguments;
}});
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","dojo/_base/lang","../registry","../main"],function(_17a,_17b,lang,_17c,_17d){
var _17e={};
_17a.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_17e[name]=_17c[name];
});
lang.mixin(_17e,{defaultDuration:_17b["defaultDuration"]||200});
lang.mixin(_17d,_17e);
return _17d;
});
},"dijit/_base/place":function(){
define("dijit/_base/place",["dojo/_base/array","dojo/_base/lang","dojo/window","../place","../main"],function(_17f,lang,_180,_181,_182){
var _183={};
_183.getViewport=function(){
return _180.getBox();
};
_183.placeOnScreen=_181.at;
_183.placeOnScreenAroundElement=function(node,_184,_185,_186){
var _187;
if(lang.isArray(_185)){
_187=_185;
}else{
_187=[];
for(var key in _185){
_187.push({aroundCorner:key,corner:_185[key]});
}
}
return _181.around(node,_184,_187,true,_186);
};
_183.placeOnScreenAroundNode=_183.placeOnScreenAroundElement;
_183.placeOnScreenAroundRectangle=_183.placeOnScreenAroundElement;
_183.getPopupAroundAlignment=function(_188,_189){
var _18a={};
_17f.forEach(_188,function(pos){
var ltr=_189;
switch(pos){
case "after":
_18a[_189?"BR":"BL"]=_189?"BL":"BR";
break;
case "before":
_18a[_189?"BL":"BR"]=_189?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_18a[ltr?"BL":"BR"]=ltr?"TL":"TR";
_18a[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_18a[ltr?"TL":"TR"]=ltr?"BL":"BR";
_18a[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _18a;
};
lang.mixin(_182,_183);
return _182;
});
},"dijit/WidgetSet":function(){
define("dijit/WidgetSet",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","./registry"],function(_18b,_18c,_18d,_18e){
var _18f=_18c("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_190){
if(this._hash[_190.id]){
throw new Error("Tried to register widget with id=="+_190.id+" but that id is already registered");
}
this._hash[_190.id]=_190;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_191){
_191=_191||_18d.global;
var i=0,id;
for(id in this._hash){
func.call(_191,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_192,_193){
_193=_193||_18d.global;
var res=new _18f(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_192.call(_193,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _18f(),id,_194;
for(id in this._hash){
_194=this._hash[id];
if(_194.declaredClass==cls){
res.add(_194);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_195){
return _18b.map(this.toArray(),func,_195);
},every:function(func,_196){
_196=_196||_18d.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_196,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_197){
_197=_197||_18d.global;
var x=0,i;
for(i in this._hash){
if(func.call(_197,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_18b.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_18e[func]=_18f.prototype[func];
});
return _18f;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/sniff","./main"],function(_198,_199,_19a,dom,_19b,_19c,has,_19d){
var _19e=(_19d._isElementShown=function(elem){
var s=_19c.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_19b.get(elem,"type")!="hidden");
});
_19d.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _19b.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _19f=elem.contentDocument;
if("designMode" in _19f&&_19f.designMode=="on"){
return true;
}
body=_19f.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
};
var _1a0=(_19d.isTabNavigable=function(elem){
if(_19b.get(elem,"disabled")){
return false;
}else{
if(_19b.has(elem,"tabIndex")){
return _19b.get(elem,"tabIndex")>=0;
}else{
return _19d.hasDefaultTabStop(elem);
}
}
});
_19d._getTabNavigable=function(root){
var _1a1,last,_1a2,_1a3,_1a4,_1a5,_1a6={};
function _1a7(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _1a8=function(_1a9){
for(var _1aa=_1a9.firstChild;_1aa;_1aa=_1aa.nextSibling){
if(_1aa.nodeType!=1||(has("ie")&&_1aa.scopeName!=="HTML")||!_19e(_1aa)){
continue;
}
if(_1a0(_1aa)){
var _1ab=+_19b.get(_1aa,"tabIndex");
if(!_19b.has(_1aa,"tabIndex")||_1ab==0){
if(!_1a1){
_1a1=_1aa;
}
last=_1aa;
}else{
if(_1ab>0){
if(!_1a2||_1ab<_1a3){
_1a3=_1ab;
_1a2=_1aa;
}
if(!_1a4||_1ab>=_1a5){
_1a5=_1ab;
_1a4=_1aa;
}
}
}
var rn=_1a7(_1aa);
if(_19b.get(_1aa,"checked")&&rn){
_1a6[rn]=_1aa;
}
}
if(_1aa.nodeName.toUpperCase()!="SELECT"){
_1a8(_1aa);
}
}
};
if(_19e(root)){
_1a8(root);
}
function rs(node){
return _1a6[_1a7(node)]||node;
};
return {first:rs(_1a1),last:rs(last),lowest:rs(_1a2),highest:rs(_1a4)};
};
_19d.getFirstInTabbingOrder=function(root,doc){
var _1ac=_19d._getTabNavigable(dom.byId(root,doc));
return _1ac.lowest?_1ac.lowest:_1ac.first;
};
_19d.getLastInTabbingOrder=function(root,doc){
var _1ad=_19d._getTabNavigable(dom.byId(root,doc));
return _1ad.last?_1ad.last:_1ad.highest;
};
return {hasDefaultTabStop:_19d.hasDefaultTabStop,isTabNavigable:_19d.isTabNavigable,_getTabNavigable:_19d._getTabNavigable,getFirstInTabbingOrder:_19d.getFirstInTabbingOrder,getLastInTabbingOrder:_19d.getLastInTabbingOrder};
});
},"dijit/typematic":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/sniff","./main"],function(_1ae,_1af,_1b0,_1b1,lang,on,has,_1b2){
var _1b3=(_1b2.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_1b4,node,_1b5,obj,_1b6,_1b7,_1b8){
if(obj!=this._obj){
this.stop();
this._initialDelay=_1b7||500;
this._subsequentDelay=_1b6||0.9;
this._minDelay=_1b8||10;
this._obj=obj;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_1b4,_1b5);
this._evt={faux:true};
for(var attr in evt){
if(attr!="layerX"&&attr!="layerY"){
var v=evt[attr];
if(typeof v!="function"&&typeof v!="undefined"){
this._evt[attr]=v;
}
}
}
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_1b9,_1ba,_1bb,_1bc,_1bd,_1be){
if(_1b9.keyCode){
_1b9.charOrCode=_1b9.keyCode;
_1b1.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_1b9.charCode){
_1b9.charOrCode=String.fromCharCode(_1b9.charCode);
_1b1.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _1bf=[on(node,_1af._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_1b9.charOrCode&&(_1b9.ctrlKey===undefined||_1b9.ctrlKey==evt.ctrlKey)&&(_1b9.altKey===undefined||_1b9.altKey==evt.altKey)&&(_1b9.metaKey===undefined||_1b9.metaKey==(evt.metaKey||false))&&(_1b9.shiftKey===undefined||_1b9.shiftKey==evt.shiftKey)){
_1b0.stop(evt);
_1b3.trigger(evt,_1ba,node,_1bb,_1b9,_1bc,_1bd,_1be);
}else{
if(_1b3._obj==_1b9){
_1b3.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_1b3._obj==_1b9){
_1b3.stop();
}
}))];
return {remove:function(){
_1ae.forEach(_1bf,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_1c0,_1c1,_1c2,_1c3,_1c4){
var _1c5=[on(node,"mousedown",lang.hitch(this,function(evt){
evt.preventDefault();
_1b3.trigger(evt,_1c0,node,_1c1,node,_1c2,_1c3,_1c4);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_1b3.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_1b3.stop();
})),on(node,"dblclick",lang.hitch(this,function(evt){
evt.preventDefault();
if(has("ie")<9){
_1b3.trigger(evt,_1c0,node,_1c1,node,_1c2,_1c3,_1c4);
setTimeout(lang.hitch(this,_1b3.stop),50);
}
}))];
return {remove:function(){
_1ae.forEach(_1c5,function(h){
h.remove();
});
}};
},addListener:function(_1c6,_1c7,_1c8,_1c9,_1ca,_1cb,_1cc,_1cd){
var _1ce=[this.addKeyListener(_1c7,_1c8,_1c9,_1ca,_1cb,_1cc,_1cd),this.addMouseListener(_1c6,_1c9,_1ca,_1cb,_1cc,_1cd)];
return {remove:function(){
_1ae.forEach(_1ce,function(h){
h.remove();
});
}};
}});
return _1b3;
});
},"dijit/_base/focus":function(){
define("dijit/_base/focus",["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus","../main"],function(_1cf,dom,lang,_1d0,win,_1d1,_1d2){
var _1d3={_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _1d2.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=win.doc.selection,cf=_1d1.curNode;
if(win.global.getSelection){
sel=win.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_1d4){
var _1d5=win.doc,mark=_1d4.mark;
if(mark){
if(win.global.getSelection){
var sel=win.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var n=mark.node;
n.selectionStart=mark.start;
n.selectionEnd=mark.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_1d5.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=_1d5.body.createControlRange();
_1cf.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_1d5.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_1d6){
var node=!_1d1.curNode||(menu&&dom.isDescendant(_1d1.curNode,menu.domNode))?_1d2._prevFocus:_1d1.curNode;
return {node:node,bookmark:node&&(node==_1d1.curNode)&&win.withGlobal(_1d6||win.global,_1d2.getBookmark),openedForWindow:_1d6};
},_activeStack:[],registerIframe:function(_1d7){
return _1d1.registerIframe(_1d7);
},unregisterIframe:function(_1d8){
_1d8&&_1d8.remove();
},registerWin:function(_1d9,_1da){
return _1d1.registerWin(_1d9,_1da);
},unregisterWin:function(_1db){
_1db&&_1db.remove();
}};
_1d1.focus=function(_1dc){
if(!_1dc){
return;
}
var node="node" in _1dc?_1dc.node:_1dc,_1dd=_1dc.bookmark,_1de=_1dc.openedForWindow,_1df=_1dd?_1dd.isCollapsed:false;
if(node){
var _1e0=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_1e0&&_1e0.focus){
try{
_1e0.focus();
}
catch(e){
}
}
_1d1._onFocusNode(node);
}
if(_1dd&&win.withGlobal(_1de||win.global,_1d2.isCollapsed)&&!_1df){
if(_1de){
_1de.focus();
}
try{
win.withGlobal(_1de||win.global,_1d2.moveToBookmark,null,[_1dd]);
}
catch(e2){
}
}
};
_1d1.watch("curNode",function(name,_1e1,_1e2){
_1d2._curFocus=_1e2;
_1d2._prevFocus=_1e1;
if(_1e2){
_1d0.publish("focusNode",_1e2);
}
});
_1d1.watch("activeStack",function(name,_1e3,_1e4){
_1d2._activeStack=_1e4;
});
_1d1.on("widget-blur",function(_1e5,by){
_1d0.publish("widgetBlur",_1e5,by);
});
_1d1.on("widget-focus",function(_1e6,by){
_1d0.publish("widgetFocus",_1e6,by);
});
lang.mixin(_1d2,_1d3);
return _1d2;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window","./main"],function(_1e7,_1e8,_1e9,_1ea,win,_1eb,_1ec){
function _1ed(node,_1ee,_1ef,_1f0){
var view=_1eb.getBox(node.ownerDocument);
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body(node.ownerDocument).appendChild(node);
}
var best=null;
_1e7.some(_1ee,function(_1f1){
var _1f2=_1f1.corner;
var pos=_1f1.pos;
var _1f3=0;
var _1f4={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_1f2.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_1f2.charAt(0)]};
var s=node.style;
s.left=s.right="auto";
if(_1ef){
var res=_1ef(node,_1f1.aroundCorner,_1f2,_1f4,_1f0);
_1f3=typeof res=="undefined"?0:res;
}
var _1f5=node.style;
var _1f6=_1f5.display;
var _1f7=_1f5.visibility;
if(_1f5.display=="none"){
_1f5.visibility="hidden";
_1f5.display="";
}
var bb=_1e8.position(node);
_1f5.display=_1f6;
_1f5.visibility=_1f7;
var _1f8={"L":pos.x,"R":pos.x-bb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(bb.w>>1))-bb.w)}[_1f2.charAt(1)],_1f9={"T":pos.y,"B":pos.y-bb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(bb.h>>1))-bb.h)}[_1f2.charAt(0)],_1fa=Math.max(view.l,_1f8),_1fb=Math.max(view.t,_1f9),endX=Math.min(view.l+view.w,_1f8+bb.w),endY=Math.min(view.t+view.h,_1f9+bb.h),_1fc=endX-_1fa,_1fd=endY-_1fb;
_1f3+=(bb.w-_1fc)+(bb.h-_1fd);
if(best==null||_1f3<best.overflow){
best={corner:_1f2,aroundCorner:_1f1.aroundCorner,x:_1fa,y:_1fb,w:_1fc,h:_1fd,overflow:_1f3,spaceAvailable:_1f4};
}
return !_1f3;
});
if(best.overflow&&_1ef){
_1ef(node,best.aroundCorner,best.corner,best.spaceAvailable,_1f0);
}
var l=_1e8.isBodyLtr(node.ownerDocument),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
var _1fe={at:function(node,pos,_1ff,_200){
var _201=_1e7.map(_1ff,function(_202){
var c={corner:_202,pos:{x:pos.x,y:pos.y}};
if(_200){
c.pos.x+=_202.charAt(1)=="L"?_200.x:-_200.x;
c.pos.y+=_202.charAt(0)=="T"?_200.y:-_200.y;
}
return c;
});
return _1ed(node,_201);
},around:function(node,_203,_204,_205,_206){
var _207=(typeof _203=="string"||"offsetWidth" in _203)?_1e8.position(_203,true):_203;
if(_203.parentNode){
var _208=_1e9.getComputedStyle(_203).position=="absolute";
var _209=_203.parentNode;
while(_209&&_209.nodeType==1&&_209.nodeName!="BODY"){
var _20a=_1e8.position(_209,true),pcs=_1e9.getComputedStyle(_209);
if(/relative|absolute/.test(pcs.position)){
_208=false;
}
if(!_208&&/hidden|auto|scroll/.test(pcs.overflow)){
var _20b=Math.min(_207.y+_207.h,_20a.y+_20a.h);
var _20c=Math.min(_207.x+_207.w,_20a.x+_20a.w);
_207.x=Math.max(_207.x,_20a.x);
_207.y=Math.max(_207.y,_20a.y);
_207.h=_20b-_207.y;
_207.w=_20c-_207.x;
}
if(pcs.position=="absolute"){
_208=true;
}
_209=_209.parentNode;
}
}
var x=_207.x,y=_207.y,_20d="w" in _207?_207.w:(_207.w=_207.width),_20e="h" in _207?_207.h:(_1ea.deprecated("place.around: dijit/place.__Rectangle: { x:"+x+", y:"+y+", height:"+_207.height+", width:"+_20d+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_207.height+", w:"+_20d+" }","","2.0"),_207.h=_207.height);
var _20f=[];
function push(_210,_211){
_20f.push({aroundCorner:_210,corner:_211,pos:{x:{"L":x,"R":x+_20d,"M":x+(_20d>>1)}[_210.charAt(1)],y:{"T":y,"B":y+_20e,"M":y+(_20e>>1)}[_210.charAt(0)]}});
};
_1e7.forEach(_204,function(pos){
var ltr=_205;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _212=_1ed(node,_20f,_206,{w:_20d,h:_20e});
_212.aroundNodePos=_207;
return _212;
}};
return _1ec.place=_1fe;
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_213,_214,_215,_216,has,_217,lang,_218,_219,_21a,_21b,_21c,_21d){
function _21e(){
};
function _21f(_220){
return function(obj,_221,_222,_223){
if(obj&&typeof _221=="string"&&obj[_221]==_21e){
return obj.on(_221.substring(2).toLowerCase(),lang.hitch(_222,_223));
}
return _220.apply(_215,arguments);
};
};
_213.around(_215,"connect",_21f);
if(_217.connect){
_213.around(_217,"connect",_21f);
}
var _224=_216("dijit._Widget",[_21b,_21c,_21d],{onClick:_21e,onDblClick:_21e,onKeyDown:_21e,onKeyPress:_21e,onKeyUp:_21e,onMouseDown:_21e,onMouseMove:_21e,onMouseOut:_21e,onMouseOver:_21e,onMouseLeave:_21e,onMouseEnter:_21e,onMouseUp:_21e,constructor:function(_225){
this._toConnect={};
for(var name in _225){
if(this[name]===_21e){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_225[name];
delete _225[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_21e){
return _215.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_226){
_217.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_226);
},attr:function(name,_227){
if(_214.isDebug){
var _228=arguments.callee._ach||(arguments.callee._ach={}),_229=(arguments.callee.caller||"unknown caller").toString();
if(!_228[_229]){
_217.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_229,"","2.0");
_228[_229]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_217.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_218("[widgetId]",this.containerNode).map(_21a.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(has("dijit-legacy-requires")){
_219(0,function(){
var _22a=["dijit/_base"];
require(_22a);
});
}
return _224;
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window","./a11yclick"],function(on,_22b,keys,_22c,has,_22d,win,_22e){
var ret=_22c("dijit._OnDijitClickMixin",null,{connect:function(obj,_22f,_230){
return this.inherited(arguments,[obj,_22f=="ondijitclick"?_22e:_22f,_230]);
}});
ret.a11yclick=_22e;
return ret;
});
},"dijit/_FocusMixin":function(){
define(["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_231,_232,_233,lang){
lang.extend(_232,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _233("dijit._FocusMixin",null,{_focusManager:_231});
});
},"dojo/cache":function(){
define(["./_base/kernel","./text"],function(dojo){
return dojo.cache;
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","./main"],function(_234,_235,dom,_236,_237,_238,lang,on,_239,has,_23a,_23b,win,_23c,a11y,_23d,_23e){
var _23f=_235([_23a,_238],{curNode:null,activeStack:[],constructor:function(){
var _240=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_234.before(_237,"empty",_240);
_234.before(_237,"destroy",_240);
},registerIframe:function(_241){
return this.registerWin(_241.contentWindow,_241);
},registerWin:function(_242,_243){
var _244=this;
var _245=function(evt){
_244._justMouseDowned=true;
setTimeout(function(){
_244._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_244._onTouchNode(_243||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_242.document.documentElement:_242.document;
if(doc){
if(has("ie")){
_242.document.body.attachEvent("onmousedown",_245);
var _246=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_244._onFocusNode(_243||evt.srcElement);
}else{
_244._onTouchNode(_243||evt.srcElement);
}
};
doc.attachEvent("onfocusin",_246);
var _247=function(evt){
_244._onBlurNode(_243||evt.srcElement);
};
doc.attachEvent("onfocusout",_247);
return {remove:function(){
_242.document.detachEvent("onmousedown",_245);
doc.detachEvent("onfocusin",_246);
doc.detachEvent("onfocusout",_247);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_245,true);
doc.body.addEventListener("touchstart",_245,true);
var _248=function(evt){
_244._onFocusNode(_243||evt.target);
};
doc.addEventListener("focus",_248,true);
var _249=function(evt){
_244._onBlurNode(_243||evt.target);
};
doc.addEventListener("blur",_249,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_245,true);
doc.body.removeEventListener("touchstart",_245,true);
doc.removeEventListener("focus",_248,true);
doc.removeEventListener("blur",_249,true);
doc=null;
}};
}
}
},_onBlurNode:function(node){
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
}
this._clearFocusTimer=setTimeout(lang.hitch(this,function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
}),0);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
}),0);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _24a=[];
try{
while(node){
var _24b=_236.get(node,"dijitPopupParent");
if(_24b){
node=_23d.byId(_24b).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_23c.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_24c=id&&_23d.byId(id);
if(_24c&&!(by=="mouse"&&_24c.get("disabled"))){
_24a.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_24a,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
delete this._clearFocusTimer;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("prevNode",this.curNode);
this.set("curNode",node);
},_setStack:function(_24d,by){
var _24e=this.activeStack;
this.set("activeStack",_24d);
for(var _24f=0;_24f<Math.min(_24e.length,_24d.length);_24f++){
if(_24e[_24f]!=_24d[_24f]){
break;
}
}
var _250;
for(var i=_24e.length-1;i>=_24f;i--){
_250=_23d.byId(_24e[i]);
if(_250){
_250._hasBeenBlurred=true;
_250.set("focused",false);
if(_250._focusManager==this){
_250._onBlur(by);
}
this.emit("widget-blur",_250,by);
}
}
for(i=_24f;i<_24d.length;i++){
_250=_23d.byId(_24d[i]);
if(_250){
_250.set("focused",true);
if(_250._focusManager==this){
_250._onFocus(by);
}
this.emit("widget-focus",_250,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _251=new _23f();
_239(function(){
var _252=_251.registerWin(_23c.get(win.doc));
if(has("ie")){
_23b.addOnWindowUnload(function(){
if(_252){
_252.remove();
_252=null;
}
});
}
});
_23e.focus=function(node){
_251.focus(node);
};
for(var attr in _251){
if(!/^_/.test(attr)){
_23e.focus[attr]=typeof _251[attr]=="function"?lang.hitch(_251,attr):_251[attr];
}
}
_251.watch(function(attr,_253,_254){
_23e.focus[attr]=_254;
});
return _251;
});
},"dijit/_base/sniff":function(){
define("dijit/_base/sniff",["dojo/uacss"],function(){
});
},"dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dojo/date/stamp":function(){
define(["../_base/lang","../_base/array"],function(lang,_255){
var _256={};
lang.setObject("dojo.date.stamp",_256);
_256.fromISOString=function(_257,_258){
if(!_256._isoRegExp){
_256._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _259=_256._isoRegExp.exec(_257),_25a=null;
if(_259){
_259.shift();
if(_259[1]){
_259[1]--;
}
if(_259[6]){
_259[6]*=1000;
}
if(_258){
_258=new Date(_258);
_255.forEach(_255.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _258["get"+prop]();
}),function(_25b,_25c){
_259[_25c]=_259[_25c]||_25b;
});
}
_25a=new Date(_259[0]||1970,_259[1]||0,_259[2]||1,_259[3]||0,_259[4]||0,_259[5]||0,_259[6]||0);
if(_259[0]<100){
_25a.setFullYear(_259[0]||1970);
}
var _25d=0,_25e=_259[7]&&_259[7].charAt(0);
if(_25e!="Z"){
_25d=((_259[8]||0)*60)+(Number(_259[9])||0);
if(_25e!="-"){
_25d*=-1;
}
}
if(_25e){
_25d-=_25a.getTimezoneOffset();
}
if(_25d){
_25a.setTime(_25a.getTime()+_25d*60000);
}
}
return _25a;
};
_256.toISOString=function(_25f,_260){
var _261=function(n){
return (n<10)?"0"+n:n;
};
_260=_260||{};
var _262=[],_263=_260.zulu?"getUTC":"get",date="";
if(_260.selector!="time"){
var year=_25f[_263+"FullYear"]();
date=["0000".substr((year+"").length)+year,_261(_25f[_263+"Month"]()+1),_261(_25f[_263+"Date"]())].join("-");
}
_262.push(date);
if(_260.selector!="date"){
var time=[_261(_25f[_263+"Hours"]()),_261(_25f[_263+"Minutes"]()),_261(_25f[_263+"Seconds"]())].join(":");
var _264=_25f[_263+"Milliseconds"]();
if(_260.milliseconds){
time+="."+(_264<100?"0":"")+_261(_264);
}
if(_260.zulu){
time+="Z";
}else{
if(_260.selector!="time"){
var _265=_25f.getTimezoneOffset();
var _266=Math.abs(_265);
time+=(_265>0?"-":"+")+_261(Math.floor(_266/60))+":"+_261(_266%60);
}
}
_262.push(time);
}
return _262.join("T");
};
return _256;
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_267,has,_268,_269,_26a,_26b,_26c,_26d){
if(has("dijit-legacy-requires")){
_269(0,function(){
var _26e=["dijit/form/_FormValueWidget"];
require(_26e);
});
}
return _267("dijit.form._FormWidget",[_26a,_26c,_26b,_26d],{setDisabled:function(_26f){
_268.deprecated("setDisabled("+_26f+") is deprecated. Use set('disabled',"+_26f+") instead.","","2.0");
this.set("disabled",_26f);
},setValue:function(_270){
_268.deprecated("dijit.form._FormWidget:setValue("+_270+") is deprecated.  Use set('value',"+_270+") instead.","","2.0");
this.set("value",_270);
},getValue:function(){
_268.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/"/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dijit/_base/typematic":function(){
define(["../typematic"],function(){
});
},"dijit/_base/popup":function(){
define("dijit/_base/popup",["dojo/dom-class","dojo/_base/window","../popup","../BackgroundIframe"],function(_271,win,_272){
var _273=_272._createWrapper;
_272._createWrapper=function(_274){
if(!_274.declaredClass){
_274={_popupWrapper:(_274.parentNode&&_271.contains(_274.parentNode,"dijitPopup"))?_274.parentNode:null,domNode:_274,destroy:function(){
},ownerDocument:_274.ownerDocument,ownerDocumentBody:win.body(_274.ownerDocument)};
}
return _273.call(this,_274);
};
var _275=_272.open;
_272.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _275.call(this,args);
};
return _272;
});
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/sniff","dojo/_base/unload"],function(lang,_276,_277,_278,_279,_27a,_27b,_27c,has,_27d){
var _27e=_27b("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _27f=this.declaredClass,_280=this;
return _278.substitute(tmpl,this,function(_281,key){
if(key.charAt(0)=="!"){
_281=lang.getObject(key.substr(1),false,_280);
}
if(typeof _281=="undefined"){
throw new Error(_27f+" template:"+key);
}
if(_281==null){
return "";
}
return key.charAt(0)=="!"?_281:_281.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_279(this.templatePath,{sanitize:true});
}
var _282=_27e.getCachedTemplate(this.templateString,this._skipNodeCache,this.ownerDocument);
var node;
if(lang.isString(_282)){
node=_27c.toDom(this._stringRepl(_282),this.ownerDocument);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_282);
}
}else{
node=_282.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_283){
var dest=this.containerNode;
if(_283&&dest){
while(_283.hasChildNodes()){
dest.appendChild(_283.firstChild);
}
}
},_attachTemplateNodes:function(_284,_285){
var _286=lang.isArray(_284)?_284:(_284.all||_284.getElementsByTagName("*"));
var x=lang.isArray(_284)?0:-1;
for(;x<0||_286[x];x++){
var _287=(x==-1)?_284:_286[x];
if(this.widgetsInTemplate&&(_285(_287,"dojoType")||_285(_287,"data-dojo-type"))){
continue;
}
var _288=_285(_287,"dojoAttachPoint")||_285(_287,"data-dojo-attach-point");
if(_288){
var _289,_28a=_288.split(/\s*,\s*/);
while((_289=_28a.shift())){
if(lang.isArray(this[_289])){
this[_289].push(_287);
}else{
this[_289]=_287;
}
this._attachPoints.push(_289);
}
}
var _28b=_285(_287,"dojoAttachEvent")||_285(_287,"data-dojo-attach-event");
if(_28b){
var _28c,_28d=_28b.split(/\s*,\s*/);
var trim=lang.trim;
while((_28c=_28d.shift())){
if(_28c){
var _28e=null;
if(_28c.indexOf(":")!=-1){
var _28f=_28c.split(":");
_28c=trim(_28f[0]);
_28e=trim(_28f[1]);
}else{
_28c=trim(_28c);
}
if(!_28e){
_28e=_28c;
}
this._attachEvents.push(this.connect(_287,_276[_28c]||_28c,_28e));
}
}
}
}
},destroyRendering:function(){
_27a.forEach(this._attachPoints,function(_290){
delete this[_290];
},this);
this._attachPoints=[];
_27a.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_27e._templateCache={};
_27e.getCachedTemplate=function(_291,_292,doc){
var _293=_27e._templateCache;
var key=_291;
var _294=_293[key];
if(_294){
try{
if(!_294.ownerDocument||_294.ownerDocument==(doc||document)){
return _294;
}
}
catch(e){
}
_27c.destroy(_294);
}
_291=_278.trim(_291);
if(_292||_291.match(/\$\{([^\}]+)\}/g)){
return (_293[key]=_291);
}else{
var node=_27c.toDom(_291,doc);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_291);
}
return (_293[key]=node);
}
};
if(has("ie")){
_27d.addOnWindowUnload(function(){
var _295=_27e._templateCache;
for(var key in _295){
var _296=_295[key];
if(typeof _296=="object"){
_27c.destroy(_296);
}
delete _295[key];
}
});
}
lang.extend(_277,{dojoAttachEvent:"",dojoAttachPoint:""});
return _27e;
});
},"dijit/_base/wai":function(){
define("dijit/_base/wai",["dojo/dom-attr","dojo/_base/lang","../main","../hccss"],function(_297,lang,_298){
var _299={hasWaiRole:function(elem,role){
var _29a=this.getWaiRole(elem);
return role?(_29a.indexOf(role)>-1):(_29a.length>0);
},getWaiRole:function(elem){
return lang.trim((_297.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_297.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _29b=_297.get(elem,"role");
if(!_29b){
return;
}
if(role){
var t=lang.trim((" "+_29b+" ").replace(" "+role+" "," "));
_297.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_29c){
return elem.hasAttribute?elem.hasAttribute("aria-"+_29c):!!elem.getAttribute("aria-"+_29c);
},getWaiState:function(elem,_29d){
return elem.getAttribute("aria-"+_29d)||"";
},setWaiState:function(elem,_29e,_29f){
elem.setAttribute("aria-"+_29e,_29f);
},removeWaiState:function(elem,_2a0){
elem.removeAttribute("aria-"+_2a0);
}};
lang.mixin(_298,_299);
return _298;
});
},"dojo/window":function(){
define(["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_2a1,dom,geom,_2a2){
var _2a3={getBox:function(doc){
doc=doc||_2a1.doc;
var _2a4=(doc.compatMode=="BackCompat")?_2a1.body(doc):doc.documentElement,_2a5=geom.docScroll(doc),w,h;
if(has("touch")){
var _2a6=_2a3.get(doc);
w=_2a6.innerWidth||_2a4.clientWidth;
h=_2a6.innerHeight||_2a4.clientHeight;
}else{
w=_2a4.clientWidth;
h=_2a4.clientHeight;
}
return {l:_2a5.x,t:_2a5.y,w:w,h:h};
},get:function(doc){
if(has("ie")&&_2a3!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
},scrollIntoView:function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_2a1.doc,body=_2a1.body(doc),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _2a7=doc.compatMode=="BackCompat",_2a8=(isIE>=9&&"frameElement" in node.ownerDocument.parentWindow)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_2a7?body:html),_2a9=isWK?body:_2a8,_2aa=_2a8.clientWidth,_2ab=_2a8.clientHeight,rtl=!geom.isBodyLtr(doc),_2ac=pos||geom.position(node),el=node.parentNode,_2ad=function(el){
return ((isIE<=6||(isIE&&_2a7))?false:(_2a2.get(el,"position").toLowerCase()=="fixed"));
};
if(_2ad(node)){
return;
}
while(el){
if(el==body){
el=_2a9;
}
var _2ae=geom.position(el),_2af=_2ad(el);
if(el==_2a9){
_2ae.w=_2aa;
_2ae.h=_2ab;
if(_2a9==html&&isIE&&rtl){
_2ae.x+=_2a9.offsetWidth-_2ae.w;
}
if(_2ae.x<0||!isIE){
_2ae.x=0;
}
if(_2ae.y<0||!isIE){
_2ae.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_2ae.w-=pb.w;
_2ae.h-=pb.h;
_2ae.x+=pb.l;
_2ae.y+=pb.t;
var _2b0=el.clientWidth,_2b1=_2ae.w-_2b0;
if(_2b0>0&&_2b1>0){
_2ae.w=_2b0;
_2ae.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_2b1:0;
}
_2b0=el.clientHeight;
_2b1=_2ae.h-_2b0;
if(_2b0>0&&_2b1>0){
_2ae.h=_2b0;
}
}
if(_2af){
if(_2ae.y<0){
_2ae.h+=_2ae.y;
_2ae.y=0;
}
if(_2ae.x<0){
_2ae.w+=_2ae.x;
_2ae.x=0;
}
if(_2ae.y+_2ae.h>_2ab){
_2ae.h=_2ab-_2ae.y;
}
if(_2ae.x+_2ae.w>_2aa){
_2ae.w=_2aa-_2ae.x;
}
}
var l=_2ac.x-_2ae.x,t=_2ac.y-Math.max(_2ae.y,0),r=l+_2ac.w-_2ae.w,bot=t+_2ac.h-_2ae.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_2a7)||isIE>=9)){
s=-s;
}
_2ac.x+=el.scrollLeft;
el.scrollLeft+=s;
_2ac.x-=el.scrollLeft;
}
if(bot*t>0){
_2ac.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_2ac.y-=el.scrollTop;
}
el=(el!=_2a9)&&!_2af&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
}};
1&&lang.setObject("dojo.window",_2a3);
return _2a3;
});
},"dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./place","./BackgroundIframe","./main"],function(_2b2,_2b3,_2b4,_2b5,dom,_2b6,_2b7,_2b8,_2b9,_2ba,keys,lang,on,has,_2bb,_2bc,_2bd){
function _2be(){
if(this._popupWrapper){
_2b7.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _2bf=_2b5(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_2c0){
var _2c1=_2c0._popupWrapper,node=_2c0.domNode;
if(!_2c1){
_2c1=_2b7.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},_2c0.ownerDocumentBody);
_2c1.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_2c0._popupWrapper=_2c1;
_2b3.after(_2c0,"destroy",_2be,true);
}
return _2c1;
},moveOffScreen:function(_2c2){
var _2c3=this._createWrapper(_2c2);
_2b9.set(_2c3,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_2c4){
var _2c5=this._createWrapper(_2c4);
_2b9.set(_2c5,"display","none");
},getTopPopup:function(){
var _2c6=this._stack;
for(var pi=_2c6.length-1;pi>0&&_2c6[pi].parent===_2c6[pi-1].widget;pi--){
}
return _2c6[pi];
},open:function(args){
var _2c7=this._stack,_2c8=args.popup,_2c9=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_2b8.isBodyLtr(_2c8.ownerDocument),_2ca=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_2c7.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_2c7[_2c7.length-1].widget.domNode))){
this.close(_2c7[_2c7.length-1].widget);
}
var _2cb=this._createWrapper(_2c8);
_2b6.set(_2cb,{id:id,style:{zIndex:this._beginZIndex+_2c7.length},"class":"dijitPopup "+(_2c8.baseClass||_2c8["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("ie")||has("mozilla")){
if(!_2c8.bgIframe){
_2c8.bgIframe=new _2bc(_2cb);
}
}
var best=_2ca?_2bb.around(_2cb,_2ca,_2c9,ltr,_2c8.orient?lang.hitch(_2c8,"orient"):null):_2bb.at(_2cb,args,_2c9=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_2cb.style.display="";
_2cb.style.visibility="visible";
_2c8.domNode.style.visibility="visible";
var _2cc=[];
_2cc.push(on(_2cb,_2b4._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_2ba.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_2ba.stop(evt);
var _2cd=this.getTopPopup();
if(_2cd&&_2cd.onCancel){
_2cd.onCancel();
}
}
}
})));
if(_2c8.onCancel&&args.onCancel){
_2cc.push(_2c8.on("cancel",args.onCancel));
}
_2cc.push(_2c8.on(_2c8.onExecute?"execute":"change",lang.hitch(this,function(){
var _2ce=this.getTopPopup();
if(_2ce&&_2ce.onExecute){
_2ce.onExecute();
}
})));
_2c7.push({widget:_2c8,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_2cc});
if(_2c8.onOpen){
_2c8.onOpen(best);
}
return best;
},close:function(_2cf){
var _2d0=this._stack;
while((_2cf&&_2b2.some(_2d0,function(elem){
return elem.widget==_2cf;
}))||(!_2cf&&_2d0.length)){
var top=_2d0.pop(),_2d1=top.widget,_2d2=top.onClose;
if(_2d1.onClose){
_2d1.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_2d1&&_2d1.domNode){
this.hide(_2d1);
}
if(_2d2){
_2d2();
}
}
}});
return (_2bd.popup=new _2bf());
});
},"dijit/_base/window":function(){
define("dijit/_base/window",["dojo/window","../main"],function(_2d3,_2d4){
_2d4.getDocumentWindow=function(doc){
return _2d3.get(doc);
};
});
},"dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./Destroyable","./registry"],function(_2d5,_2d6,_2d7,_2d8,_2d9,_2da,dom,_2db,_2dc,_2dd,_2de,_2df,has,_2e0,lang,on,_2e1,_2e2,_2e3,win,_2e4,_2e5){
has.add("dijit-legacy-requires",!_2e0.isAsync);
if(has("dijit-legacy-requires")){
_2e1(0,function(){
var _2e6=["dijit/_base/manager"];
_2d5(_2e6);
});
}
var _2e7={};
function _2e8(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _2e9(attr){
return function(val){
_2db[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _2da("dijit._WidgetBase",[_2e2,_2e4],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_2e9("lang"),dir:"",_setDirAttr:_2e9("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(val){
this._set("ownerDocument",val);
},attributeMap:{},_blankGif:_2d8.blankGif||_2d5.toUrl("dojo/resources/blank.gif"),postscript:function(_2ea,_2eb){
this.create(_2ea,_2eb);
},create:function(_2ec,_2ed){
this.srcNodeRef=dom.byId(_2ed);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_2ec){
this.params=_2ec;
lang.mixin(this,_2ec);
}
this.postMixInProperties();
if(!this.id){
this.id=_2e5.getUniqueId(this.declaredClass.replace(/\./g,"_"));
if(this.params){
delete this.params.id;
}
}
this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:win.doc);
this.ownerDocumentBody=win.body(this.ownerDocument);
_2e5.add(this);
this.buildRendering();
var _2ee;
if(this.domNode){
this._applyAttributes();
var _2ef=this.srcNodeRef;
if(_2ef&&_2ef.parentNode&&this.domNode!==_2ef){
_2ef.parentNode.replaceChild(this.domNode,_2ef);
_2ee=true;
}
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(_2ee){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _2f0=ctor.prototype;
for(var _2f1 in _2f0){
if(_2f1 in this.attributeMap){
continue;
}
var _2f2="_set"+_2f1.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_2f2 in _2f0){
list.push(_2f1);
}
}
}
_2d6.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _2f3 in this.params){
this.set(_2f3,this.params[_2f3]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div");
}
if(this.baseClass){
var _2f4=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_2f4=_2f4.concat(_2d6.map(_2f4,function(name){
return name+"Rtl";
}));
}
_2dc.add(this.domNode,_2f4);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_2d6.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_2f5){
this._beingDestroyed=true;
this.destroyDescendants(_2f5);
this.destroy(_2f5);
},destroy:function(_2f6){
this._beingDestroyed=true;
this.uninitialize();
function _2f7(w){
if(w.destroyRecursive){
w.destroyRecursive(_2f6);
}else{
if(w.destroy){
w.destroy(_2f6);
}
}
};
_2d6.forEach(this._connects,lang.hitch(this,"disconnect"));
_2d6.forEach(this._supportingWidgets,_2f7);
if(this.domNode){
_2d6.forEach(_2e5.findWidgets(this.domNode,this.containerNode),_2f7);
}
this.destroyRendering(_2f6);
_2e5.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2f8){
if(this.bgIframe){
this.bgIframe.destroy(_2f8);
delete this.bgIframe;
}
if(this.domNode){
if(_2f8){
_2db.remove(this.domNode,"widgetId");
}else{
_2dd.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2f8){
_2dd.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2f9){
_2d6.forEach(this.getChildren(),function(_2fa){
if(_2fa.destroyRecursive){
_2fa.destroyRecursive(_2f9);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_2fb){
var _2fc=this.domNode;
if(lang.isObject(_2fb)){
_2df.set(_2fc,_2fb);
}else{
if(_2fc.style.cssText){
_2fc.style.cssText+="; "+_2fb;
}else{
_2fc.style.cssText=_2fb;
}
}
this._set("style",_2fb);
},_attrToDom:function(attr,_2fd,_2fe){
_2fe=arguments.length>=3?_2fe:this.attributeMap[attr];
_2d6.forEach(lang.isArray(_2fe)?_2fe:[_2fe],function(_2ff){
var _300=this[_2ff.node||_2ff||"domNode"];
var type=_2ff.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_2fd)){
_2fd=lang.hitch(this,_2fd);
}
var _301=_2ff.attribute?_2ff.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
if(_300.tagName){
_2db.set(_300,_301,_2fd);
}else{
_300.set(_301,_2fd);
}
break;
case "innerText":
_300.innerHTML="";
_300.appendChild(this.ownerDocument.createTextNode(_2fd));
break;
case "innerHTML":
_300.innerHTML=_2fd;
break;
case "class":
_2dc.replace(_300,_2fd,this[attr]);
break;
}
},this);
},get:function(name){
var _302=this._getAttrNames(name);
return this[_302.g]?this[_302.g]():this[name];
},set:function(name,_303){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _304=this._getAttrNames(name),_305=this[_304.s];
if(lang.isFunction(_305)){
var _306=_305.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _307=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_307].tagName,_308=_2e7[tag]||(_2e7[tag]=_2e8(this[_307])),map=name in this.attributeMap?this.attributeMap[name]:_304.s in this?this[_304.s]:((_304.l in _308&&typeof _303!="function")||/^aria-|^data-|^role$/.test(name))?_307:null;
if(map!=null){
this._attrToDom(name,_303,map);
}
this._set(name,_303);
}
return _306||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_309){
var _30a=this[name];
this[name]=_309;
if(this._created&&_309!==_30a){
if(this._watchCallbacks){
this._watchCallbacks(name,_30a,_309);
}
this.emit("attrmodified-"+name,{detail:{prevValue:_30a,newValue:_309}});
}
},emit:function(type,_30b,_30c){
_30b=_30b||{};
if(_30b.bubbles===undefined){
_30b.bubbles=true;
}
if(_30b.cancelable===undefined){
_30b.cancelable=true;
}
if(!_30b.detail){
_30b.detail={};
}
_30b.detail.widget=this;
var ret,_30d=this["on"+type];
if(_30d){
ret=_30d.apply(this,_30c?_30c:[_30b]);
}
if(this._started&&!this._beingDestroyed){
on.emit(this.domNode,type.toLowerCase(),_30b);
}
return ret;
},on:function(type,func){
var _30e=this._onMap(type);
if(_30e){
return _2d7.after(this,_30e,func,true);
}
return this.own(on(this.domNode,type,func))[0];
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[typeof type=="string"&&type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_2e5.findWidgets(this.containerNode):[];
},getParent:function(){
return _2e5.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_30f,_310){
return this.own(_2d9.connect(obj,_30f,this,_310))[0];
},disconnect:function(_311){
_311.remove();
},subscribe:function(t,_312){
return this.own(_2e3.subscribe(t,lang.hitch(this,_312)))[0];
},unsubscribe:function(_313){
_313.remove();
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_2de.isBodyLtr(this.ownerDocument);
},isFocusable:function(){
return this.focus&&(_2df.get(this.domNode,"display")!="none");
},placeAt:function(_314,_315){
var _316=!_314.tagName&&_2e5.byId(_314);
if(_316&&_316.addChild&&(!_315||typeof _315==="number")){
_316.addChild(this,_315);
}else{
var ref=_316?(_316.containerNode&&!/after|before|replace/.test(_315||"")?_316.containerNode:_316.domNode):dom.byId(_314,this.ownerDocument);
_2dd.place(this.domNode,ref,_315);
if(!this._started&&(this.getParent()||{})._started){
this.startup();
}
}
return this;
},getTextDir:function(text,_317){
return _317;
},applyTextDir:function(){
},defer:function(fcn,_318){
var _319=setTimeout(lang.hitch(this,function(){
_319=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_318||0);
return {remove:function(){
if(_319){
clearTimeout(_319);
_319=null;
}
return null;
}};
}});
});
}}});
define("dijit/dijit",["./main","./_base","dojo/parser","./_Widget","./_TemplatedMixin","./_Container","./layout/_LayoutWidget","./form/_FormWidget","./form/_FormValueWidget"],function(_31a){
return _31a;
});
