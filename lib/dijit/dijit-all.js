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
require({cache:{"dijit/_editor/plugins/FontChoice":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/i18n","dojo/_base/lang","dojo/store/Memory","../../registry","../../_Widget","../../_TemplatedMixin","../../_WidgetsInTemplateMixin","../../form/FilteringSelect","../_Plugin","../range","dojo/i18n!../nls/FontChoice"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
var _e=_2("dijit._editor.plugins._FontDropDown",[_8,_9,_a],{label:"",plainText:false,templateString:"<span style='white-space: nowrap' class='dijit dijitReset dijitInline'>"+"<label class='dijitLeft dijitInline' for='${selectId}'>${label}</label>"+"<input data-dojo-type='dijit.form.FilteringSelect' required='false' "+"data-dojo-props='labelType:\"html\", labelAttr:\"label\", searchAttr:\"name\"' "+"tabIndex='-1' id='${selectId}' data-dojo-attach-point='select' value=''/>"+"</span>",postMixInProperties:function(){
this.inherited(arguments);
this.strings=_4.getLocalization("dijit._editor","FontChoice");
this.label=this.strings[this.command];
this.id=_7.getUniqueId(this.declaredClass.replace(/\./g,"_"));
this.selectId=this.id+"_select";
this.inherited(arguments);
},postCreate:function(){
this.select.set("store",new _6({idProperty:"value",data:_1.map(this.values,function(_f){
var _10=this.strings[_f]||_f;
return {label:this.getLabel(_f,_10),name:_10,value:_f};
},this)}));
this.select.set("value","",false);
this.disabled=this.select.get("disabled");
},_setValueAttr:function(_11,_12){
_12=_12!==false;
this.select.set("value",_1.indexOf(this.values,_11)<0?"":_11,_12);
if(!_12){
this.select._lastValueReported=null;
}
},_getValueAttr:function(){
return this.select.get("value");
},focus:function(){
this.select.focus();
},_setDisabledAttr:function(_13){
this.disabled=_13;
this.select.set("disabled",_13);
}});
var _14=_2("dijit._editor.plugins._FontNameDropDown",_e,{generic:false,command:"fontName",postMixInProperties:function(){
if(!this.values){
this.values=this.generic?["serif","sans-serif","monospace","cursive","fantasy"]:["Arial","Times New Roman","Comic Sans MS","Courier New"];
}
this.inherited(arguments);
},getLabel:function(_15,_16){
if(this.plainText){
return _16;
}else{
return "<div style='font-family: "+_15+"'>"+_16+"</div>";
}
},_setValueAttr:function(_17,_18){
_18=_18!==false;
if(this.generic){
var map={"Arial":"sans-serif","Helvetica":"sans-serif","Myriad":"sans-serif","Times":"serif","Times New Roman":"serif","Comic Sans MS":"cursive","Apple Chancery":"cursive","Courier":"monospace","Courier New":"monospace","Papyrus":"fantasy","Estrangelo Edessa":"cursive","Gabriola":"fantasy"};
_17=map[_17]||_17;
}
this.inherited(arguments,[_17,_18]);
}});
var _19=_2("dijit._editor.plugins._FontSizeDropDown",_e,{command:"fontSize",values:[1,2,3,4,5,6,7],getLabel:function(_1a,_1b){
if(this.plainText){
return _1b;
}else{
return "<font size="+_1a+"'>"+_1b+"</font>";
}
},_setValueAttr:function(_1c,_1d){
_1d=_1d!==false;
if(_1c.indexOf&&_1c.indexOf("px")!=-1){
var _1e=parseInt(_1c,10);
_1c={10:1,13:2,16:3,18:4,24:5,32:6,48:7}[_1e]||_1c;
}
this.inherited(arguments,[_1c,_1d]);
}});
var _1f=_2("dijit._editor.plugins._FormatBlockDropDown",_e,{command:"formatBlock",values:["noFormat","p","h1","h2","h3","pre"],postCreate:function(){
this.inherited(arguments);
this.set("value","noFormat",false);
},getLabel:function(_20,_21){
if(this.plainText||_20=="noFormat"){
return _21;
}else{
return "<"+_20+">"+_21+"</"+_20+">";
}
},_execCommand:function(_22,_23,_24){
if(_24==="noFormat"){
var _25;
var end;
var sel=_d.getSelection(_22.window);
if(sel&&sel.rangeCount>0){
var _26=sel.getRangeAt(0);
var _27,tag;
if(_26){
_25=_26.startContainer;
end=_26.endContainer;
while(_25&&_25!==_22.editNode&&_25!==_22.document.body&&_25.nodeType!==1){
_25=_25.parentNode;
}
while(end&&end!==_22.editNode&&end!==_22.document.body&&end.nodeType!==1){
end=end.parentNode;
}
var _28=_5.hitch(this,function(_29,ary){
if(_29.childNodes&&_29.childNodes.length){
var i;
for(i=0;i<_29.childNodes.length;i++){
var c=_29.childNodes[i];
if(c.nodeType==1){
if(_22._sCall("inSelection",[c])){
var tag=c.tagName?c.tagName.toLowerCase():"";
if(_1.indexOf(this.values,tag)!==-1){
ary.push(c);
}
_28(c,ary);
}
}
}
}
});
var _2a=_5.hitch(this,function(_2b){
if(_2b&&_2b.length){
_22.beginEditing();
while(_2b.length){
this._removeFormat(_22,_2b.pop());
}
_22.endEditing();
}
});
var _2c=[];
if(_25==end){
var _2d;
_27=_25;
while(_27&&_27!==_22.editNode&&_27!==_22.document.body){
if(_27.nodeType==1){
tag=_27.tagName?_27.tagName.toLowerCase():"";
if(_1.indexOf(this.values,tag)!==-1){
_2d=_27;
break;
}
}
_27=_27.parentNode;
}
_28(_25,_2c);
if(_2d){
_2c=[_2d].concat(_2c);
}
_2a(_2c);
}else{
_27=_25;
while(_22._sCall("inSelection",[_27])){
if(_27.nodeType==1){
tag=_27.tagName?_27.tagName.toLowerCase():"";
if(_1.indexOf(this.values,tag)!==-1){
_2c.push(_27);
}
_28(_27,_2c);
}
_27=_27.nextSibling;
}
_2a(_2c);
}
_22.onDisplayChanged();
}
}
}else{
_22.execCommand(_23,_24);
}
},_removeFormat:function(_2e,_2f){
if(_2e.customUndo){
while(_2f.firstChild){
_3.place(_2f.firstChild,_2f,"before");
}
_2f.parentNode.removeChild(_2f);
}else{
_2e._sCall("selectElementChildren",[_2f]);
var _30=_2e._sCall("getSelectedHtml",[]);
_2e._sCall("selectElement",[_2f]);
_2e.execCommand("inserthtml",_30||"");
}
}});
var _31=_2("dijit._editor.plugins.FontChoice",_c,{useDefaultCommand:false,_initButton:function(){
var _32={fontName:_14,fontSize:_19,formatBlock:_1f}[this.command],_33=this.params;
if(this.params.custom){
_33.values=this.params.custom;
}
var _34=this.editor;
this.button=new _32(_5.delegate({dir:_34.dir,lang:_34.lang},_33));
this.connect(this.button.select,"onChange",function(_35){
this.editor.focus();
if(this.command=="fontName"&&_35.indexOf(" ")!=-1){
_35="'"+_35+"'";
}
if(this.button._execCommand){
this.button._execCommand(this.editor,this.command,_35);
}else{
this.editor.execCommand(this.command,_35);
}
});
},updateState:function(){
var _36=this.editor;
var _37=this.command;
if(!_36||!_36.isLoaded||!_37.length){
return;
}
if(this.button){
var _38=this.get("disabled");
this.button.set("disabled",_38);
if(_38){
return;
}
var _39;
try{
_39=_36.queryCommandValue(_37)||"";
}
catch(e){
_39="";
}
var _3a=_5.isString(_39)&&_39.match(/'([^']*)'/);
if(_3a){
_39=_3a[1];
}
if(_37==="formatBlock"){
if(!_39||_39=="p"){
_39=null;
var _3b;
var sel=_d.getSelection(this.editor.window);
if(sel&&sel.rangeCount>0){
var _3c=sel.getRangeAt(0);
if(_3c){
_3b=_3c.endContainer;
}
}
while(_3b&&_3b!==_36.editNode&&_3b!==_36.document){
var tg=_3b.tagName?_3b.tagName.toLowerCase():"";
if(tg&&_1.indexOf(this.button.values,tg)>-1){
_39=tg;
break;
}
_3b=_3b.parentNode;
}
if(!_39){
_39="noFormat";
}
}else{
if(_1.indexOf(this.button.values,_39)<0){
_39="noFormat";
}
}
}
if(_39!==this.button.get("value")){
this.button.set("value",_39,false);
}
}
}});
_1.forEach(["fontName","fontSize","formatBlock"],function(_3d){
_c.registry[_3d]=function(_3e){
return new _31({command:_3d,plainText:_3e.plainText});
};
});
_31._FontDropDown=_e;
_31._FontNameDropDown=_14;
_31._FontSizeDropDown=_19;
_31._FormatBlockDropDown=_1f;
return _31;
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dijit/form/TextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/sniff","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html","../main"],function(_3f,_40,_41,_42,_43,has,_44,_45,_46,_47){
var _48=_3f("dijit.form.TextBox",[_44,_45],{templateString:_46,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _49=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_49=="hidden"||_49=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")<9){
this.defer(function(){
try{
var s=_41.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _4a=this.domNode.getElementsByTagName("INPUT");
if(_4a){
for(var i=0;i<_4a.length;i++){
_4a[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
this.defer(function(){
this._handleOnChange(this.get("value"),false);
});
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_40.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_4b,_4c,_4d){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_42.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use get('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_4e){
_42.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_4e);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
if(has("mozilla")){
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(has("ie")){
_48.prototype._isTextSelected=function(){
var _4f=this.ownerDocument.selection.createRange();
var _50=_4f.parentElement();
return _50==this.textbox&&_4f.text.length>0;
};
_47._setSelectionRange=_45._setSelectionRange=function(_51,_52,_53){
if(_51.createTextRange){
var r=_51.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_52);
r.moveEnd("character",_53-_52);
r.select();
}
};
}
return _48;
});
},"dojo/currency":function(){
define(["./_base/array","./_base/lang","./number","./i18n","./i18n!./cldr/nls/currency","./cldr/monetary"],function(_54,_55,_56,_57,_58,_59){
var _5a={};
_55.setObject("dojo.currency",_5a);
_5a._mixInDefaults=function(_5b){
_5b=_5b||{};
_5b.type="currency";
var _5c=_57.getLocalization("dojo.cldr","currency",_5b.locale)||{};
var iso=_5b.currency;
var _5d=_59.getData(iso);
_54.forEach(["displayName","symbol","group","decimal"],function(_5e){
_5d[_5e]=_5c[iso+"_"+_5e];
});
_5d.fractional=[true,false];
return _55.mixin(_5d,_5b);
};
_5a.format=function(_5f,_60){
return _56.format(_5f,_5a._mixInDefaults(_60));
};
_5a.regexp=function(_61){
return _56.regexp(_5a._mixInDefaults(_61));
};
_5a.parse=function(_62,_63){
return _56.parse(_62,_5a._mixInDefaults(_63));
};
return _5a;
});
},"dijit/DialogUnderlay":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(_64,_65,_66,_67,_68,_69){
return _64("dijit.DialogUnderlay",[_67,_68],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(id){
_65.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_6a){
this.node.className="dijitDialogUnderlay "+_6a;
this._set("class",_6a);
},postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _6b=_66.getBox(this.ownerDocument);
os.top=_6b.t+"px";
os.left=_6b.l+"px";
is.width=_6b.w+"px";
is.height=_6b.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new _69(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
});
},"url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\" role=\"presentation\"\n\t\t/></td></tr></tbody\n></table>\n","dijit/layout/ScrollingTabController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/on","dojo/query","dojo/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_6c,_6d,_6e,_6f,_70,fx,_71,on,_72,has,_73,_74,_75,_76,_77,_78,_79,_7a,_7b,_7c){
var _7d=_6d("dijit.layout.ScrollingTabController",[_76,_78],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_74,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_6e.add(n,"tabStrip-disabled");
}
_6e.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
_70.set(this.domNode,"visibility","");
this._postStartup=true;
this.own(on(this.containerNode,"attrmodified-label, attrmodified-iconclass",_71.hitch(this,function(evt){
if(this._dim){
this.resize(this._dim);
}
})));
},onAddChild:function(_7e,_7f){
this.inherited(arguments);
_70.set(this.containerNode,"width",(_70.get(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(_80,_81){
var _82=this.pane2button[_80.id];
if(this._selectedTab===_82.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=_72("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_6f.getMarginSize(btn).w;
return true;
}else{
_70.set(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _83=this.getChildren();
if(_83.length){
var _84=_83[this.isLeftToRight()?0:_83.length-1].domNode,_85=_83[this.isLeftToRight()?_83.length-1:0].domNode;
return _85.offsetLeft+_70.get(_85,"width")-_84.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_86){
var _87=this._getTabsWidth();
_86=_86||_70.get(this.scrollNode,"width");
return _87>0&&_86<_87;
},resize:function(dim){
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_77.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNode.offsetHeight;
_6f.setContentSize(this.domNode,cb);
var _88=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_88?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
_77.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_70.get(this.containerNode,"width")-_70.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _89=_70.get(this.containerNode,"width")-_70.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_89);
}
},onSelectChild:function(_8a){
var tab=this.pane2button[_8a.id];
if(!tab||!_8a){
return;
}
var _8b=tab.domNode;
if(_8b!=this._selectedTab){
this._selectedTab=_8b;
if(this._postResize){
var sl=this._getScroll();
if(sl>_8b.offsetLeft||sl+_70.get(this.scrollNode,"width")<_8b.offsetLeft+_70.get(_8b,"width")){
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _8c=this.getChildren(),_8d=_70.get(this.scrollNode,"width"),_8e=_70.get(this.containerNode,"width"),_8f=_8e-_8d,_90=this._getTabsWidth();
if(_8c.length&&_90>_8d){
return {min:this.isLeftToRight()?0:_8c[_8c.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_8c[_8c.length-1].domNode.offsetLeft+_70.get(_8c[_8c.length-1].domNode,"width"))-_8d:_8f};
}else{
var _91=this.isLeftToRight()?0:_8f;
return {min:_91,max:_91};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_92=_70.get(this.scrollNode,"width"),_93=this._getScrollBounds();
var pos=(n.offsetLeft+_70.get(n,"width")/2)-_92/2;
pos=Math.min(Math.max(pos,_93.min),_93.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _94=this._getScrollBounds();
x=Math.min(Math.max(x,_94.min),_94.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _95=this,w=this.scrollNode,_96=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _97=w.scrollLeft,_98=_95._convertToScrollLeft(x);
_96.curve=new fx._Line(_97,_98);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_96;
this._setButtonClass(x);
return _96;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_6e.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_99,_9a){
if(_9a&&_6e.contains(_9a,"dijitTabDisabled")){
return;
}
var _9b=_70.get(this.scrollNode,"width");
var d=(_9b*0.75)*_99;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_9c){
var _9d=this._getScrollBounds();
this._leftBtn.set("disabled",_9c<=_9d.min);
this._rightBtn.set("disabled",_9c>=_9d.max);
}});
var _9e=_6d("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_75,tabIndex:"",isFocusable:function(){
return false;
}});
_6d("dijit.layout._ScrollingTabControllerButton",[_7b,_9e]);
_6d("dijit.layout._ScrollingTabControllerMenuButton",[_7b,_7c,_9e],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_9f){
this.dropDown=new _79({id:this.containerId+"_menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir});
var _a0=_73.byId(this.containerId);
_6c.forEach(_a0.getChildren(),function(_a1){
var _a2=new _7a({id:_a1.id+"_stcMi",label:_a1.title,iconClass:_a1.iconClass,disabled:_a1.disabled,ownerDocument:this.ownerDocument,dir:_a1.dir,lang:_a1.lang,textDir:_a1.textDir,onClick:function(){
_a0.selectChild(_a1);
}});
this.dropDown.addChild(_a2);
},this);
_9f();
},closeDropDown:function(_a3){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _7d;
});
},"dijit/_editor/html":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/sniff"],function(_a4,_a5,has){
var _a6={};
_a5.setObject("dijit._editor.html",_a6);
var _a7=_a6.escapeXml=function(str,_a8){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_a8){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
_a6.getNodeHtml=function(_a9){
var _aa=[];
_a6.getNodeHtmlHelper(_a9,_aa);
return _aa.join("");
};
_a6.getNodeHtmlHelper=function(_ab,_ac){
switch(_ab.nodeType){
case 1:
var _ad=_ab.nodeName.toLowerCase();
if(!_ad||_ad.charAt(0)=="/"){
return "";
}
_ac.push("<",_ad);
var _ae=[],_af={};
var _b0;
if(has("dom-attributes-explicit")||has("dom-attributes-specified-flag")){
var i=0;
while((_b0=_ab.attributes[i++])){
var n=_b0.name;
if(n.substr(0,3)!=="_dj"&&(!has("dom-attributes-specified-flag")||_b0.specified)&&!(n in _af)){
var v=_b0.value;
if(n=="src"||n=="href"){
if(_ab.getAttribute("_djrealurl")){
v=_ab.getAttribute("_djrealurl");
}
}
if(has("ie")===8&&n==="style"){
v=v.replace("HEIGHT:","height:").replace("WIDTH:","width:");
}
_ae.push([n,v]);
_af[n]=v;
}
}
}else{
var _b1=/^input$|^img$/i.test(_ab.nodeName)?_ab:_ab.cloneNode(false);
var s=_b1.outerHTML;
var _b2=/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
var _b3=s.match(_b2);
s=s.substr(0,s.indexOf(">"));
_a4.forEach(_b3,function(_b4){
if(_b4){
var idx=_b4.indexOf("=");
if(idx>0){
var key=_b4.substring(0,idx);
if(key.substr(0,3)!="_dj"){
if(key=="src"||key=="href"){
if(_ab.getAttribute("_djrealurl")){
_ae.push([key,_ab.getAttribute("_djrealurl")]);
return;
}
}
var val,_b5;
switch(key){
case "style":
val=_ab.style.cssText.toLowerCase();
break;
case "class":
val=_ab.className;
break;
case "width":
if(_ad==="img"){
_b5=/width=(\S+)/i.exec(s);
if(_b5){
val=_b5[1];
}
break;
}
case "height":
if(_ad==="img"){
_b5=/height=(\S+)/i.exec(s);
if(_b5){
val=_b5[1];
}
break;
}
default:
val=_ab.getAttribute(key);
}
if(val!=null){
_ae.push([key,val.toString()]);
}
}
}
}
},this);
}
_ae.sort(function(a,b){
return a[0]<b[0]?-1:(a[0]==b[0]?0:1);
});
var j=0;
while((_b0=_ae[j++])){
_ac.push(" ",_b0[0],"=\"",(typeof _b0[1]==="string"?_a7(_b0[1],true):_b0[1]),"\"");
}
switch(_ad){
case "br":
case "hr":
case "img":
case "input":
case "base":
case "meta":
case "area":
case "basefont":
_ac.push(" />");
break;
case "script":
_ac.push(">",_ab.innerHTML,"</",_ad,">");
break;
default:
_ac.push(">");
if(_ab.hasChildNodes()){
_a6.getChildrenHtmlHelper(_ab,_ac);
}
_ac.push("</",_ad,">");
}
break;
case 4:
case 3:
_ac.push(_a7(_ab.nodeValue,true));
break;
case 8:
_ac.push("<!--",_a7(_ab.nodeValue,true),"-->");
break;
default:
_ac.push("<!-- Element not recognized - Type: ",_ab.nodeType," Name: ",_ab.nodeName,"-->");
}
};
_a6.getChildrenHtml=function(_b6){
var _b7=[];
_a6.getChildrenHtmlHelper(_b6,_b7);
return _b7.join("");
};
_a6.getChildrenHtmlHelper=function(dom,_b8){
if(!dom){
return;
}
var _b9=dom["childNodes"]||dom;
var _ba=!has("ie")||_b9!==dom;
var _bb,i=0;
while((_bb=_b9[i++])){
if(!_ba||_bb.parentNode==dom){
_a6.getNodeHtmlHelper(_bb,_b8);
}
}
};
return _a6;
});
},"dijit/_HasDropDown":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_bc,_bd,_be,dom,_bf,_c0,_c1,_c2,has,_c3,_c4,on,_c5,_c6,_c7,_c8,_c9){
return _bc("dijit._HasDropDown",_c9,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(this.ownerDocument,"mouseup","_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _ca=this.dropDown,_cb=false;
if(e&&this._opened){
var c=_c1.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_cb){
if(_c0.contains(t,"dijitPopup")){
_cb=true;
}else{
t=t.parentNode;
}
}
if(_cb){
t=e.target;
if(_ca.onItemClick){
var _cc;
while(t&&!(_cc=_c6.byNode(t))){
t=t.parentNode;
}
if(_cc&&_cc.onClick&&_cc.getParent){
_cc.getParent().onItemClick(_cc,e);
}
}
return;
}
}
}
if(this._opened){
if(_ca.focus&&_ca.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_ca.focus();
delete this._focusDropDownTimer;
});
}
}else{
this.defer("focus");
}
if(has("ios")){
this._justGotMouseUp=true;
this.defer(function(){
this._justGotMouseUp=false;
});
}
},_onDropDownClick:function(e){
if(has("touch")&&!this._justGotMouseUp){
this._onDropDownMouseDown(e);
this._onDropDownMouseUp(e);
}
if(this._stopClickEvents){
_be.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _cd={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_c0.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_cd+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this._buttonNode,"mousedown",_c4.hitch(this,"_onDropDownMouseDown")),on(this._buttonNode,"click",_c4.hitch(this,"_onDropDownClick")),on(this.focusNode,"keydown",_c4.hitch(this,"_onKey")),on(this.focusNode,"keyup",_c4.hitch(this,"_onKeyUp")));
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_ce=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_be.stop(e);
return;
}
}
if(d&&this._opened&&e.keyCode==_c3.ESCAPE){
this.closeDropDown();
_be.stop(e);
}else{
if(!this._opened&&(e.keyCode==_c3.DOWN_ARROW||((e.keyCode==_c3.ENTER||e.keyCode==dojo.keys.SPACE)&&((_ce.tagName||"").toLowerCase()!=="input"||(_ce.type&&_ce.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_be.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(_c4.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _cf=_c7.curNode&&this.dropDown&&dom.isDescendant(_c7.curNode,this.dropDown.domNode);
this.closeDropDown(_cf);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_d0){
_d0();
},loadAndOpenDropDown:function(){
var d=new _bd(),_d1=_c4.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_d1);
}else{
_d1();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _d2=this.dropDown,_d3=_d2.domNode,_d4=this._aroundNode||this.domNode,_d5=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_d3.style.width){
this._explicitDDWidth=true;
}
if(_d3.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _d6={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_d6.width="";
}
if(!this._explicitDDHeight){
_d6.height="";
}
_c2.set(_d3,_d6);
var _d7=this.maxHeight;
if(_d7==-1){
var _d8=_c5.getBox(this.ownerDocument),_d9=_c1.position(_d4,false);
_d7=Math.floor(Math.max(_d9.y,_d8.h-(_d9.y+_d9.h)));
}
_c8.moveOffScreen(_d2);
if(_d2.startup&&!_d2._started){
_d2.startup();
}
var mb=_c1.getMarginSize(_d3);
var _da=(_d7&&mb.h>_d7);
_c2.set(_d3,{overflowX:"visible",overflowY:_da?"auto":"visible"});
if(_da){
mb.h=_d7;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_d4.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_d4.offsetWidth);
}else{
delete mb.w;
}
}
if(_c4.isFunction(_d2.resize)){
_d2.resize(mb);
}else{
_c1.setMarginBox(_d3,mb);
}
}
var _db=_c8.open({parent:this,popup:_d2,around:_d4,orient:this.dropDownPosition,onExecute:function(){
_d5.closeDropDown(true);
},onCancel:function(){
_d5.closeDropDown(true);
},onClose:function(){
_bf.set(_d5._popupStateNode,"popupActive",false);
_c0.remove(_d5._popupStateNode,"dijitHasDropDownOpen");
_d5._set("_opened",false);
}});
_bf.set(this._popupStateNode,"popupActive","true");
_c0.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this.domNode.setAttribute("aria-expanded","true");
return _db;
},closeDropDown:function(_dc){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this.domNode.setAttribute("aria-expanded","false");
if(_dc){
this.focus();
}
_c8.close(this.dropDown);
this._opened=false;
}
}});
});
},"dijit/tree/TreeStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang"],function(_dd,_de,_df,_e0){
return _df("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(_e1){
_e0.mixin(this,_e1);
this.connects=[];
var _e2=this.store;
if(!_e2.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if(_e2.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_de.after(_e2,"onNew",_e0.hitch(this,"onNewItem"),true),_de.after(_e2,"onDelete",_e0.hitch(this,"onDeleteItem"),true),_de.after(_e2,"onSet",_e0.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_e3,_e4){
if(this.root){
_e3(this.root);
}else{
this.store.fetch({query:this.query,onComplete:_e0.hitch(this,function(_e5){
if(_e5.length!=1){
throw new Error("dijit.tree.TreeStoreModel: root query returned "+_e5.length+" items, but must return exactly one");
}
this.root=_e5[0];
_e3(this.root);
}),onError:_e4});
}
},mayHaveChildren:function(_e6){
return _dd.some(this.childrenAttrs,function(_e7){
return this.store.hasAttribute(_e6,_e7);
},this);
},getChildren:function(_e8,_e9,_ea){
var _eb=this.store;
if(!_eb.isItemLoaded(_e8)){
var _ec=_e0.hitch(this,arguments.callee);
_eb.loadItem({item:_e8,onItem:function(_ed){
_ec(_ed,_e9,_ea);
},onError:_ea});
return;
}
var _ee=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var _ef=_eb.getValues(_e8,this.childrenAttrs[i]);
_ee=_ee.concat(_ef);
}
var _f0=0;
if(!this.deferItemLoadingUntilExpand){
_dd.forEach(_ee,function(_f1){
if(!_eb.isItemLoaded(_f1)){
_f0++;
}
});
}
if(_f0==0){
_e9(_ee);
}else{
_dd.forEach(_ee,function(_f2,idx){
if(!_eb.isItemLoaded(_f2)){
_eb.loadItem({item:_f2,onItem:function(_f3){
_ee[idx]=_f3;
if(--_f0==0){
_e9(_ee);
}
},onError:_ea});
}
});
}
},isItem:function(_f4){
return this.store.isItem(_f4);
},fetchItemByIdentity:function(_f5){
this.store.fetchItemByIdentity(_f5);
},getIdentity:function(_f6){
return this.store.getIdentity(_f6);
},getLabel:function(_f7){
if(this.labelAttr){
return this.store.getValue(_f7,this.labelAttr);
}else{
return this.store.getLabel(_f7);
}
},newItem:function(_f8,_f9,_fa){
var _fb={parent:_f9,attribute:this.childrenAttrs[0]},_fc;
if(this.newItemIdAttr&&_f8[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:_f8[this.newItemIdAttr],scope:this,onItem:function(_fd){
if(_fd){
this.pasteItem(_fd,null,_f9,true,_fa);
}else{
_fc=this.store.newItem(_f8,_fb);
if(_fc&&(_fa!=undefined)){
this.pasteItem(_fc,_f9,_f9,false,_fa);
}
}
}});
}else{
_fc=this.store.newItem(_f8,_fb);
if(_fc&&(_fa!=undefined)){
this.pasteItem(_fc,_f9,_f9,false,_fa);
}
}
},pasteItem:function(_fe,_ff,_100,_101,_102){
var _103=this.store,_104=this.childrenAttrs[0];
if(_ff){
_dd.forEach(this.childrenAttrs,function(attr){
if(_103.containsValue(_ff,attr,_fe)){
if(!_101){
var _105=_dd.filter(_103.getValues(_ff,attr),function(x){
return x!=_fe;
});
_103.setValues(_ff,attr,_105);
}
_104=attr;
}
});
}
if(_100){
if(typeof _102=="number"){
var _106=_103.getValues(_100,_104).slice();
_106.splice(_102,0,_fe);
_103.setValues(_100,_104,_106);
}else{
_103.setValues(_100,_104,_103.getValues(_100,_104).concat(_fe));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_107){
if(!_107){
return;
}
this.getChildren(_107.item,_e0.hitch(this,function(_108){
this.onChildrenChange(_107.item,_108);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_109){
if(_dd.indexOf(this.childrenAttrs,_109)!=-1){
this.getChildren(item,_e0.hitch(this,function(_10a){
this.onChildrenChange(item,_10a);
}));
}else{
this.onChange(item);
}
}});
});
},"dijit/_editor/plugins/EnterKeyHandling":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/_base/window","dojo/window","../_Plugin","../RichText","../range","../../_base/focus"],function(_10b,_10c,_10d,keys,lang,has,win,_10e,_10f,_110,_111,_112){
return _10b("dijit._editor.plugins.EnterKeyHandling",_10f,{blockNodeForEnter:"BR",constructor:function(args){
if(args){
if("blockNodeForEnter" in args){
args.blockNodeForEnter=args.blockNodeForEnter.toUpperCase();
}
lang.mixin(this,args);
}
},setEditor:function(_113){
if(this.editor===_113){
return;
}
this.editor=_113;
if(this.blockNodeForEnter=="BR"){
this.editor.customUndo=true;
_113.onLoadDeferred.then(lang.hitch(this,function(d){
this.connect(_113.document,"onkeypress",function(e){
if(e.charOrCode==keys.ENTER){
var ne=lang.mixin({},e);
ne.shiftKey=true;
if(!this.handleEnterKey(ne)){
_10d.stop(e);
}
}
});
if(has("ie")==9){
this.connect(_113.document,"onpaste",function(e){
setTimeout(dojo.hitch(this,function(){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
r.move("character",1);
r.select();
}),0);
});
}
return d;
}));
}else{
if(this.blockNodeForEnter){
var h=lang.hitch(this,this.handleEnterKey);
_113.addKeyHandler(13,0,0,h);
_113.addKeyHandler(13,0,1,h);
this.connect(this.editor,"onKeyPressed","onKeyPressed");
}
}
},onKeyPressed:function(){
if(this._checkListLater){
if(win.withGlobal(this.editor.window,"isCollapsed",_112)){
var _114=this.editor._sCall("getAncestorElement",["LI"]);
if(!_114){
_110.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
var _115=this.editor._sCall("getAncestorElement",[this.blockNodeForEnter]);
if(_115){
_115.innerHTML=this.bogusHtmlContent;
if(has("ie")){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
}
}else{
console.error("onKeyPressed: Cannot find the new block node");
}
}else{
if(has("mozilla")){
if(_114.parentNode.parentNode.nodeName=="LI"){
_114=_114.parentNode.parentNode;
}
}
var fc=_114.firstChild;
if(fc&&fc.nodeType==1&&(fc.nodeName=="UL"||fc.nodeName=="OL")){
_114.insertBefore(fc.ownerDocument.createTextNode(" "),fc);
var _116=_111.create(this.editor.window);
_116.setStart(_114.firstChild,0);
var _117=_111.getSelection(this.editor.window,true);
_117.removeAllRanges();
_117.addRange(_116);
}
}
}
this._checkListLater=false;
}
if(this._pressedEnterInBlock){
if(this._pressedEnterInBlock.previousSibling){
this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
}
delete this._pressedEnterInBlock;
}
},bogusHtmlContent:"&#160;",blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(e){
var _118,_119,_11a,_11b,_11c,_11d,doc=this.editor.document,br,rs,txt;
if(e.shiftKey){
var _11e=this.editor._sCall("getParentElement",[]);
var _11f=_111.getAncestor(_11e,this.blockNodes);
if(_11f){
if(_11f.tagName=="LI"){
return true;
}
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
if(!_119.collapsed){
_119.deleteContents();
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
}
if(_111.atBeginningOfContainer(_11f,_119.startContainer,_119.startOffset)){
br=doc.createElement("br");
_11a=_111.create(this.editor.window);
_11f.insertBefore(br,_11f.firstChild);
_11a.setStartAfter(br);
_118.removeAllRanges();
_118.addRange(_11a);
}else{
if(_111.atEndOfContainer(_11f,_119.startContainer,_119.startOffset)){
_11a=_111.create(this.editor.window);
br=doc.createElement("br");
_11f.appendChild(br);
_11f.appendChild(doc.createTextNode(" "));
_11a.setStart(_11f.lastChild,0);
_118.removeAllRanges();
_118.addRange(_11a);
}else{
rs=_119.startContainer;
if(rs&&rs.nodeType==3){
txt=rs.nodeValue;
_11b=doc.createTextNode(txt.substring(0,_119.startOffset));
_11c=doc.createTextNode(txt.substring(_119.startOffset));
_11d=doc.createElement("br");
if(_11c.nodeValue==""&&has("webkit")){
_11c=doc.createTextNode(" ");
}
_10c.place(_11b,rs,"after");
_10c.place(_11d,_11b,"after");
_10c.place(_11c,_11d,"after");
_10c.destroy(rs);
_11a=_111.create(this.editor.window);
_11a.setStart(_11c,0);
_118.removeAllRanges();
_118.addRange(_11a);
return false;
}
return true;
}
}
}else{
_118=_111.getSelection(this.editor.window);
if(_118.rangeCount){
_119=_118.getRangeAt(0);
if(_119&&_119.startContainer){
if(!_119.collapsed){
_119.deleteContents();
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
}
rs=_119.startContainer;
if(rs&&rs.nodeType==3){
var _120=false;
var _121=_119.startOffset;
if(rs.length<_121){
ret=this._adjustNodeAndOffset(rs,_121);
rs=ret.node;
_121=ret.offset;
}
txt=rs.nodeValue;
_11b=doc.createTextNode(txt.substring(0,_121));
_11c=doc.createTextNode(txt.substring(_121));
_11d=doc.createElement("br");
if(!_11c.length){
_11c=doc.createTextNode(" ");
_120=true;
}
if(_11b.length){
_10c.place(_11b,rs,"after");
}else{
_11b=rs;
}
_10c.place(_11d,_11b,"after");
_10c.place(_11c,_11d,"after");
_10c.destroy(rs);
_11a=_111.create(this.editor.window);
_11a.setStart(_11c,0);
_11a.setEnd(_11c,_11c.length);
_118.removeAllRanges();
_118.addRange(_11a);
if(_120&&!has("webkit")){
this.editor._sCall("remove",[]);
}else{
this.editor._sCall("collapse",[true]);
}
}else{
var _122;
if(_119.startOffset>=0){
_122=rs.childNodes[_119.startOffset];
}
var _11d=doc.createElement("br");
var _11c=doc.createTextNode(" ");
if(!_122){
rs.appendChild(_11d);
rs.appendChild(_11c);
}else{
_10c.place(_11d,_122,"before");
_10c.place(_11c,_11d,"after");
}
_11a=_111.create(this.editor.window);
_11a.setStart(_11c,0);
_11a.setEnd(_11c,_11c.length);
_118.removeAllRanges();
_118.addRange(_11a);
this.editor._sCall("collapse",[true]);
}
}
}else{
_110.prototype.execCommand.call(this.editor,"inserthtml","<br>");
}
}
return false;
}
var _123=true;
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
if(!_119.collapsed){
_119.deleteContents();
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
}
var _124=_111.getBlockAncestor(_119.endContainer,null,this.editor.editNode);
var _125=_124.blockNode;
if((this._checkListLater=(_125&&(_125.nodeName=="LI"||_125.parentNode.nodeName=="LI")))){
if(has("mozilla")){
this._pressedEnterInBlock=_125;
}
if(/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(_125.innerHTML)){
_125.innerHTML="";
if(has("webkit")){
_11a=_111.create(this.editor.window);
_11a.setStart(_125,0);
_118.removeAllRanges();
_118.addRange(_11a);
}
this._checkListLater=false;
}
return true;
}
if(!_124.blockNode||_124.blockNode===this.editor.editNode){
try{
_110.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
}
catch(e2){
}
_124={blockNode:this.editor._sCall("getAncestorElement",[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(_124.blockNode){
if(_124.blockNode!=this.editor.editNode&&(!(_124.blockNode.textContent||_124.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length)){
this.removeTrailingBr(_124.blockNode);
return false;
}
}else{
_124.blockNode=this.editor.editNode;
}
_118=_111.getSelection(this.editor.window);
_119=_118.getRangeAt(0);
}
var _126=doc.createElement(this.blockNodeForEnter);
_126.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(_124.blockNode);
var _127=_119.endOffset;
var node=_119.endContainer;
if(node.length<_127){
var ret=this._adjustNodeAndOffset(node,_127);
node=ret.node;
_127=ret.offset;
}
if(_111.atEndOfContainer(_124.blockNode,node,_127)){
if(_124.blockNode===_124.blockContainer){
_124.blockNode.appendChild(_126);
}else{
_10c.place(_126,_124.blockNode,"after");
}
_123=false;
_11a=_111.create(this.editor.window);
_11a.setStart(_126,0);
_118.removeAllRanges();
_118.addRange(_11a);
if(this.editor.height){
_10e.scrollIntoView(_126);
}
}else{
if(_111.atBeginningOfContainer(_124.blockNode,_119.startContainer,_119.startOffset)){
_10c.place(_126,_124.blockNode,_124.blockNode===_124.blockContainer?"first":"before");
if(_126.nextSibling&&this.editor.height){
_11a=_111.create(this.editor.window);
_11a.setStart(_126.nextSibling,0);
_118.removeAllRanges();
_118.addRange(_11a);
_10e.scrollIntoView(_126.nextSibling);
}
_123=false;
}else{
if(_124.blockNode===_124.blockContainer){
_124.blockNode.appendChild(_126);
}else{
_10c.place(_126,_124.blockNode,"after");
}
_123=false;
if(_124.blockNode.style){
if(_126.style){
if(_124.blockNode.style.cssText){
_126.style.cssText=_124.blockNode.style.cssText;
}
}
}
rs=_119.startContainer;
var _128;
if(rs&&rs.nodeType==3){
var _129,_12a;
_127=_119.endOffset;
if(rs.length<_127){
ret=this._adjustNodeAndOffset(rs,_127);
rs=ret.node;
_127=ret.offset;
}
txt=rs.nodeValue;
_11b=doc.createTextNode(txt.substring(0,_127));
_11c=doc.createTextNode(txt.substring(_127,txt.length));
_10c.place(_11b,rs,"before");
_10c.place(_11c,rs,"after");
_10c.destroy(rs);
var _12b=_11b.parentNode;
while(_12b!==_124.blockNode){
var tg=_12b.tagName;
var _12c=doc.createElement(tg);
if(_12b.style){
if(_12c.style){
if(_12b.style.cssText){
_12c.style.cssText=_12b.style.cssText;
}
}
}
if(_12b.tagName==="FONT"){
if(_12b.color){
_12c.color=_12b.color;
}
if(_12b.face){
_12c.face=_12b.face;
}
if(_12b.size){
_12c.size=_12b.size;
}
}
_129=_11c;
while(_129){
_12a=_129.nextSibling;
_12c.appendChild(_129);
_129=_12a;
}
_10c.place(_12c,_12b,"after");
_11b=_12b;
_11c=_12c;
_12b=_12b.parentNode;
}
_129=_11c;
if(_129.nodeType==1||(_129.nodeType==3&&_129.nodeValue)){
_126.innerHTML="";
}
_128=_129;
while(_129){
_12a=_129.nextSibling;
_126.appendChild(_129);
_129=_12a;
}
}
_11a=_111.create(this.editor.window);
var _12d;
var _12e=_128;
if(this.blockNodeForEnter!=="BR"){
while(_12e){
_12d=_12e;
_12a=_12e.firstChild;
_12e=_12a;
}
if(_12d&&_12d.parentNode){
_126=_12d.parentNode;
_11a.setStart(_126,0);
_118.removeAllRanges();
_118.addRange(_11a);
if(this.editor.height){
_10e.scrollIntoView(_126);
}
if(has("mozilla")){
this._pressedEnterInBlock=_124.blockNode;
}
}else{
_123=true;
}
}else{
_11a.setStart(_126,0);
_118.removeAllRanges();
_118.addRange(_11a);
if(this.editor.height){
_10e.scrollIntoView(_126);
}
if(has("mozilla")){
this._pressedEnterInBlock=_124.blockNode;
}
}
}
}
return _123;
},_adjustNodeAndOffset:function(node,_12f){
while(node.length<_12f&&node.nextSibling&&node.nextSibling.nodeType==3){
_12f=_12f-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_12f};
},removeTrailingBr:function(_130){
var para=/P|DIV|LI/i.test(_130.tagName)?_130:this.editor._sCall("getParentOfType",[_130,["P","DIV","LI"]]);
if(!para){
return;
}
if(para.lastChild){
if((para.childNodes.length>1&&para.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(para.lastChild.nodeValue))||para.lastChild.tagName=="BR"){
_10c.destroy(para.lastChild);
}
}
if(!para.childNodes.length){
para.innerHTML=this.bogusHtmlContent;
}
}});
});
},"dijit/_MenuBase":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./popup","./registry","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_131,_132,dom,_133,_134,lang,_135,on,_136,_137,pm,_138,_139,_13a,_13b){
return _132("dijit._MenuBase",[_139,_13b,_13a],{parentMenu:null,popupDelay:500,autoFocus:false,postCreate:function(){
var self=this,_13c=function(node){
return _134.contains(node,"dijitMenuItem");
};
this.own(on(this.containerNode,on.selector(_13c,_135.enter),function(){
self.onItemHover(_138.byNode(this));
}),on(this.containerNode,on.selector(_13c,_135.leave),function(){
self.onItemUnhover(_138.byNode(this));
}),on(this.containerNode,on.selector(_13c,_137),function(evt){
self.onItemClick(_138.byNode(this),evt);
evt.stopPropagation();
evt.preventDefault();
}));
this.inherited(arguments);
},onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}else{
var _13d=this._getTopMenu();
if(_13d&&_13d._isMenuBar){
_13d.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _13e=this.currentPopup.parentMenu;
if(_13e.focusedChild){
_13e.focusedChild._setSelected(false);
}
_13e.focusedChild=this.currentPopup.from_item;
_13e.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=this.defer("_openPopup",this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
item._set("hovering",true);
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _13f=item.popup;
if(_13f){
this._stopPendingCloseTimer(_13f);
_13f._pendingClose_timer=this.defer(function(){
_13f._pendingClose_timer=null;
if(_13f.parentMenu){
_13f.parentMenu.currentPopup=null;
}
pm.close(_13f);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
item._set("hovering",false);
},_stopPopupTimer:function(){
if(this.hover_timer){
this.hover_timer=this.hover_timer.remove();
}
},_stopPendingCloseTimer:function(_140){
if(_140._pendingClose_timer){
_140._pendingClose_timer=_140._pendingClose_timer.remove();
}
},_stopFocusTimer:function(){
if(this._focus_timer){
this._focus_timer=this._focus_timer.remove();
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup(evt.type=="keypress");
}else{
this.onExecute();
item._onClick?item._onClick(evt):item.onClick(evt);
}
},_openPopup:function(_141){
this._stopPopupTimer();
var _142=this.focusedChild;
if(!_142){
return;
}
var _143=_142.popup;
if(!_143.isShowingNow){
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_143.parentMenu=this;
_143.from_item=_142;
var self=this;
pm.open({parent:this,popup:_143,around:_142.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_142);
self._cleanUp();
_142._setSelected(true);
self.focusedChild=_142;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_143;
_143.connect(_143.domNode,"onmouseenter",lang.hitch(self,"_onPopupHover"));
}
if(_141&&_143.focus){
_143._focus_timer=this.defer(lang.hitch(_143,function(){
this._focus_timer=null;
this.focus();
}));
}
},_markActive:function(){
this.isActive=true;
_134.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_134.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_131.indexOf(this._focusManager.activeStack,this.id)>=0){
_133.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
this.focusedChild.focusNode.focus();
}
pm.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.onItemUnhover(this.focusedChild);
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this.onItemUnhover(this._hoveredChild);
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
});
},"dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(dojo,_144,has,_145,_146,lang,xhr,json,_147){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _148=dojo.i18n={},_149=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_14a=function(root,_14b,_14c,_14d){
for(var _14e=[_14c+_14d],_14f=_14b.split("-"),_150="",i=0;i<_14f.length;i++){
_150+=(_150?"-":"")+_14f[i];
if(!root||root[_150]){
_14e.push(_14c+_150+"/"+_14d);
}
}
return _14e;
},_151={},_152=function(_153,_154,_155){
_155=_155?_155.toLowerCase():dojo.locale;
_153=_153.replace(/\./g,"/");
_154=_154.replace(/\./g,"/");
return (/root/i.test(_155))?(_153+"/nls/"+_154):(_153+"/nls/"+_155+"/"+_154);
},_156=dojo.getL10nName=function(_157,_158,_159){
return _157=_147.id+"!"+_152(_157,_158,_159);
},_15a=function(_15b,_15c,_15d,_15e,_15f,load){
_15b([_15c],function(root){
var _160=lang.clone(root.root),_161=_14a(!root._v1x&&root,_15f,_15d,_15e);
_15b(_161,function(){
for(var i=1;i<_161.length;i++){
_160=lang.mixin(lang.clone(_160),arguments[i]);
}
var _162=_15c+"/"+_15f;
_151[_162]=_160;
load();
});
});
},_163=function(id,_164){
return /^\./.test(id)?_164(id):id;
},_165=function(_166){
var list=_146.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_166);
return list;
},load=function(id,_167,load){
if(has("dojo-preload-i18n-Api")){
var _168=id.split("*"),_169=_168[1]=="preload";
if(_169){
if(!_151[id]){
_151[id]=1;
_16a(_168[2],json.parse(_168[3]),1,_167);
}
load(1);
}
if(_169||_16b(id,_167,load)){
return;
}
}
var _16c=_149.exec(id),_16d=_16c[1]+"/",_16e=_16c[5]||_16c[4],_16f=_16d+_16e,_170=(_16c[5]&&_16c[4]),_171=_170||dojo.locale,_172=_16f+"/"+_171,_173=_170?[_171]:_165(_171),_174=_173.length,_175=function(){
if(!--_174){
load(lang.delegate(_151[_172]));
}
};
_145.forEach(_173,function(_176){
var _177=_16f+"/"+_176;
if(has("dojo-preload-i18n-Api")){
_178(_177);
}
if(!_151[_177]){
_15a(_167,_16f,_16d,_16e,_176,_175);
}else{
_175();
}
});
};
if(has("dojo-unit-tests")){
var _179=_148.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _17a=_148.normalizeLocale=function(_17b){
var _17c=_17b?_17b.toLowerCase():dojo.locale;
return _17c=="root"?"ROOT":_17c;
},isXd=function(mid,_17d){
return (1&&1)?_17d.isXdUrl(_144.toUrl(mid+".js")):true;
},_17e=0,_17f=[],_16a=_148._preloadLocalizations=function(_180,_181,_182,_183){
_183=_183||_144;
function _184(mid,_185){
if(isXd(mid,_183)||_182){
_183([mid],_185);
}else{
_18f([mid],_185,_183);
}
};
function _186(_187,func){
var _188=_187.split("-");
while(_188.length){
if(func(_188.join("-"))){
return;
}
_188.pop();
}
func("ROOT");
};
function _189(_18a){
_18a=_17a(_18a);
_186(_18a,function(loc){
if(_145.indexOf(_181,loc)>=0){
var mid=_180.replace(/\./g,"/")+"_"+loc;
_17e++;
_184(mid,function(_18b){
for(var p in _18b){
_151[_144.toAbsMid(p)+"/"+loc]=_18b[p];
}
--_17e;
while(!_17e&&_17f.length){
load.apply(null,_17f.shift());
}
});
return true;
}
return false;
});
};
_189();
_145.forEach(dojo.config.extraLocale,_189);
},_16b=function(id,_18c,load){
if(_17e){
_17f.push([id,_18c,load]);
}
return _17e;
},_178=function(){
};
}
if(1){
var _18d={},_18e=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_18f=function(deps,_190,_191){
var _192=[];
_145.forEach(deps,function(mid){
var url=_191.toUrl(mid+".js");
function load(text){
var _193=_18e(text,_178,mid,_18d);
if(_193===_18d){
_192.push(_151[url]=_18d.result);
}else{
if(_193 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_193);
_193={};
}
_192.push(_151[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_193:{root:_193,_v1x:1}));
}
};
if(_151[url]){
_192.push(_151[url]);
}else{
var _194=_191.syncLoadNls(mid);
if(_194){
_192.push(_194);
}else{
if(!xhr){
try{
_191.getText(url,true,load);
}
catch(e){
_192.push(_151[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_192.push(_151[url]={});
}});
}
}
}
});
_190&&_190.apply(null,_192);
};
_178=function(_195){
for(var _196,_197=_195.split("/"),_198=dojo.global[_197[0]],i=1;_198&&i<_197.length-1;_198=_198[_197[i++]]){
}
if(_198){
_196=_198[_197[i]];
if(!_196){
_196=_198[_197[i].replace(/-/g,"_")];
}
if(_196){
_151[_195]=_196;
}
}
return _196;
};
_148.getLocalization=function(_199,_19a,_19b){
var _19c,_19d=_152(_199,_19a,_19b);
load(_19d,(!isXd(_19d,_144)?function(deps,_19e){
_18f(deps,_19e,_144);
}:_144),function(_19f){
_19c=_19f;
});
return _19c;
};
if(has("dojo-unit-tests")){
_179.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _1a0;
_1a0=_18e("{prop:1}",_178,"nonsense",_18d);
t.is({prop:1},_1a0);
t.is(undefined,_1a0[1]);
_1a0=_18e("({prop:1})",_178,"nonsense",_18d);
t.is({prop:1},_1a0);
t.is(undefined,_1a0[1]);
_1a0=_18e("{'prop-x':1}",_178,"nonsense",_18d);
t.is({"prop-x":1},_1a0);
t.is(undefined,_1a0[1]);
_1a0=_18e("({'prop-x':1})",_178,"nonsense",_18d);
t.is({"prop-x":1},_1a0);
t.is(undefined,_1a0[1]);
_1a0=_18e("define({'prop-x':1})",_178,"nonsense",_18d);
t.is(_18d,_1a0);
t.is({"prop-x":1},_18d.result);
_1a0=_18e("define('some/module', {'prop-x':1})",_178,"nonsense",_18d);
t.is(_18d,_1a0);
t.is({"prop-x":1},_18d.result);
_1a0=_18e("this is total nonsense and should throw an error",_178,"nonsense",_18d);
t.is(_1a0 instanceof Error,true);
});
});
}
}
return lang.mixin(_148,{dynamic:true,normalize:_163,load:load,cache:_151});
});
},"dijit/PopupMenuBarItem":function(){
define(["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_1a1,_1a2,_1a3){
var _1a4=_1a3._MenuBarItemMixin;
return _1a1("dijit.PopupMenuBarItem",[_1a2,_1a4],{});
});
},"dijit/tree/ForestStoreModel":function(){
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],function(_1a5,_1a6,_1a7,lang,_1a8){
return _1a6("dijit.tree.ForestStoreModel",_1a8,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_1a9){
this.root={store:this,root:true,id:_1a9.rootId,label:_1a9.rootLabel,children:_1a9.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_1aa,_1ab,_1ac){
if(_1aa===this.root){
if(this.root.children){
_1ab(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_1ad){
this.root.children=_1ad;
_1ab(_1ad);
}),onError:_1ac});
}
}else{
this.inherited(arguments);
}
},isItem:function(_1ae){
return (_1ae===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_1af){
if(_1af.identity==this.root.id){
var _1b0=_1af.scope||_1a7.global;
if(_1af.onItem){
_1af.onItem.call(_1b0,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_1b1,_1b2){
if(_1b1===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_1b3,_1b4,_1b5,_1b6,_1b7){
if(_1b4===this.root){
if(!_1b6){
this.onLeaveRoot(_1b3);
}
}
this.inherited(arguments,[_1b3,_1b4===this.root?null:_1b4,_1b5===this.root?null:_1b5,_1b6,_1b7]);
if(_1b5===this.root){
this.onAddToRoot(_1b3);
}
},onAddToRoot:function(item){
},onLeaveRoot:function(item){
},_requeryTop:function(){
var _1b8=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_1b9){
this.root.children=_1b9;
if(_1b8.length!=_1b9.length||_1a5.some(_1b8,function(item,idx){
return _1b9[idx]!=item;
})){
this.onChildrenChange(this.root,_1b9);
}
})});
},onNewItem:function(item,_1ba){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_1a5.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_1bb,_1bc,_1bd){
this._requeryTop();
this.inherited(arguments);
}});
});
},"url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='onclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeypress:_onTitleKeyPress'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" data-dojo-attach-point='iconNode' style=\"vertical-align: middle\" role=\"presentation\"/>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n","dijit/TitlePane":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/fx","dojo/_base/kernel","dojo/keys","./_CssStateMixin","./_TemplatedMixin","./layout/ContentPane","dojo/text!./templates/TitlePane.html","./_base/manager"],function(_1be,_1bf,dom,_1c0,_1c1,_1c2,_1c3,_1c4,_1c5,keys,_1c6,_1c7,_1c8,_1c9,_1ca){
return _1bf("dijit.TitlePane",[_1c8,_1c7,_1c6],{title:"",_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:true,toggleable:true,tabIndex:"0",duration:_1ca.defaultDuration,baseClass:"dijitTitlePane",templateString:_1c9,doLayout:false,_setTooltipAttr:{node:"focusNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _1cb=this.hideNode,_1cc=this.wipeNode;
this._wipeIn=_1c4.wipeIn({node:_1cc,duration:this.duration,beforeBegin:function(){
_1cb.style.display="";
}});
this._wipeOut=_1c4.wipeOut({node:_1cc,duration:this.duration,onEnd:function(){
_1cb.style.display="none";
}});
},_setOpenAttr:function(open,_1cd){
_1be.forEach([this._wipeIn,this._wipeOut],function(_1ce){
if(_1ce&&_1ce.status()=="playing"){
_1ce.stop();
}
});
if(_1cd){
var anim=this[open?"_wipeIn":"_wipeOut"];
anim.play();
}else{
this.hideNode.style.display=this.wipeNode.style.display=open?"":"none";
}
if(this._started){
if(open){
this._onShow();
}else{
this.onHide();
}
}
this.containerNode.setAttribute("aria-hidden",open?"false":"true");
this.focusNode.setAttribute("aria-pressed",open?"true":"false");
this._set("open",open);
this._setCss();
},_setToggleableAttr:function(_1cf){
this.focusNode.setAttribute("role",_1cf?"button":"heading");
if(_1cf){
this.focusNode.setAttribute("aria-controls",this.id+"_pane");
_1c0.set(this.focusNode,"tabIndex",this.tabIndex);
}else{
_1c0.remove(this.focusNode,"tabIndex");
}
this._set("toggleable",_1cf);
this._setCss();
},_setContentAttr:function(_1d0){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
_1c2.setMarginBox(this.wipeNode,{h:_1c2.getMarginBox(this.wipeNode).h});
this.inherited(arguments);
if(this._wipeIn){
this._wipeIn.play();
}else{
this.hideNode.style.display="";
}
}
},toggle:function(){
this._setOpenAttr(!this.open,true);
},_setCss:function(){
var node=this.titleBarNode||this.focusNode;
var _1d1=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
_1c1.replace(node,this._titleBarClass,_1d1||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.keyCode==keys.ENTER||e.keyCode==keys.SPACE){
if(this.toggleable){
this.toggle();
_1c3.stop(e);
}
}else{
if(e.keyCode==keys.DOWN_ARROW&&this.open){
this.containerNode.focus();
e.preventDefault();
}
}
},_onTitleClick:function(){
if(this.toggleable){
this.toggle();
}
},setTitle:function(_1d2){
_1c5.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_1d2);
}});
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/i18n!./nls/ComboBox"],function(_1d3,_1d4,_1d5,i18n){
return _1d4("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_1d6){
this.value=_1d6;
this.onChange(_1d6);
},onClick:function(node){
if(node==this.previousButton){
this._setSelectedAttr(null);
this.onPage(-1);
}else{
if(node==this.nextButton){
this._setSelectedAttr(null);
this.onPage(1);
}else{
this.onChange(node);
}
}
},onChange:function(){
},onPage:function(){
},onClose:function(){
this._setSelectedAttr(null);
},_createOption:function(item,_1d7){
var _1d8=this._createMenuItem();
var _1d9=_1d7(item);
if(_1d9.html){
_1d8.innerHTML=_1d9.label;
}else{
_1d8.appendChild(_1d8.ownerDocument.createTextNode(_1d9.label));
}
if(_1d8.innerHTML==""){
_1d8.innerHTML="&#160;";
}
this.applyTextDir(_1d8,(_1d8.innerText||_1d8.textContent||""));
return _1d8;
},createOptions:function(_1da,_1db,_1dc){
this.items=_1da;
this.previousButton.style.display=(_1db.start==0)?"none":"";
_1d5.set(this.previousButton,"id",this.id+"_prev");
_1d3.forEach(_1da,function(item,i){
var _1dd=this._createOption(item,_1dc);
_1dd.setAttribute("item",i);
_1d5.set(_1dd,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_1dd,this.nextButton);
},this);
var _1de=false;
if(_1da.total&&!_1da.total.then&&_1da.total!=-1){
if((_1db.start+_1db.count)<_1da.total){
_1de=true;
}else{
if((_1db.start+_1db.count)>_1da.total&&_1db.count==_1da.length){
_1de=true;
}
}
}else{
if(_1db.count==_1da.length){
_1de=true;
}
}
this.nextButton.style.display=_1de?"":"none";
_1d5.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _1df=this.containerNode;
while(_1df.childNodes.length>2){
_1df.removeChild(_1df.childNodes[_1df.childNodes.length-2]);
}
this._setSelectedAttr(null);
},highlightFirstOption:function(){
this.selectFirstNode();
},highlightLastOption:function(){
this.selectLastNode();
},selectFirstNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.previousButton){
this.selectNextNode();
}
},selectLastNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.nextButton){
this.selectPreviousNode();
}
},getHighlightedOption:function(){
return this.selected;
}});
});
},"dijit/form/_SearchMixin":function(){
define("dijit/form/_SearchMixin",["dojo/data/util/filter","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/sniff","dojo/string","dojo/when","../registry"],function(_1e0,_1e1,_1e2,keys,lang,_1e3,has,_1e4,when,_1e5){
return _1e1("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:true,_abortQuery:function(){
if(this.searchTimer){
this.searchTimer=this.searchTimer.remove();
}
if(this._queryDeferHandle){
this._queryDeferHandle=this._queryDeferHandle.remove();
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._cancelingQuery=true;
this._fetchHandle.abort();
this._cancelingQuery=false;
}
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_processInput:function(evt){
if(this.disabled||this.readOnly){
return;
}
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==keys.SHIFT){
return;
}
var _1e6=false;
this._prev_key_backspace=false;
switch(key){
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
this._maskValidSubsetError=true;
_1e6=true;
break;
default:
_1e6=typeof key=="string"||key==229;
}
if(_1e6){
if(!this.store){
this.onSearch();
}else{
this.searchTimer=this.defer("_startSearchFromInput",1);
}
}
},onSearch:function(){
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_startSearch:function(text){
this._abortQuery();
var _1e7=this,_1e3=lang.clone(this.query),_1e8={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}},qs=_1e4.substitute(this.queryExpr,[text]),q,_1e9=function(){
var _1ea=_1e7._fetchHandle=_1e7.store.query(_1e3,_1e8);
if(_1e7.disabled||_1e7.readOnly||(q!==_1e7._lastQuery)){
return;
}
when(_1ea,function(res){
_1e7._fetchHandle=null;
if(!_1e7.disabled&&!_1e7.readOnly&&(q===_1e7._lastQuery)){
when(_1ea.total,function(_1eb){
res.total=_1eb;
var _1ec=_1e7.pageSize;
if(isNaN(_1ec)||_1ec>res.total){
_1ec=res.total;
}
res.nextPage=function(_1ed){
_1e8.direction=_1ed=_1ed!==false;
_1e8.count=_1ec;
if(_1ed){
_1e8.start+=res.length;
if(_1e8.start>=res.total){
_1e8.count=0;
}
}else{
_1e8.start-=_1ec;
if(_1e8.start<0){
_1e8.count=Math.max(_1ec+_1e8.start,0);
_1e8.start=0;
}
}
if(_1e8.count<=0){
res.length=0;
_1e7.onSearch(res,_1e3,_1e8);
}else{
_1e9();
}
};
_1e7.onSearch(res,_1e3,_1e8);
});
}
},function(err){
_1e7._fetchHandle=null;
if(!_1e7._cancelingQuery){
console.error(_1e7.declaredClass+" "+err.toString());
}
});
};
lang.mixin(_1e8,this.fetchProperties);
if(this.store._oldAPI){
q=qs;
}else{
q=_1e0.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_1e3[this.searchAttr]=q;
this._queryDeferHandle=this.defer(_1e9,this.searchDelay);
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var list=this.list;
if(list){
this.store=_1e5.byId(list);
}
}
this.inherited(arguments);
}});
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n","dijit/form/ToggleButton":function(){
define("dijit/form/ToggleButton",["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_1ee,_1ef,_1f0,_1f1){
return _1ee("dijit.form.ToggleButton",[_1f0,_1f1],{baseClass:"dijitToggleButton",setChecked:function(_1f2){
_1ef.deprecated("setChecked("+_1f2+") is deprecated. Use set('checked',"+_1f2+") instead.","","2.0");
this.set("checked",_1f2);
}});
});
},"dijit/form/NumberSpinner":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","./_Spinner","./NumberTextBox"],function(_1f3,_1f4,keys,_1f5,_1f6){
return _1f3("dijit.form.NumberSpinner",[_1f5,_1f6.Mixin],{adjust:function(val,_1f7){
var tc=this.constraints,v=isNaN(val),_1f8=!isNaN(tc.max),_1f9=!isNaN(tc.min);
if(v&&_1f7!=0){
val=(_1f7>0)?_1f9?tc.min:_1f8?tc.max:0:_1f8?this.constraints.max:_1f9?tc.min:0;
}
var _1fa=val+_1f7;
if(v||isNaN(_1fa)){
return val;
}
if(_1f8&&(_1fa>tc.max)){
_1fa=tc.max;
}
if(_1f9&&(_1fa<tc.min)){
_1fa=tc.min;
}
return _1fa;
},_onKeyPress:function(e){
if((e.charOrCode==keys.HOME||e.charOrCode==keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _1fb=this.constraints[(e.charOrCode==keys.HOME?"min":"max")];
if(typeof _1fb=="number"){
this._setValueAttr(_1fb,false);
}
_1f4.stop(e);
}
}});
});
},"dijit/form/Textarea":function(){
define(["dojo/_base/declare","dojo/dom-style","./_ExpandingTextAreaMixin","./SimpleTextarea"],function(_1fc,_1fd,_1fe,_1ff){
return _1fc("dijit.form.Textarea",[_1ff,_1fe],{baseClass:"dijitTextBox dijitTextArea dijitExpandingTextArea",cols:"",buildRendering:function(){
this.inherited(arguments);
_1fd.set(this.textbox,{overflowY:"hidden",overflowX:"auto",boxSizing:"border-box",MsBoxSizing:"border-box",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box"});
}});
});
},"dijit/form/DateTextBox":function(){
define(["dojo/_base/declare","../Calendar","./_DateTimeTextBox"],function(_200,_201,_202){
return _200("dijit.form.DateTextBox",_202,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:_201,_selector:"date",value:new Date("")});
});
},"dijit/form/ComboButton":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_203,_204,keys,_205,_206,_207){
return _203("dijit.form.ComboButton",_206,{templateString:_207,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_205.focus(this._popupStateNode);
_204.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_205.focus(this.titleNode);
_204.stop(evt);
}
},focus:function(_208){
if(!this.disabled){
_205.focus(_208=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/layout/AccordionContainer":function(){
require({cache:{"url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='onclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeypress:_onTitleKeyPress'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" data-dojo-attach-point='iconNode' style=\"vertical-align: middle\" role=\"presentation\"/>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n"}});
define("dijit/layout/AccordionContainer",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/fx","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/topic","../focus","../_base/manager","dojo/ready","../_Widget","../_Container","../_TemplatedMixin","../_CssStateMixin","./StackContainer","./ContentPane","dojo/text!./templates/AccordionButton.html"],function(_209,_20a,_20b,_20c,fx,dom,_20d,_20e,_20f,_210,keys,lang,has,_211,_212,_213,_214,_215,_216,_217,_218,_219,_21a,_21b){
var _21c=_20b("dijit.layout._AccordionButton",[_215,_217,_218],{templateString:_21b,label:"",_setLabelAttr:{node:"titleTextNode",type:"innerHTML"},title:"",_setTitleAttr:{node:"titleTextNode",type:"attribute",attribute:"title"},iconClassAttr:"",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitAccordionTitle",getParent:function(){
return this.parent;
},buildRendering:function(){
this.inherited(arguments);
var _21d=this.id.replace(" ","_");
_20d.set(this.titleTextNode,"id",_21d+"_title");
this.focusNode.setAttribute("aria-labelledby",_20d.get(this.titleTextNode,"id"));
dom.setSelectable(this.domNode,false);
},getTitleHeight:function(){
return _210.getMarginSize(this.domNode).h;
},_onTitleClick:function(){
var _21e=this.getParent();
_21e.selectChild(this.contentWidget,true);
_212.focus(this.focusNode);
},_onTitleKeyPress:function(evt){
return this.getParent()._onKeyPress(evt,this.contentWidget);
},_setSelectedAttr:function(_21f){
this._set("selected",_21f);
this.focusNode.setAttribute("aria-expanded",_21f?"true":"false");
this.focusNode.setAttribute("aria-selected",_21f?"true":"false");
this.focusNode.setAttribute("tabIndex",_21f?"0":"-1");
}});
var _220=_20b("dijit.layout._AccordionInnerContainer",[_215,_218],{baseClass:"dijitAccordionInnerContainer",isLayoutContainer:true,buildRendering:function(){
this.domNode=_20f.place("<div class='"+this.baseClass+"' role='presentation'>",this.contentWidget.domNode,"after");
var _221=this.contentWidget,cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
this.button=_221._buttonWidget=(new cls({contentWidget:_221,label:_221.title,title:_221.tooltip,dir:_221.dir,lang:_221.lang,textDir:_221.textDir,iconClass:_221.iconClass,id:_221.id+"_button",parent:this.parent})).placeAt(this.domNode);
this.containerNode=_20f.place("<div class='dijitAccordionChildWrapper' style='display:none'>",this.domNode);
_20f.place(this.contentWidget.domNode,this.containerNode);
},postCreate:function(){
this.inherited(arguments);
var _222=this.button;
this._contentWidgetWatches=[this.contentWidget.watch("title",lang.hitch(this,function(name,_223,_224){
_222.set("label",_224);
})),this.contentWidget.watch("tooltip",lang.hitch(this,function(name,_225,_226){
_222.set("title",_226);
})),this.contentWidget.watch("iconClass",lang.hitch(this,function(name,_227,_228){
_222.set("iconClass",_228);
}))];
},_setSelectedAttr:function(_229){
this._set("selected",_229);
this.button.set("selected",_229);
if(_229){
var cw=this.contentWidget;
if(cw.onSelected){
cw.onSelected();
}
}
},startup:function(){
this.contentWidget.startup();
},destroy:function(){
this.button.destroyRecursive();
_20a.forEach(this._contentWidgetWatches||[],function(w){
w.unwatch();
});
delete this.contentWidget._buttonWidget;
delete this.contentWidget._wrapperWidget;
this.inherited(arguments);
},destroyDescendants:function(_22a){
this.contentWidget.destroyRecursive(_22a);
}});
var _22b=_20b("dijit.layout.AccordionContainer",_219,{duration:_213.defaultDuration,buttonWidget:_21c,baseClass:"dijitAccordionContainer",buildRendering:function(){
this.inherited(arguments);
this.domNode.style.overflow="hidden";
this.domNode.setAttribute("role","tablist");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.selectedChildWidget){
this.selectedChildWidget._wrapperWidget.set("selected",true);
}
},layout:function(){
var _22c=this.selectedChildWidget;
if(!_22c){
return;
}
var _22d=_22c._wrapperWidget.domNode,_22e=_210.getMarginExtents(_22d),_22f=_210.getPadBorderExtents(_22d),_230=_22c._wrapperWidget.containerNode,_231=_210.getMarginExtents(_230),_232=_210.getPadBorderExtents(_230),_233=this._contentBox;
var _234=0;
_20a.forEach(this.getChildren(),function(_235){
if(_235!=_22c){
_234+=_210.getMarginSize(_235._wrapperWidget.domNode).h;
}
});
this._verticalSpace=_233.h-_234-_22e.h-_22f.h-_231.h-_232.h-_22c._buttonWidget.getTitleHeight();
this._containerContentBox={h:this._verticalSpace,w:this._contentBox.w-_22e.w-_22f.w-_231.w-_232.w};
if(_22c){
_22c.resize(this._containerContentBox);
}
},_setupChild:function(_236){
_236._wrapperWidget=_220({contentWidget:_236,buttonWidget:this.buttonWidget,id:_236.id+"_wrapper",dir:_236.dir,lang:_236.lang,textDir:_236.textDir,parent:this});
this.inherited(arguments);
},addChild:function(_237,_238){
if(this._started){
var _239=this.containerNode;
if(_238&&typeof _238=="number"){
var _23a=_215.prototype.getChildren.call(this);
if(_23a&&_23a.length>=_238){
_239=_23a[_238-1].domNode;
_238="after";
}
}
_20f.place(_237.domNode,_239,_238);
if(!_237._started){
_237.startup();
}
this._setupChild(_237);
_211.publish(this.id+"-addChild",_237,_238);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_237);
}
}else{
this.inherited(arguments);
}
},removeChild:function(_23b){
if(_23b._wrapperWidget){
_20f.place(_23b.domNode,_23b._wrapperWidget.domNode,"after");
_23b._wrapperWidget.destroy();
delete _23b._wrapperWidget;
}
_20e.remove(_23b.domNode,"dijitHidden");
this.inherited(arguments);
},getChildren:function(){
return _20a.map(this.inherited(arguments),function(_23c){
return _23c.declaredClass=="dijit.layout._AccordionInnerContainer"?_23c.contentWidget:_23c;
},this);
},destroy:function(){
if(this._animation){
this._animation.stop();
}
_20a.forEach(this.getChildren(),function(_23d){
if(_23d._wrapperWidget){
_23d._wrapperWidget.destroy();
}else{
_23d.destroyRecursive();
}
});
this.inherited(arguments);
},_showChild:function(_23e){
_23e._wrapperWidget.containerNode.style.display="block";
return this.inherited(arguments);
},_hideChild:function(_23f){
_23f._wrapperWidget.containerNode.style.display="none";
this.inherited(arguments);
},_transition:function(_240,_241,_242){
if(has("ie")<8){
_242=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var self=this;
if(_240){
_240._wrapperWidget.set("selected",true);
var d=this._showChild(_240);
if(this.doLayout&&_240.resize){
_240.resize(this._containerContentBox);
}
}
if(_241){
_241._wrapperWidget.set("selected",false);
if(!_242){
this._hideChild(_241);
}
}
if(_242){
var _243=_240._wrapperWidget.containerNode,_244=_241._wrapperWidget.containerNode;
var _245=_240._wrapperWidget.containerNode,_246=_210.getMarginExtents(_245),_247=_210.getPadBorderExtents(_245),_248=_246.h+_247.h;
_244.style.height=(self._verticalSpace-_248)+"px";
this._animation=new fx.Animation({node:_243,duration:this.duration,curve:[1,this._verticalSpace-_248-1],onAnimate:function(_249){
_249=Math.floor(_249);
_243.style.height=_249+"px";
_244.style.height=(self._verticalSpace-_248-_249)+"px";
},onEnd:function(){
delete self._animation;
_243.style.height="auto";
_241._wrapperWidget.containerNode.style.display="none";
_244.style.height="auto";
self._hideChild(_241);
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
},_onKeyPress:function(e,_24a){
if(this.disabled||e.altKey||!(_24a||e.ctrlKey)){
return;
}
var c=e.charOrCode;
if((_24a&&(c==keys.LEFT_ARROW||c==keys.UP_ARROW))||(e.ctrlKey&&c==keys.PAGE_UP)){
this._adjacent(false)._buttonWidget._onTitleClick();
_20c.stop(e);
}else{
if((_24a&&(c==keys.RIGHT_ARROW||c==keys.DOWN_ARROW))||(e.ctrlKey&&(c==keys.PAGE_DOWN||c==keys.TAB))){
this._adjacent(true)._buttonWidget._onTitleClick();
_20c.stop(e);
}
}
}});
if(has("dijit-legacy-requires")){
_214(0,function(){
var _24b=["dijit/layout/AccordionPane"];
_209(_24b);
});
}
_22b._InnerContainer=_220;
_22b._Button=_21c;
return _22b;
});
},"dijit/layout/SplitContainer":function(){
define("dijit/layout/SplitContainer",["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/sniff","../registry","../_WidgetBase","./_LayoutWidget"],function(_24c,_24d,_24e,dom,_24f,_250,_251,_252,_253,_254,lang,on,has,_255,_256,_257){
var _258=_24e("dijit.layout.SplitContainer",_257,{constructor:function(){
_254.deprecated("dijit.layout.SplitContainer is deprecated","use BorderContainer with splitter instead",2);
},activeSizing:false,sizerWidth:7,orientation:"horizontal",persist:true,baseClass:"dijitSplitContainer",postMixInProperties:function(){
this.inherited("postMixInProperties",arguments);
this.isHorizontal=(this.orientation=="horizontal");
},postCreate:function(){
this.inherited(arguments);
this.sizers=[];
if(has("mozilla")){
this.domNode.style.overflow="-moz-scrollbars-none";
}
if(typeof this.sizerWidth=="object"){
try{
this.sizerWidth=parseInt(this.sizerWidth.toString());
}
catch(e){
this.sizerWidth=7;
}
}
var _259=this.ownerDocument.createElement("div");
this.virtualSizer=_259;
_259.style.position="relative";
_259.style.zIndex=10;
_259.className=this.isHorizontal?"dijitSplitContainerVirtualSizerH":"dijitSplitContainerVirtualSizerV";
this.domNode.appendChild(_259);
dom.setSelectable(_259,false);
},destroy:function(){
delete this.virtualSizer;
if(this._ownconnects){
var h;
while(h=this._ownconnects.pop()){
h.remove();
}
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_24c.forEach(this.getChildren(),function(_25a,i,_25b){
this._setupChild(_25a);
if(i<_25b.length-1){
this._addSizer();
}
},this);
if(this.persist){
this._restoreState();
}
this.inherited(arguments);
},_setupChild:function(_25c){
this.inherited(arguments);
_25c.domNode.style.position="absolute";
_24f.add(_25c.domNode,"dijitSplitPane");
},_onSizerMouseDown:function(e){
if(e.target.id){
for(var i=0;i<this.sizers.length;i++){
if(this.sizers[i].id==e.target.id){
break;
}
}
if(i<this.sizers.length){
this.beginSizing(e,i);
}
}
},_addSizer:function(_25d){
_25d=_25d===undefined?this.sizers.length:_25d;
var _25e=this.ownerDocument.createElement("div");
_25e.id=_255.getUniqueId("dijit_layout_SplitterContainer_Splitter");
this.sizers.splice(_25d,0,_25e);
this.domNode.appendChild(_25e);
_25e.className=this.isHorizontal?"dijitSplitContainerSizerH":"dijitSplitContainerSizerV";
var _25f=this.ownerDocument.createElement("div");
_25f.className="thumb";
_25e.appendChild(_25f);
this.connect(_25e,"onmousedown","_onSizerMouseDown");
dom.setSelectable(_25e,false);
},removeChild:function(_260){
if(this.sizers.length){
var i=_24c.indexOf(this.getChildren(),_260);
if(i!=-1){
if(i==this.sizers.length){
i--;
}
_250.destroy(this.sizers[i]);
this.sizers.splice(i,1);
}
}
this.inherited(arguments);
if(this._started){
this.layout();
}
},addChild:function(_261,_262){
this.inherited(arguments);
if(this._started){
var _263=this.getChildren();
if(_263.length>1){
this._addSizer(_262);
}
this.layout();
}
},layout:function(){
this.paneWidth=this._contentBox.w;
this.paneHeight=this._contentBox.h;
var _264=this.getChildren();
if(!_264.length){
return;
}
var _265=this.isHorizontal?this.paneWidth:this.paneHeight;
if(_264.length>1){
_265-=this.sizerWidth*(_264.length-1);
}
var _266=0;
_24c.forEach(_264,function(_267){
_266+=_267.sizeShare;
});
var _268=_265/_266;
var _269=0;
_24c.forEach(_264.slice(0,_264.length-1),function(_26a){
var size=Math.round(_268*_26a.sizeShare);
_26a.sizeActual=size;
_269+=size;
});
_264[_264.length-1].sizeActual=_265-_269;
this._checkSizes();
var pos=0;
var size=_264[0].sizeActual;
this._movePanel(_264[0],pos,size);
_264[0].position=pos;
pos+=size;
if(!this.sizers){
return;
}
_24c.some(_264.slice(1),function(_26b,i){
if(!this.sizers[i]){
return true;
}
this._moveSlider(this.sizers[i],pos,this.sizerWidth);
this.sizers[i].position=pos;
pos+=this.sizerWidth;
size=_26b.sizeActual;
this._movePanel(_26b,pos,size);
_26b.position=pos;
pos+=size;
},this);
},_movePanel:function(_26c,pos,size){
var box;
if(this.isHorizontal){
_26c.domNode.style.left=pos+"px";
_26c.domNode.style.top=0;
box={w:size,h:this.paneHeight};
if(_26c.resize){
_26c.resize(box);
}else{
_251.setMarginBox(_26c.domNode,box);
}
}else{
_26c.domNode.style.left=0;
_26c.domNode.style.top=pos+"px";
box={w:this.paneWidth,h:size};
if(_26c.resize){
_26c.resize(box);
}else{
_251.setMarginBox(_26c.domNode,box);
}
}
},_moveSlider:function(_26d,pos,size){
if(this.isHorizontal){
_26d.style.left=pos+"px";
_26d.style.top=0;
_251.setMarginBox(_26d,{w:size,h:this.paneHeight});
}else{
_26d.style.left=0;
_26d.style.top=pos+"px";
_251.setMarginBox(_26d,{w:this.paneWidth,h:size});
}
},_growPane:function(_26e,pane){
if(_26e>0){
if(pane.sizeActual>pane.sizeMin){
if((pane.sizeActual-pane.sizeMin)>_26e){
pane.sizeActual=pane.sizeActual-_26e;
_26e=0;
}else{
_26e-=pane.sizeActual-pane.sizeMin;
pane.sizeActual=pane.sizeMin;
}
}
}
return _26e;
},_checkSizes:function(){
var _26f=0;
var _270=0;
var _271=this.getChildren();
_24c.forEach(_271,function(_272){
_270+=_272.sizeActual;
_26f+=_272.sizeMin;
});
if(_26f<=_270){
var _273=0;
_24c.forEach(_271,function(_274){
if(_274.sizeActual<_274.sizeMin){
_273+=_274.sizeMin-_274.sizeActual;
_274.sizeActual=_274.sizeMin;
}
});
if(_273>0){
var list=this.isDraggingLeft?_271.reverse():_271;
_24c.forEach(list,function(_275){
_273=this._growPane(_273,_275);
},this);
}
}else{
_24c.forEach(_271,function(_276){
_276.sizeActual=Math.round(_270*(_276.sizeMin/_26f));
});
}
},beginSizing:function(e,i){
var _277=this.getChildren();
this.paneBefore=_277[i];
this.paneAfter=_277[i+1];
this.paneBefore.sizeBeforeDrag=this.paneBefore.sizeActual;
this.paneAfter.sizeBeforeDrag=this.paneAfter.sizeActual;
this.paneAfter.positionBeforeDrag=this.paneAfter.position;
this.isSizing=true;
this.sizingSplitter=this.sizers[i];
this.sizingSplitter.positionBeforeDrag=_252.get(this.sizingSplitter,(this.isHorizontal?"left":"top"));
if(!this.cover){
this.cover=_250.create("div",{style:{position:"absolute",zIndex:5,top:0,left:0,width:"100%",height:"100%"}},this.domNode);
}else{
this.cover.style.zIndex=5;
}
this.sizingSplitter.style.zIndex=6;
this.startPoint=this.lastPoint=(this.isHorizontal?e.pageX:e.pageY);
this.maxDelta=this.paneAfter.sizeActual-this.paneAfter.sizeMin;
this.minDelta=-1*(this.paneBefore.sizeActual-this.paneBefore.sizeMin);
if(!this.activeSizing){
this._showSizingLine();
}
this._ownconnects=[on(this.ownerDocument.documentElement,"mousemove",lang.hitch(this,"changeSizing")),on(this.ownerDocument.documentElement,"mouseup",lang.hitch(this,"endSizing"))];
_253.stop(e);
},changeSizing:function(e){
if(!this.isSizing){
return;
}
this.lastPoint=this.isHorizontal?e.pageX:e.pageY;
var _278=Math.max(Math.min(this.lastPoint-this.startPoint,this.maxDelta),this.minDelta);
if(this.activeSizing){
this._updateSize(_278);
}else{
this._moveSizingLine(_278);
}
_253.stop(e);
},endSizing:function(){
if(!this.isSizing){
return;
}
if(this.cover){
this.cover.style.zIndex=-1;
}
if(!this.activeSizing){
this._hideSizingLine();
}
var _279=Math.max(Math.min(this.lastPoint-this.startPoint,this.maxDelta),this.minDelta);
this._updateSize(_279);
this.isSizing=false;
if(this.persist){
this._saveState(this);
}
var h;
while(h=this._ownconnects.pop()){
h.remove();
}
},_updateSize:function(_27a){
this.paneBefore.sizeActual=this.paneBefore.sizeBeforeDrag+_27a;
this.paneAfter.position=this.paneAfter.positionBeforeDrag+_27a;
this.paneAfter.sizeActual=this.paneAfter.sizeBeforeDrag-_27a;
_24c.forEach(this.getChildren(),function(_27b){
_27b.sizeShare=_27b.sizeActual;
});
if(this._started){
this.layout();
}
},_showSizingLine:function(){
this._moveSizingLine(0);
_251.setMarginBox(this.virtualSizer,this.isHorizontal?{w:this.sizerWidth,h:this.paneHeight}:{w:this.paneWidth,h:this.sizerWidth});
this.virtualSizer.style.display="block";
},_hideSizingLine:function(){
this.virtualSizer.style.display="none";
},_moveSizingLine:function(_27c){
var pos=_27c+this.sizingSplitter.positionBeforeDrag;
_252.set(this.virtualSizer,(this.isHorizontal?"left":"top"),pos+"px");
},_getCookieName:function(i){
return this.id+"_"+i;
},_restoreState:function(){
_24c.forEach(this.getChildren(),function(_27d,i){
var _27e=this._getCookieName(i);
var _27f=_24d(_27e);
if(_27f){
var pos=parseInt(_27f);
if(typeof pos=="number"){
_27d.sizeShare=pos;
}
}
},this);
},_saveState:function(){
if(!this.persist){
return;
}
_24c.forEach(this.getChildren(),function(_280,i){
_24d(this._getCookieName(i),_280.sizeShare,{expires:365});
},this);
}});
_258.ChildWidgetProperties={sizeMin:10,sizeShare:10};
lang.extend(_256,_258.ChildWidgetProperties);
return _258;
});
},"url:dijit/templates/Calendar.html":"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"onclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n","dijit/form/_AutoCompleterMixin":function(){
define(["dojo/data/util/filter","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/sniff","dojo/string","./DataList","../registry","./_TextBoxMixin","./_SearchMixin"],function(_281,_282,_283,_284,keys,lang,_285,_286,has,_287,_288,_289,_28a,_28b){
return _282("dijit.form._AutoCompleterMixin",_28b,{item:null,autoComplete:true,highlightMatch:"first",labelAttr:"",labelType:"text",maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_28c){
var pos=0;
if(typeof (_28c.selectionStart)=="number"){
pos=_28c.selectionStart;
}else{
if(has("ie")){
var tr=_28c.ownerDocument.selection.createRange().duplicate();
var ntr=_28c.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_28d,_28e){
_28e=parseInt(_28e);
_28a.selectInputText(_28d,_28e,_28e);
},_setDisabledAttr:function(_28f){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_28f?"true":"false");
},_onKey:function(evt){
if(evt.charCode>=32){
return;
}
var key=evt.charCode||evt.keyCode;
if(key==keys.ALT||key==keys.CTRL||key==keys.META||key==keys.SHIFT){
return;
}
var pw=this.dropDown;
var _290=null;
this._abortQuery();
this.inherited(arguments);
if(evt.altKey||evt.ctrlKey||evt.metaKey){
return;
}
if(this._opened){
_290=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_290);
}
_284.stop(evt);
break;
case keys.ENTER:
if(_290){
if(_290==pw.nextButton){
this._nextSearch(1);
_284.stop(evt);
break;
}else{
if(_290==pw.previousButton){
this._nextSearch(-1);
_284.stop(evt);
break;
}
}
_284.stop(evt);
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
case keys.TAB:
var _291=this.get("displayedValue");
if(pw&&(_291==pw._messages["previousMessage"]||_291==pw._messages["nextMessage"])){
break;
}
if(_290){
this._selectOption(_290);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_28a.selectInputText(fn,fn.value.length);
var _292=this.ignoreCase?"toLowerCase":"substr";
if(text[_292](0).indexOf(this.focusNode.value[_292](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_28a.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_28a.selectInputText(fn);
}
},_openResultList:function(_293,_294,_295){
var _296=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_293.length&&_295.start==0){
this.closeDropDown();
return;
}
this._nextSearch=this.dropDown.onPage=lang.hitch(this,function(_297){
_293.nextPage(_297!==-1);
this.focus();
});
this.dropDown.createOptions(_293,_295,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if("direction" in _295){
if(_295.direction){
this.dropDown.highlightFirstOption();
}else{
if(!_295.direction){
this.dropDown.highlightLastOption();
}
}
if(_296){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_294[this.searchAttr].toString())){
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.openDropDown();
this.domNode.setAttribute("aria-expanded","true");
},loadDropDown:function(){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
this.domNode.setAttribute("aria-expanded","false");
this.focusNode.removeAttribute("aria-activedescendant");
}
},_setBlurValue:function(){
var _298=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_298==pw._messages["previousMessage"]||_298==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_298);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_299,_29a){
var _29b="";
if(item){
if(!_29a){
_29a=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_29b=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_29a;
}
this.set("value",_29b,_299,_29a,item);
},_announceOption:function(node){
if(!node){
return;
}
var _29c;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_29c=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_29c=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_29c);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_283.get(node,"id"));
this._autoCompleteText(_29c);
},_selectOption:function(_29d){
this.closeDropDown();
if(_29d){
this._announceOption(_29d);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this.item=undefined;
this.inherited(arguments);
},_startSearch:function(key){
if(!this.dropDown){
var _29e=this.id+"_popup",_29f=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _29f({onChange:lang.hitch(this,this._selectOption),id:_29e,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_29e);
}
this._lastInput=key;
this.inherited(arguments);
},_getValueField:function(){
return this.searchAttr;
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.store){
var _2a0=this.srcNodeRef;
this.store=new _288({},_2a0);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _2a1=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_2a1):item[_2a1];
}
}
}
},postCreate:function(){
var _2a2=_285("label[for=\""+this.id+"\"]");
if(_2a2.length){
if(!_2a2[0].id){
_2a2[0].id=this.id+"_label";
}
this.domNode.setAttribute("aria-labelledby",_2a2[0].id);
}
this.inherited(arguments);
this.connect(this,"onSearch","_openResultList");
},_getMenuLabelFromItem:function(item){
var _2a3=this.labelFunc(item,this.store),_2a4=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_2a3=this.doHighlight(_2a3,this._lastInput);
_2a4="html";
}
return {html:_2a4=="html",label:_2a3};
},doHighlight:function(_2a5,find){
var _2a6=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_286.escapeString(find);
return this._escapeHtml(_2a5.replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_2a6),"￿$1￿")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_2a7){
return (_2a7._oldAPI?_2a7.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_2a8,_2a9,_2aa,item){
this._set("item",item||null);
if(_2a8==null){
_2a8="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_2ab){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_2ab);
}
}});
});
},"url:dijit/templates/ColorPalette.html":"<div class=\"dijitInline dijitColorPalette\">\n\t<table dojoAttachPoint=\"paletteTableNode\" class=\"dijitPaletteTable\" cellSpacing=\"0\" cellPadding=\"0\" role=\"grid\">\n\t\t<tbody data-dojo-attach-point=\"gridNode\"></tbody>\n\t</table>\n</div>\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\">\n\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>","dijit/form/MappedTextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_2ac,_2ad,_2ae){
return _2ac("dijit.form.MappedTextBox",_2ae,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},_setNameAttr:null,serialize:function(val){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=_2ad.place("<input type='hidden'"+(this.name?" name=\""+this.name.replace(/"/g,"&quot;")+"\"":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_2af,_2b0,_2b1,lang,_2b2,_2b3,_2b4,_2b5,_2b6){
return _2af("dijit.form.ComboBoxMixin",[_2b5,_2b3],{dropDownClass:_2b4,hasDownArrow:true,templateString:_2b6,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_2b7){
if(!_2b7.get){
lang.mixin(_2b7,{_oldAPI:true,get:function(id){
var _2b8=new _2b0();
this.fetchItemByIdentity({identity:id,onItem:function(_2b9){
_2b8.resolve(_2b9);
},onError:function(_2ba){
_2b8.reject(_2ba);
}});
return _2b8.promise;
},query:function(_2bb,_2bc){
var _2bd=new _2b0(function(){
_2be.abort&&_2be.abort();
});
_2bd.total=new _2b0();
var _2be=this.fetch(lang.mixin({query:_2bb,onBegin:function(_2bf){
_2bd.total.resolve(_2bf);
},onComplete:function(_2c0){
_2bd.resolve(_2c0);
},onError:function(_2c1){
_2bd.reject(_2c1);
}},_2bc));
return _2b2(_2bd);
}});
}
this._set("store",_2b7);
},postMixInProperties:function(){
var _2c2=this.params.store||this.store;
if(_2c2){
this._setStoreAttr(_2c2);
}
this.inherited(arguments);
if(!this.params.store&&!this.store._oldAPI){
var _2c3=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_2b1.deprecated(_2c3+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_2b1.deprecated(_2c3+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_2b1.deprecated(_2c3+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_2c4){
new _2c4({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../main"],function(_2c5,_2c6,dom,_2c7,keys,lang,on,_2c8){
var _2c9=_2c6("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_2ca,_2cb,_2cc){
var _2cd;
if(_2ca!==undefined){
_2cd=this.filter(_2ca);
if(typeof _2cc!="string"){
if(_2cd!==null&&((typeof _2cd!="number")||!isNaN(_2cd))){
_2cc=this.filter(this.format(_2cd,this.constraints));
}else{
_2cc="";
}
}
}
if(_2cc!=null&&((typeof _2cc)!="number"||!isNaN(_2cc))&&this.textbox.value!=_2cc){
this.textbox.value=_2cc;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_2cc);
}
this.inherited(arguments,[_2cd,_2cb]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_2ce){
if(_2ce==null){
_2ce="";
}else{
if(typeof _2ce!="string"){
_2ce=String(_2ce);
}
}
this.textbox.value=_2ce;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_2ce);
}
},format:function(_2cf){
return _2cf==null?"":(_2cf.toString?_2cf.toString():_2cf);
},parse:function(_2d0){
return _2d0;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(evt){
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,this.focusNode.value);
}
this._processInput(evt);
},_processInput:function(evt){
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _2d1=function(e){
var _2d2;
if(e.type=="keydown"){
_2d2=e.keyCode;
switch(_2d2){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
case keys.NUM_LOCK:
case keys.SCROLL_LOCK:
return;
}
if(!e.ctrlKey&&!e.metaKey&&!e.altKey){
switch(_2d2){
case keys.NUMPAD_0:
case keys.NUMPAD_1:
case keys.NUMPAD_2:
case keys.NUMPAD_3:
case keys.NUMPAD_4:
case keys.NUMPAD_5:
case keys.NUMPAD_6:
case keys.NUMPAD_7:
case keys.NUMPAD_8:
case keys.NUMPAD_9:
case keys.NUMPAD_MULTIPLY:
case keys.NUMPAD_PLUS:
case keys.NUMPAD_ENTER:
case keys.NUMPAD_MINUS:
case keys.NUMPAD_PERIOD:
case keys.NUMPAD_DIVIDE:
return;
}
if((_2d2>=65&&_2d2<=90)||(_2d2>=48&&_2d2<=57)||_2d2==keys.SPACE){
return;
}
var _2d3=false;
for(var i in keys){
if(keys[i]===e.keyCode){
_2d3=true;
break;
}
}
if(!_2d3){
return;
}
}
}
_2d2=e.charCode>=32?String.fromCharCode(e.charCode):e.charCode;
if(!_2d2){
_2d2=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57)||e.keyCode==keys.SPACE?String.fromCharCode(e.keyCode):e.keyCode;
}
if(!_2d2){
_2d2=229;
}
if(e.type=="keypress"){
if(typeof _2d2!="string"){
return;
}
if((_2d2>="a"&&_2d2<="z")||(_2d2>="A"&&_2d2<="Z")||(_2d2>="0"&&_2d2<="9")||(_2d2===" ")){
if(e.ctrlKey||e.metaKey||e.altKey){
return;
}
}
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var faux={faux:true},attr;
for(attr in e){
if(attr!="layerX"&&attr!="layerY"){
var v=e[attr];
if(typeof v!="function"&&typeof v!="undefined"){
faux[attr]=v;
}
}
}
lang.mixin(faux,{charOrCode:_2d2,_wasConsumed:false,preventDefault:function(){
faux._wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
faux.preventDefault();
faux.stopPropagation();
}
if(faux._wasConsumed){
return;
}
this.defer(function(){
this._onInput(faux);
});
};
this.own(on(this.textbox,"keydown, keypress, paste, cut, input, compositionend",lang.hitch(this,_2d1)));
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=lang.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
},_isTextSelected:function(){
return this.textbox.selectionStart!=this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
this._selectOnClickHandle=null;
if(!this._isTextSelected()){
_2c9.selectInputText(this.textbox);
}
});
this.defer(function(){
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
this._selectOnClickHandle=null;
}
},500);
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_2d4){
if(!this._created||this.textDir!=_2d4){
this._set("textDir",_2d4);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_2c9._setSelectionRange=_2c8._setSelectionRange=function(_2d5,_2d6,stop){
if(_2d5.setSelectionRange){
_2d5.setSelectionRange(_2d6,stop);
}
};
_2c9.selectInputText=_2c8.selectInputText=function(_2d7,_2d8,stop){
_2d7=dom.byId(_2d7);
if(isNaN(_2d8)){
_2d8=0;
}
if(isNaN(stop)){
stop=_2d7.value?_2d7.value.length:0;
}
try{
_2d7.focus();
_2c9._setSelectionRange(_2d7,_2d8,stop);
}
catch(e){
}
};
return _2c9;
});
},"dojo/_base/query":function(){
define(["../query","./NodeList"],function(_2d9){
return _2d9;
});
},"dijit/form/SimpleTextarea":function(){
define("dijit/form/SimpleTextarea",["dojo/_base/declare","dojo/dom-class","dojo/sniff","./TextBox"],function(_2da,_2db,has,_2dc){
return _2da("dijit.form.SimpleTextarea",_2dc,{baseClass:"dijitTextBox dijitTextArea",rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(has("ie")&&this.cols){
_2db.add(this.textbox,"dijitTextAreaCols");
}
},filter:function(_2dd){
if(_2dd){
_2dd=_2dd.replace(/\r/g,"");
}
return this.inherited(arguments);
},_onInput:function(e){
if(this.maxLength){
var _2de=parseInt(this.maxLength);
var _2df=this.textbox.value.replace(/\r/g,"");
var _2e0=_2df.length-_2de;
if(_2e0>0){
var _2e1=this.textbox;
if(_2e1.selectionStart){
var pos=_2e1.selectionStart;
var cr=0;
if(has("opera")){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_2df.substring(0,pos-_2e0-cr)+_2df.substring(pos-cr);
_2e1.setSelectionRange(pos-_2e0,pos-_2e0);
}else{
if(this.ownerDocument.selection){
_2e1.focus();
var _2e2=this.ownerDocument.selection.createRange();
_2e2.moveStart("character",-_2e0);
_2e2.text="";
_2e2.select();
}
}
}
}
this.inherited(arguments);
}});
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode'/>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n","dijit/PopupMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/query","./registry","./MenuItem","./hccss"],function(_2e3,_2e4,_2e5,_2e6,_2e7){
return _2e3("dijit.PopupMenuItem",_2e7,{_fillContent:function(){
if(this.srcNodeRef){
var _2e8=_2e5("*",this.srcNodeRef);
this.inherited(arguments,[_2e8[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_2e5("[widgetId]",this.dropDownContainer)[0];
this.popup=_2e6.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_2e4.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_2e9){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_2e9);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"dijit/_TimePicker":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/event","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/query","dojo/mouse","./typematic","./_Widget","./_TemplatedMixin","./form/_FormValueWidget","dojo/text!./templates/TimePicker.html"],function(_2ea,_2eb,_2ec,_2ed,_2ee,_2ef,_2f0,_2f1,_2f2,keys,lang,has,_2f3,_2f4,_2f5,_2f6,_2f7,_2f8,_2f9){
var _2fa=_2ee("dijit._TimePicker",[_2f6,_2f7],{templateString:_2f9,baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:_2ed.toISOString,setValue:function(_2fb){
_2f2.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_2fb);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(){
return false;
},_getFilteredNodes:function(_2fc,_2fd,_2fe,_2ff){
var _300=[],_301=_2ff?_2ff.date:this._refDate,n,i=_2fc,max=this._maxIncrement+Math.abs(i),chk=_2fe?-1:1,dec=_2fe?1:0,inc=1-dec;
do{
i-=dec;
n=this._createOption(i);
if(n){
if((_2fe&&n.date>_301)||(!_2fe&&n.date<_301)){
break;
}
_300[_2fe?"unshift":"push"](n);
_301=n.date;
}
i+=inc;
}while(_300.length<_2fd&&(i*chk)<max);
return _300;
},_showText:function(){
var _302=_2ed.fromISOString;
this.timeMenu.innerHTML="";
this._clickableIncrementDate=_302(this.clickableIncrement);
this._visibleIncrementDate=_302(this.visibleIncrement);
this._visibleRangeDate=_302(this.visibleRange);
var _303=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_304=_303(this._clickableIncrementDate),_305=_303(this._visibleIncrementDate),_306=_303(this._visibleRangeDate),time=(this.value||this.currentFocus).getTime();
this._refDate=new Date(time-time%(_304*1000));
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._totalIncrements=_306/_304;
this._visibleIncrement=_305/_304;
this._maxIncrement=(60*60*24)/_304;
var _307=Math.min(this._totalIncrements,10),_308=this._getFilteredNodes(0,(_307>>1)+1,false),_309=[],_30a=_307-_308.length,_30b=this._getFilteredNodes(0,_30a,true,_308[0]);
if(_30b.length<_30a&&_308.length>0){
_309=this._getFilteredNodes(_308.length,_30a-_30b.length,false,_308[_308.length-1]);
}
_2ea.forEach(_30b.concat(_308,_309),function(n){
this.timeMenu.appendChild(n);
},this);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_30c){
lang.mixin(this,_30c);
if(!_30c.locale){
_30c.locale=this.lang;
}
},postCreate:function(){
this.connect(this.timeMenu,_2f4.wheel,"_mouseWheeled");
this.own(_2f5.addMouseListener(this.upArrow,this,"_onArrowUp",33,250),_2f5.addMouseListener(this.downArrow,this,"_onArrowDown",33,250));
this.inherited(arguments);
},_buttonMouse:function(e){
_2ef.toggle(e.currentTarget,e.currentTarget==this.upArrow?"dijitUpArrowHover":"dijitDownArrowHover",e.type=="mouseenter"||e.type=="mouseover");
},_createOption:function(_30d){
var date=new Date(this._refDate);
var _30e=this._clickableIncrementDate;
date.setTime(date.getTime()+_30e.getHours()*_30d*3600000+_30e.getMinutes()*_30d*60000+_30e.getSeconds()*_30d*1000);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _30f=_2ec.format(date,this.constraints);
if(this.filterString&&_30f.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=this.ownerDocument.createElement("div");
div.className=this.baseClass+"Item";
div.date=date;
div.idx=_30d;
_2f0.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_30f},div);
if(_30d%this._visibleIncrement<1&&_30d%this._visibleIncrement>-1){
_2ef.add(div,this.baseClass+"Marker");
}else{
if(!(_30d%this._clickableIncrement)){
_2ef.add(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(date)){
_2ef.add(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!_2eb.compare(this.value,date,this.constraints.selector)){
div.selected=true;
_2ef.add(div,this.baseClass+"ItemSelected");
if(_2ef.contains(div,this.baseClass+"Marker")){
_2ef.add(div,this.baseClass+"MarkerSelected");
}else{
_2ef.add(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},_onOptionSelected:function(tgt){
var _310=tgt.target.date||tgt.target.parentNode.date;
if(!_310||this.isDisabledDate(_310)){
return;
}
this._highlighted_option=null;
this.set("value",_310);
this.onChange(_310);
},onChange:function(){
},_highlightOption:function(node,_311){
if(!node){
return;
}
if(_311){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=node;
}else{
if(this._highlighted_option!==node){
return;
}else{
this._highlighted_option=null;
}
}
_2ef.toggle(node,this.baseClass+"ItemHover",_311);
if(_2ef.contains(node,this.baseClass+"Marker")){
_2ef.toggle(node,this.baseClass+"MarkerHover",_311);
}else{
_2ef.toggle(node,this.baseClass+"TickHover",_311);
}
},onmouseover:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(!_2ef.contains(tgr,this.baseClass+"Item")){
return;
}
this._highlightOption(tgr,true);
},onmouseout:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlightOption(tgr,false);
},_mouseWheeled:function(e){
this._keyboardSelected=null;
_2f1.stop(e);
this[(e.wheelDelta>0?"_onArrowUp":"_onArrowDown")]();
},_onArrowUp:function(_312){
if(_312===-1){
_2ef.remove(this.upArrow,"dijitUpArrowActive");
return;
}else{
if(_312===0){
_2ef.add(this.upArrow,"dijitUpArrowActive");
}
}
if(!this.timeMenu.childNodes.length){
return;
}
var _313=this.timeMenu.childNodes[0].idx;
var divs=this._getFilteredNodes(_313,1,true,this.timeMenu.childNodes[0]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(divs[0],this.timeMenu.childNodes[0]);
}
},_onArrowDown:function(_314){
if(_314===-1){
_2ef.remove(this.downArrow,"dijitDownArrowActive");
return;
}else{
if(_314===0){
_2ef.add(this.downArrow,"dijitDownArrowActive");
}
}
if(!this.timeMenu.childNodes.length){
return;
}
var _315=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].idx+1;
var divs=this._getFilteredNodes(_315,1,false,this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(divs[0]);
}
},handleKey:function(e){
if(e.keyCode==keys.DOWN_ARROW||e.keyCode==keys.UP_ARROW){
_2f1.stop(e);
if(this._highlighted_option&&!this._highlighted_option.parentNode){
this._highlighted_option=null;
}
var _316=this.timeMenu,tgt=this._highlighted_option||_2f3("."+this.baseClass+"ItemSelected",_316)[0];
if(!tgt){
tgt=_316.childNodes[0];
}else{
if(_316.childNodes.length){
if(e.keyCode==keys.DOWN_ARROW&&!tgt.nextSibling){
this._onArrowDown();
}else{
if(e.keyCode==keys.UP_ARROW&&!tgt.previousSibling){
this._onArrowUp();
}
}
if(e.keyCode==keys.DOWN_ARROW){
tgt=tgt.nextSibling;
}else{
tgt=tgt.previousSibling;
}
}
}
this._highlightOption(tgt,true);
this._keyboardSelected=tgt;
return false;
}else{
if(e.keyCode==keys.ENTER||e.keyCode===keys.TAB){
if(!this._keyboardSelected&&e.keyCode===keys.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.keyCode===keys.TAB;
}
}
return undefined;
}});
return _2fa;
});
},"dijit/form/RadioButton":function(){
define("dijit/form/RadioButton",["dojo/_base/declare","./CheckBox","./_RadioButtonMixin"],function(_317,_318,_319){
return _317("dijit.form.RadioButton",[_318,_319],{baseClass:"dijitRadio"});
});
},"url:dijit/form/templates/HorizontalSlider.html":"<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" data-dojo-attach-event=\"press:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n","url:dijit/templates/TimePicker.html":"<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div data-dojo-attach-point=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\n    ><div data-dojo-attach-point=\"timeMenu,focusNode\" data-dojo-attach-event=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div data-dojo-attach-point=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" data-dojo-attach-event=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&#160;</div\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\n></div>\n","dijit/InlineEditBox":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/_base/event","dojo/i18n","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/when","./focus","./_Widget","./_TemplatedMixin","./_WidgetsInTemplateMixin","./_Container","./form/Button","./form/_TextBoxMixin","./form/TextBox","dojo/text!./templates/InlineEditBox.html","dojo/i18n!./nls/common"],function(_31a,_31b,_31c,_31d,_31e,_31f,_320,i18n,_321,keys,lang,has,when,fm,_322,_323,_324,_325,_326,_327,_328,_329){
var _32a=_31b("dijit._InlineEditor",[_322,_323,_324],{templateString:_329,postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit","common",this.lang);
_31a.forEach(["buttonSave","buttonCancel"],function(prop){
if(!this[prop]){
this[prop]=this.messages[prop];
}
},this);
},buildRendering:function(){
this.inherited(arguments);
var Cls=typeof this.editor=="string"?(lang.getObject(this.editor)||require(this.editor)):this.editor;
var _32b=this.sourceStyle,_32c="line-height:"+_32b.lineHeight+";",_32d=_31f.getComputedStyle(this.domNode);
_31a.forEach(["Weight","Family","Size","Style"],function(prop){
var _32e=_32b["font"+prop],_32f=_32d["font"+prop];
if(_32f!=_32e){
_32c+="font-"+prop+":"+_32b["font"+prop]+";";
}
},this);
_31a.forEach(["marginTop","marginBottom","marginLeft","marginRight","position","left","top","right","bottom","float","clear","display"],function(prop){
this.domNode.style[prop]=_32b[prop];
},this);
var _330=this.inlineEditBox.width;
if(_330=="100%"){
_32c+="width:100%;";
this.domNode.style.display="block";
}else{
_32c+="width:"+(_330+(Number(_330)==_330?"px":""))+";";
}
var _331=lang.delegate(this.inlineEditBox.editorParams,{style:_32c,dir:this.dir,lang:this.lang,textDir:this.textDir});
_331["displayedValue" in Cls.prototype?"displayedValue":"value"]=this.value;
this.editWidget=new Cls(_331,this.editorPlaceholder);
if(this.inlineEditBox.autoSave){
_31e.destroy(this.buttonContainer);
}
},postCreate:function(){
this.inherited(arguments);
var ew=this.editWidget;
if(this.inlineEditBox.autoSave){
this.connect(ew,"onChange","_onChange");
this.connect(ew,"onKeyPress","_onKeyPress");
}else{
if("intermediateChanges" in ew){
ew.set("intermediateChanges",true);
this.connect(ew,"onChange","_onIntermediateChange");
this.saveButton.set("disabled",true);
}
}
},startup:function(){
this.editWidget.startup();
this.inherited(arguments);
},_onIntermediateChange:function(){
this.saveButton.set("disabled",(this.getValue()==this._resetValue)||!this.enableSave());
},destroy:function(){
this.editWidget.destroy(true);
this.inherited(arguments);
},getValue:function(){
var ew=this.editWidget;
return String(ew.get("displayedValue" in ew?"displayedValue":"value"));
},_onKeyPress:function(e){
if(this.inlineEditBox.autoSave&&this.inlineEditBox.editing){
if(e.altKey||e.ctrlKey){
return;
}
if(e.charOrCode==keys.ESCAPE){
_320.stop(e);
this.cancel(true);
}else{
if(e.charOrCode==keys.ENTER&&e.target.tagName=="INPUT"){
_320.stop(e);
this._onChange();
}
}
}
},_onBlur:function(){
this.inherited(arguments);
if(this.inlineEditBox.autoSave&&this.inlineEditBox.editing){
if(this.getValue()==this._resetValue){
this.cancel(false);
}else{
if(this.enableSave()){
this.save(false);
}
}
}
},_onChange:function(){
if(this.inlineEditBox.autoSave&&this.inlineEditBox.editing&&this.enableSave()){
fm.focus(this.inlineEditBox.displayNode);
}
},enableSave:function(){
return this.editWidget.isValid?this.editWidget.isValid():true;
},focus:function(){
this.editWidget.focus();
if(this.editWidget.focusNode){
fm._onFocusNode(this.editWidget.focusNode);
if(this.editWidget.focusNode.tagName=="INPUT"){
this.defer(function(){
_327.selectInputText(this.editWidget.focusNode);
});
}
}
}});
var _332=_31b("dijit.InlineEditBox",_322,{editing:false,autoSave:true,buttonSave:"",buttonCancel:"",renderAsHtml:false,editor:_328,editorWrapper:_32a,editorParams:{},disabled:false,onChange:function(){
},onCancel:function(){
},width:"100%",value:"",noValueIndicator:has("ie")<=6?"<span style='font-family: wingdings; text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>":"<span style='text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>",constructor:function(){
this.editorParams={};
},postMixInProperties:function(){
this.inherited(arguments);
this.displayNode=this.srcNodeRef;
var _333={ondijitclick:"_onClick",onmouseover:"_onMouseOver",onmouseout:"_onMouseOut",onfocus:"_onMouseOver",onblur:"_onMouseOut"};
for(var name in _333){
this.connect(this.displayNode,name,_333[name]);
}
this.displayNode.setAttribute("role","button");
if(!this.displayNode.getAttribute("tabIndex")){
this.displayNode.setAttribute("tabIndex",0);
}
if(!this.value&&!("value" in this.params)){
this.value=lang.trim(this.renderAsHtml?this.displayNode.innerHTML:(this.displayNode.innerText||this.displayNode.textContent||""));
}
if(!this.value){
this.displayNode.innerHTML=this.noValueIndicator;
}
_31d.add(this.displayNode,"dijitInlineEditBoxDisplayMode");
},setDisabled:function(_334){
_321.deprecated("dijit.InlineEditBox.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_334);
},_setDisabledAttr:function(_335){
this.domNode.setAttribute("aria-disabled",_335?"true":"false");
if(_335){
this.displayNode.removeAttribute("tabIndex");
}else{
this.displayNode.setAttribute("tabIndex",0);
}
_31d.toggle(this.displayNode,"dijitInlineEditBoxDisplayModeDisabled",_335);
this._set("disabled",_335);
},_onMouseOver:function(){
if(!this.disabled){
_31d.add(this.displayNode,"dijitInlineEditBoxDisplayModeHover");
}
},_onMouseOut:function(){
_31d.remove(this.displayNode,"dijitInlineEditBoxDisplayModeHover");
},_onClick:function(e){
if(this.disabled){
return;
}
if(e){
_320.stop(e);
}
this._onMouseOut();
this.defer("edit");
},edit:function(){
if(this.disabled||this.editing){
return;
}
this._set("editing",true);
this._savedTabIndex=_31c.get(this.displayNode,"tabIndex")||"0";
if(this.wrapperWidget){
var ew=this.wrapperWidget.editWidget;
ew.set("displayedValue" in ew?"displayedValue":"value",this.value);
}else{
var _336=_31e.create("span",null,this.domNode,"before");
var Ewc=typeof this.editorWrapper=="string"?lang.getObject(this.editorWrapper):this.editorWrapper;
this.wrapperWidget=new Ewc({value:this.value,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,dir:this.dir,lang:this.lang,tabIndex:this._savedTabIndex,editor:this.editor,inlineEditBox:this,sourceStyle:_31f.getComputedStyle(this.displayNode),save:lang.hitch(this,"save"),cancel:lang.hitch(this,"cancel"),textDir:this.textDir},_336);
if(!this.wrapperWidget._started){
this.wrapperWidget.startup();
}
if(!this._started){
this.startup();
}
}
var ww=this.wrapperWidget;
_31d.add(this.displayNode,"dijitOffScreen");
_31d.remove(ww.domNode,"dijitOffScreen");
_31f.set(ww.domNode,{visibility:"visible"});
_31c.set(this.displayNode,"tabIndex","-1");
when(ww.editWidget.onLoadDeferred,lang.hitch(ww,function(){
this.defer(function(){
this.focus();
this._resetValue=this.getValue();
});
}));
},_onBlur:function(){
this.inherited(arguments);
if(!this.editing){
}
},destroy:function(){
if(this.wrapperWidget&&!this.wrapperWidget._destroyed){
this.wrapperWidget.destroy();
delete this.wrapperWidget;
}
this.inherited(arguments);
},_showText:function(_337){
var ww=this.wrapperWidget;
_31f.set(ww.domNode,{visibility:"hidden"});
_31d.add(ww.domNode,"dijitOffScreen");
_31d.remove(this.displayNode,"dijitOffScreen");
_31c.set(this.displayNode,"tabIndex",this._savedTabIndex);
if(_337){
fm.focus(this.displayNode);
}
},save:function(_338){
if(this.disabled||!this.editing){
return;
}
this._set("editing",false);
var ww=this.wrapperWidget;
var _339=ww.getValue();
this.set("value",_339);
this._showText(_338);
},setValue:function(val){
_321.deprecated("dijit.InlineEditBox.setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(val){
val=lang.trim(val);
var _33a=this.renderAsHtml?val:val.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/\n/g,"<br>");
this.displayNode.innerHTML=_33a||this.noValueIndicator;
this._set("value",val);
if(this._started){
this.defer(function(){
this.onChange(val);
});
}
if(this.textDir=="auto"){
this.applyTextDir(this.displayNode,this.displayNode.innerText);
}
},getValue:function(){
_321.deprecated("dijit.InlineEditBox.getValue() is deprecated.  Use get('value') instead.","","2.0");
return this.get("value");
},cancel:function(_33b){
if(this.disabled||!this.editing){
return;
}
this._set("editing",false);
this.defer("onCancel");
this._showText(_33b);
},_setTextDirAttr:function(_33c){
if(!this._created||this.textDir!=_33c){
this._set("textDir",_33c);
this.applyTextDir(this.displayNode,this.displayNode.innerText);
this.displayNode.align=this.dir=="rtl"?"right":"left";
}
}});
_332._InlineEditor=_32a;
return _332;
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_33d,_33e,_33f){
var _340={};
lang.setObject("dojo.dnd.autoscroll",_340);
_340.getViewport=_33f.getBox;
_340.V_TRIGGER_AUTOSCROLL=32;
_340.H_TRIGGER_AUTOSCROLL=32;
_340.V_AUTOSCROLL_VALUE=16;
_340.H_AUTOSCROLL_VALUE=16;
var _341,doc=win.doc,_342=Infinity,_343=Infinity;
_340.autoScrollStart=function(d){
doc=d;
_341=_33f.getBox(doc);
var html=win.body(doc).parentNode;
_342=Math.max(html.scrollHeight-_341.h,0);
_343=Math.max(html.scrollWidth-_341.w,0);
};
_340.autoScroll=function(e){
var v=_341||_33f.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_340.H_TRIGGER_AUTOSCROLL){
dx=-_340.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_340.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_340.H_AUTOSCROLL_VALUE,_343-html.scrollLeft);
}
}
if(e.clientY<_340.V_TRIGGER_AUTOSCROLL){
dy=-_340.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_340.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_340.V_AUTOSCROLL_VALUE,_342-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_340._validNodes={"div":1,"p":1,"td":1};
_340._validOverflow={"auto":1,"scroll":1};
_340.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_344,_345;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _340._validNodes)){
var s=_33e.getComputedStyle(n),_346=(s.overflow.toLowerCase() in _340._validOverflow),_347=(s.overflowX.toLowerCase() in _340._validOverflow),_348=(s.overflowY.toLowerCase() in _340._validOverflow);
if(_346||_347||_348){
b=_33d.getContentBox(n,s);
t=_33d.position(n,true);
}
if(_346||_347){
w=Math.min(_340.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(has("webkit")||has("opera")){
rx+=win.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_344=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_346||_348){
h=Math.min(_340.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(has("webkit")||has("opera")){
ry+=win.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_345=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
_340.autoScroll(e);
};
return _340;
});
},"dijit/form/_RadioButtonMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/_base/lang","dojo/query","../registry"],function(_349,_34a,_34b,_34c,lang,_34d,_34e){
return _34a("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){
var ary=[];
_34d("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(lang.hitch(this,function(_34f){
if(_34f.name==this.name&&_34f.form==this.focusNode.form){
var _350=_34e.getEnclosingWidget(_34f);
if(_350){
ary.push(_350);
}
}
}));
return ary;
},_setCheckedAttr:function(_351){
this.inherited(arguments);
if(!this._created){
return;
}
if(_351){
_349.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_352){
if(_352!=this&&_352.checked){
_352.set("checked",false);
}
}));
}
},_getSubmitValue:function(_353){
return _353===null?"on":_353;
},_onClick:function(e){
if(this.checked||this.disabled){
_34c.stop(e);
return false;
}
if(this.readOnly){
_34c.stop(e);
_349.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_354){
_34b.set(this.focusNode||this.domNode,"checked",_354.checked);
}));
return false;
}
return this.inherited(arguments);
}});
});
},"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow dijitInline\" role=\"presentation\"\n\t\t><div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","dojo/dnd/TimedMoveable":function(){
define(["../_base/declare","./Moveable"],function(_355,_356){
var _357=_356.prototype.onMove;
return _355("dojo.dnd.TimedMoveable",_356,{timeout:40,constructor:function(node,_358){
if(!_358){
_358={};
}
if(_358.timeout&&typeof _358.timeout=="number"&&_358.timeout>=0){
this.timeout=_358.timeout;
}
},onMoveStop:function(_359){
if(_359._timer){
clearTimeout(_359._timer);
_357.call(this,_359,_359._leftTop);
}
_356.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_35a,_35b){
_35a._leftTop=_35b;
if(!_35a._timer){
var _35c=this;
_35a._timer=setTimeout(function(){
_35a._timer=null;
_357.call(_35c,_35a,_35a._leftTop);
},this.timeout);
}
}});
});
},"dijit/layout/LinkPane":function(){
define(["./ContentPane","../_TemplatedMixin","dojo/_base/declare"],function(_35d,_35e,_35f){
return _35f("dijit.layout.LinkPane",[_35d,_35e],{templateString:"<div class=\"dijitLinkPane\" data-dojo-attach-point=\"containerNode\"></div>",postMixInProperties:function(){
if(this.srcNodeRef){
this.title+=this.srcNodeRef.innerHTML;
}
this.inherited(arguments);
},_fillContent:function(){
}});
});
},"dijit/form/_ListMouseMixin":function(){
define(["dojo/_base/declare","dojo/mouse","dojo/on","dojo/touch","./_ListBase"],function(_360,_361,on,_362,_363){
return _360("dijit.form._ListMouseMixin",_363,{postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,_362.press,function(evt){
evt.preventDefault();
}));
this._listConnect(_362.press,"_onMouseDown");
this._listConnect(_362.release,"_onMouseUp");
this._listConnect(_361.enter,"_onMouseOver");
this._listConnect(_361.leave,"_onMouseOut");
},_onMouseDown:function(evt,_364){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(_364);
},_onMouseUp:function(evt,_365){
this._isDragging=false;
var _366=this.selected;
var _367=this._hoveredNode;
if(_366&&_365==_366){
this.onClick(_366);
}else{
if(_367&&_365==_367){
this._setSelectedAttr(_367);
this.onClick(_367);
}
}
},_onMouseOut:function(evt,_368){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt,_369){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
this._hoveredNode=_369;
this.onHover(_369);
if(this._isDragging){
this._setSelectedAttr(_369);
}
}});
});
},"url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n","dojo/cldr/monetary":function(){
define(["../_base/kernel","../_base/lang"],function(dojo,lang){
var _36a={};
lang.setObject("dojo.cldr.monetary",_36a);
_36a.getData=function(code){
var _36b={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _36c={CHF:5};
var _36d=_36b[code],_36e=_36c[code];
if(typeof _36d=="undefined"){
_36d=2;
}
if(typeof _36e=="undefined"){
_36e=0;
}
return {places:_36d,round:_36e};
};
return _36a;
});
},"dojo/cookie":function(){
define(["./_base/kernel","./regexp"],function(dojo,_36f){
dojo.cookie=function(name,_370,_371){
var c=document.cookie,ret;
if(arguments.length==1){
var _372=c.match(new RegExp("(?:^|; )"+_36f.escapeString(name)+"=([^;]*)"));
ret=_372?decodeURIComponent(_372[1]):undefined;
}else{
_371=_371||{};
var exp=_371.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_371.expires=d;
}
if(exp&&exp.toUTCString){
_371.expires=exp.toUTCString();
}
_370=encodeURIComponent(_370);
var _373=name+"="+_370,_374;
for(_374 in _371){
_373+="; "+_374;
var _375=_371[_374];
if(_375!==true){
_373+="="+_375;
}
}
document.cookie=_373;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n","dijit/ProgressBar":function(){
define(["require","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/number","./_Widget","./_TemplatedMixin","dojo/text!./templates/ProgressBar.html"],function(_376,_377,_378,lang,_379,_37a,_37b,_37c){
return _377("dijit.ProgressBar",[_37a,_37b],{progress:"0",value:"",maximum:100,places:0,indeterminate:false,label:"",name:"",templateString:_37c,_indeterminateHighContrastImagePath:_376.toUrl("./themes/a11y/indeterminate_progress.gif"),postMixInProperties:function(){
this.inherited(arguments);
if(!(this.params&&"value" in this.params)){
this.value=this.indeterminate?Infinity:this.progress;
}
},buildRendering:function(){
this.inherited(arguments);
this.indeterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath.toString());
this.update();
},update:function(_37d){
lang.mixin(this,_37d||{});
var tip=this.internalProgress,ap=this.domNode;
var _37e=1;
if(this.indeterminate){
ap.removeAttribute("aria-valuenow");
ap.removeAttribute("aria-valuemin");
ap.removeAttribute("aria-valuemax");
}else{
if(String(this.progress).indexOf("%")!=-1){
_37e=Math.min(parseFloat(this.progress)/100,1);
this.progress=_37e*this.maximum;
}else{
this.progress=Math.min(this.progress,this.maximum);
_37e=this.maximum?this.progress/this.maximum:0;
}
ap.setAttribute("aria-describedby",this.labelNode.id);
ap.setAttribute("aria-valuenow",this.progress);
ap.setAttribute("aria-valuemin",0);
ap.setAttribute("aria-valuemax",this.maximum);
}
this.labelNode.innerHTML=this.report(_37e);
_378.toggle(this.domNode,"dijitProgressBarIndeterminate",this.indeterminate);
tip.style.width=(_37e*100)+"%";
this.onChange();
},_setValueAttr:function(v){
this._set("value",v);
if(v==Infinity){
this.update({indeterminate:true});
}else{
this.update({indeterminate:false,progress:v});
}
},_setLabelAttr:function(_37f){
this._set("label",_37f);
this.update();
},_setIndeterminateAttr:function(_380){
this.indeterminate=_380;
this.update();
},report:function(_381){
return this.label?this.label:(this.indeterminate?"&#160;":_379.format(_381,{type:"percent",places:this.places,locale:this.lang}));
},onChange:function(){
}});
});
},"dijit/form/NumberTextBox":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/number","./RangeBoundTextBox"],function(_382,lang,_383,_384){
var _385=_382("dijit.form.NumberTextBoxMixin",null,{pattern:_383.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:_383.format,postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},_setConstraintsAttr:function(_386){
var _387=typeof _386.places=="number"?_386.places:0;
if(_387){
_387++;
}
if(typeof _386.max!="number"){
_386.max=9*Math.pow(10,15-_387);
}
if(typeof _386.min!="number"){
_386.min=-9*Math.pow(10,15-_387);
}
this.inherited(arguments,[_386]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _388=this.format(val,this.constraints);
if(_388!==undefined){
this.textbox.value=_388;
}
}
this.inherited(arguments);
},format:function(_389,_38a){
var _38b=String(_389);
if(typeof _389!="number"){
return _38b;
}
if(isNaN(_389)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_389,_38a))&&_38a.exponent!==false&&/\de[-+]?\d/i.test(_38b)){
return _38b;
}
if(this.editOptions&&this.focused){
_38a=lang.mixin({},_38a,this.editOptions);
}
return this._formatter(_389,_38a);
},_parser:_383.parse,parse:function(_38c,_38d){
var v=this._parser(_38c,lang.mixin({},_38d,(this.editOptions&&this.focused)?this.editOptions:{}));
if(this.editOptions&&this.focused&&isNaN(v)){
v=this._parser(_38c,_38d);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_38e){
return (_38e==null||_38e==="")?NaN:this.inherited(arguments);
},serialize:function(_38f,_390){
return (typeof _38f!="number"||isNaN(_38f))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=lang.hitch(lang.mixin({},this,{focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_391,_392,_393){
if(_391!==undefined&&_393===undefined){
_393=String(_391);
if(typeof _391=="number"){
if(isNaN(_391)){
_393="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_391,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_393)){
_393=undefined;
}
}
}else{
if(!_391){
_393="";
_391=NaN;
}else{
_391=undefined;
}
}
}
this.inherited(arguments,[_391,_392,_393]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+_383._realNumberRegexp(lang.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_394){
if(!this.focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
var _395=_382("dijit.form.NumberTextBox",[_384,_385],{baseClass:"dijitTextBox dijitNumberTextBox"});
_395.Mixin=_385;
return _395;
});
},"dijit/form/TimeTextBox":function(){
define("dijit/form/TimeTextBox",["dojo/_base/declare","dojo/keys","dojo/_base/lang","../_TimePicker","./_DateTimeTextBox"],function(_396,keys,lang,_397,_398){
return _396("dijit.form.TimeTextBox",_398,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:_397,_selector:"time",value:new Date(""),_onKey:function(evt){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
switch(evt.keyCode){
case keys.ENTER:
case keys.TAB:
case keys.ESCAPE:
case keys.DOWN_ARROW:
case keys.UP_ARROW:
break;
default:
this.defer(function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
});
}
}});
});
},"dijit/ColorPalette":function(){
define(["require","dojo/text!./templates/ColorPalette.html","./_Widget","./_TemplatedMixin","./_PaletteMixin","./hccss","dojo/i18n","dojo/_base/Color","dojo/_base/declare","dojo/dom-construct","dojo/string","dojo/i18n!dojo/nls/colors","dojo/colors"],function(_399,_39a,_39b,_39c,_39d,has,i18n,_39e,_39f,_3a0,_3a1){
var _3a2=_39f("dijit.ColorPalette",[_39b,_39c,_39d],{palette:"7x10",_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},templateString:_39a,baseClass:"dijitColorPalette",_dyeFactory:function(_3a3,row,col,_3a4){
return new this._dyeClass(_3a3,row,col,_3a4);
},buildRendering:function(){
this.inherited(arguments);
this._dyeClass=_39f(_3a2._Color,{palette:this.palette});
this._preparePalette(this._palettes[this.palette],i18n.getLocalization("dojo","colors",this.lang));
}});
_3a2._Color=_39f("dijit._Color",_39e,{template:"<span class='dijitInline dijitPaletteImg'>"+"<img src='${blankGif}' alt='${alt}' title='${title}' class='dijitColorPaletteSwatch' style='background-color: ${color}'/>"+"</span>",hcTemplate:"<span class='dijitInline dijitPaletteImg' style='position: relative; overflow: hidden; height: 12px; width: 14px;'>"+"<img src='${image}' alt='${alt}' title='${title}' style='position: absolute; left: ${left}px; top: ${top}px; ${size}'/>"+"</span>",_imagePaths:{"7x10":_399.toUrl("./themes/a11y/colors7x10.png"),"3x4":_399.toUrl("./themes/a11y/colors3x4.png")},constructor:function(_3a5,row,col,_3a6){
this._title=_3a6;
this._row=row;
this._col=col;
this.setColor(_39e.named[_3a5]);
},getValue:function(){
return this.toHex();
},fillCell:function(cell,_3a7){
var html=_3a1.substitute(has("highcontrast")?this.hcTemplate:this.template,{color:this.toHex(),blankGif:_3a7,alt:this._title,title:this._title,image:this._imagePaths[this.palette].toString(),left:this._col*-20-5,top:this._row*-20-5,size:this.palette=="7x10"?"height: 145px; width: 206px":"height: 64px; width: 86px"});
_3a0.place(html,cell);
}});
return _3a2;
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dijit/form/CurrencyTextBox":function(){
define(["dojo/currency","dojo/_base/declare","dojo/_base/lang","./NumberTextBox"],function(_3a8,_3a9,lang,_3aa){
return _3a9("dijit.form.CurrencyTextBox",_3aa,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",pattern:function(_3ab){
return "("+(this.focused?this.inherited(arguments,[lang.mixin({},_3ab,this.editOptions)])+"|":"")+_3a8.regexp(_3ab)+")";
},_formatter:_3a8.format,_parser:_3a8.parse,parse:function(_3ac,_3ad){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_3ac)){
v=lang.hitch(lang.mixin({},this,{_parser:_3aa.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_3ae){
if(!_3ae.currency&&this.currency){
_3ae.currency=this.currency;
}
this.inherited(arguments,[_3a8._mixInDefaults(lang.mixin(_3ae,{exponent:false}))]);
}});
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","url:dijit/form/templates/CheckBox.html":"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"onclick:_onClick\"\n/></div>\n","url:dijit/form/templates/VerticalSlider.html":"<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td data-dojo-attach-point=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" data-dojo-attach-event=\"press:_onBarClick\"><!--#5629--></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t></center\n\t\t></td\n\t\t><td data-dojo-attach-point=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n></table>\n","dijit/layout/LayoutContainer":function(){
define(["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","../_WidgetBase","./_LayoutWidget","./utils"],function(_3af,lang,_3b0,_3b1,_3b2,_3b3){
var _3b4=_3b0("dijit.layout.LayoutContainer",_3b2,{baseClass:"dijitLayoutContainer",constructor:function(){
_3af.deprecated("dijit.layout.LayoutContainer is deprecated","use BorderContainer instead",2);
},layout:function(){
_3b3.layoutChildren(this.domNode,this._contentBox,this.getChildren());
},addChild:function(_3b5,_3b6){
this.inherited(arguments);
if(this._started){
_3b3.layoutChildren(this.domNode,this._contentBox,this.getChildren());
}
},removeChild:function(_3b7){
this.inherited(arguments);
if(this._started){
_3b3.layoutChildren(this.domNode,this._contentBox,this.getChildren());
}
}});
_3b4.ChildWidgetProperties={layoutAlign:"none"};
lang.extend(_3b1,_3b4.ChildWidgetProperties);
return _3b4;
});
},"dijit/Tooltip":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(_3b8,_3b9,fx,dom,_3ba,_3bb,_3bc,lang,_3bd,on,has,_3be,_3bf,_3c0,_3c1,_3c2,_3c3,_3c4){
var _3c5=_3b9("dijit._MasterTooltip",[_3c0,_3c1],{duration:_3be.defaultDuration,templateString:_3c3,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _3c2(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_3c6,_3c7,_3c8,rtl,_3c9){
if(this.aroundNode&&this.aroundNode===_3c7&&this.containerNode.innerHTML==_3c6){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_3c6;
if(_3c9){
this.set("textDir",_3c9);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3bf.around(this.domNode,_3c7,_3c8&&_3c8.length?_3c8:_3ca.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _3cb=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_3cb.y+((_3cb.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_3cb.x+((_3cb.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_3bc.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_3c7;
},orient:function(node,_3cc,_3cd,_3ce,_3cf){
this.connectorNode.style.top="";
var _3d0=_3ce.h,_3d1=_3ce.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_3cc+"-"+_3cd];
this.domNode.style.width="auto";
var size=_3bb.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var _3d2=Math.min((Math.max(_3d1,1)),size.w);
_3bb.setMarginBox(this.domNode,{w:_3d2});
if(_3cd.charAt(0)=="B"&&_3cc.charAt(0)=="B"){
var bb=_3bb.position(node);
var _3d3=this.connectorNode.offsetHeight;
if(bb.h>_3d0){
var _3d4=_3d0-((_3cf.h+_3d3)>>1);
this.connectorNode.style.top=_3d4+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_3cf.h/2-_3d3/2,0),bb.h-_3d3)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_3d1);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_3d5){
if(this._onDeck&&this._onDeck[1]==_3d5){
this._onDeck=null;
}else{
if(this.aroundNode===_3d5){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
_3b8.forEach(node.children,function(_3d6){
this._setAutoTextDir(_3d6);
},this);
},_setTextDirAttr:function(_3d7){
this._set("textDir",_3d7);
if(_3d7=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_3c4.showTooltip=function(_3d8,_3d9,_3da,rtl,_3db){
if(_3da){
_3da=_3b8.map(_3da,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_3ca._masterTT){
_3c4._masterTT=_3ca._masterTT=new _3c5();
}
return _3ca._masterTT.show(_3d8,_3d9,_3da,rtl,_3db);
};
_3c4.hideTooltip=function(_3dc){
return _3ca._masterTT&&_3ca._masterTT.hide(_3dc);
};
var _3ca=_3b9("dijit.Tooltip",_3c0,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(_3dd){
_3b8.forEach(this._connections||[],function(_3de){
_3b8.forEach(_3de,function(_3df){
_3df.remove();
});
},this);
this._connectIds=_3b8.filter(lang.isArrayLike(_3dd)?_3dd:(_3dd?[_3dd]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=_3b8.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_3e0=this.selector,_3e1=_3e0?function(_3e2){
return on.selector(_3e0,_3e2);
}:function(_3e3){
return _3e3;
},self=this;
return [on(node,_3e1(_3bd.enter),function(){
self._onHover(this);
}),on(node,_3e1("focusin"),function(){
self._onHover(this);
}),on(node,_3e1(_3bd.leave),lang.hitch(self,"_onUnHover")),on(node,_3e1("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",_3dd);
},addTarget:function(node){
var id=node.id||node;
if(_3b8.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3b8.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3ba.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3b8.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_3e4){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_3e4);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_3e5){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _3e6=this.getContent(_3e5);
if(!_3e6){
return;
}
_3ca.show(_3e6,_3e5,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_3e5;
this.onShow(_3e5,this.position);
},close:function(){
if(this._connectNode){
_3ca.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},destroy:function(){
this.close();
_3b8.forEach(this._connections||[],function(_3e7){
_3b8.forEach(_3e7,function(_3e8){
_3e8.remove();
});
},this);
this.inherited(arguments);
}});
_3ca._MasterTooltip=_3c5;
_3ca.show=_3c4.showTooltip;
_3ca.hide=_3c4.hideTooltip;
_3ca.defaultPosition=["after-centered","before-centered"];
return _3ca;
});
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dijit/form/VerticalSlider":function(){
define(["dojo/_base/declare","./HorizontalSlider","dojo/text!./templates/VerticalSlider.html"],function(_3e9,_3ea,_3eb){
return _3e9("dijit.form.VerticalSlider",_3ea,{templateString:_3eb,_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_handleOffsetCoord:"top",_progressPixelSize:"height",_descending:true,_isReversed:function(){
return this._descending;
}});
});
},"dijit/form/DropDownButton":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_3ec,lang,_3ed,_3ee,_3ef,_3f0,_3f1,_3f2,_3f3){
return _3ec("dijit.form.DropDownButton",[_3f0,_3f1,_3f2],{baseClass:"dijitDropDownButton",templateString:_3f3,_fillContent:function(){
if(this.srcNodeRef){
var _3f4=_3ed("*",this.srcNodeRef);
this.inherited(arguments,[_3f4[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _3f5=_3ed("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_3ee.byNode(_3f5);
delete this.dropDownContainer;
}
if(this.dropDown){
_3ef.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3f6=this.dropDown;
return (!!_3f6&&(!_3f6.href||_3f6.isLoaded));
},loadDropDown:function(_3f7){
var _3f8=this.dropDown;
var _3f9=_3f8.on("load",lang.hitch(this,function(){
_3f9.remove();
_3f7();
}));
_3f8.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"url:dijit/templates/ProgressBar.html":"<div class=\"dijitProgressBar dijitProgressBarEmpty\" role=\"progressbar\"\n\t><div  data-dojo-attach-point=\"internalProgress\" class=\"dijitProgressBarFull\"\n\t\t><div class=\"dijitProgressBarTile\" role=\"presentation\"></div\n\t\t><span style=\"visibility:hidden\">&#160;</span\n\t></div\n\t><div data-dojo-attach-point=\"labelNode\" class=\"dijitProgressBarLabel\" id=\"${id}_label\"></div\n\t><img data-dojo-attach-point=\"indeterminateHighContrastImage\" class=\"dijitProgressBarIndeterminateHighContrastImage\" alt=\"\"\n/></div>\n","dojo/date":function(){
define(["./has","./_base/lang"],function(has,lang){
var date={};
date.getDaysInMonth=function(_3fa){
var _3fb=_3fa.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_3fb==1&&date.isLeapYear(_3fa)){
return 29;
}
return days[_3fb];
};
date.isLeapYear=function(_3fc){
var year=_3fc.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
date.getTimezoneName=function(_3fd){
var str=_3fd.toString();
var tz="";
var _3fe;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_3fe=str.match(pat))){
tz=_3fe[1];
}else{
str=_3fd.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_3fe=str.match(pat))){
tz=_3fe[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
date.compare=function(_3ff,_400,_401){
_3ff=new Date(+_3ff);
_400=new Date(+(_400||new Date()));
if(_401=="date"){
_3ff.setHours(0,0,0,0);
_400.setHours(0,0,0,0);
}else{
if(_401=="time"){
_3ff.setFullYear(0,0,0);
_400.setFullYear(0,0,0);
}
}
if(_3ff>_400){
return 1;
}
if(_3ff<_400){
return -1;
}
return 0;
};
date.add=function(date,_402,_403){
var sum=new Date(+date);
var _404=false;
var _405="Date";
switch(_402){
case "day":
break;
case "weekday":
var days,_406;
var mod=_403%5;
if(!mod){
days=(_403>0)?5:-5;
_406=(_403>0)?((_403-5)/5):((_403+5)/5);
}else{
days=mod;
_406=parseInt(_403/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_403>0){
adj=1;
}else{
if(strt==0&&_403<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_403>0)?2:-2;
}
_403=(7*_406)+days+adj;
break;
case "year":
_405="FullYear";
_404=true;
break;
case "week":
_403*=7;
break;
case "quarter":
_403*=3;
case "month":
_404=true;
_405="Month";
break;
default:
_405="UTC"+_402.charAt(0).toUpperCase()+_402.substring(1)+"s";
}
if(_405){
sum["set"+_405](sum["get"+_405]()+_403);
}
if(_404&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
date.difference=function(_407,_408,_409){
_408=_408||new Date();
_409=_409||"day";
var _40a=_408.getFullYear()-_407.getFullYear();
var _40b=1;
switch(_409){
case "quarter":
var m1=_407.getMonth();
var m2=_408.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_40a*4);
_40b=q2-q1;
break;
case "weekday":
var days=Math.round(date.difference(_407,_408,"day"));
var _40c=parseInt(date.difference(_407,_408,"week"));
var mod=days%7;
if(mod==0){
days=_40c*5;
}else{
var adj=0;
var aDay=_407.getDay();
var bDay=_408.getDay();
_40c=parseInt(days/7);
mod=days%7;
var _40d=new Date(_407);
_40d.setDate(_40d.getDate()+(_40c*7));
var _40e=_40d.getDay();
if(days>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_40e+mod)>5:
adj=-2;
}
}else{
if(days<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_40e+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_40c*2);
}
_40b=days;
break;
case "year":
_40b=_40a;
break;
case "month":
_40b=(_408.getMonth()-_407.getMonth())+(_40a*12);
break;
case "week":
_40b=parseInt(date.difference(_407,_408,"day")/7);
break;
case "day":
_40b/=24;
case "hour":
_40b/=60;
case "minute":
_40b/=60;
case "second":
_40b/=1000;
case "millisecond":
_40b*=_408.getTime()-_407.getTime();
}
return Math.round(_40b);
};
1&&lang.mixin(lang.getObject("dojo.date",true),date);
return date;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_40f,_410,_411,_412,_413,lang,_414,has,_415,_416,_417){
return _410("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _418=this.getParent();
this._childOfLayoutWidget=_418&&_418.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_416.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _419=[],_41a=false;
_414("> *",this.containerNode).some(function(node){
var _41b=_415.byNode(node);
if(_41b&&_41b.resize){
_419.push(_41b);
}else{
if(node.offsetHeight){
_41a=true;
}
}
});
this._singleChild=_419.length==1&&!_41a?_419[0]:null;
_411.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_41c,_41d){
this._resizeCalled=true;
this._scheduleLayout(_41c,_41d);
},_scheduleLayout:function(_41e,_41f){
if(this._isShown()){
this._layout(_41e,_41f);
}else{
this._needLayout=true;
this._changeSize=_41e;
this._resultSize=_41f;
}
},_layout:function(_420,_421){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_420){
_412.setMarginBox(this.domNode,_420);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_421||{};
lang.mixin(mb,_420||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_412.getMarginBox(cn),mb);
}
this._contentBox=_417.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_412.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_412.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_40f.forEach(this.getChildren(),function(_422){
if(_422.resize){
_422.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_423=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_411.contains(node,"dijitHidden")&&_423&&_423.style&&(_423.style.display!="none");
}
}
},_onShow:function(){
this._wasShown=true;
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
}});
});
},"dijit/form/RangeBoundTextBox":function(){
define(["dojo/_base/declare","dojo/i18n","./MappedTextBox"],function(_424,i18n,_425){
var _426=_424("dijit.form.RangeBoundTextBox",_425,{rangeMessage:"",rangeCheck:function(_427,_428){
return ("min" in _428?(this.compare(_427,_428.min)>=0):true)&&("max" in _428?(this.compare(_427,_428.max)<=0):true);
},isInRange:function(){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
if(val==null){
return false;
}
var _429=false;
if("min" in this.constraints){
var min=this.constraints.min;
_429=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min)<0;
}
if(!_429&&("max" in this.constraints)){
var max=this.constraints.max;
_429=this.compare(val,((typeof max!="number")||max>0)?max:0)>0;
}
return _429;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_42a){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_42a));
},getErrorMessage:function(_42b){
var v=this.get("value");
if(v!=null&&v!==""&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_42b)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_42c){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
this.focusNode.setAttribute("aria-valuemin",this.constraints.min);
}else{
this.focusNode.removeAttribute("aria-valuemin");
}
if(this.constraints.max!==undefined){
this.focusNode.setAttribute("aria-valuemax",this.constraints.max);
}else{
this.focusNode.removeAttribute("aria-valuemax");
}
}
},_setValueAttr:function(_42d,_42e){
this.focusNode.setAttribute("aria-valuenow",_42d);
this.inherited(arguments);
},applyTextDir:function(){
}});
return _426;
});
},"dijit/_editor/RichText":function(){
define("dijit/_editor/RichText",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/query","dojo/ready","dojo/sniff","dojo/topic","dojo/_base/unload","dojo/_base/url","dojo/_base/window","../_Widget","../_CssStateMixin","./selection","./range","./html","../focus","../main"],function(_42f,_430,_431,_432,dom,_433,_434,_435,_436,_437,_438,_439,keys,lang,on,_43a,_43b,has,_43c,_43d,_43e,win,_43f,_440,_441,_442,_443,_444,_445){
var _446=_431("dijit._editor.RichText",[_43f,_440],{constructor:function(_447){
this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this.events=[].concat(this.events);
this._keyHandlers={};
if(_447&&lang.isString(_447.value)){
this.value=_447.value;
}
this.onLoadDeferred=new _432();
},baseClass:"dijitEditor",inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",_NAME_CONTENT_SEP:"@@**%%:%%**@@",onLoadDeferred:null,isTabIndent:false,disableSpellCheck:false,postCreate:function(){
if("textarea"===this.domNode.tagName.toLowerCase()){
console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
}
this.contentPreFilters=[lang.hitch(this,"_preFixUrlAttributes")].concat(this.contentPreFilters);
if(has("mozilla")){
this.contentPreFilters=[this._normalizeFontStyle].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeMozBogus].concat(this.contentPostFilters);
}
if(has("webkit")){
this.contentPreFilters=[this._removeWebkitBogus].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeWebkitBogus].concat(this.contentPostFilters);
}
if(has("ie")){
this.contentPostFilters=[this._normalizeFontStyle].concat(this.contentPostFilters);
this.contentDomPostFilters=[lang.hitch(this,this._stripBreakerNodes)].concat(this.contentDomPostFilters);
}
this.inherited(arguments);
_43c.publish(_445._scopeName+"._editor.RichText::init",this);
this.open();
this.setupDefaultShortcuts();
},setupDefaultShortcuts:function(){
var exec=lang.hitch(this,function(cmd,arg){
return function(){
return !this.execCommand(cmd,arg);
};
});
var _448={b:exec("bold"),i:exec("italic"),u:exec("underline"),a:exec("selectall"),s:function(){
this.save(true);
},m:function(){
this.isTabIndent=!this.isTabIndent;
},"1":exec("formatblock","h1"),"2":exec("formatblock","h2"),"3":exec("formatblock","h3"),"4":exec("formatblock","h4"),"\\":exec("insertunorderedlist")};
if(!has("ie")){
_448.Z=exec("redo");
}
var key;
for(key in _448){
this.addKeyHandler(key,true,false,_448[key]);
}
},events:["onKeyPress","onKeyDown","onKeyUp"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){
if(_446._editorCommandsLocalized){
this._local2NativeFormatNames=_446._local2NativeFormatNames;
this._native2LocalFormatNames=_446._native2LocalFormatNames;
return;
}
_446._editorCommandsLocalized=true;
_446._local2NativeFormatNames={};
_446._native2LocalFormatNames={};
this._local2NativeFormatNames=_446._local2NativeFormatNames;
this._native2LocalFormatNames=_446._native2LocalFormatNames;
var _449=["div","p","pre","h1","h2","h3","h4","h5","h6","ol","ul","address"];
var _44a="",_44b,i=0;
while((_44b=_449[i++])){
if(_44b.charAt(1)!=="l"){
_44a+="<"+_44b+"><span>content</span></"+_44b+"><br/>";
}else{
_44a+="<"+_44b+"><li>content</li></"+_44b+"><br/>";
}
}
var _44c={position:"absolute",top:"0px",zIndex:10,opacity:0.01};
var div=_435.create("div",{style:_44c,innerHTML:_44a});
this.ownerDocumentBody.appendChild(div);
var _44d=lang.hitch(this,function(){
var node=div.firstChild;
while(node){
try{
this._sCall("selectElement",[node.firstChild]);
var _44e=node.tagName.toLowerCase();
this._local2NativeFormatNames[_44e]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_44e]]=_44e;
node=node.nextSibling.nextSibling;
}
catch(e){
}
}
_435.destroy(div);
});
this.defer(_44d);
},open:function(_44f){
if(!this.onLoadDeferred||this.onLoadDeferred.fired>=0){
this.onLoadDeferred=new _432();
}
if(!this.isClosed){
this.close();
}
_43c.publish(_445._scopeName+"._editor.RichText::open",this);
if(arguments.length===1&&_44f.nodeName){
this.domNode=_44f;
}
var dn=this.domNode;
var html;
if(lang.isString(this.value)){
html=this.value;
delete this.value;
dn.innerHTML="";
}else{
if(dn.nodeName&&dn.nodeName.toLowerCase()=="textarea"){
var ta=(this.textarea=dn);
this.name=ta.name;
html=ta.value;
dn=this.domNode=this.ownerDocument.createElement("div");
dn.setAttribute("widgetId",this.id);
ta.removeAttribute("widgetId");
dn.cssText=ta.cssText;
dn.className+=" "+ta.className;
_435.place(dn,ta,"before");
var _450=lang.hitch(this,function(){
_437.set(ta,{display:"block",position:"absolute",top:"-1000px"});
if(has("ie")){
var s=ta.style;
this.__overflow=s.overflow;
s.overflow="hidden";
}
});
if(has("ie")){
this.defer(_450,10);
}else{
_450();
}
if(ta.form){
var _451=ta.value;
this.reset=function(){
var _452=this.getValue();
if(_452!==_451){
this.replaceValue(_451);
}
};
on(ta.form,"submit",lang.hitch(this,function(){
_433.set(ta,"disabled",this.disabled);
ta.value=this.getValue();
}));
}
}else{
html=_443.getChildrenHtml(dn);
dn.innerHTML="";
}
}
this.value=html;
if(dn.nodeName&&dn.nodeName==="LI"){
dn.innerHTML=" <br>";
}
this.header=dn.ownerDocument.createElement("div");
dn.appendChild(this.header);
this.editingArea=dn.ownerDocument.createElement("div");
dn.appendChild(this.editingArea);
this.footer=dn.ownerDocument.createElement("div");
dn.appendChild(this.footer);
if(!this.name){
this.name=this.id+"_AUTOGEN";
}
if(this.name!==""&&(!_430["useXDomain"]||_430["allowXdRichTextSave"])){
var _453=dom.byId(_445._scopeName+"._editor.RichText.value");
if(_453&&_453.value!==""){
var _454=_453.value.split(this._SEPARATOR),i=0,dat;
while((dat=_454[i++])){
var data=dat.split(this._NAME_CONTENT_SEP);
if(data[0]===this.name){
html=data[1];
_454=_454.splice(i,1);
_453.value=_454.join(this._SEPARATOR);
break;
}
}
}
if(!_446._globalSaveHandler){
_446._globalSaveHandler={};
_43d.addOnUnload(function(){
var id;
for(id in _446._globalSaveHandler){
var f=_446._globalSaveHandler[id];
if(lang.isFunction(f)){
f();
}
}
});
}
_446._globalSaveHandler[this.id]=lang.hitch(this,"_saveContent");
}
this.isClosed=false;
var ifr=(this.editorObject=this.iframe=this.ownerDocument.createElement("iframe"));
ifr.id=this.id+"_iframe";
ifr.style.border="none";
ifr.style.width="100%";
if(this._layoutMode){
ifr.style.height="100%";
}else{
if(has("ie")>=7){
if(this.height){
ifr.style.height=this.height;
}
if(this.minHeight){
ifr.style.minHeight=this.minHeight;
}
}else{
ifr.style.height=this.height?this.height:this.minHeight;
}
}
ifr.frameBorder=0;
ifr._loadFunc=lang.hitch(this,function(w){
this.window=w;
this.document=this.window.document;
if(has("ie")){
this._localizeEditorCommands();
}
this.onLoad(html);
});
var src=this._getIframeDocTxt(),s="javascript: '"+src.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'";
ifr.setAttribute("src",s);
this.editingArea.appendChild(ifr);
if(has("safari")<=4){
src=ifr.getAttribute("src");
if(!src||src.indexOf("javascript")===-1){
this.defer(function(){
ifr.setAttribute("src",s);
});
}
}
if(dn.nodeName==="LI"){
dn.lastChild.style.marginTop="-1.2em";
}
_434.add(this.domNode,this.baseClass);
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_getIframeDocTxt:function(){
var _455=_437.getComputedStyle(this.domNode);
var html="";
var _456=true;
if(has("ie")||has("webkit")||(!this.height&&!has("mozilla"))){
html="<div id='dijitEditorBody'></div>";
_456=false;
}else{
if(has("mozilla")){
this._cursorToStart=true;
html="&#160;";
}
}
var font=[_455.fontWeight,_455.fontSize,_455.fontFamily].join(" ");
var _457=_455.lineHeight;
if(_457.indexOf("px")>=0){
_457=parseFloat(_457)/parseFloat(_455.fontSize);
}else{
if(_457.indexOf("em")>=0){
_457=parseFloat(_457);
}else{
_457="normal";
}
}
var _458="";
var self=this;
this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig,function(_459){
_459=_459.replace(/^;/ig,"")+";";
var s=_459.split(":")[0];
if(s){
s=lang.trim(s);
s=s.toLowerCase();
var i;
var sC="";
for(i=0;i<s.length;i++){
var c=s.charAt(i);
switch(c){
case "-":
i++;
c=s.charAt(i).toUpperCase();
default:
sC+=c;
}
}
_437.set(self.domNode,sC,"");
}
_458+=_459+";";
});
var _45a=_43a("label[for=\""+this.id+"\"]");
return [this.isLeftToRight()?"<html>\n<head>\n":"<html dir='rtl'>\n<head>\n",(has("mozilla")&&_45a.length?"<title>"+_45a[0].innerHTML+"</title>\n":""),"<meta http-equiv='Content-Type' content='text/html'>\n","<style>\n","\tbody,html {\n","\t\tbackground:transparent;\n","\t\tpadding: 1px 0 0 0;\n","\t\tmargin: -1px 0 0 0;\n",((has("webkit"))?"\t\twidth: 100%;\n":""),((has("webkit"))?"\t\theight: 100%;\n":""),"\t}\n","\tbody{\n","\t\ttop:0px;\n","\t\tleft:0px;\n","\t\tright:0px;\n","\t\tfont:",font,";\n",((this.height||has("opera"))?"":"\t\tposition: fixed;\n"),"\t\tmin-height:",this.minHeight,";\n","\t\tline-height:",_457,";\n","\t}\n","\tp{ margin: 1em 0; }\n",(!_456&&!this.height?"\tbody,html {overflow-y: hidden;}\n":""),"\t#dijitEditorBody{overflow-x: auto; overflow-y:"+(this.height?"auto;":"hidden;")+" outline: 0px;}\n","\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n",(!has("ie")?"\tli{ min-height:1.2em; }\n":""),"</style>\n",this._applyEditingAreaStyleSheets(),"\n","</head>\n<body ",(_456?"id='dijitEditorBody' ":""),"onload='frameElement && frameElement._loadFunc(window,document)' ","style='"+_458+"'>",html,"</body>\n</html>"].join("");
},_applyEditingAreaStyleSheets:function(){
var _45b=[];
if(this.styleSheets){
_45b=this.styleSheets.split(";");
this.styleSheets="";
}
_45b=_45b.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url;
while((url=_45b[i++])){
var _45c=(new _43e(win.global.location,url)).toString();
this.editingAreaStyleSheets.push(_45c);
text+="<link rel=\"stylesheet\" type=\"text/css\" href=\""+_45c+"\"/>";
}
return text;
},addStyleSheet:function(uri){
var url=uri.toString();
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _43e(win.global.location,url)).toString();
}
if(_42f.indexOf(this.editingAreaStyleSheets,url)>-1){
return;
}
this.editingAreaStyleSheets.push(url);
this.onLoadDeferred.then(lang.hitch(this,function(){
if(this.document.createStyleSheet){
this.document.createStyleSheet(url);
}else{
var head=this.document.getElementsByTagName("head")[0];
var _45d=this.document.createElement("link");
_45d.rel="stylesheet";
_45d.type="text/css";
_45d.href=url;
head.appendChild(_45d);
}
}));
},removeStyleSheet:function(uri){
var url=uri.toString();
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _43e(win.global.location,url)).toString();
}
var _45e=_42f.indexOf(this.editingAreaStyleSheets,url);
if(_45e===-1){
return;
}
delete this.editingAreaStyleSheets[_45e];
_43a("link:[href=\""+url+"\"]",this.window.document).orphan();
},disabled:false,_mozSettingProps:{"styleWithCSS":false},_setDisabledAttr:function(_45f){
_45f=!!_45f;
this._set("disabled",_45f);
if(!this.isLoaded){
return;
}
if(has("ie")||has("webkit")||has("opera")){
var _460=has("ie")&&(this.isLoaded||!this.focusOnLoad);
if(_460){
this.editNode.unselectable="on";
}
this.editNode.contentEditable=!_45f;
if(_460){
this.defer(function(){
if(this.editNode){
this.editNode.unselectable="off";
}
});
}
}else{
try{
this.document.designMode=(_45f?"off":"on");
}
catch(e){
return;
}
if(!_45f&&this._mozSettingProps){
var ps=this._mozSettingProps;
var n;
for(n in ps){
if(ps.hasOwnProperty(n)){
try{
this.document.execCommand(n,false,ps[n]);
}
catch(e2){
}
}
}
}
}
this._disabledOK=true;
},onLoad:function(html){
if(!this.window.__registeredWindow){
this.window.__registeredWindow=true;
this._iframeRegHandle=_444.registerIframe(this.iframe);
}
if(!has("ie")&&!has("webkit")&&(this.height||has("mozilla"))){
this.editNode=this.document.body;
}else{
this.editNode=this.document.body.firstChild;
var _461=this;
if(has("ie")){
this.tabStop=_435.create("div",{tabIndex:-1},this.editingArea);
this.iframe.onfocus=function(){
_461.editNode.setActive();
};
}
}
this.focusNode=this.editNode;
var _462=this.events.concat(this.captureEvents);
var ap=this.iframe?this.document:this.editNode;
_42f.forEach(_462,function(item){
this.connect(ap,item.toLowerCase(),item);
},this);
this.connect(ap,"onmouseup","onClick");
if(has("ie")){
this.connect(this.document,"onmousedown","_onIEMouseDown");
this.editNode.style.zoom=1;
}else{
this.connect(this.document,"onmousedown",function(){
delete this._cursorToStart;
});
}
if(has("webkit")){
this._webkitListener=this.connect(this.document,"onmouseup","onDisplayChanged");
this.connect(this.document,"onmousedown",function(e){
var t=e.target;
if(t&&(t===this.document.body||t===this.document)){
this.defer("placeCursorAtEnd");
}
});
}
if(has("ie")){
try{
this.document.execCommand("RespectVisibilityInDesign",true,null);
}
catch(e){
}
}
this.isLoaded=true;
this.set("disabled",this.disabled);
var _463=lang.hitch(this,function(){
this.setValue(html);
if(this.onLoadDeferred){
this.onLoadDeferred.resolve(true);
}
this.onDisplayChanged();
if(this.focusOnLoad){
_43b(lang.hitch(this,"defer","focus",this.updateInterval));
}
this.value=this.getValue(true);
});
if(this.setValueDeferred){
this.setValueDeferred.then(_463);
}else{
_463();
}
},onKeyDown:function(e){
if(e.keyCode===keys.TAB&&this.isTabIndent){
_438.stop(e);
if(this.queryCommandEnabled((e.shiftKey?"outdent":"indent"))){
this.execCommand((e.shiftKey?"outdent":"indent"));
}
}
if(has("ie")){
if(e.keyCode==keys.TAB&&!this.isTabIndent){
if(e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.iframe.focus();
}else{
if(!e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.tabStop.focus();
}
}
}else{
if(e.keyCode===keys.BACKSPACE&&this.document.selection.type==="Control"){
_438.stop(e);
this.execCommand("delete");
}else{
if((65<=e.keyCode&&e.keyCode<=90)||(e.keyCode>=37&&e.keyCode<=40)){
e.charCode=e.keyCode;
this.onKeyPress(e);
}
}
}
}
if(has("ff")){
if(e.keyCode===keys.PAGE_UP||e.keyCode===keys.PAGE_DOWN){
if(this.editNode.clientHeight>=this.editNode.scrollHeight){
e.preventDefault();
}
}
}
return true;
},onKeyUp:function(){
},setDisabled:function(_464){
_439.deprecated("dijit.Editor::setDisabled is deprecated","use dijit.Editor::attr(\"disabled\",boolean) instead",2);
this.set("disabled",_464);
},_setValueAttr:function(_465){
this.setValue(_465);
},_setDisableSpellCheckAttr:function(_466){
if(this.document){
_433.set(this.document.body,"spellcheck",!_466);
}else{
this.onLoadDeferred.then(lang.hitch(this,function(){
_433.set(this.document.body,"spellcheck",!_466);
}));
}
this._set("disableSpellCheck",_466);
},onKeyPress:function(e){
var c=(e.keyChar&&e.keyChar.toLowerCase())||e.keyCode,_467=this._keyHandlers[c],args=arguments;
if(_467&&!e.altKey){
_42f.some(_467,function(h){
if(!(h.shift^e.shiftKey)&&!(h.ctrl^(e.ctrlKey||e.metaKey))){
if(!h.handler.apply(this,args)){
e.preventDefault();
}
return true;
}
},this);
}
if(!this._onKeyHitch){
this._onKeyHitch=lang.hitch(this,"onKeyPressed");
}
this.defer("_onKeyHitch",1);
return true;
},addKeyHandler:function(key,ctrl,_468,_469){
if(!lang.isArray(this._keyHandlers[key])){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({shift:_468||false,ctrl:ctrl||false,handler:_469});
},onKeyPressed:function(){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},_onIEMouseDown:function(){
if(!this.focused&&!this.disabled){
this.focus();
}
},_onBlur:function(e){
this.inherited(arguments);
var _46a=this.getValue(true);
if(_46a!==this.value){
this.onChange(_46a);
}
this._set("value",_46a);
},_onFocus:function(e){
if(!this.disabled){
if(!this._disabledOK){
this.set("disabled",false);
}
this.inherited(arguments);
}
},blur:function(){
if(!has("ie")&&this.window.document.documentElement&&this.window.document.documentElement.focus){
this.window.document.documentElement.focus();
}else{
if(this.ownerDocumentBody.focus){
this.ownerDocumentBody.focus();
}
}
},focus:function(){
if(!this.isLoaded){
this.focusOnLoad=true;
return;
}
if(this._cursorToStart){
delete this._cursorToStart;
if(this.editNode.childNodes){
this.placeCursorAtStart();
return;
}
}
if(!has("ie")){
_444.focus(this.iframe);
}else{
if(this.editNode&&this.editNode.focus){
this.iframe.fireEvent("onfocus",document.createEventObject());
}
}
},updateInterval:200,_updateTimer:null,onDisplayChanged:function(){
if(this._updateTimer){
this._updateTimer.remove();
}
this._updateTimer=this.defer("onNormalizedDisplayChanged",this.updateInterval);
},onNormalizedDisplayChanged:function(){
delete this._updateTimer;
},onChange:function(){
},_normalizeCommand:function(cmd,_46b){
var _46c=cmd.toLowerCase();
if(_46c==="formatblock"){
if(has("safari")&&_46b===undefined){
_46c="heading";
}
}else{
if(_46c==="hilitecolor"&&!has("mozilla")){
_46c="backcolor";
}
}
return _46c;
},_qcaCache:{},queryCommandAvailable:function(_46d){
var ca=this._qcaCache[_46d];
if(ca!==undefined){
return ca;
}
return (this._qcaCache[_46d]=this._queryCommandAvailable(_46d));
},_queryCommandAvailable:function(_46e){
var ie=1;
var _46f=1<<1;
var _470=1<<2;
var _471=1<<3;
function _472(_473){
return {ie:Boolean(_473&ie),mozilla:Boolean(_473&_46f),webkit:Boolean(_473&_470),opera:Boolean(_473&_471)};
};
var _474=null;
switch(_46e.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "selectall":
case "toggledir":
_474=_472(_46f|ie|_470|_471);
break;
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
case "undo":
case "redo":
case "strikethrough":
case "tabindent":
_474=_472(_46f|ie|_471|_470);
break;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
_474=_472(ie);
break;
case "cut":
case "copy":
case "paste":
_474=_472(ie|_46f|_470|_471);
break;
case "inserttable":
_474=_472(_46f|ie);
break;
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
_474=_472(ie|_46f);
break;
default:
return false;
}
return (has("ie")&&_474.ie)||(has("mozilla")&&_474.mozilla)||(has("webkit")&&_474.webkit)||(has("opera")&&_474.opera);
},execCommand:function(_475,_476){
var _477;
this.focus();
_475=this._normalizeCommand(_475,_476);
if(_476!==undefined){
if(_475==="heading"){
throw new Error("unimplemented");
}else{
if((_475==="formatblock")&&has("ie")){
_476="<"+_476+">";
}
}
}
var _478="_"+_475+"Impl";
if(this[_478]){
_477=this[_478](_476);
}else{
_476=arguments.length>1?_476:null;
if(_476||_475!=="createlink"){
_477=this.document.execCommand(_475,false,_476);
}
}
this.onDisplayChanged();
return _477;
},queryCommandEnabled:function(_479){
if(this.disabled||!this._disabledOK){
return false;
}
_479=this._normalizeCommand(_479);
var _47a="_"+_479+"EnabledImpl";
if(this[_47a]){
return this[_47a](_479);
}else{
return this._browserQueryCommandEnabled(_479);
}
},queryCommandState:function(_47b){
if(this.disabled||!this._disabledOK){
return false;
}
_47b=this._normalizeCommand(_47b);
try{
return this.document.queryCommandState(_47b);
}
catch(e){
return false;
}
},queryCommandValue:function(_47c){
if(this.disabled||!this._disabledOK){
return false;
}
var r;
_47c=this._normalizeCommand(_47c);
if(has("ie")&&_47c==="formatblock"){
r=this._native2LocalFormatNames[this.document.queryCommandValue(_47c)];
}else{
if(has("mozilla")&&_47c==="hilitecolor"){
var _47d;
try{
_47d=this.document.queryCommandValue("styleWithCSS");
}
catch(e){
_47d=false;
}
this.document.execCommand("styleWithCSS",false,true);
r=this.document.queryCommandValue(_47c);
this.document.execCommand("styleWithCSS",false,_47d);
}else{
r=this.document.queryCommandValue(_47c);
}
}
return r;
},_sCall:function(name,args){
return win.withGlobal(this.window,name,_441,args);
},placeCursorAtStart:function(){
this.focus();
var _47e=false;
if(has("mozilla")){
var _47f=this.editNode.firstChild;
while(_47f){
if(_47f.nodeType===3){
if(_47f.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_47e=true;
this._sCall("selectElement",[_47f]);
break;
}
}else{
if(_47f.nodeType===1){
_47e=true;
var tg=_47f.tagName?_47f.tagName.toLowerCase():"";
if(/br|input|img|base|meta|area|basefont|hr|link/.test(tg)){
this._sCall("selectElement",[_47f]);
}else{
this._sCall("selectElementChildren",[_47f]);
}
break;
}
}
_47f=_47f.nextSibling;
}
}else{
_47e=true;
this._sCall("selectElementChildren",[this.editNode]);
}
if(_47e){
this._sCall("collapse",[true]);
}
},placeCursorAtEnd:function(){
this.focus();
var _480=false;
if(has("mozilla")){
var last=this.editNode.lastChild;
while(last){
if(last.nodeType===3){
if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_480=true;
this._sCall("selectElement",[last]);
break;
}
}else{
if(last.nodeType===1){
_480=true;
this._sCall("selectElement",[last.lastChild||last]);
break;
}
}
last=last.previousSibling;
}
}else{
_480=true;
this._sCall("selectElementChildren",[this.editNode]);
}
if(_480){
this._sCall("collapse",[false]);
}
},getValue:function(_481){
if(this.textarea){
if(this.isClosed||!this.isLoaded){
return this.textarea.value;
}
}
return this._postFilterContent(null,_481);
},_getValueAttr:function(){
return this.getValue(true);
},setValue:function(html){
if(!this.isLoaded){
this.onLoadDeferred.then(lang.hitch(this,function(){
this.setValue(html);
}));
return;
}
this._cursorToStart=true;
if(this.textarea&&(this.isClosed||!this.isLoaded)){
this.textarea.value=html;
}else{
html=this._preFilterContent(html);
var node=this.isClosed?this.domNode:this.editNode;
if(html&&has("mozilla")&&html.toLowerCase()==="<p></p>"){
html="<p>&#160;</p>";
}
if(!html&&has("webkit")){
html="&#160;";
}
node.innerHTML=html;
this._preDomFilterContent(node);
}
this.onDisplayChanged();
this._set("value",this.getValue(true));
},replaceValue:function(html){
if(this.isClosed){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection&&!has("mozilla")){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection){
html=this._preFilterContent(html);
this.execCommand("selectall");
if(!html){
this._cursorToStart=true;
html="&#160;";
}
this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode);
}else{
if(this.document&&this.document.selection){
this.setValue(html);
}
}
}
}
this._set("value",this.getValue(true));
},_preFilterContent:function(html){
var ec=html;
_42f.forEach(this.contentPreFilters,function(ef){
if(ef){
ec=ef(ec);
}
});
return ec;
},_preDomFilterContent:function(dom){
dom=dom||this.editNode;
_42f.forEach(this.contentDomPreFilters,function(ef){
if(ef&&lang.isFunction(ef)){
ef(dom);
}
},this);
},_postFilterContent:function(dom,_482){
var ec;
if(!lang.isString(dom)){
dom=dom||this.editNode;
if(this.contentDomPostFilters.length){
if(_482){
dom=lang.clone(dom);
}
_42f.forEach(this.contentDomPostFilters,function(ef){
dom=ef(dom);
});
}
ec=_443.getChildrenHtml(dom);
}else{
ec=dom;
}
if(!lang.trim(ec.replace(/^\xA0\xA0*/,"").replace(/\xA0\xA0*$/,"")).length){
ec="";
}
_42f.forEach(this.contentPostFilters,function(ef){
ec=ef(ec);
});
return ec;
},_saveContent:function(){
var _483=dom.byId(_445._scopeName+"._editor.RichText.value");
if(_483){
if(_483.value){
_483.value+=this._SEPARATOR;
}
_483.value+=this.name+this._NAME_CONTENT_SEP+this.getValue(true);
}
},escapeXml:function(str,_484){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_484){
str=str.replace(/'/gm,"&#39;");
}
return str;
},getNodeHtml:function(node){
_439.deprecated("dijit.Editor::getNodeHtml is deprecated","use dijit/_editor/html::getNodeHtml instead",2);
return _443.getNodeHtml(node);
},getNodeChildrenHtml:function(dom){
_439.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated","use dijit/_editor/html::getChildrenHtml instead",2);
return _443.getChildrenHtml(dom);
},close:function(save){
if(this.isClosed){
return;
}
if(!arguments.length){
save=true;
}
if(save){
this._set("value",this.getValue(true));
}
if(this.interval){
clearInterval(this.interval);
}
if(this._webkitListener){
this.disconnect(this._webkitListener);
delete this._webkitListener;
}
if(has("ie")){
this.iframe.onfocus=null;
}
this.iframe._loadFunc=null;
if(this._iframeRegHandle){
this._iframeRegHandle.remove();
delete this._iframeRegHandle;
}
if(this.textarea){
var s=this.textarea.style;
s.position="";
s.left=s.top="";
if(has("ie")){
s.overflow=this.__overflow;
this.__overflow=null;
}
this.textarea.value=this.value;
_435.destroy(this.domNode);
this.domNode=this.textarea;
}else{
this.domNode.innerHTML=this.value;
}
delete this.iframe;
_434.remove(this.domNode,this.baseClass);
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
delete this.focusNode;
if(this.window&&this.window._frameElement){
this.window._frameElement=null;
}
this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
},destroy:function(){
if(!this.isClosed){
this.close(false);
}
if(this._updateTimer){
this._updateTimer.remove();
}
this.inherited(arguments);
if(_446._globalSaveHandler){
delete _446._globalSaveHandler[this.id];
}
},_removeMozBogus:function(html){
return html.replace(/\stype="_moz"/gi,"").replace(/\s_moz_dirty=""/gi,"").replace(/_moz_resizing="(true|false)"/gi,"");
},_removeWebkitBogus:function(html){
html=html.replace(/\sclass="webkit-block-placeholder"/gi,"");
html=html.replace(/\sclass="apple-style-span"/gi,"");
html=html.replace(/<meta charset=\"utf-8\" \/>/gi,"");
return html;
},_normalizeFontStyle:function(html){
return html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2").replace(/<(\/)?em([ \>])/gi,"<$1i$2");
},_preFixUrlAttributes:function(html){
return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
},_browserQueryCommandEnabled:function(_485){
if(!_485){
return false;
}
var elem=has("ie")?this.document.selection.createRange():this.document;
try{
return elem.queryCommandEnabled(_485);
}
catch(e){
return false;
}
},_createlinkEnabledImpl:function(){
var _486=true;
if(has("opera")){
var sel=this.window.getSelection();
if(sel.isCollapsed){
_486=true;
}else{
_486=this.document.queryCommandEnabled("createlink");
}
}else{
_486=this._browserQueryCommandEnabled("createlink");
}
return _486;
},_unlinkEnabledImpl:function(){
var _487=true;
if(has("mozilla")||has("webkit")){
_487=this._sCall("hasAncestorElement",["a"]);
}else{
_487=this._browserQueryCommandEnabled("unlink");
}
return _487;
},_inserttableEnabledImpl:function(){
var _488=true;
if(has("mozilla")||has("webkit")){
_488=true;
}else{
_488=this._browserQueryCommandEnabled("inserttable");
}
return _488;
},_cutEnabledImpl:function(){
var _489=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_489=!!sel;
}else{
_489=this._browserQueryCommandEnabled("cut");
}
return _489;
},_copyEnabledImpl:function(){
var _48a=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_48a=!!sel;
}else{
_48a=this._browserQueryCommandEnabled("copy");
}
return _48a;
},_pasteEnabledImpl:function(){
var _48b=true;
if(has("webkit")){
return true;
}else{
_48b=this._browserQueryCommandEnabled("paste");
}
return _48b;
},_inserthorizontalruleImpl:function(_48c){
if(has("ie")){
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule",false,_48c);
},_unlinkImpl:function(_48d){
if((this.queryCommandEnabled("unlink"))&&(has("mozilla")||has("webkit"))){
var a=this._sCall("getAncestorElement",["a"]);
this._sCall("selectElement",[a]);
return this.document.execCommand("unlink",false,null);
}
return this.document.execCommand("unlink",false,_48d);
},_hilitecolorImpl:function(_48e){
var _48f;
var _490=this._handleTextColorOrProperties("hilitecolor",_48e);
if(!_490){
if(has("mozilla")){
this.document.execCommand("styleWithCSS",false,true);
_48f=this.document.execCommand("hilitecolor",false,_48e);
this.document.execCommand("styleWithCSS",false,false);
}else{
_48f=this.document.execCommand("hilitecolor",false,_48e);
}
}
return _48f;
},_backcolorImpl:function(_491){
if(has("ie")){
_491=_491?_491:null;
}
var _492=this._handleTextColorOrProperties("backcolor",_491);
if(!_492){
_492=this.document.execCommand("backcolor",false,_491);
}
return _492;
},_forecolorImpl:function(_493){
if(has("ie")){
_493=_493?_493:null;
}
var _494=false;
_494=this._handleTextColorOrProperties("forecolor",_493);
if(!_494){
_494=this.document.execCommand("forecolor",false,_493);
}
return _494;
},_inserthtmlImpl:function(_495){
_495=this._preFilterContent(_495);
var rv=true;
if(has("ie")){
var _496=this.document.selection.createRange();
if(this.document.selection.type.toUpperCase()==="CONTROL"){
var n=_496.item(0);
while(_496.length){
_496.remove(_496.item(0));
}
n.outerHTML=_495;
}else{
_496.pasteHTML(_495);
}
_496.select();
}else{
if(has("mozilla")&&!_495.length){
this._sCall("remove");
}else{
rv=this.document.execCommand("inserthtml",false,_495);
}
}
return rv;
},_boldImpl:function(_497){
var _498=false;
if(has("ie")){
this._adaptIESelection();
_498=this._adaptIEFormatAreaAndExec("bold");
}
if(!_498){
_498=this.document.execCommand("bold",false,_497);
}
return _498;
},_italicImpl:function(_499){
var _49a=false;
if(has("ie")){
this._adaptIESelection();
_49a=this._adaptIEFormatAreaAndExec("italic");
}
if(!_49a){
_49a=this.document.execCommand("italic",false,_499);
}
return _49a;
},_underlineImpl:function(_49b){
var _49c=false;
if(has("ie")){
this._adaptIESelection();
_49c=this._adaptIEFormatAreaAndExec("underline");
}
if(!_49c){
_49c=this.document.execCommand("underline",false,_49b);
}
return _49c;
},_strikethroughImpl:function(_49d){
var _49e=false;
if(has("ie")){
this._adaptIESelection();
_49e=this._adaptIEFormatAreaAndExec("strikethrough");
}
if(!_49e){
_49e=this.document.execCommand("strikethrough",false,_49d);
}
return _49e;
},_superscriptImpl:function(_49f){
var _4a0=false;
if(has("ie")){
this._adaptIESelection();
_4a0=this._adaptIEFormatAreaAndExec("superscript");
}
if(!_4a0){
_4a0=this.document.execCommand("superscript",false,_49f);
}
return _4a0;
},_subscriptImpl:function(_4a1){
var _4a2=false;
if(has("ie")){
this._adaptIESelection();
_4a2=this._adaptIEFormatAreaAndExec("subscript");
}
if(!_4a2){
_4a2=this.document.execCommand("subscript",false,_4a1);
}
return _4a2;
},_fontnameImpl:function(_4a3){
var _4a4;
if(has("ie")){
_4a4=this._handleTextColorOrProperties("fontname",_4a3);
}
if(!_4a4){
_4a4=this.document.execCommand("fontname",false,_4a3);
}
return _4a4;
},_fontsizeImpl:function(_4a5){
var _4a6;
if(has("ie")){
_4a6=this._handleTextColorOrProperties("fontsize",_4a5);
}
if(!_4a6){
_4a6=this.document.execCommand("fontsize",false,_4a5);
}
return _4a6;
},_insertorderedlistImpl:function(_4a7){
var _4a8=false;
if(has("ie")){
_4a8=this._adaptIEList("insertorderedlist",_4a7);
}
if(!_4a8){
_4a8=this.document.execCommand("insertorderedlist",false,_4a7);
}
return _4a8;
},_insertunorderedlistImpl:function(_4a9){
var _4aa=false;
if(has("ie")){
_4aa=this._adaptIEList("insertunorderedlist",_4a9);
}
if(!_4aa){
_4aa=this.document.execCommand("insertunorderedlist",false,_4a9);
}
return _4aa;
},getHeaderHeight:function(){
return this._getNodeChildrenHeight(this.header);
},getFooterHeight:function(){
return this._getNodeChildrenHeight(this.footer);
},_getNodeChildrenHeight:function(node){
var h=0;
if(node&&node.childNodes){
var i;
for(i=0;i<node.childNodes.length;i++){
var size=_436.position(node.childNodes[i]);
h+=size.h;
}
}
return h;
},_isNodeEmpty:function(node,_4ab){
if(node.nodeType===1){
if(node.childNodes.length>0){
return this._isNodeEmpty(node.childNodes[0],_4ab);
}
return true;
}else{
if(node.nodeType===3){
return (node.nodeValue.substring(_4ab)==="");
}
}
return false;
},_removeStartingRangeFromRange:function(node,_4ac){
if(node.nextSibling){
_4ac.setStart(node.nextSibling,0);
}else{
var _4ad=node.parentNode;
while(_4ad&&_4ad.nextSibling==null){
_4ad=_4ad.parentNode;
}
if(_4ad){
_4ac.setStart(_4ad.nextSibling,0);
}
}
return _4ac;
},_adaptIESelection:function(){
var _4ae=_442.getSelection(this.window);
if(_4ae&&_4ae.rangeCount&&!_4ae.isCollapsed){
var _4af=_4ae.getRangeAt(0);
var _4b0=_4af.startContainer;
var _4b1=_4af.startOffset;
while(_4b0.nodeType===3&&_4b1>=_4b0.length&&_4b0.nextSibling){
_4b1=_4b1-_4b0.length;
_4b0=_4b0.nextSibling;
}
var _4b2=null;
while(this._isNodeEmpty(_4b0,_4b1)&&_4b0!==_4b2){
_4b2=_4b0;
_4af=this._removeStartingRangeFromRange(_4b0,_4af);
_4b0=_4af.startContainer;
_4b1=0;
}
_4ae.removeAllRanges();
_4ae.addRange(_4af);
}
},_adaptIEFormatAreaAndExec:function(_4b3){
var _4b4=_442.getSelection(this.window);
var doc=this.document;
var rs,ret,_4b5,txt,_4b6,_4b7,_4b8,_4b9;
if(_4b3&&_4b4&&_4b4.isCollapsed){
var _4ba=this.queryCommandValue(_4b3);
if(_4ba){
var _4bb=this._tagNamesForCommand(_4b3);
_4b5=_4b4.getRangeAt(0);
var fs=_4b5.startContainer;
if(fs.nodeType===3){
var _4bc=_4b5.endOffset;
if(fs.length<_4bc){
ret=this._adjustNodeAndOffset(rs,_4bc);
fs=ret.node;
_4bc=ret.offset;
}
}
var _4bd;
while(fs&&fs!==this.editNode){
var _4be=fs.tagName?fs.tagName.toLowerCase():"";
if(_42f.indexOf(_4bb,_4be)>-1){
_4bd=fs;
break;
}
fs=fs.parentNode;
}
if(_4bd){
rs=_4b5.startContainer;
var _4bf=doc.createElement(_4bd.tagName);
_435.place(_4bf,_4bd,"after");
if(rs&&rs.nodeType===3){
var _4c0,_4c1;
var _4c2=_4b5.endOffset;
if(rs.length<_4c2){
ret=this._adjustNodeAndOffset(rs,_4c2);
rs=ret.node;
_4c2=ret.offset;
}
txt=rs.nodeValue;
_4b6=doc.createTextNode(txt.substring(0,_4c2));
var _4c3=txt.substring(_4c2,txt.length);
if(_4c3){
_4b7=doc.createTextNode(_4c3);
}
_435.place(_4b6,rs,"before");
if(_4b7){
_4b8=doc.createElement("span");
_4b8.className="ieFormatBreakerSpan";
_435.place(_4b8,rs,"after");
_435.place(_4b7,_4b8,"after");
_4b7=_4b8;
}
_435.destroy(rs);
var _4c4=_4b6.parentNode;
var _4c5=[];
var _4c6;
while(_4c4!==_4bd){
var tg=_4c4.tagName;
_4c6={tagName:tg};
_4c5.push(_4c6);
var _4c7=doc.createElement(tg);
if(_4c4.style){
if(_4c7.style){
if(_4c4.style.cssText){
_4c7.style.cssText=_4c4.style.cssText;
_4c6.cssText=_4c4.style.cssText;
}
}
}
if(_4c4.tagName==="FONT"){
if(_4c4.color){
_4c7.color=_4c4.color;
_4c6.color=_4c4.color;
}
if(_4c4.face){
_4c7.face=_4c4.face;
_4c6.face=_4c4.face;
}
if(_4c4.size){
_4c7.size=_4c4.size;
_4c6.size=_4c4.size;
}
}
if(_4c4.className){
_4c7.className=_4c4.className;
_4c6.className=_4c4.className;
}
if(_4b7){
_4c0=_4b7;
while(_4c0){
_4c1=_4c0.nextSibling;
_4c7.appendChild(_4c0);
_4c0=_4c1;
}
}
if(_4c7.tagName==_4c4.tagName){
_4b8=doc.createElement("span");
_4b8.className="ieFormatBreakerSpan";
_435.place(_4b8,_4c4,"after");
_435.place(_4c7,_4b8,"after");
}else{
_435.place(_4c7,_4c4,"after");
}
_4b6=_4c4;
_4b7=_4c7;
_4c4=_4c4.parentNode;
}
if(_4b7){
_4c0=_4b7;
if(_4c0.nodeType===1||(_4c0.nodeType===3&&_4c0.nodeValue)){
_4bf.innerHTML="";
}
while(_4c0){
_4c1=_4c0.nextSibling;
_4bf.appendChild(_4c0);
_4c0=_4c1;
}
}
var _4c8;
if(_4c5.length){
_4c6=_4c5.pop();
var _4c9=doc.createElement(_4c6.tagName);
if(_4c6.cssText&&_4c9.style){
_4c9.style.cssText=_4c6.cssText;
}
if(_4c6.className){
_4c9.className=_4c6.className;
}
if(_4c6.tagName==="FONT"){
if(_4c6.color){
_4c9.color=_4c6.color;
}
if(_4c6.face){
_4c9.face=_4c6.face;
}
if(_4c6.size){
_4c9.size=_4c6.size;
}
}
_435.place(_4c9,_4bf,"before");
while(_4c5.length){
_4c6=_4c5.pop();
var _4ca=doc.createElement(_4c6.tagName);
if(_4c6.cssText&&_4ca.style){
_4ca.style.cssText=_4c6.cssText;
}
if(_4c6.className){
_4ca.className=_4c6.className;
}
if(_4c6.tagName==="FONT"){
if(_4c6.color){
_4ca.color=_4c6.color;
}
if(_4c6.face){
_4ca.face=_4c6.face;
}
if(_4c6.size){
_4ca.size=_4c6.size;
}
}
_4c9.appendChild(_4ca);
_4c9=_4ca;
}
_4b9=doc.createTextNode(".");
_4b8.appendChild(_4b9);
_4c9.appendChild(_4b9);
_4c8=_442.create(this.window);
_4c8.setStart(_4b9,0);
_4c8.setEnd(_4b9,_4b9.length);
_4b4.removeAllRanges();
_4b4.addRange(_4c8);
this._sCall("collapse",[false]);
_4b9.parentNode.innerHTML="";
}else{
_4b8=doc.createElement("span");
_4b8.className="ieFormatBreakerSpan";
_4b9=doc.createTextNode(".");
_4b8.appendChild(_4b9);
_435.place(_4b8,_4bf,"before");
_4c8=_442.create(this.window);
_4c8.setStart(_4b9,0);
_4c8.setEnd(_4b9,_4b9.length);
_4b4.removeAllRanges();
_4b4.addRange(_4c8);
this._sCall("collapse",[false]);
_4b9.parentNode.innerHTML="";
}
if(!_4bf.firstChild){
_435.destroy(_4bf);
}
return true;
}
}
return false;
}else{
_4b5=_4b4.getRangeAt(0);
rs=_4b5.startContainer;
if(rs&&rs.nodeType===3){
var _4bc=_4b5.startOffset;
if(rs.length<_4bc){
ret=this._adjustNodeAndOffset(rs,_4bc);
rs=ret.node;
_4bc=ret.offset;
}
txt=rs.nodeValue;
_4b6=doc.createTextNode(txt.substring(0,_4bc));
var _4c3=txt.substring(_4bc);
if(_4c3!==""){
_4b7=doc.createTextNode(txt.substring(_4bc));
}
_4b8=doc.createElement("span");
_4b9=doc.createTextNode(".");
_4b8.appendChild(_4b9);
if(_4b6.length){
_435.place(_4b6,rs,"after");
}else{
_4b6=rs;
}
_435.place(_4b8,_4b6,"after");
if(_4b7){
_435.place(_4b7,_4b8,"after");
}
_435.destroy(rs);
var _4c8=_442.create(this.window);
_4c8.setStart(_4b9,0);
_4c8.setEnd(_4b9,_4b9.length);
_4b4.removeAllRanges();
_4b4.addRange(_4c8);
doc.execCommand(_4b3);
_435.place(_4b8.firstChild,_4b8,"before");
_435.destroy(_4b8);
_4c8.setStart(_4b9,0);
_4c8.setEnd(_4b9,_4b9.length);
_4b4.removeAllRanges();
_4b4.addRange(_4c8);
this._sCall("collapse",[false]);
_4b9.parentNode.innerHTML="";
return true;
}
}
}else{
return false;
}
},_adaptIEList:function(_4cb){
var _4cc=_442.getSelection(this.window);
if(_4cc.isCollapsed){
if(_4cc.rangeCount&&!this.queryCommandValue(_4cb)){
var _4cd=_4cc.getRangeAt(0);
var sc=_4cd.startContainer;
if(sc&&sc.nodeType==3){
if(!_4cd.startOffset){
var _4ce="ul";
if(_4cb==="insertorderedlist"){
_4ce="ol";
}
var list=this.document.createElement(_4ce);
var li=_435.create("li",null,list);
_435.place(list,sc,"before");
li.appendChild(sc);
_435.create("br",null,list,"after");
var _4cf=_442.create(this.window);
_4cf.setStart(sc,0);
_4cf.setEnd(sc,sc.length);
_4cc.removeAllRanges();
_4cc.addRange(_4cf);
this._sCall("collapse",[true]);
return true;
}
}
}
}
return false;
},_handleTextColorOrProperties:function(_4d0,_4d1){
var _4d2=_442.getSelection(this.window);
var doc=this.document;
var rs,ret,_4d3,txt,_4d4,_4d5,_4d6,_4d7;
_4d1=_4d1||null;
if(_4d0&&_4d2&&_4d2.isCollapsed){
if(_4d2.rangeCount){
_4d3=_4d2.getRangeAt(0);
rs=_4d3.startContainer;
if(rs&&rs.nodeType===3){
var _4d8=_4d3.startOffset;
if(rs.length<_4d8){
ret=this._adjustNodeAndOffset(rs,_4d8);
rs=ret.node;
_4d8=ret.offset;
}
txt=rs.nodeValue;
_4d4=doc.createTextNode(txt.substring(0,_4d8));
var _4d9=txt.substring(_4d8);
if(_4d9!==""){
_4d5=doc.createTextNode(txt.substring(_4d8));
}
_4d6=doc.createElement("span");
_4d7=doc.createTextNode(".");
_4d6.appendChild(_4d7);
var _4da=doc.createElement("span");
_4d6.appendChild(_4da);
if(_4d4.length){
_435.place(_4d4,rs,"after");
}else{
_4d4=rs;
}
_435.place(_4d6,_4d4,"after");
if(_4d5){
_435.place(_4d5,_4d6,"after");
}
_435.destroy(rs);
var _4db=_442.create(this.window);
_4db.setStart(_4d7,0);
_4db.setEnd(_4d7,_4d7.length);
_4d2.removeAllRanges();
_4d2.addRange(_4db);
if(has("webkit")){
var _4dc="color";
if(_4d0==="hilitecolor"||_4d0==="backcolor"){
_4dc="backgroundColor";
}
_437.set(_4d6,_4dc,_4d1);
this._sCall("remove",[]);
_435.destroy(_4da);
_4d6.innerHTML="&#160;";
this._sCall("selectElement",[_4d6]);
this.focus();
}else{
this.execCommand(_4d0,_4d1);
_435.place(_4d6.firstChild,_4d6,"before");
_435.destroy(_4d6);
_4db.setStart(_4d7,0);
_4db.setEnd(_4d7,_4d7.length);
_4d2.removeAllRanges();
_4d2.addRange(_4db);
this._sCall("collapse",[false]);
_4d7.parentNode.removeChild(_4d7);
}
return true;
}
}
}
return false;
},_adjustNodeAndOffset:function(node,_4dd){
while(node.length<_4dd&&node.nextSibling&&node.nextSibling.nodeType===3){
_4dd=_4dd-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_4dd};
},_tagNamesForCommand:function(_4de){
if(_4de==="bold"){
return ["b","strong"];
}else{
if(_4de==="italic"){
return ["i","em"];
}else{
if(_4de==="strikethrough"){
return ["s","strike"];
}else{
if(_4de==="superscript"){
return ["sup"];
}else{
if(_4de==="subscript"){
return ["sub"];
}else{
if(_4de==="underline"){
return ["u"];
}
}
}
}
}
}
return [];
},_stripBreakerNodes:function(node){
if(!this.isLoaded){
return;
}
_43a(".ieFormatBreakerSpan",node).forEach(function(b){
while(b.firstChild){
_435.place(b.firstChild,b,"before");
}
_435.destroy(b);
});
return node;
}});
return _446;
});
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_4df,_4e0,_4e1,lang,dom,_4e2,_4e3,on,_4e4,_4e5,dnd,_4e6,win){
var _4e7=_4e0("dojo.dnd.Moveable",[_4e3],{handle:"",delay:0,skip:false,constructor:function(node,_4e8){
this.node=dom.byId(node);
if(!_4e8){
_4e8={};
}
this.handle=_4e8.handle?dom.byId(_4e8.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_4e8.delay>0?_4e8.delay:0;
this.skip=_4e8.skip;
this.mover=_4e8.mover?_4e8.mover:_4e6;
this.events=[on(this.handle,_4e5.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_4e9,node,Ctor){
return new Ctor(node,_4e9);
},destroy:function(){
_4df.forEach(this.events,function(_4ea){
_4ea.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_4e5.move,lang.hitch(this,"onMouseMove")),on(this.handle,_4e5.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
_4e1.stop(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
_4e1.stop(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
_4e1.stop(e);
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
_4e1.stop(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_4eb){
_4e4.publish("/dnd/move/start",_4eb);
_4e2.add(win.body(),"dojoMove");
_4e2.add(this.node,"dojoMoveItem");
},onMoveStop:function(_4ec){
_4e4.publish("/dnd/move/stop",_4ec);
_4e2.remove(win.body(),"dojoMove");
_4e2.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_4ed,_4ee){
this.onMoving(_4ed,_4ee);
var s=_4ed.node.style;
s.left=_4ee.l+"px";
s.top=_4ee.t+"px";
this.onMoved(_4ed,_4ee);
},onMoving:function(){
},onMoved:function(){
}});
return _4e7;
});
},"dijit/TooltipDialog":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","./main"],function(_4ef,_4f0,_4f1,keys,lang,_4f2,_4f3,_4f4,_4f5,_4f6,_4f7,_4f8){
return _4ef("dijit.TooltipDialog",[_4f3,_4f6,_4f5,_4f4],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_4f7,_setTitleAttr:function(_4f9){
this.containerNode.title=_4f9;
this._set("title",_4f9);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_4fa,_4fb){
var newC={"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_4fa+"-"+_4fb];
_4f0.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_4f2.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
var _4fc=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_4fc.y+((_4fc.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_4fc.x+((_4fc.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.containerNode);
}
var _4fd=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==keys.ESCAPE){
this.defer("onCancel");
_4f1.stop(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_4fd){
_4f2.focus(this._lastFocusItem);
}
_4f1.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_4fd){
_4f2.focus(this._firstFocusItem);
}
_4f1.stop(evt);
}else{
if(evt.charOrCode===keys.TAB){
evt.stopPropagation();
}
}
}
}
}});
});
},"dojo/store/util/SimpleQueryEngine":function(){
define(["../../_base/array"],function(_4fe){
return function(_4ff,_500){
switch(typeof _4ff){
default:
throw new Error("Can not query with a "+typeof _4ff);
case "object":
case "undefined":
var _501=_4ff;
_4ff=function(_502){
for(var key in _501){
var _503=_501[key];
if(_503&&_503.test){
if(!_503.test(_502[key],_502)){
return false;
}
}else{
if(_503!=_502[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_4ff]){
throw new Error("No filter function "+_4ff+" was found in store");
}
_4ff=this[_4ff];
case "function":
}
function _504(_505){
var _506=_4fe.filter(_505,_4ff);
var _507=_500&&_500.sort;
if(_507){
_506.sort(typeof _507=="function"?_507:function(a,b){
for(var sort,i=0;sort=_507[i];i++){
var _508=a[sort.attribute];
var _509=b[sort.attribute];
if(_508!=_509){
return !!sort.descending==(_508==null||_508>_509)?-1:1;
}
}
return 0;
});
}
if(_500&&(_500.start||_500.count)){
var _50a=_506.length;
_506=_506.slice(_500.start||0,(_500.start||0)+(_500.count||Infinity));
_506.total=_50a;
}
return _506;
};
_504.matches=_4ff;
return _504;
};
});
},"dijit/form/_ExpandingTextAreaMixin":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/has","dojo/_base/lang","dojo/_base/window","../Viewport"],function(_50b,_50c,has,lang,win,_50d){
has.add("textarea-needs-help-shrinking",function(){
var body=win.body(),te=_50c.create("textarea",{rows:"5",cols:"20",value:" ",style:{zoom:1,overflow:"hidden",visibility:"hidden",position:"absolute",border:"0px solid black",padding:"0px"}},body,"last");
var _50e=te.scrollHeight>=te.clientHeight;
body.removeChild(te);
return _50e;
});
return _50b("dijit.form._ExpandingTextAreaMixin",null,{_setValueAttr:function(){
this.inherited(arguments);
this.resize();
},postCreate:function(){
this.inherited(arguments);
var _50f=this.textbox;
this.connect(_50f,"onscroll","_resizeLater");
this.connect(_50f,"onresize","_resizeLater");
this.connect(_50f,"onfocus","_resizeLater");
this.own(_50d.on("resize",lang.hitch(this,"_resizeLater")));
_50f.style.overflowY="hidden";
this._estimateHeight();
this._resizeLater();
},_onInput:function(e){
this.inherited(arguments);
this.resize();
},_estimateHeight:function(){
var _510=this.textbox;
_510.style.height="auto";
_510.rows=(_510.value.match(/\n/g)||[]).length+2;
},_resizeLater:function(){
this.defer("resize");
},resize:function(){
var _511=this.textbox;
function _512(){
var _513=false;
if(_511.value===""){
_511.value=" ";
_513=true;
}
var sh=_511.scrollHeight;
if(_513){
_511.value="";
}
return sh;
};
if(_511.style.overflowY=="hidden"){
_511.scrollTop=0;
}
if(this.busyResizing){
return;
}
this.busyResizing=true;
if(_512()||_511.offsetHeight){
var _514=_511.style.height;
if(!(/px/.test(_514))){
_514=_512();
_511.rows=1;
_511.style.height=_514+"px";
}
var newH=Math.max(Math.max(_511.offsetHeight,parseInt(_514))-_511.clientHeight,0)+_512();
var _515=newH+"px";
if(_515!=_511.style.height){
_511.rows=1;
_511.style.height=_515;
}
if(has("textarea-needs-help-shrinking")){
var _516=_512(),_517=_516,_518=_511.style.minHeight,_519=4,_51a;
_511.style.minHeight=_515;
_511.style.height="auto";
while(newH>0){
_511.style.minHeight=Math.max(newH-_519,4)+"px";
_51a=_512();
var _51b=_517-_51a;
newH-=_51b;
if(_51b<_519){
break;
}
_517=_51a;
_519<<=1;
}
_511.style.height=newH+"px";
_511.style.minHeight=_518;
}
_511.style.overflowY=_512()>_511.clientHeight?"auto":"hidden";
}else{
this._estimateHeight();
}
this.busyResizing=false;
}});
});
},"dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_51c,dom,_51d,_51e,_51f,has,_520,_521,_522,_523,_524){
return _51c("dijit.MenuItem",[_520,_521,_522,_523],{templateString:_524,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_525){
if(_525&&!("label" in this.params)){
this.set("label",_525.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _526=this.id+"_text";
_51d.set(this.containerNode,"id",_526);
if(this.accelKeyNode){
_51d.set(this.accelKeyNode,"id",this.id+"_accel");
_526+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_526);
dom.setSelectable(this.domNode,false);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_527){
_51e.toggle(this.domNode,"dijitMenuItemSelected",_527);
},setLabel:function(_528){
_51f.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_528);
},setDisabled:function(_529){
_51f.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_529);
},_setDisabledAttr:function(_52a){
this.focusNode.setAttribute("aria-disabled",_52a?"true":"false");
this._set("disabled",_52a);
},_setAccelKeyAttr:function(_52b){
this.accelKeyNode.style.display=_52b?"":"none";
this.accelKeyNode.innerHTML=_52b;
_51d.set(this.containerNode,"colSpan",_52b?"1":"2");
this._set("accelKey",_52b);
},_setTextDirAttr:function(_52c){
if(!this._created||this.textDir!=_52c){
this._set("textDir",_52c);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"dijit/MenuBarItem":function(){
define(["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_52d,_52e,_52f){
var _530=_52d("dijit._MenuBarItemMixin",null,{templateString:_52f,_setIconClassAttr:null});
var _531=_52d("dijit.MenuBarItem",[_52e,_530],{});
_531._MenuBarItemMixin=_530;
return _531;
});
},"dijit/layout/TabController":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../registry","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_532,dom,_533,_534,i18n,lang,_535,_536,Menu,_537,_538){
var _539=_532("dijit.layout._TabButton",_535.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_538,scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
this.defer(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_534.toggle(this.domNode,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _53a=i18n.getLocalization("dijit","common");
if(this.closeNode){
_533.set(this.closeNode,"title",_53a.itemClose);
}
}
},_setDisabledAttr:function(_53b){
this.inherited(arguments);
if(this.closeNode){
if(_53b){
_533.remove(this.closeNode,"title");
}else{
var _53c=i18n.getLocalization("dijit","common");
_533.set(this.closeNode,"title",_53c.itemClose);
}
}
},_setLabelAttr:function(_53d){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
var _53e=_532("dijit.layout.TabController",_535,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:_539,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){
this.inherited(arguments);
var _53f=new Menu({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(node){
return _534.contains(node,"dijitClosable")&&!_534.contains(node,"dijitTabDisabled");
}});
this.own(_53f);
var _540=i18n.getLocalization("dijit","common"),_541=this;
_53f.addChild(new _537({label:_540.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(evt){
var _542=_536.byNode(this.getParent().currentTarget);
_541.onCloseButtonClick(_542.page);
}}));
}});
_53e.TabButton=_539;
return _53e;
});
},"dojo/cldr/supplemental":function(){
define(["../_base/lang","../i18n"],function(lang,i18n){
var _543={};
lang.setObject("dojo.cldr.supplemental",_543);
_543.getFirstDayOfWeek=function(_544){
var _545={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _546=_543._region(_544);
var dow=_545[_546];
return (dow===undefined)?1:dow;
};
_543._region=function(_547){
_547=i18n.normalizeLocale(_547);
var tags=_547.split("-");
var _548=tags[1];
if(!_548){
_548={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_548.length==4){
_548=tags[2];
}
}
return _548;
};
_543.getWeekend=function(_549){
var _54a={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_54b={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_54c=_543._region(_549),_54d=_54a[_54c],end=_54b[_54c];
if(_54d===undefined){
_54d=6;
}
if(end===undefined){
end=0;
}
return {start:_54d,end:end};
};
return _543;
});
},"dijit/MenuBar":function(){
require({cache:{"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n"}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_54e,_54f,keys,_550,_551){
return _54e("dijit.MenuBar",_550,{templateString:_551,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],l?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
this._orient=["below"];
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}
},focusChild:function(item){
var _552=this.focusedChild,_553=_552&&_552.popup&&_552.popup.isShowingNow;
this.inherited(arguments);
if(_553&&item.popup&&!item.disabled){
this._openPopup(true);
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case keys.DOWN_ARROW:
this._moveToPopup(evt);
_54f.stop(evt);
}
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow&&(evt.type!=="keypress"||evt.keyCode!==keys.DOWN_ARROW)){
item.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
});
},"dijit/ToolbarSeparator":function(){
define("dijit/ToolbarSeparator",["dojo/_base/declare","dojo/dom","./_Widget","./_TemplatedMixin"],function(_554,dom,_555,_556){
return _554("dijit.ToolbarSeparator",[_555,_556],{templateString:"<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/layout/StackController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_557,_558,_559,_55a,keys,lang,on,_55b,_55c,_55d,_55e,_55f,_560){
var _561=_558("dijit.layout._StackButton",_560,{tabIndex:"-1",closeButton:false,_aria_attr:"aria-selected",buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
}});
var _562=_558("dijit.layout.StackController",[_55d,_55e,_55f],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_561,buttonWidgetCloseClass:"dijitStackCloseButton",constructor:function(_563){
this.pane2button={};
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
this.connect(this.containerNode,"click",function(evt){
var _564=_55c.getEnclosingWidget(evt.target);
if(_564!=this.containerNode&&!_564.disabled&&_564.page){
for(var _565=evt.target;_565!==this.containerNode;_565=_565.parentNode){
if(_559.contains(_565,this.buttonWidgetCloseClass)){
this.onCloseButtonClick(_564.page);
break;
}else{
if(_565==_564.domNode){
this.onButtonClick(_564.page);
break;
}
}
}
}
});
},onStartup:function(info){
_557.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
var _566=_55c.byId(this.containerId).containerNode,_567=this.pane2button,_568={"title":"label","showtitle":"showLabel","iconclass":"iconClass","closable":"closeButton","tooltip":"title","disabled":"disabled"},_569=function(attr,_56a){
return on(_566,"attrmodified-"+attr,function(evt){
var _56b=_567[evt.detail&&evt.detail.widget&&evt.detail.widget.id];
if(_56b){
_56b.set(_56a,evt.detail.newValue);
}
});
};
for(var attr in _568){
this.own(_569(attr,_568[attr]));
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_55c.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_56c){
var Cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _56d=new Cls({id:this.id+"_"+page.id,name:this.id+"_"+page.id,label:page.title,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip,page:page});
this.addChild(_56d,_56c);
this.pane2button[page.id]=_56d;
page.controlButton=_56d;
if(!this._currentChild){
this.onSelectChild(page);
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
var _56e=this.pane2button[page.id];
if(_56e){
this.removeChild(_56e);
delete this.pane2button[page.id];
_56e.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _56f=this.pane2button[this._currentChild.id];
_56f.set("checked",false);
_56f.focusNode.setAttribute("tabIndex","-1");
}
var _570=this.pane2button[page.id];
_570.set("checked",true);
this._currentChild=page;
_570.focusNode.setAttribute("tabIndex","0");
var _571=_55c.byId(this.containerId);
_571.containerNode.setAttribute("aria-labelledby",_570.id);
},onButtonClick:function(page){
var _572=this.pane2button[page.id];
_55b.focus(_572.focusNode);
if(this._currentChild&&this._currentChild.id===page.id){
_572.set("checked",true);
}
var _573=_55c.byId(this.containerId);
_573.selectChild(page);
},onCloseButtonClick:function(page){
var _574=_55c.byId(this.containerId);
_574.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_55b.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_575){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_575=!_575;
}
var _576=this.getChildren();
var idx=_557.indexOf(_576,this.pane2button[this._currentChild.id]),_577=_576[idx];
var _578;
do{
idx=(idx+(_575?1:_576.length-1))%_576.length;
_578=_576[idx];
}while(_578.disabled&&_578!=_577);
return _578;
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _579=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_579=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_579=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_579=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_579=true;
}
break;
case keys.HOME:
var _57a=this.getChildren();
for(var idx=0;idx<_57a.length;idx++){
var _57b=_57a[idx];
if(!_57b.disabled){
this.onButtonClick(_57b.page);
break;
}
}
_55a.stop(e);
break;
case keys.END:
var _57a=this.getChildren();
for(var idx=_57a.length-1;idx>=0;idx--){
var _57b=_57a[idx];
if(!_57b.disabled){
this.onButtonClick(_57b.page);
break;
}
}
_55a.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_55a.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.onButtonClick(this.adjacent(!e.shiftKey).page);
_55a.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_55a.stop(e);
}
}
}
}
if(_579!==null){
this.onButtonClick(this.adjacent(_579).page);
_55a.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_562.StackButton=_561;
return _562;
});
},"url:dijit/templates/TooltipDialog.html":"<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n","dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_57c,_57d,_57e,lang,has,win,dom,_57f,_580,_581,on,_582,dnd,_583){
return _57d("dojo.dnd.Mover",[_581],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[on(d,_582.move,lang.hitch(this,"onFirstMove")),on(d,_582.move,lang.hitch(this,"onMouseMove")),on(d,_582.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_57e.stop),on(d.body,"selectstart",_57e.stop)];
_583.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_583.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
_57e.stop(e);
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
_57e.stop(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=_57f.getMarginBox(this.node);
var b=win.doc.body;
var bs=_580.getComputedStyle(b);
var bm=_57f.getMarginBox(b,bs);
var bc=_57f.getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
this.events.shift().remove();
},destroy:function(){
_57c.forEach(this.events,function(_584){
_584.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"dijit/form/HorizontalRule":function(){
define(["dojo/_base/declare","../_Widget","../_TemplatedMixin"],function(_585,_586,_587){
return _585("dijit.form.HorizontalRule",[_586,_587],{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerH\"></div>",count:3,container:"containerNode",ruleStyle:"",_positionPrefix:"<div class=\"dijitRuleMark dijitRuleMarkH\" style=\"left:",_positionSuffix:"%;",_suffix:"\"></div>",_genHTML:function(pos){
return this._positionPrefix+pos+this._positionSuffix+this.ruleStyle+this._suffix;
},_isHorizontal:true,buildRendering:function(){
this.inherited(arguments);
var _588;
if(this.count==1){
_588=this._genHTML(50,0);
}else{
var i;
var _589=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){
_588=this._genHTML(0,0);
for(i=1;i<this.count-1;i++){
_588+=this._genHTML(_589*i,i);
}
_588+=this._genHTML(100,this.count-1);
}else{
_588=this._genHTML(100,0);
for(i=1;i<this.count-1;i++){
_588+=this._genHTML(100-_589*i,i);
}
_588+=this._genHTML(0,this.count-1);
}
}
this.domNode.innerHTML=_588;
}});
});
},"dijit/layout/TabContainer":function(){
define(["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_58a,_58b,_58c,_58d){
return _58a("dijit.layout.TabContainer",_58b,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_58e){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_58c=typeof this.controllerWidget=="string"?lang.getObject(this.controllerWidget):this.controllerWidget;
return new _58c({id:this.id+"_tablist",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_58e);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?_58d:_58c;
}
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/_Spinner":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/mouse","../typematic","./RangeBoundTextBox","dojo/text!./templates/Spinner.html","./_TextBoxMixin"],function(_58f,_590,keys,lang,has,_591,_592,_593,_594,_595){
return _58f("dijit.form._Spinner",_593,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:_594,baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val){
return val;
},_arrowPressed:function(_596,_597,_598){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_597*_598),false);
_595.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(){
this._wheelTimer=null;
},_typematicCallback:function(_599,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var key=evt.charOrCode;
inc=(key==keys.PAGE_UP||key==keys.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==keys.UP_ARROW||key==keys.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_599==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
_590.stop(evt);
var _59a=evt.wheelDelta/120;
if(Math.floor(_59a)!=_59a){
_59a=evt.wheelDelta>0?1:-1;
}
var _59b=evt.detail?(evt.detail*-1):_59a;
if(_59b!==0){
var node=this[(_59b>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_59b,this.smallDelta);
if(this._wheelTimer){
this._wheelTimer.remove();
}
this._wheelTimer=this.defer(function(){
this._arrowReleased(node);
},50);
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,_591.wheel,"_mouseWheeled");
this.own(_592.addListener(this.upArrowNode,this.textbox,{charOrCode:keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_592.addListener(this.downArrowNode,this.textbox,{charOrCode:keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_592.addListener(this.upArrowNode,this.textbox,{charOrCode:keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_592.addListener(this.downArrowNode,this.textbox,{charOrCode:keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
});
},"dijit/form/Button":function(){
define(["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_59c,_59d,_59e,has,_59f,lang,_5a0,_5a1,_5a2,_5a3){
if(has("dijit-legacy-requires")){
_5a0(0,function(){
var _5a4=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_59c(_5a4);
});
}
return _59d("dijit.form.Button",[_5a1,_5a2],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_5a3,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
e.stopPropagation();
}
}
return ok;
},_fillContent:function(_5a5){
if(_5a5&&(!this.params||!("label" in this.params))){
var _5a6=lang.trim(_5a5.innerHTML);
if(_5a6){
this.label=_5a6;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_59e.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_5a7){
_59f.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_5a7);
},_setLabelAttr:function(_5a8){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","dojo/dnd/move":function(){
define(["../_base/declare","../dom-geometry","../dom-style","./common","./Mover","./Moveable"],function(_5a9,_5aa,_5ab,dnd,_5ac,_5ad){
var _5ae=_5a9("dojo.dnd.move.constrainedMoveable",_5ad,{constraints:function(){
},within:false,constructor:function(node,_5af){
if(!_5af){
_5af={};
}
this.constraints=_5af.constraints;
this.within=_5af.within;
},onFirstMove:function(_5b0){
var c=this.constraintBox=this.constraints.call(this,_5b0);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=_5aa.getMarginSize(_5b0.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_5b1,_5b2){
var c=this.constraintBox,s=_5b1.node.style;
this.onMoving(_5b1,_5b2);
_5b2.l=_5b2.l<c.l?c.l:c.r<_5b2.l?c.r:_5b2.l;
_5b2.t=_5b2.t<c.t?c.t:c.b<_5b2.t?c.b:_5b2.t;
s.left=_5b2.l+"px";
s.top=_5b2.t+"px";
this.onMoved(_5b1,_5b2);
}});
var _5b3=_5a9("dojo.dnd.move.boxConstrainedMoveable",_5ae,{box:{},constructor:function(node,_5b4){
var box=_5b4&&_5b4.box;
this.constraints=function(){
return box;
};
}});
var _5b5=_5a9("dnd.move.parentConstrainedMoveable",_5ae,{area:"content",constructor:function(node,_5b6){
var area=_5b6&&_5b6.area;
this.constraints=function(){
var n=this.node.parentNode,s=_5ab.getComputedStyle(n),mb=_5aa.getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=_5aa.getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=_5aa.getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=_5aa.getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
return {constrainedMoveable:_5ae,boxConstrainedMoveable:_5b3,parentConstrainedMoveable:_5b5};
});
},"dijit/form/Form":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/_base/kernel","dojo/sniff","../_Widget","../_TemplatedMixin","./_FormMixin","../layout/_ContentPaneResizeMixin"],function(_5b7,_5b8,_5b9,_5ba,has,_5bb,_5bc,_5bd,_5be){
return _5b7("dijit.form.Form",[_5bb,_5bc,_5bd,_5be],{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",templateString:"<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},execute:function(){
},onExecute:function(){
},_setEncTypeAttr:function(_5bf){
this.encType=_5bf;
_5b8.set(this.domNode,"encType",_5bf);
if(has("ie")){
this.domNode.encoding=_5bf;
}
},reset:function(e){
var faux={returnValue:true,preventDefault:function(){
this.returnValue=false;
},stopPropagation:function(){
},currentTarget:e?e.target:this.domNode,target:e?e.target:this.domNode};
if(!(this.onReset(faux)===false)&&faux.returnValue){
this.inherited(arguments,[]);
}
},onReset:function(){
return true;
},_onReset:function(e){
this.reset(e);
_5b9.stop(e);
return false;
},_onSubmit:function(e){
var fp=this.constructor.prototype;
if(this.execute!=fp.execute||this.onExecute!=fp.onExecute){
_5ba.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.","","2.0");
this.onExecute();
this.execute(this.getValues());
}
if(this.onSubmit(e)===false){
_5b9.stop(e);
}
},onSubmit:function(){
return this.isValid();
},submit:function(){
if(!(this.onSubmit()===false)){
this.containerNode.submit();
}
}});
});
},"dijit/layout/_TabContainerBase":function(){
define(["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_5c0,_5c1,_5c2,_5c3,_5c4,_5c5,_5c6,_5c7){
return _5c4("dijit.layout._TabContainerBase",[_5c1,_5c3],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_5c0,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_5c7.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_5c5.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_5c5.add(this.domNode,"dijitTabContainerNested");
_5c5.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_5c5.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_5c5.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_5c5.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_5c5.add(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _5c8=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_5c8;
var _5c9=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_5c8},{domNode:this.containerNode,layoutAlign:"client"}];
_5c2.layoutChildren(this.domNode,this._contentBox,_5c9);
this._containerContentBox=_5c2.marginBox2contentBox(this.containerNode,_5c9[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _5ca=_5c6.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_5ca});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
});
},"dojo/store/Memory":function(){
define(["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_5cb,_5cc,_5cd){
var base=null;
return _5cb("dojo.store.Memory",base,{constructor:function(_5ce){
for(var i in _5ce){
this[i]=_5ce[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_5cd,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_5cf){
return _5cf[this.idProperty];
},put:function(_5d0,_5d1){
var data=this.data,_5d2=this.index,_5d3=this.idProperty;
var id=_5d0[_5d3]=(_5d1&&"id" in _5d1)?_5d1.id:_5d3 in _5d0?_5d0[_5d3]:Math.random();
if(id in _5d2){
if(_5d1&&_5d1.overwrite===false){
throw new Error("Object already exists");
}
data[_5d2[id]]=_5d0;
}else{
_5d2[id]=data.push(_5d0)-1;
}
return id;
},add:function(_5d4,_5d5){
(_5d5=_5d5||{}).overwrite=false;
return this.put(_5d4,_5d5);
},remove:function(id){
var _5d6=this.index;
var data=this.data;
if(id in _5d6){
data.splice(_5d6[id],1);
this.setData(data);
return true;
}
},query:function(_5d7,_5d8){
return _5cc(this.queryEngine(_5d7,_5d8)(this.data));
},setData:function(data){
if(data.items){
this.idProperty=data.identifier;
data=this.data=data.items;
}else{
this.data=data;
}
this.index={};
for(var i=0,l=data.length;i<l;i++){
this.index[data[i][this.idProperty]]=i;
}
}});
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/Editor":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/i18n","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/string","dojo/topic","dojo/_base/window","./_base/focus","./_Container","./Toolbar","./ToolbarSeparator","./layout/_LayoutWidget","./form/ToggleButton","./_editor/_Plugin","./_editor/plugins/EnterKeyHandling","./_editor/html","./_editor/range","./_editor/RichText","./main","dojo/i18n!./_editor/nls/commands"],function(_5d9,_5da,_5db,i18n,_5dc,_5dd,_5de,_5df,_5e0,keys,lang,has,_5e1,_5e2,win,_5e3,_5e4,_5e5,_5e6,_5e7,_5e8,_5e9,_5ea,html,_5eb,_5ec,_5ed){
var _5ee=_5da("dijit.Editor",_5ec,{plugins:null,extraPlugins:null,constructor:function(){
if(!lang.isArray(this.plugins)){
this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull",_5ea];
}
this._plugins=[];
this._editInterval=this.editActionInterval*1000;
if(has("ie")){
this.events.push("onBeforeDeactivate");
this.events.push("onBeforeActivate");
}
},postMixInProperties:function(){
this.setValueDeferred=new _5db();
this.inherited(arguments);
},postCreate:function(){
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0);
if(lang.isArray(this.extraPlugins)){
this.plugins=this.plugins.concat(this.extraPlugins);
}
this.inherited(arguments);
this.commands=i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){
this.toolbar=new _5e5({ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang});
this.header.appendChild(this.toolbar.domNode);
}
_5d9.forEach(this.plugins,this.addPlugin,this);
this.setValueDeferred.resolve(true);
_5dd.add(this.iframe.parentNode,"dijitEditorIFrameContainer");
_5dd.add(this.iframe,"dijitEditorIFrame");
_5dc.set(this.iframe,"allowTransparency",true);
if(has("webkit")){
_5df.set(this.domNode,"KhtmlUserSelect","none");
}
this.toolbar.startup();
this.onNormalizedDisplayChanged();
},destroy:function(){
_5d9.forEach(this._plugins,function(p){
if(p&&p.destroy){
p.destroy();
}
});
this._plugins=[];
this.toolbar.destroyRecursive();
delete this.toolbar;
this.inherited(arguments);
},addPlugin:function(_5ef,_5f0){
var args=lang.isString(_5ef)?{name:_5ef}:lang.isFunction(_5ef)?{ctor:_5ef}:_5ef;
if(!args.setEditor){
var o={"args":args,"plugin":null,"editor":this};
if(args.name){
if(_5e9.registry[args.name]){
o.plugin=_5e9.registry[args.name](args);
}else{
_5e2.publish(_5ed._scopeName+".Editor.getPlugin",o);
}
}
if(!o.plugin){
try{
var pc=args.ctor||lang.getObject(args.name)||require(args.name);
if(pc){
o.plugin=new pc(args);
}
}
catch(e){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
}
if(!o.plugin){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
_5ef=o.plugin;
}
if(arguments.length>1){
this._plugins[_5f0]=_5ef;
}else{
this._plugins.push(_5ef);
}
_5ef.setEditor(this);
if(lang.isFunction(_5ef.setToolbar)){
_5ef.setToolbar(this.toolbar);
}
},resize:function(size){
if(size){
_5e7.prototype.resize.apply(this,arguments);
}
},layout:function(){
var _5f1=(this._contentBox.h-(this.getHeaderHeight()+this.getFooterHeight()+_5de.getPadBorderExtents(this.iframe.parentNode).h+_5de.getMarginExtents(this.iframe.parentNode).h));
this.editingArea.style.height=_5f1+"px";
if(this.iframe){
this.iframe.style.height="100%";
}
this._layoutMode=true;
},_onIEMouseDown:function(e){
var _5f2;
var b=this.document.body;
var _5f3=b.clientWidth;
var _5f4=b.clientHeight;
var _5f5=b.clientLeft;
var _5f6=b.offsetWidth;
var _5f7=b.offsetHeight;
var _5f8=b.offsetLeft;
if(/^rtl$/i.test(b.dir||"")){
if(_5f3<_5f6&&e.x>_5f3&&e.x<_5f6){
_5f2=true;
}
}else{
if(e.x<_5f5&&e.x>_5f8){
_5f2=true;
}
}
if(!_5f2){
if(_5f4<_5f7&&e.y>_5f4&&e.y<_5f7){
_5f2=true;
}
}
if(!_5f2){
delete this._cursorToStart;
delete this._savedSelection;
if(e.target.tagName=="BODY"){
this.defer("placeCursorAtEnd");
}
this.inherited(arguments);
}
},onBeforeActivate:function(){
this._restoreSelection();
},onBeforeDeactivate:function(e){
if(this.customUndo){
this.endEditing(true);
}
if(e.target.tagName!="BODY"){
this._saveSelection();
}
},customUndo:true,editActionInterval:3,beginEditing:function(cmd){
if(!this._inEditing){
this._inEditing=true;
this._beginEditing(cmd);
}
if(this.editActionInterval>0){
if(this._editTimer){
this._editTimer.remove();
}
this._editTimer=this.defer("endEditing",this._editInterval);
}
},_steps:[],_undoedSteps:[],execCommand:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return this[cmd]();
}else{
if(this.customUndo){
this.endEditing();
this._beginEditing();
}
var r=this.inherited(arguments);
if(this.customUndo){
this._endEditing();
}
return r;
}
},_pasteImpl:function(){
return this._clipboardCommand("paste");
},_cutImpl:function(){
return this._clipboardCommand("cut");
},_copyImpl:function(){
return this._clipboardCommand("copy");
},_clipboardCommand:function(cmd){
var r;
try{
r=this.document.execCommand(cmd,false,null);
if(has("webkit")&&!r){
throw {code:1011};
}
}
catch(e){
if(e.code==1011||(e.code==9&&has("opera"))){
var sub=_5e1.substitute,_5f9={cut:"X",copy:"C",paste:"V"};
alert(sub(this.commands.systemShortcut,[this.commands[cmd],sub(this.commands[has("mac")?"appleKey":"ctrlKey"],[_5f9[cmd]])]));
}
r=false;
}
return r;
},queryCommandEnabled:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0);
}else{
return this.inherited(arguments);
}
},_moveToBookmark:function(b){
var _5fa=b.mark;
var mark=b.mark;
var col=b.isCollapsed;
var r,_5fb,_5fc,sel;
if(mark){
if(has("ie")<9){
if(lang.isArray(mark)){
_5fa=[];
_5d9.forEach(mark,function(n){
_5fa.push(_5eb.getNode(n,this.editNode));
},this);
win.withGlobal(this.window,"moveToBookmark",_5e3,[{mark:_5fa,isCollapsed:col}]);
}else{
if(mark.startContainer&&mark.endContainer){
sel=_5eb.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_5eb.create(this.window);
_5fb=_5eb.getNode(mark.startContainer,this.editNode);
_5fc=_5eb.getNode(mark.endContainer,this.editNode);
if(_5fb&&_5fc){
r.setStart(_5fb,mark.startOffset);
r.setEnd(_5fc,mark.endOffset);
sel.addRange(r);
}
}
}
}
}else{
sel=_5eb.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_5eb.create(this.window);
_5fb=_5eb.getNode(mark.startContainer,this.editNode);
_5fc=_5eb.getNode(mark.endContainer,this.editNode);
if(_5fb&&_5fc){
r.setStart(_5fb,mark.startOffset);
r.setEnd(_5fc,mark.endOffset);
sel.addRange(r);
}
}
}
}
},_changeToStep:function(from,to){
this.setValue(to.text);
var b=to.bookmark;
if(!b){
return;
}
this._moveToBookmark(b);
},undo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._steps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
delete this._undoRedoActive;
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},redo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},endEditing:function(_5fd){
if(this._editTimer){
this._editTimer=this._editTimer.remove();
}
if(this._inEditing){
this._endEditing(_5fd);
this._inEditing=false;
}
},_getBookmark:function(){
var b=win.withGlobal(this.window,_5e3.getBookmark);
var tmp=[];
if(b&&b.mark){
var mark=b.mark;
if(has("ie")<9){
var sel=_5eb.getSelection(this.window);
if(!lang.isArray(mark)){
if(sel){
var _5fe;
if(sel.rangeCount){
_5fe=sel.getRangeAt(0);
}
if(_5fe){
b.mark=_5fe.cloneRange();
}else{
b.mark=win.withGlobal(this.window,_5e3.getBookmark);
}
}
}else{
_5d9.forEach(b.mark,function(n){
tmp.push(_5eb.getIndex(n,this.editNode).o);
},this);
b.mark=tmp;
}
}
try{
if(b.mark&&b.mark.startContainer){
tmp=_5eb.getIndex(b.mark.startContainer,this.editNode).o;
b.mark={startContainer:tmp,startOffset:b.mark.startOffset,endContainer:b.mark.endContainer===b.mark.startContainer?tmp:_5eb.getIndex(b.mark.endContainer,this.editNode).o,endOffset:b.mark.endOffset};
}
}
catch(e){
b.mark=null;
}
}
return b;
},_beginEditing:function(){
if(this._steps.length===0){
this._steps.push({"text":html.getChildrenHtml(this.editNode),"bookmark":this._getBookmark()});
}
},_endEditing:function(){
var v=html.getChildrenHtml(this.editNode);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()});
},onKeyDown:function(e){
if(!has("ie")&&!this.iframe&&e.keyCode==keys.TAB&&!this.tabIndent){
this._saveSelection();
}
if(!this.customUndo){
this.inherited(arguments);
return;
}
var k=e.keyCode;
if(e.ctrlKey&&!e.altKey){
if(k==90||k==122){
_5e0.stop(e);
this.undo();
return;
}else{
if(k==89||k==121){
_5e0.stop(e);
this.redo();
return;
}
}
}
this.inherited(arguments);
switch(k){
case keys.ENTER:
case keys.BACKSPACE:
case keys.DELETE:
this.beginEditing();
break;
case 88:
case 86:
if(e.ctrlKey&&!e.altKey&&!e.metaKey){
this.endEditing();
if(e.keyCode==88){
this.beginEditing("cut");
}else{
this.beginEditing("paste");
}
this.defer("endEditing",1);
break;
}
default:
if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<keys.F1||e.keyCode>keys.F15)){
this.beginEditing();
break;
}
case keys.ALT:
this.endEditing();
break;
case keys.UP_ARROW:
case keys.DOWN_ARROW:
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
case keys.HOME:
case keys.END:
case keys.PAGE_UP:
case keys.PAGE_DOWN:
this.endEditing(true);
break;
case keys.CTRL:
case keys.SHIFT:
case keys.TAB:
break;
}
},_onBlur:function(){
this.inherited(arguments);
this.endEditing(true);
},_saveSelection:function(){
try{
this._savedSelection=this._getBookmark();
}
catch(e){
}
},_restoreSelection:function(){
if(this._savedSelection){
delete this._cursorToStart;
if(win.withGlobal(this.window,"isCollapsed",_5e3)){
this._moveToBookmark(this._savedSelection);
}
delete this._savedSelection;
}
},onClick:function(){
this.endEditing(true);
this.inherited(arguments);
},replaceValue:function(html){
if(!this.customUndo){
this.inherited(arguments);
}else{
if(this.isClosed){
this.setValue(html);
}else{
this.beginEditing();
if(!html){
html="&#160;";
}
this.setValue(html);
this.endEditing();
}
}
},_setDisabledAttr:function(_5ff){
this.setValueDeferred.then(lang.hitch(this,function(){
if((!this.disabled&&_5ff)||(!this._buttonEnabledPlugins&&_5ff)){
_5d9.forEach(this._plugins,function(p){
p.set("disabled",true);
});
}else{
if(this.disabled&&!_5ff){
_5d9.forEach(this._plugins,function(p){
p.set("disabled",false);
});
}
}
}));
this.inherited(arguments);
},_setStateClass:function(){
try{
this.inherited(arguments);
if(this.document&&this.document.body){
_5df.set(this.document.body,"color",_5df.get(this.iframe,"color"));
}
}
catch(e){
}
}});
function _600(args){
return new _5e9({command:args.name});
};
function _601(args){
return new _5e9({buttonClass:_5e8,command:args.name});
};
lang.mixin(_5e9.registry,{"undo":_600,"redo":_600,"cut":_600,"copy":_600,"paste":_600,"insertOrderedList":_600,"insertUnorderedList":_600,"indent":_600,"outdent":_600,"justifyCenter":_600,"justifyFull":_600,"justifyLeft":_600,"justifyRight":_600,"delete":_600,"selectAll":_600,"removeFormat":_600,"unlink":_600,"insertHorizontalRule":_600,"bold":_601,"italic":_601,"underline":_601,"strikethrough":_601,"subscript":_601,"superscript":_601,"|":function(){
return new _5e9({setEditor:function(_602){
this.editor=_602;
this.button=new _5e6({ownerDocument:_602.ownerDocument});
}});
}});
return _5ee;
});
},"dijit/Toolbar":function(){
define(["require","dojo/_base/declare","dojo/has","dojo/keys","dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_603,_604,has,keys,_605,_606,_607,_608){
if(has("dijit-legacy-requires")){
_605(0,function(){
var _609=["dijit/ToolbarSeparator"];
_603(_609);
});
}
return _604("dijit.Toolbar",[_606,_608,_607],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",postCreate:function(){
this.inherited(arguments);
this.connectKeyNavHandlers(this.isLeftToRight()?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],this.isLeftToRight()?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
}});
});
},"dijit/layout/StackContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_60a,_60b,_60c,_60d,has,lang,_60e,_60f,_610,_611,_612){
if(has("dijit-legacy-requires")){
_60e(0,function(){
var _613=["dijit/layout/StackController"];
require(_613);
});
}
var _614=_60c("dijit.layout.StackContainer",_612,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_60d.add(this.domNode,"dijitLayoutContainer");
this.containerNode.setAttribute("role","tabpanel");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _615=this.getChildren();
_60a.forEach(_615,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_610.byId(_60b(this.id+"_selectedChild"));
}else{
_60a.some(_615,function(_616){
if(_616.selected){
this.selectedChildWidget=_616;
}
return _616.selected;
},this);
}
var _617=this.selectedChildWidget;
if(!_617&&_615[0]){
_617=this.selectedChildWidget=_615[0];
_617.selected=true;
}
_60f.publish(this.id+"-startup",{children:_615,selected:_617});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _618=this.selectedChildWidget;
if(_618){
this._showChild(_618);
}
}
this.inherited(arguments);
},_setupChild:function(_619){
this.inherited(arguments);
_60d.replace(_619.domNode,"dijitHidden","dijitVisible");
_619.domNode.title="";
},addChild:function(_61a,_61b){
this.inherited(arguments);
if(this._started){
_60f.publish(this.id+"-addChild",_61a,_61b);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_61a);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_60f.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _61c=this.getChildren();
if(_61c.length){
this.selectChild(_61c[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_61d){
page=_610.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_61d);
this._set("selectedChildWidget",page);
_60f.publish(this.id+"-selectChild",page);
if(this.persist){
_60b(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return d;
},_transition:function(_61e,_61f){
if(_61f){
this._hideChild(_61f);
}
var d=this._showChild(_61e);
if(_61e.resize){
if(this.doLayout){
_61e.resize(this._containerContentBox||this._contentBox);
}else{
_61e.resize();
}
}
return d;
},_adjacent:function(_620){
var _621=this.getChildren();
var _622=_60a.indexOf(_621,this.selectedChildWidget);
_622+=_620?1:_621.length-1;
return _621[_622%_621.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_60f.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _623=this.selectedChildWidget;
if(_623&&_623.resize){
if(this.doLayout){
_623.resize(this._containerContentBox||this._contentBox);
}else{
_623.resize();
}
}
},_showChild:function(page){
var _624=this.getChildren();
page.isFirstChild=(page==_624[0]);
page.isLastChild=(page==_624[_624.length-1]);
page._set("selected",true);
_60d.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
},_hideChild:function(page){
page._set("selected",false);
_60d.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _625=page.onClose(this,page);
if(_625){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_626){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_60a.forEach(this.getChildren(),function(_627){
if(!_626){
this.removeChild(_627);
}
_627.destroyRecursive(_626);
},this);
this._descendantsBeingDestroyed=false;
}});
_614.ChildWidgetProperties={selected:false,disabled:false,closable:false,iconClass:"dijitNoIcon",showTitle:true};
lang.extend(_611,_614.ChildWidgetProperties);
return _614;
});
},"dojo/regexp":function(){
define(["./_base/kernel","./_base/lang"],function(dojo,lang){
var _628={};
lang.setObject("dojo.regexp",_628);
_628.escapeString=function(str,_629){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_629&&_629.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_628.buildGroupRE=function(arr,re,_62a){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _628.group(b.join("|"),_62a);
};
_628.group=function(_62b,_62c){
return "("+(_62c?"?:":"")+_62b+")";
};
return _628;
});
},"dijit/form/ComboBox":function(){
define(["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_62d,_62e,_62f){
return _62d("dijit.form.ComboBox",[_62e,_62f],{});
});
},"dijit/form/_FormMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_630,_631,_632,lang,on,_633){
return _631("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_634){
var res=[];
_630.forEach(_634||this.getChildren(),function(_635){
if("value" in _635){
res.push(_635);
}else{
res=res.concat(this._getDescendantFormWidgets(_635.getChildren()));
}
},this);
return res;
},reset:function(){
_630.forEach(this._getDescendantFormWidgets(),function(_636){
if(_636.reset){
_636.reset();
}
});
},validate:function(){
var _637=false;
return _630.every(_630.map(this._getDescendantFormWidgets(),function(_638){
_638._hasBeenBlurred=true;
var _639=_638.disabled||!_638.validate||_638.validate();
if(!_639&&!_637){
_633.scrollIntoView(_638.containerNode||_638.domNode);
_638.focus();
_637=true;
}
return _639;
}),function(item){
return item;
});
},setValues:function(val){
_632.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_630.forEach(this._getDescendantFormWidgets(),function(_63a){
if(!_63a.name){
return;
}
var _63b=map[_63a.name]||(map[_63a.name]=[]);
_63b.push(_63a);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _63c=map[name],_63d=lang.getObject(name,false,obj);
if(_63d===undefined){
continue;
}
if(!lang.isArray(_63d)){
_63d=[_63d];
}
if(typeof _63c[0].checked=="boolean"){
_630.forEach(_63c,function(w){
w.set("value",_630.indexOf(_63d,w.value)!=-1);
});
}else{
if(_63c[0].multiple){
_63c[0].set("value",_63d);
}else{
_630.forEach(_63c,function(w,i){
w.set("value",_63d[i]);
});
}
}
}
},getValues:function(){
_632.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_630.forEach(this._getDescendantFormWidgets(),function(_63e){
var name=_63e.name;
if(!name||_63e.disabled){
return;
}
var _63f=_63e.get("value");
if(typeof _63e.checked=="boolean"){
if(/Radio/.test(_63e.declaredClass)){
if(_63f!==false){
lang.setObject(name,_63f,obj);
}else{
_63f=lang.getObject(name,false,obj);
if(_63f===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_63f!==false){
ary.push(_63f);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_63f);
}else{
lang.setObject(name,[prev,_63f],obj);
}
}else{
lang.setObject(name,_63f,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _640=_630.map(this._descendants,function(w){
return w.get("state")||"";
});
return _630.indexOf(_640,"Error")>=0?"Error":_630.indexOf(_640,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_641){
this._descendants=this._getDescendantFormWidgets();
_630.forEach(this._descendants,function(_642){
if(!_642._started){
_642.startup();
}
});
if(!_641){
this._onChildChange();
}
},_onChildChange:function(attr){
if(!attr||attr=="state"||attr=="disabled"){
this._set("state",this._getState());
}
if(!attr||attr=="value"||attr=="disabled"||attr=="checked"){
if(this._onChangeDelayTimer){
this._onChangeDelayTimer.remove();
}
this._onChangeDelayTimer=this.defer(function(){
delete this._onChangeDelayTimer;
this._set("value",this.get("value"));
},10);
}
},startup:function(){
this.inherited(arguments);
this._descendants=this._getDescendantFormWidgets();
this.value=this.get("value");
this.state=this._getState();
var self=this;
this.own(on(this.containerNode,"attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked",function(evt){
if(evt.target==self.domNode){
return;
}
self._onChildChange(evt.type.replace("attrmodified-",""));
}));
this.watch("state",function(attr,_643,_644){
this.onValidStateChange(_644=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dijit/_editor/plugins/LinkDialog":function(){
define(["require","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/_base/query","dojo/string","../../_Widget","../_Plugin","../../form/DropDownButton","../range"],function(_645,_646,_647,keys,lang,has,_648,_649,_64a,_64b,_64c,_64d){
var _64e=_646("dijit._editor.plugins.LinkDialog",_64b,{buttonClass:_64c,useDefaultCommand:false,urlRegExp:"((https?|ftps?|file)\\://|./|../|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?",emailRegExp:"<?(mailto\\:)([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+"+"@"+"((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*>?",htmlTemplate:"<a href=\"${urlInput}\" _djrealurl=\"${urlInput}\""+" target=\"${targetSelect}\""+">${textInput}</a>",tag:"a",_hostRxp:/^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,_userAtRxp:/^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@/i,linkDialogTemplate:["<table role='presentation'><tr><td>","<label for='${id}_urlInput'>${url}</label>","</td><td>","<input data-dojo-type='dijit.form.ValidationTextBox' required='true' "+"id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>","</td></tr><tr><td>","<label for='${id}_textInput'>${text}</label>","</td><td>","<input data-dojo-type='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' "+"name='textInput' data-dojo-props='intermediateChanges:true'/>","</td></tr><tr><td>","<label for='${id}_targetSelect'>${target}</label>","</td><td>","<select id='${id}_targetSelect' name='targetSelect' data-dojo-type='dijit.form.Select'>","<option selected='selected' value='_self'>${currentWindow}</option>","<option value='_blank'>${newWindow}</option>","<option value='_top'>${topWindow}</option>","<option value='_parent'>${parentWindow}</option>","</select>","</td></tr><tr><td colspan='2'>","<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>","<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>","</td></tr></table>"].join(""),_initButton:function(){
this.inherited(arguments);
this.button.loadDropDown=lang.hitch(this,"_loadDropDown");
this._connectTagEvents();
},_loadDropDown:function(_64f){
_645(["dojo/i18n","../../TooltipDialog","../../registry","../../form/Button","../../form/Select","../../form/ValidationTextBox","dojo/i18n!../../nls/common","dojo/i18n!../nls/LinkDialog"],lang.hitch(this,function(i18n,_650,_651){
var _652=this;
this.tag=this.command=="insertImage"?"img":"a";
var _653=lang.delegate(i18n.getLocalization("dijit","common",this.lang),i18n.getLocalization("dijit._editor","LinkDialog",this.lang));
var _654=(this.dropDown=this.button.dropDown=new _650({title:_653[this.command+"Title"],ownerDocument:this.editor.ownerDocument,dir:this.editor.dir,execute:lang.hitch(this,"setValue"),onOpen:function(){
_652._onOpenDialog();
_650.prototype.onOpen.apply(this,arguments);
},onCancel:function(){
setTimeout(lang.hitch(_652,"_onCloseDialog"),0);
}}));
_653.urlRegExp=this.urlRegExp;
_653.id=_651.getUniqueId(this.editor.id);
this._uniqueId=_653.id;
this._setContent(_654.title+"<div style='border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'></div>"+_649.substitute(this.linkDialogTemplate,_653));
_654.startup();
this._urlInput=_651.byId(this._uniqueId+"_urlInput");
this._textInput=_651.byId(this._uniqueId+"_textInput");
this._setButton=_651.byId(this._uniqueId+"_setButton");
this.connect(_651.byId(this._uniqueId+"_cancelButton"),"onClick",function(){
this.dropDown.onCancel();
});
if(this._urlInput){
this.connect(this._urlInput,"onChange","_checkAndFixInput");
}
if(this._textInput){
this.connect(this._textInput,"onChange","_checkAndFixInput");
}
this._urlRegExp=new RegExp("^"+this.urlRegExp+"$","i");
this._emailRegExp=new RegExp("^"+this.emailRegExp+"$","i");
this._urlInput.isValid=lang.hitch(this,function(){
var _655=this._urlInput.get("value");
return this._urlRegExp.test(_655)||this._emailRegExp.test(_655);
});
this.connect(_654.domNode,"onkeypress",function(e){
if(e&&e.charOrCode==keys.ENTER&&!e.shiftKey&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
if(!this._setButton.get("disabled")){
_654.onExecute();
_654.execute(_654.get("value"));
}
}
});
_64f();
}));
},_checkAndFixInput:function(){
var self=this;
var url=this._urlInput.get("value");
var _656=function(url){
var _657=false;
var _658=false;
if(url&&url.length>1){
url=lang.trim(url);
if(url.indexOf("mailto:")!==0){
if(url.indexOf("/")>0){
if(url.indexOf("://")===-1){
if(url.charAt(0)!=="/"&&url.indexOf("./")&&url.indexOf("../")!==0){
if(self._hostRxp.test(url)){
_657=true;
}
}
}
}else{
if(self._userAtRxp.test(url)){
_658=true;
}
}
}
}
if(_657){
self._urlInput.set("value","http://"+url);
}
if(_658){
self._urlInput.set("value","mailto:"+url);
}
self._setButton.set("disabled",!self._isValid());
};
if(this._delayedCheck){
clearTimeout(this._delayedCheck);
this._delayedCheck=null;
}
this._delayedCheck=setTimeout(function(){
_656(url);
},250);
},_connectTagEvents:function(){
this.editor.onLoadDeferred.then(lang.hitch(this,function(){
this.connect(this.editor.editNode,"ondblclick",this._onDblClick);
}));
},_isValid:function(){
return this._urlInput.isValid()&&this._textInput.isValid();
},_setContent:function(_659){
this.dropDown.set({parserScope:"dojo",content:_659});
},_checkValues:function(args){
if(args&&args.urlInput){
args.urlInput=args.urlInput.replace(/"/g,"&quot;");
}
return args;
},setValue:function(args){
this._onCloseDialog();
if(has("ie")<9){
var sel=_64d.getSelection(this.editor.window);
var _65a=sel.getRangeAt(0);
var a=_65a.endContainer;
if(a.nodeType===3){
a=a.parentNode;
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()!==this.tag)){
a=this.editor._sCall("getSelectedElement",[this.tag]);
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()===this.tag)){
if(this.editor.queryCommandEnabled("unlink")){
this.editor._sCall("selectElementChildren",[a]);
this.editor.execCommand("unlink");
}
}
}
args=this._checkValues(args);
this.editor.execCommand("inserthtml",_649.substitute(this.htmlTemplate,args));
_648("a",this.editor.document).forEach(function(a){
if(!a.innerHTML&&!_647.has(a,"name")){
a.parentNode.removeChild(a);
}
},this);
},_onCloseDialog:function(){
this.editor.focus();
},_getCurrentValues:function(a){
var url,text,_65b;
if(a&&a.tagName.toLowerCase()===this.tag){
url=a.getAttribute("_djrealurl")||a.getAttribute("href");
_65b=a.getAttribute("target")||"_self";
text=a.textContent||a.innerText;
this.editor._sCall("selectElement",[a,true]);
}else{
text=this.editor._sCall("getSelectedText");
}
return {urlInput:url||"",textInput:text||"",targetSelect:_65b||""};
},_onOpenDialog:function(){
var a,b,fc;
if(has("ie")){
var sel=_64d.getSelection(this.editor.window);
var _65c=sel.getRangeAt(0);
a=_65c.endContainer;
if(a.nodeType===3){
a=a.parentNode;
}
if(a&&(a.nodeName&&a.nodeName.toLowerCase()!==this.tag)){
a=this.editor._sCall("getSelectedElement",[this.tag]);
}
if(!a||(a.nodeName&&a.nodeName.toLowerCase()!==this.tag)){
b=this.editor._sCall("getAncestorElement",[this.tag]);
if(b&&(b.nodeName&&b.nodeName.toLowerCase()==this.tag)){
a=b;
this.editor._sCall("selectElement",[a]);
}else{
if(_65c.startContainer===_65c.endContainer){
fc=_65c.startContainer.firstChild;
if(fc&&(fc.nodeName&&fc.nodeName.toLowerCase()==this.tag)){
a=fc;
this.editor._sCall("selectElement",[a]);
}
}
}
}
}else{
a=this.editor._sCall("getAncestorElement",[this.tag]);
}
this.dropDown.reset();
this._setButton.set("disabled",true);
this.dropDown.set("value",this._getCurrentValues(a));
},_onDblClick:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag&&_647.get(t,"href")){
var _65d=this.editor;
this.editor._sCall("selectElement",[t]);
_65d.onDisplayChanged();
if(_65d._updateTimer){
_65d._updateTimer.remove();
delete _65d._updateTimer;
}
_65d.onNormalizedDisplayChanged();
var _65e=this.button;
setTimeout(function(){
_65e.set("disabled",false);
_65e.loadAndOpenDropDown().then(function(){
if(_65e.dropDown.focus){
_65e.dropDown.focus();
}
});
},10);
}
}
}});
var _65f=_646("dijit._editor.plugins.ImgLinkDialog",[_64e],{linkDialogTemplate:["<table role='presentation'><tr><td>","<label for='${id}_urlInput'>${url}</label>","</td><td>","<input dojoType='dijit.form.ValidationTextBox' regExp='${urlRegExp}' "+"required='true' id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>","</td></tr><tr><td>","<label for='${id}_textInput'>${text}</label>","</td><td>","<input data-dojo-type='dijit.form.ValidationTextBox' required='false' id='${id}_textInput' "+"name='textInput' data-dojo-props='intermediateChanges:true'/>","</td></tr><tr><td>","</td><td>","</td></tr><tr><td colspan='2'>","<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>","<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>","</td></tr></table>"].join(""),htmlTemplate:"<img src=\"${urlInput}\" _djrealurl=\"${urlInput}\" alt=\"${textInput}\" />",tag:"img",_getCurrentValues:function(img){
var url,text;
if(img&&img.tagName.toLowerCase()===this.tag){
url=img.getAttribute("_djrealurl")||img.getAttribute("src");
text=img.getAttribute("alt");
this.editor._sCall("selectElement",[img,true]);
}else{
text=this.editor._sCall("getSelectedText",[]);
}
return {urlInput:url||"",textInput:text||""};
},_isValid:function(){
return this._urlInput.isValid();
},_connectTagEvents:function(){
this.inherited(arguments);
this.editor.onLoadDeferred.then(lang.hitch(this,function(){
this.connect(this.editor.editNode,"onmousedown",this._selectTag);
}));
},_selectTag:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag){
this.editor._sCall("selectElement",[t]);
}
}
},_checkValues:function(args){
if(args&&args.urlInput){
args.urlInput=args.urlInput.replace(/"/g,"&quot;");
}
if(args&&args.textInput){
args.textInput=args.textInput.replace(/"/g,"&quot;");
}
return args;
},_onDblClick:function(e){
if(e&&e.target){
var t=e.target;
var tg=t.tagName?t.tagName.toLowerCase():"";
if(tg===this.tag&&_647.get(t,"src")){
var _660=this.editor;
this.editor._sCall("selectElement",[t]);
_660.onDisplayChanged();
if(_660._updateTimer){
_660._updateTimer.remove();
delete _660._updateTimer;
}
_660.onNormalizedDisplayChanged();
var _661=this.button;
setTimeout(function(){
_661.set("disabled",false);
_661.loadAndOpenDropDown().then(function(){
if(_661.dropDown.focus){
_661.dropDown.focus();
}
});
},10);
}
}
}});
_64b.registry["createLink"]=function(){
return new _64e({command:"createLink"});
};
_64b.registry["insertImage"]=function(){
return new _65f({command:"insertImage"});
};
_64e.ImgLinkDialog=_65f;
return _64e;
});
},"dijit/DropDownMenu":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_662,_663,keys,_664,_665,_666){
return _662("dijit.DropDownMenu",[_666,_665],{templateString:_664,baseClass:"dijitMenu",postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this._openSubMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._closeSubMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connectKeyNavHandlers([keys.UP_ARROW],[keys.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
_663.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_663.stop(evt);
}
break;
}
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_667,_668,_669,_66a,dom,_66b,_66c,_66d,keys,lang,on,has,win,_66e,pm,_66f,_670){
if(has("dijit-legacy-requires")){
_670(0,function(){
var _671=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_667(_671);
});
}
return _669("dijit.Menu",_66f,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_668.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_672){
return _66e.get(this._iframeContentDocument(_672))||this._iframeContentDocument(_672)["__parent__"]||(_672.name&&win.doc.frames[_672.name])||null;
},_iframeContentDocument:function(_673){
return _673.contentDocument||(_673.contentWindow&&_673.contentWindow.document)||(_673.name&&win.doc.frames[_673.name]&&win.doc.frames[_673.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _674=node,_675=this._iframeContentWindow(_674);
cn=win.body(_675.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _676={node:node,iframe:_674};
_66b.set(node,"_dijitMenu"+this.id,this._bindings.push(_676));
var _677=lang.hitch(this,function(cn){
var _678=this.selector,_679=_678?function(_67a){
return on.selector(_678,_67a);
}:function(_67b){
return _67b;
},self=this;
return [on(cn,_679(this.leftClickToOpen?"click":"contextmenu"),function(evt){
_66a.stop(evt);
self._scheduleOpen(this,_674,{x:evt.pageX,y:evt.pageY});
}),on(cn,_679("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_66a.stop(evt);
self._scheduleOpen(this,_674);
}
})];
});
_676.connects=cn?_677(cn):[];
if(_674){
_676.onloadHandler=lang.hitch(this,function(){
var _67c=this._iframeContentWindow(_674);
cn=win.body(_67c.document);
_676.connects=_677(cn);
});
if(_674.addEventListener){
_674.addEventListener("load",_676.onloadHandler,false);
}else{
_674.attachEvent("onload",_676.onloadHandler);
}
}
},unBindDomNode:function(_67d){
var node;
try{
node=dom.byId(_67d,this.ownerDocument);
}
catch(e){
return;
}
var _67e="_dijitMenu"+this.id;
if(node&&_66b.has(node,_67e)){
var bid=_66b.get(node,_67e)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _67f=b.iframe;
if(_67f){
if(_67f.removeEventListener){
_67f.removeEventListener("load",b.onloadHandler,false);
}else{
_67f.detachEvent("onload",b.onloadHandler);
}
}
_66b.remove(node,_67e);
delete this._bindings[bid];
}
},_scheduleOpen:function(_680,_681,_682){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_680,iframe:_681,coords:_682});
},1);
}
},_openMyself:function(args){
var _683=args.target,_684=args.iframe,_685=args.coords;
this.currentTarget=_683;
if(_685){
if(_684){
var ifc=_66c.position(_684,true),_686=this._iframeContentWindow(_684),_687=_66c.docScroll(_686.document);
var cs=_66d.getComputedStyle(_684),tp=_66d.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_684,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_684,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_684,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_684,cs.borderTopWidth):0);
_685.x+=ifc.x+left-_687.x;
_685.y+=ifc.y+top-_687.y;
}
}else{
_685=_66c.position(_683,true);
_685.x+=10;
_685.y+=10;
}
var self=this;
var _688=this._focusManager.get("prevNode");
var _689=this._focusManager.get("curNode");
var _68a=!_689||(dom.isDescendant(_689,this.domNode))?_688:_689;
function _68b(){
if(self.refocus&&_68a){
_68a.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_685.x,y:_685.y,onExecute:_68b,onCancel:_68b,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_668.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/form/_CheckBoxMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/event"],function(_68c,_68d,_68e){
return _68c("dijit.form._CheckBoxMixin",null,{type:"checkbox",value:"on",readOnly:false,_aria_attr:"aria-checked",_setReadOnlyAttr:function(_68f){
this._set("readOnly",_68f);
_68d.set(this.focusNode,"readOnly",_68f);
this.focusNode.setAttribute("aria-readonly",_68f);
},_setLabelAttr:undefined,_getSubmitValue:function(_690){
return !_690&&_690!==0?"on":_690;
},_setValueAttr:function(_691){
_691=this._getSubmitValue(_691);
this._set("value",_691);
_68d.set(this.focusNode,"value",_691);
},reset:function(){
this.inherited(arguments);
this._set("value",this.params.value||"on");
_68d.set(this.focusNode,"value",this.value);
},_onClick:function(e){
if(this.readOnly){
_68e.stop(e);
return false;
}
return this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define(["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_692,lang,_693,_694,_695,_696,html,_697,_698,_699,_69a,dom,_69b,xhr,i18n,when){
return _699("dijit.layout.ContentPane",[_693,_694,_695],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_692._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_69c,_69d){
if((!_69c||!_69c.template)&&_69d&&!("href" in _69c)&&!("content" in _69c)){
_69d=dom.byId(_69d);
var df=_69d.ownerDocument.createDocumentFragment();
while(_69d.firstChild){
df.appendChild(_69d.firstChild);
}
_69c=lang.delegate(_69c,{content:df});
}
this.inherited(arguments,[_69c,_69d]);
},postMixInProperties:function(){
this.inherited(arguments);
var _69e=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_696.substitute(this.loadingMessage,_69e);
this.errorMessage=_696.substitute(this.errorMessage,_69e);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_69b.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_698.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},_startChildren:function(){
_698.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
if(this._contentSetter){
_698.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_692.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _69a(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_692.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _69a(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},destroy:function(){
this.cancel();
this.inherited(arguments);
},destroyRecursive:function(_69f){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _69a(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _6a0={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_6a0,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_6a0)),_6a1;
hand.then(function(html){
_6a1=html;
try{
self._isDownloaded=true;
return self._setContent(html,false);
}
catch(err){
self._onError("Content",err);
}
},function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
}).then(function(){
self.onDownloadEnd();
delete self._xhrDfd;
return _6a1;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.resolve(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_6a2){
if(this.isLoaded){
this._onUnloadHandler();
}
var _6a3=this._contentSetter;
_698.forEach(this.getChildren(),function(_6a4){
if(_6a4.destroyRecursive){
_6a4.destroyRecursive(_6a2);
}else{
if(_6a4.destroy){
_6a4.destroy(_6a2);
}
}
_6a4._destroyed=true;
});
if(_6a3){
_698.forEach(_6a3.parseResults,function(_6a5){
if(!_6a5._destroyed){
if(_6a5.destroyRecursive){
_6a5.destroyRecursive(_6a2);
}else{
if(_6a5.destroy){
_6a5.destroy(_6a2);
}
}
_6a5._destroyed=true;
}
});
delete _6a3.parseResults;
}
if(!_6a2){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_6a6){
this.destroyDescendants();
var _6a7=this._contentSetter;
if(!(_6a7&&_6a7 instanceof html._ContentSetter)){
_6a7=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _6a8=this.onContentError(e);
try{
this.containerNode.innerHTML=_6a8;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _6a9=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_6a7.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_6a9);
var self=this;
return when(p&&p.then?p:_6a7.parseDeferred,function(){
delete self._contentSetterParams;
if(!_6a6){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_6aa){
this.onLoadDeferred.reject(err);
var _6ab=this["on"+type+"Error"].call(this,err);
if(_6aa){
console.error(_6aa,err);
}else{
if(_6ab){
this._setContent(_6ab,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/_KeyNavContainer":function(){
define(["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_6ac,_6ad,_6ae,_6af,keys,_6b0,_6b1,_6b2,lang){
return _6b0("dijit._KeyNavContainer",[_6ae,_6ad],{tabIndex:"0",connectKeyNavHandlers:function(_6b3,_6b4){
var _6b5=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_6af.forEach(_6b3,function(code){
_6b5[code]=prev;
});
_6af.forEach(_6b4,function(code){
_6b5[code]=next;
});
_6b5[keys.HOME]=lang.hitch(this,"focusFirstChild");
_6b5[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_6ac.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_6af.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_6b6,_6b7){
this.inherited(arguments);
this._startupChild(_6b6);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},focusChild:function(_6b8,last){
if(!_6b8){
return;
}
if(this.focusedChild&&_6b8!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_6b8.set("tabIndex",this.tabIndex);
_6b8.focus(last?"end":"start");
this._set("focusedChild",_6b8);
},_startupChild:function(_6b9){
_6b9.set("tabIndex","-1");
this.connect(_6b9,"_onFocus",function(){
_6b9.set("tabIndex",this.tabIndex);
});
this.connect(_6b9,"_onBlur",function(){
_6b9.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_6b2.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_6b2.set(this.domNode,"tabIndex",this.tabIndex);
}
this.focusedChild=null;
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
_6b1.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_6ba,dir){
if(_6ba){
_6ba=this._getSiblingOfChild(_6ba,dir);
}
var _6bb=this.getChildren();
for(var i=0;i<_6bb.length;i++){
if(!_6ba){
_6ba=_6bb[(dir>0)?0:(_6bb.length-1)];
}
if(_6ba.isFocusable()){
return _6ba;
}
_6ba=this._getSiblingOfChild(_6ba,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define(["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","../main"],function(_6bc,_6bd,_6be,_6bf,lang,_6c0){
var _6c1=lang.getObject("layout",true,_6c0);
_6c1.marginBox2contentBox=function(node,mb){
var cs=_6bf.getComputedStyle(node);
var me=_6be.getMarginExtents(node,cs);
var pb=_6be.getPadBorderExtents(node,cs);
return {l:_6bf.toPixelValue(node,cs.paddingLeft),t:_6bf.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _6c2(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_6c3,dim){
var _6c4=_6c3.resize?_6c3.resize(dim):_6be.setMarginBox(_6c3.domNode,dim);
if(_6c4){
lang.mixin(_6c3,_6c4);
}else{
lang.mixin(_6c3,_6be.getMarginBox(_6c3.domNode));
lang.mixin(_6c3,dim);
}
};
_6c1.layoutChildren=function(_6c5,dim,_6c6,_6c7,_6c8){
dim=lang.mixin({},dim);
_6bd.add(_6c5,"dijitLayoutContainer");
_6c6=_6bc.filter(_6c6,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_6bc.filter(_6c6,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
_6bc.forEach(_6c6,function(_6c9){
var elm=_6c9.domNode,pos=(_6c9.region||_6c9.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_6c9.id);
}
var _6ca=elm.style;
_6ca.left=dim.l+"px";
_6ca.top=dim.t+"px";
_6ca.position="absolute";
_6bd.add(elm,"dijitAlign"+_6c2(pos));
var _6cb={};
if(_6c7&&_6c7==_6c9.id){
_6cb[_6c9.region=="top"||_6c9.region=="bottom"?"h":"w"]=_6c8;
}
if(pos=="top"||pos=="bottom"){
_6cb.w=dim.w;
size(_6c9,_6cb);
dim.h-=_6c9.h;
if(pos=="top"){
dim.t+=_6c9.h;
}else{
_6ca.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_6cb.h=dim.h;
size(_6c9,_6cb);
dim.w-=_6c9.w;
if(pos=="left"){
dim.l+=_6c9.w;
}else{
_6ca.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_6c9,dim);
}
}
}
});
};
return {marginBox2contentBox:_6c1.marginBox2contentBox,layoutChildren:_6c1.layoutChildren};
});
},"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/form/DataList":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_6cc,dom,lang,_6cd,_6ce,_6cf){
function _6d0(_6d1){
return {id:_6d1.value,value:_6d1.value,name:lang.trim(_6d1.innerText||_6d1.textContent||"")};
};
return _6cc("dijit.form.DataList",_6ce,{constructor:function(_6d2,_6d3){
this.domNode=dom.byId(_6d3);
lang.mixin(this,_6d2);
if(this.id){
_6cf.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_6cd("option",this.domNode).map(_6d0)}]);
},destroy:function(){
_6cf.remove(this.id);
},fetchSelectedItem:function(){
var _6d4=_6cd("> option[selected]",this.domNode)[0]||_6cd("> option",this.domNode)[0];
return _6d4&&_6d0(_6d4);
}});
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","dijit/_editor/_Plugin":function(){
define(["dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","../form/Button"],function(_6d5,_6d6,lang,_6d7){
var _6d8=_6d6("dijit._editor._Plugin",null,{constructor:function(args){
this.params=args||{};
lang.mixin(this,this.params);
this._connects=[];
this._attrPairNames={};
},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,command:"",useDefaultCommand:true,buttonClass:_6d7,disabled:false,getLabel:function(key){
return this.editor.commands[key];
},_initButton:function(){
if(this.command.length){
var _6d9=this.getLabel(this.command),_6da=this.editor,_6db=this.iconClassPrefix+" "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){
var _6dc=lang.mixin({label:_6d9,ownerDocument:_6da.ownerDocument,dir:_6da.dir,lang:_6da.lang,showLabel:false,iconClass:_6db,dropDown:this.dropDown,tabIndex:"-1"},this.params||{});
this.button=new this.buttonClass(_6dc);
}
}
if(this.get("disabled")&&this.button){
this.button.set("disabled",this.get("disabled"));
}
},destroy:function(){
var h;
while(h=this._connects.pop()){
h.remove();
}
if(this.dropDown){
this.dropDown.destroyRecursive();
}
},connect:function(o,f,tf){
this._connects.push(_6d5.connect(o,f,this,tf));
},updateState:function(){
var e=this.editor,c=this.command,_6dd,_6de;
if(!e||!e.isLoaded||!c.length){
return;
}
var _6df=this.get("disabled");
if(this.button){
try{
_6de=!_6df&&e.queryCommandEnabled(c);
if(this.enabled!==_6de){
this.enabled=_6de;
this.button.set("disabled",!_6de);
}
if(_6de){
if(typeof this.button.checked=="boolean"){
_6dd=e.queryCommandState(c);
if(this.checked!==_6dd){
this.checked=_6dd;
this.button.set("checked",e.queryCommandState(c));
}
}
}
}
catch(e){
}
}
},setEditor:function(_6e0){
this.editor=_6e0;
this._initButton();
if(this.button&&this.useDefaultCommand){
if(this.editor.queryCommandAvailable(this.command)){
this.connect(this.button,"onClick",lang.hitch(this.editor,"execCommand",this.command,this.commandArg));
}else{
this.button.domNode.style.display="none";
}
}
this.connect(this.editor,"onNormalizedDisplayChanged","updateState");
},setToolbar:function(_6e1){
if(this.button){
_6e1.addChild(this.button);
}
},set:function(name,_6e2){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _6e3=this._getAttrNames(name);
if(this[_6e3.s]){
var _6e4=this[_6e3.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
this._set(name,_6e2);
}
return _6e4||this;
},get:function(name){
var _6e5=this._getAttrNames(name);
return this[_6e5.g]?this[_6e5.g]():this[name];
},_setDisabledAttr:function(_6e6){
this.disabled=_6e6;
this.updateState();
},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_6e7){
this[name]=_6e7;
}});
_6d8.registry={};
return _6d8;
});
},"dijit/form/CheckBox":function(){
define(["require","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/query","dojo/ready","./ToggleButton","./_CheckBoxMixin","dojo/text!./templates/CheckBox.html","dojo/NodeList-dom"],function(_6e8,_6e9,_6ea,has,_6eb,_6ec,_6ed,_6ee,_6ef){
if(has("dijit-legacy-requires")){
_6ec(0,function(){
var _6f0=["dijit/form/RadioButton"];
_6e8(_6f0);
});
}
return _6e9("dijit.form.CheckBox",[_6ed,_6ee],{templateString:_6ef,baseClass:"dijitCheckBox",_setValueAttr:function(_6f1,_6f2){
if(typeof _6f1=="string"){
this.inherited(arguments);
_6f1=true;
}
if(this._created){
this.set("checked",_6f1,_6f2);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setIconClassAttr:null,postMixInProperties:function(){
this.inherited(arguments);
this.checkedAttrSetting=this.checked?"checked":"";
},_fillContent:function(){
},_onFocus:function(){
if(this.id){
_6eb("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
_6eb("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
}});
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","dijit/tree/_dndSelector":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/cookie","dojo/mouse","dojo/on","dojo/touch","./_dndContainer"],function(_6f3,_6f4,_6f5,_6f6,_6f7,lang,_6f8,_6f9,on,_6fa,_6fb){
return _6f5("dijit.tree._dndSelector",_6fb,{constructor:function(){
this.selection={};
this.anchor=null;
if(!this.cookieName&&this.tree.id){
this.cookieName=this.tree.id+"SaveSelectedCookie";
}
this.events.push(on(this.tree.domNode,_6fa.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_6fa.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_6fa.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _6fc=[],sel=this.selection;
for(var i in sel){
_6fc.push(sel[i]);
}
return _6fc;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_6fd){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_6fd){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_6fe){
var _6ff=this.getSelectedTreeNodes();
_6f3.forEach(this._setDifference(_6ff,_6fe),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_6f3.forEach(this._setDifference(_6fe,_6ff),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_6f3.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_6f3.filter(xs,function(x){
return !x.__exclude__;
});
_6f3.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _700=this.getSelectedTreeNodes();
var _701=[],_702=[],_703=[];
_6f3.forEach(_700,function(node){
var ary=node.getTreePath(),_704=this.tree.model;
_702.push(node);
_701.push(ary);
ary=_6f3.map(ary,function(item){
return _704.getIdentity(item);
},this);
_703.push(ary.join("/"));
},this);
var _705=_6f3.map(_702,function(node){
return node.item;
});
this.tree._set("paths",_701);
this.tree._set("path",_701[0]||[]);
this.tree._set("selectedNodes",_702);
this.tree._set("selectedNode",_702[0]||null);
this.tree._set("selectedItems",_705);
this.tree._set("selectedItem",_705[0]||null);
if(this.tree.persist&&_703.length>0){
_6f8(this.cookieName,_703.join(","),{expires:365});
}
},_getSavedPaths:function(){
var tree=this.tree;
if(tree.persist&&tree.dndController.cookieName){
var oreo,_706=[];
oreo=_6f8(tree.dndController.cookieName);
if(oreo){
_706=_6f3.map(oreo.split(","),function(path){
return path.split("/");
});
}
return _706;
}
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(e.type!="touchstart"&&!_6f9.isLeft(e)){
return;
}
e.preventDefault();
var _707=this.current,copy=_6f4.isCopyKey(e),id=_707.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_707,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_6f4.isCopyKey(e),e.shiftKey);
},onMouseMove:function(){
this._doDeselect=false;
},_compareNodes:function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
},userSelect:function(node,_708,_709){
if(this.singular){
if(this.anchor==node&&_708){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_709&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_70a,end,_70b=this.anchor;
if(cr<0){
_70a=_70b;
end=node;
}else{
_70a=node;
end=_70b;
}
var _70c=[];
while(_70a!=end){
_70c.push(_70a);
_70a=this.tree._getNextNode(_70a);
}
_70c.push(end);
this.setSelection(_70c);
}else{
if(this.selection[node.id]&&_708){
this.removeTreeNode(node);
}else{
if(_708){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _70d=this.selection[key];
return {data:_70d,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||_6f7.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dojo/html":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_70e,lang,_70f,_710,dom,_711,_712){
var html={};
lang.setObject("dojo.html",html);
var _713=0;
html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
html._emptyNode=_711.empty;
html._setNodeContent=function(node,cont){
_711.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_711.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _714=cont.length,i=0;i<cont.length;i=_714==cont.length?i+1:0){
_711.place(cont[i],node,"last");
}
}else{
_711.place(cont,node,"last");
}
}
return node;
};
html._ContentSetter=_710("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_70e._scopeName,startup:true,constructor:function(_715,node){
lang.mixin(this,_715||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_713++].join("_");
}
},set:function(cont,_716){
if(undefined!==cont){
this.content=cont;
}
if(_716){
this._mixin(_716);
}
this.onBegin();
this.setContent();
var ret=this.onEnd();
if(ret&&ret.then){
return ret;
}else{
return this.node;
}
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=html._setNodeContent(node,this.content);
}
catch(e){
var _717=this.onContentError(e);
try{
node.innerHTML=_717;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseDeferred){
if(!this.parseDeferred.isResolved()){
this.parseDeferred.cancel();
}
delete this.parseDeferred;
}
if(this.parseResults&&this.parseResults.length){
_70f.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _718=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_718){
cont=_718[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.parseDeferred;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occurred setting content: "+err;
},onExecError:function(err){
return "Error occurred executing scripts: "+err;
},_mixin:function(_719){
var _71a={},key;
for(key in _719){
if(key in _71a){
continue;
}
this[key]=_719[key];
}
},_parse:function(){
var _71b=this.node;
try{
var _71c={};
_70f.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_71c[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_712.parse({rootNode:_71b,noStart:!this.startup,inherited:_71c,scope:this.parserScope}).then(function(_71d){
return self.parseResults=_71d;
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_71e){
var _71f=this["on"+type+"Error"].call(this,err);
if(_71e){
console.error(_71e,err);
}else{
if(_71f){
html._setNodeContent(this.node,_71f,true);
}
}
}});
html.set=function(node,cont,_720){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_720){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_720,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"dijit/_PaletteMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/_base/event","dojo/keys","dojo/_base/lang","./_CssStateMixin","./focus","./typematic"],function(_721,_722,_723,_724,_725,keys,lang,_726,_727,_728){
return _721("dijit._PaletteMixin",[_726],{defaultTimeout:500,timeoutChangeRate:0.9,value:"",_selectedCell:-1,tabIndex:"0",cellClass:"dijitPaletteCell",dyeClass:null,summary:"",_setSummaryAttr:"paletteTableNode",_dyeFactory:function(_729){
var _72a=typeof this.dyeClass=="string"?lang.getObject(this.dyeClass):this.dyeClass;
return new _72a(_729);
},_preparePalette:function(_72b,_72c){
this._cells=[];
var url=this._blankGif;
this.connect(this.gridNode,"ondijitclick","_onCellClick");
for(var row=0;row<_72b.length;row++){
var _72d=_724.create("tr",{tabIndex:"-1"},this.gridNode);
for(var col=0;col<_72b[row].length;col++){
var _72e=_72b[row][col];
if(_72e){
var _72f=this._dyeFactory(_72e,row,col,_72c[_72e]);
var _730=_724.create("td",{"class":this.cellClass,tabIndex:"-1",title:_72c[_72e],role:"gridcell"},_72d);
_72f.fillCell(_730,url);
_730.idx=this._cells.length;
this._cells.push({node:_730,dye:_72f});
}
}
}
this._xDim=_72b[0].length;
this._yDim=_72b.length;
var _731={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:this.isLeftToRight()?1:-1,LEFT_ARROW:this.isLeftToRight()?-1:1};
for(var key in _731){
this.own(_728.addKeyListener(this.domNode,{charOrCode:keys[key],ctrlKey:false,altKey:false,shiftKey:false},this,function(){
var _732=_731[key];
return function(_733){
this._navigateByKey(_732,_733);
};
}(),this.timeoutChangeRate,this.defaultTimeout));
}
},postCreate:function(){
this.inherited(arguments);
this._setCurrent(this._cells[0].node);
},focus:function(){
_727.focus(this._currentFocus);
},_onCellClick:function(evt){
var _734=evt.target;
while(_734.tagName!="TD"){
if(!_734.parentNode||_734==this.gridNode){
return;
}
_734=_734.parentNode;
}
var _735=this._getDye(_734).getValue();
this._setCurrent(_734);
_727.focus(_734);
this._setValueAttr(_735,true);
_725.stop(evt);
},_setCurrent:function(node){
if("_currentFocus" in this){
_722.set(this._currentFocus,"tabIndex","-1");
}
this._currentFocus=node;
if(node){
_722.set(node,"tabIndex",this.tabIndex);
}
},_setValueAttr:function(_736,_737){
if(this._selectedCell>=0){
_723.remove(this._cells[this._selectedCell].node,this.cellClass+"Selected");
}
this._selectedCell=-1;
if(_736){
for(var i=0;i<this._cells.length;i++){
if(_736==this._cells[i].dye.getValue()){
this._selectedCell=i;
_723.add(this._cells[i].node,this.cellClass+"Selected");
break;
}
}
}
this._set("value",this._selectedCell>=0?_736:null);
if(_737||_737===undefined){
this.onChange(_736);
}
},onChange:function(){
},_navigateByKey:function(_738,_739){
if(_739==-1){
return;
}
var _73a=this._currentFocus.idx+_738;
if(_73a<this._cells.length&&_73a>-1){
var _73b=this._cells[_73a].node;
this._setCurrent(_73b);
this.defer(lang.hitch(_727,"focus",_73b));
}
},_getDye:function(cell){
return this._cells[cell.idx].dye;
}});
});
},"url:dijit/templates/TitlePane.html":"<div>\n\t<div data-dojo-attach-event=\"onclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n","dijit/form/ValidationTextBox":function(){
define(["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_73c,_73d,i18n,_73e,_73f,_740){
var _741;
return _741=_73c("dijit.form.ValidationTextBox",_73e,{templateString:_740,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,_742){
if(_742!=_741.prototype[attr]){
_73d.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",_742);
}
},_setRegExpGenAttr:function(_743){
this._deprecateRegExp("regExpGen",_743);
this.regExpGen=this._getPatternAttr;
},_setRegExpAttr:function(_744){
this._deprecateRegExp("regExp",_744);
},_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_745,_746){
return (new RegExp("^(?:"+this._getPatternAttr(_746)+")"+(this.required?"":"?")+"$")).test(_745)&&(!this.required||!this._isEmpty(_745))&&(this._isEmpty(_745)||this.parse(_745,_746)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_747){
return (this.trim?/^\s*$/:/^$/).test(_747);
},getErrorMessage:function(){
var _748=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _749=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_748:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_749:_748;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_74a){
var _74b="";
var _74c=this.disabled||this.isValid(_74a);
if(_74c){
this._maskValidSubsetError=true;
}
var _74d=this._isEmpty(this.textbox.value);
var _74e=!_74c&&_74a&&this._isValidSubset();
this._set("state",_74c?"":(((((!this._hasBeenBlurred||_74a)&&_74d)||_74e)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_74c?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_74a&&_74e;
_74b=this.getErrorMessage(_74a);
}else{
if(this.state=="Incomplete"){
_74b=this.getPromptMessage(_74a);
this._maskValidSubsetError=!this._hasBeenBlurred||_74a;
}else{
if(_74d){
_74b=this.getPromptMessage(_74a);
}
}
}
this.set("message",_74b);
return _74c;
},displayMessage:function(_74f){
if(_74f&&this.focused){
_73f.show(_74f,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_73f.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_750){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_751){
if(!_751.locale&&this.lang){
_751.locale=this.lang;
}
this._set("constraints",_751);
this._refreshState();
},_getPatternAttr:function(_752){
var p=this.pattern;
var type=(typeof p).toLowerCase();
if(type=="function"){
p=this.pattern(_752||this.constraints);
}
if(p!=this._lastRegExp){
var _753="";
this._lastRegExp=p;
if(p!=".*"){
p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_753+=re;
break;
case ")":
_753+="|$)";
break;
default:
_753+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_753);
}
catch(e){
_753=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_753+")$";
}
return p;
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_754){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_755){
this._set("required",_755);
this.focusNode.setAttribute("aria-required",_755);
this._refreshState();
},_setMessageAttr:function(_756){
this._set("message",_756);
this.displayMessage(_756);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/layout/BorderContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_757,_758,_759,_75a,_75b,_75c,_75d,_75e,keys,lang,on,_75f,_760,_761,_762,_763,_764){
var _765=_759("dijit.layout._Splitter",[_761,_762],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_75a.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _766=_758(this._cookieName);
if(_766){
this.child.domNode.style[this.horizontal?"height":"width"]=_766;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_767=_75c.getMarginBox(this.child.domNode)[dim],_768=_757.filter(this.container.getChildren(),function(_769){
return _769.region=="center";
})[0],_76a=_75c.getMarginBox(_768.domNode)[dim];
return Math.min(this.child.maxSize,_767+_76a);
},_startDrag:function(e){
if(!this.cover){
this.cover=_75b.place("<div class=dijitSplitterCover></div>",this.child.domNode,"after");
}
_75a.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_75b.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_75a.add(this.domNode,"dijitSplitterShadow");
_75b.place(this.fake,this.domNode,"after");
}
_75a.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_75a.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _76b=this._factor,_76c=this.horizontal,axis=_76c?"pageY":"pageX",_76d=e[axis],_76e=this.domNode.style,dim=_76c?"h":"w",_76f=_75c.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_770=this.region,_771=_770=="top"||_770=="bottom"?"top":"left",_772=parseInt(_76e[_771],10),_773=this._resize,_774=lang.hitch(this.container,"_layoutChildren",this.child.id),de=this.ownerDocument;
this._handlers=this._handlers.concat([on(de,_75f.move,this._drag=function(e,_775){
var _776=e[axis]-_76d,_777=_76b*_776+_76f,_778=Math.max(Math.min(_777,max),min);
if(_773||_775){
_774(_778);
}
_76e[_771]=_776+_772+_76b*(_778-_777)+"px";
}),on(de,"dragstart",_75e.stop),on(this.ownerDocumentBody,"selectstart",_75e.stop),on(de,_75f.release,lang.hitch(this,"_stopDrag"))]);
_75e.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_75a.toggle(this.domNode,"dijitSplitterHover",o);
_75a.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_75a.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_75b.destroy(this.fake);
}
_75a.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_758(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _779=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _779?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _779?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _77a=_75c.getMarginSize(this.child.domNode)[_779?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_77a,this._computeMaxSize()),this.child.minSize));
_75e.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _77b=_759("dijit.layout._Gutter",[_761,_762],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_75a.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _77c=_759("dijit.layout.BorderContainer",_763,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_765,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_757.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_77d){
var _77e=_77d.region;
if(_77e){
this.inherited(arguments);
_75a.add(_77d.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_77e=="leading"){
_77e=ltr?"left":"right";
}
if(_77e=="trailing"){
_77e=ltr?"right":"left";
}
if(_77e!="center"&&(_77d.splitter||this.gutters)&&!_77d._splitterWidget){
var _77f=_77d.splitter?this._splitterClass:_77b;
if(lang.isString(_77f)){
_77f=lang.getObject(_77f);
}
var _780=new _77f({id:_77d.id+"_splitter",container:this,child:_77d,region:_77e,live:this.liveSplitters});
_780.isSplitter=true;
_77d._splitterWidget=_780;
_75b.place(_780.domNode,_77d.domNode,"after");
_780.startup();
}
_77d.region=_77e;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_781,_782){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_783){
var _784=_783.region;
var _785=_783._splitterWidget;
if(_785){
_785.destroy();
delete _783._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_75a.remove(_783.domNode,this.baseClass+"Pane");
_75d.set(_783.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_75d.set(_783.domNode,_784=="top"||_784=="bottom"?"width":"height","auto");
},getChildren:function(){
return _757.filter(this.inherited(arguments),function(_786){
return !_786.isSplitter;
});
},getSplitter:function(_787){
return _757.filter(this.getChildren(),function(_788){
return _788.region==_787;
})[0]._splitterWidget;
},resize:function(_789,_78a){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_75d.getComputedStyle(node);
this.pe=_75c.getPadExtents(node,this.cs);
this.pe.r=_75d.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_75d.toPixelValue(node,this.cs.paddingBottom);
_75d.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_78b,_78c){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _78d=_757.map(this.getChildren(),function(_78e,idx){
return {pane:_78e,weight:[_78e.region=="center"?Infinity:0,_78e.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_78e.region)?1:-1),idx]};
},this);
_78d.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _78f=[];
_757.forEach(_78d,function(_790){
var pane=_790.pane;
_78f.push(pane);
if(pane._splitterWidget){
_78f.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_764.layoutChildren(this.domNode,dim,_78f,_78b,_78c);
},destroyRecursive:function(){
_757.forEach(this.getChildren(),function(_791){
var _792=_791._splitterWidget;
if(_792){
_792.destroy();
}
delete _791._splitterWidget;
});
this.inherited(arguments);
}});
_77c.ChildWidgetProperties={region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity};
lang.extend(_760,_77c.ChildWidgetProperties);
_77c._Splitter=_765;
_77c._Gutter=_77b;
return _77c;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_793,_794,_795){
var _796={};
lang.setObject("dojo.number",_796);
_796.format=function(_797,_798){
_798=lang.mixin({},_798||{});
var _799=i18n.normalizeLocale(_798.locale),_79a=i18n.getLocalization("dojo.cldr","number",_799);
_798.customs=_79a;
var _79b=_798.pattern||_79a[(_798.type||"decimal")+"Format"];
if(isNaN(_797)||Math.abs(_797)==Infinity){
return null;
}
return _796._applyPattern(_797,_79b,_798);
};
_796._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_796._applyPattern=function(_79c,_79d,_79e){
_79e=_79e||{};
var _79f=_79e.customs.group,_7a0=_79e.customs.decimal,_7a1=_79d.split(";"),_7a2=_7a1[0];
_79d=_7a1[(_79c<0)?1:0]||("-"+_7a2);
if(_79d.indexOf("%")!=-1){
_79c*=100;
}else{
if(_79d.indexOf("‰")!=-1){
_79c*=1000;
}else{
if(_79d.indexOf("¤")!=-1){
_79f=_79e.customs.currencyGroup||_79f;
_7a0=_79e.customs.currencyDecimal||_7a0;
_79d=_79d.replace(/\u00a4{1,3}/,function(_7a3){
var prop=["symbol","currency","displayName"][_7a3.length-1];
return _79e[prop]||_79e.currency||"";
});
}else{
if(_79d.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _7a4=_796._numberPatternRE;
var _7a5=_7a2.match(_7a4);
if(!_7a5){
throw new Error("unable to find a number expression in pattern: "+_79d);
}
if(_79e.fractional===false){
_79e.places=0;
}
return _79d.replace(_7a4,_796._formatAbsolute(_79c,_7a5[0],{decimal:_7a0,group:_79f,places:_79e.places,round:_79e.round}));
};
_796.round=function(_7a6,_7a7,_7a8){
var _7a9=10/(_7a8||10);
return (_7a9*+_7a6).toFixed(_7a7)/_7a9;
};
if((0.9).toFixed()==0){
var _7aa=_796.round;
_796.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _7aa(v,p,m)+(v>0?d:-d);
};
}
_796._formatAbsolute=function(_7ab,_7ac,_7ad){
_7ad=_7ad||{};
if(_7ad.places===true){
_7ad.places=0;
}
if(_7ad.places===Infinity){
_7ad.places=6;
}
var _7ae=_7ac.split("."),_7af=typeof _7ad.places=="string"&&_7ad.places.indexOf(","),_7b0=_7ad.places;
if(_7af){
_7b0=_7ad.places.substring(_7af+1);
}else{
if(!(_7b0>=0)){
_7b0=(_7ae[1]||[]).length;
}
}
if(!(_7ad.round<0)){
_7ab=_796.round(_7ab,_7b0,_7ad.round);
}
var _7b1=String(Math.abs(_7ab)).split("."),_7b2=_7b1[1]||"";
if(_7ae[1]||_7ad.places){
if(_7af){
_7ad.places=_7ad.places.substring(0,_7af);
}
var pad=_7ad.places!==undefined?_7ad.places:(_7ae[1]&&_7ae[1].lastIndexOf("0")+1);
if(pad>_7b2.length){
_7b1[1]=_794.pad(_7b2,pad,"0",true);
}
if(_7b0<_7b2.length){
_7b1[1]=_7b2.substr(0,_7b0);
}
}else{
if(_7b1[1]){
_7b1.pop();
}
}
var _7b3=_7ae[0].replace(",","");
pad=_7b3.indexOf("0");
if(pad!=-1){
pad=_7b3.length-pad;
if(pad>_7b1[0].length){
_7b1[0]=_794.pad(_7b1[0],pad);
}
if(_7b3.indexOf("#")==-1){
_7b1[0]=_7b1[0].substr(_7b1[0].length-pad);
}
}
var _7b4=_7ae[0].lastIndexOf(","),_7b5,_7b6;
if(_7b4!=-1){
_7b5=_7ae[0].length-_7b4-1;
var _7b7=_7ae[0].substr(0,_7b4);
_7b4=_7b7.lastIndexOf(",");
if(_7b4!=-1){
_7b6=_7b7.length-_7b4-1;
}
}
var _7b8=[];
for(var _7b9=_7b1[0];_7b9;){
var off=_7b9.length-_7b5;
_7b8.push((off>0)?_7b9.substr(off):_7b9);
_7b9=(off>0)?_7b9.slice(0,off):"";
if(_7b6){
_7b5=_7b6;
delete _7b6;
}
}
_7b1[0]=_7b8.reverse().join(_7ad.group||",");
return _7b1.join(_7ad.decimal||".");
};
_796.regexp=function(_7ba){
return _796._parseInfo(_7ba).regexp;
};
_796._parseInfo=function(_7bb){
_7bb=_7bb||{};
var _7bc=i18n.normalizeLocale(_7bb.locale),_7bd=i18n.getLocalization("dojo.cldr","number",_7bc),_7be=_7bb.pattern||_7bd[(_7bb.type||"decimal")+"Format"],_7bf=_7bd.group,_7c0=_7bd.decimal,_7c1=1;
if(_7be.indexOf("%")!=-1){
_7c1/=100;
}else{
if(_7be.indexOf("‰")!=-1){
_7c1/=1000;
}else{
var _7c2=_7be.indexOf("¤")!=-1;
if(_7c2){
_7bf=_7bd.currencyGroup||_7bf;
_7c0=_7bd.currencyDecimal||_7c0;
}
}
}
var _7c3=_7be.split(";");
if(_7c3.length==1){
_7c3.push("-"+_7c3[0]);
}
var re=_795.buildGroupRE(_7c3,function(_7c4){
_7c4="(?:"+_795.escapeString(_7c4,".")+")";
return _7c4.replace(_796._numberPatternRE,function(_7c5){
var _7c6={signed:false,separator:_7bb.strict?_7bf:[_7bf,""],fractional:_7bb.fractional,decimal:_7c0,exponent:false},_7c7=_7c5.split("."),_7c8=_7bb.places;
if(_7c7.length==1&&_7c1!=1){
_7c7[1]="###";
}
if(_7c7.length==1||_7c8===0){
_7c6.fractional=false;
}else{
if(_7c8===undefined){
_7c8=_7bb.pattern?_7c7[1].lastIndexOf("0")+1:Infinity;
}
if(_7c8&&_7bb.fractional==undefined){
_7c6.fractional=true;
}
if(!_7bb.places&&(_7c8<_7c7[1].length)){
_7c8+=","+_7c7[1].length;
}
_7c6.places=_7c8;
}
var _7c9=_7c7[0].split(",");
if(_7c9.length>1){
_7c6.groupSize=_7c9.pop().length;
if(_7c9.length>1){
_7c6.groupSize2=_7c9.pop().length;
}
}
return "("+_796._realNumberRegexp(_7c6)+")";
});
},true);
if(_7c2){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_7ca,_7cb,_7cc,_7cd){
var prop=["symbol","currency","displayName"][_7cc.length-1],_7ce=_795.escapeString(_7bb[prop]||_7bb.currency||"");
_7cb=_7cb?"[\\s\\xa0]":"";
_7cd=_7cd?"[\\s\\xa0]":"";
if(!_7bb.strict){
if(_7cb){
_7cb+="*";
}
if(_7cd){
_7cd+="*";
}
return "(?:"+_7cb+_7ce+_7cd+")?";
}
return _7cb+_7ce+_7cd;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_7bf,decimal:_7c0,factor:_7c1};
};
_796.parse=function(_7cf,_7d0){
var info=_796._parseInfo(_7d0),_7d1=(new RegExp("^"+info.regexp+"$")).exec(_7cf);
if(!_7d1){
return NaN;
}
var _7d2=_7d1[1];
if(!_7d1[1]){
if(!_7d1[2]){
return NaN;
}
_7d2=_7d1[2];
info.factor*=-1;
}
_7d2=_7d2.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _7d2*info.factor;
};
_796._realNumberRegexp=function(_7d3){
_7d3=_7d3||{};
if(!("places" in _7d3)){
_7d3.places=Infinity;
}
if(typeof _7d3.decimal!="string"){
_7d3.decimal=".";
}
if(!("fractional" in _7d3)||/^0/.test(_7d3.places)){
_7d3.fractional=[true,false];
}
if(!("exponent" in _7d3)){
_7d3.exponent=[true,false];
}
if(!("eSigned" in _7d3)){
_7d3.eSigned=[true,false];
}
var _7d4=_796._integerRegexp(_7d3),_7d5=_795.buildGroupRE(_7d3.fractional,function(q){
var re="";
if(q&&(_7d3.places!==0)){
re="\\"+_7d3.decimal;
if(_7d3.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_7d3.places+"}";
}
}
return re;
},true);
var _7d6=_795.buildGroupRE(_7d3.exponent,function(q){
if(q){
return "([eE]"+_796._integerRegexp({signed:_7d3.eSigned})+")";
}
return "";
});
var _7d7=_7d4+_7d5;
if(_7d5){
_7d7="(?:(?:"+_7d7+")|(?:"+_7d5+"))";
}
return _7d7+_7d6;
};
_796._integerRegexp=function(_7d8){
_7d8=_7d8||{};
if(!("signed" in _7d8)){
_7d8.signed=[true,false];
}
if(!("separator" in _7d8)){
_7d8.separator="";
}else{
if(!("groupSize" in _7d8)){
_7d8.groupSize=3;
}
}
var _7d9=_795.buildGroupRE(_7d8.signed,function(q){
return q?"[-+]":"";
},true);
var _7da=_795.buildGroupRE(_7d8.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_795.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_7d8.groupSize,grp2=_7d8.groupSize2;
if(grp2){
var _7db="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_7db+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_7db;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _7d9+_7da;
};
return _796;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/parser"],function(_7dc,_7dd,_7de){
return _7dd("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_7de.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
if(!cw.isFulfilled()){
throw new Error(this.declaredClass+": parser returned unfilled promise (probably waiting for module auto-load), "+"unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
}
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
_7dc.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"dojo/data/util/filter":function(){
define(["../../_base/lang"],function(lang){
var _7df={};
lang.setObject("dojo.data.util.filter",_7df);
_7df.patternToRegExp=function(_7e0,_7e1){
var rxp="^";
var c=null;
for(var i=0;i<_7e0.length;i++){
c=_7e0.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_7e0.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_7e1){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _7df;
});
},"dijit/form/HorizontalRuleLabels":function(){
define(["dojo/_base/declare","dojo/number","dojo/query","./HorizontalRule"],function(_7e2,_7e3,_7e4,_7e5){
return _7e2("dijit.form.HorizontalRuleLabels",_7e5,{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerH dijitRuleLabelsContainer dijitRuleLabelsContainerH\"></div>",labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:"<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerH\" style=\"left:",_labelPrefix:"\"><div class=\"dijitRuleLabel dijitRuleLabelH\">",_suffix:"</div></div>",_calcPosition:function(pos){
return pos;
},_genHTML:function(pos,ndx){
return this._positionPrefix+this._calcPosition(pos)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[ndx]+this._suffix;
},getLabels:function(){
var _7e6=this.labels;
if(!_7e6.length&&this.srcNodeRef){
_7e6=_7e4("> li",this.srcNodeRef).map(function(node){
return String(node.innerHTML);
});
}
if(!_7e6.length&&this.count>1){
var _7e7=this.minimum;
var inc=(this.maximum-_7e7)/(this.count-1);
for(var i=0;i<this.count;i++){
_7e6.push((i<this.numericMargin||i>=(this.count-this.numericMargin))?"":_7e3.format(_7e7,this.constraints));
_7e7+=inc;
}
}
return _7e6;
},postMixInProperties:function(){
this.inherited(arguments);
this.labels=this.getLabels();
this.count=this.labels.length;
}});
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","dijit/form/FilteringSelect":function(){
define(["dojo/data/util/filter","dojo/_base/declare","dojo/_base/lang","dojo/when","./MappedTextBox","./ComboBoxMixin"],function(_7e8,_7e9,lang,when,_7ea,_7eb){
return _7e9("dijit.form.FilteringSelect",[_7ea,_7eb],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_7ec,_7ed,_7ee,_7ef){
if((_7ed&&_7ed[this.searchAttr]!==this._lastQuery)||(!_7ed&&_7ec.length&&this.store.getIdentity(_7ec[0])!=this._lastQuery)){
return;
}
if(!_7ec.length){
this.set("value","",_7ef||(_7ef===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_7ec[0],_7ef);
}
},_openResultList:function(_7f0,_7f1,_7f2){
if(_7f1[this.searchAttr]!==this._lastQuery){
return;
}
this.inherited(arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_7f3,_7f4,_7f5,item){
if(!this._onChangeActive){
_7f4=null;
}
if(item===undefined){
if(_7f3===null||_7f3===""){
_7f3="";
if(!lang.isString(_7f5)){
this._setDisplayedValueAttr(_7f5||"",_7f4);
return;
}
}
var self=this;
this._lastQuery=_7f3;
when(this.store.get(_7f3),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_7f4);
});
}else{
this.valueNode.value=_7f3;
this.inherited(arguments);
}
},_setItemAttr:function(item,_7f6,_7f7){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_7f8,_7f9){
if(_7f8==null){
_7f8="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_7f9=false;
}
if(this.store){
this.closeDropDown();
var _7fa=lang.clone(this.query);
var qs=this._getDisplayQueryString(_7f8),q;
if(this.store._oldAPI){
q=qs;
}else{
q=_7e8.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_7fa[this.searchAttr]=q;
this.textbox.value=_7f8;
this._lastDisplayedValue=_7f8;
this._set("displayedValue",_7f8);
var _7fb=this;
var _7fc={ignoreCase:this.ignoreCase,deep:true};
lang.mixin(_7fc,this.fetchProperties);
this._fetchHandle=this.store.query(_7fa,_7fc);
when(this._fetchHandle,function(_7fd){
_7fb._fetchHandle=null;
_7fb._callbackSetLabel(_7fd||[],_7fa,_7fc,_7f9);
},function(err){
_7fb._fetchHandle=null;
if(!_7fb._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _7fe={};
lang.setObject("dojo.data.util.sorter",_7fe);
_7fe.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
_7fe.createSortFunction=function(_7ff,_800){
var _801=[];
function _802(attr,dir,comp,s){
return function(_803,_804){
var a=s.getValue(_803,attr);
var b=s.getValue(_804,attr);
return dir*comp(a,b);
};
};
var _805;
var map=_800.comparatorMap;
var bc=_7fe.basicComparator;
for(var i=0;i<_7ff.length;i++){
_805=_7ff[i];
var attr=_805.attribute;
if(attr){
var dir=(_805.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_801.push(_802(attr,dir,comp,_800));
}
}
return function(rowA,rowB){
var i=0;
while(i<_801.length){
var ret=_801[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _7fe;
});
},"dijit/form/_ButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_806,dom,_807,_808){
return _806("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_807.stop(e);
return false;
}
var _809=this.onClick(e)===false;
if(!_809&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _80a=_808.byNode(node);
if(_80a&&typeof _80a._onSubmit=="function"){
_80a._onSubmit(e);
_809=true;
break;
}
}
}
if(_809){
e.preventDefault();
}
return !_809;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_80b){
this._set("label",_80b);
(this.containerNode||this.focusNode).innerHTML=_80b;
}});
});
},"dojo/colors":function(){
define(["./_base/kernel","./_base/lang","./_base/Color","./_base/array"],function(dojo,lang,_80c,_80d){
var _80e={};
lang.setObject("dojo.colors",_80e);
var _80f=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=_80c.fromRgb=function(_810,obj){
var m=_810.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=_80d.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return _80c.fromArray(a,obj);
}
return _80c.fromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_80f(m1,m2,H+1/3)*256,_80f(m1,m2,H)*256,_80f(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return _80c.fromArray(a,obj);
}
}
return null;
};
var _811=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
_80c.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_811(t.r,0,255));
t.g=Math.round(_811(t.g,0,255));
t.b=Math.round(_811(t.b,0,255));
t.a=_811(t.a,0,1);
return this;
};
_80e.makeGrey=_80c.makeGrey=function(g,a){
return _80c.fromArray([g,g,g,a]);
};
lang.mixin(_80c.named,{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"blanchedalmond":[255,235,205],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":[169,169,169],"darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":[47,79,79],"darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":[105,105,105],"dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"greenyellow":[173,255,47],"grey":[128,128,128],"honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":[211,211,211],"lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":[119,136,153],"lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"oldlace":[253,245,230],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":[112,128,144],"snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"whitesmoke":[245,245,245],"yellowgreen":[154,205,50]});
return _80c;
});
},"url:dijit/form/templates/Spinner.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdata-dojo-attach-point=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdata-dojo-attach-point=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n","dijit/tree/_dndContainer":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/on","dojo/touch"],function(_812,_813,_814,_815,lang,on,_816){
return _813("dijit.tree._dndContainer",null,{constructor:function(tree,_817){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_817);
this.current=null;
this.containerState="";
_814.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_816.enter,lang.hitch(this,"onOverEvent")),on(this.node,_816.leave,lang.hitch(this,"onOutEvent")),_812.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_812.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_815,"stop")),on(this.node,"selectstart",lang.hitch(_815,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_818){
this.current=_818;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_819){
var _81a="dojoDnd"+type;
var _81b=type.toLowerCase()+"State";
_814.replace(this.node,_81a+_819,_81a+this[_81b]);
this[_81b]=_819;
},_addItemClass:function(node,type){
_814.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_814.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"dojo/date/locale":function(){
define(["../_base/lang","../_base/array","../date","../cldr/supplemental","../i18n","../regexp","../string","../i18n!../cldr/nls/gregorian","module"],function(lang,_81c,date,_81d,i18n,_81e,_81f,_820,_821){
var _822={};
lang.setObject(_821.id.replace(/\//g,"."),_822);
function _823(_824,_825,_826,_827){
return _827.replace(/([a-z])\1*/ig,function(_828){
var s,pad,c=_828.charAt(0),l=_828.length,_829=["abbr","wide","narrow"];
switch(c){
case "G":
s=_825[(l<4)?"eraAbbr":"eraNames"][_824.getFullYear()<0?0:1];
break;
case "y":
s=_824.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_826.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_824.getMonth()+1)/3);
pad=true;
break;
case "M":
case "L":
var m=_824.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _82a=["months",c=="L"?"standAlone":"format",_829[l-3]].join("-");
s=_825[_82a][m];
}
break;
case "w":
var _82b=0;
s=_822._getWeekOfYear(_824,_82b);
pad=true;
break;
case "d":
s=_824.getDate();
pad=true;
break;
case "D":
s=_822._getDayOfYear(_824);
pad=true;
break;
case "e":
case "c":
var d=_824.getDay();
if(l<2){
s=(d-_81d.getFirstDayOfWeek(_826.locale)+8)%7;
break;
}
case "E":
d=_824.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _82c=["days",c=="c"?"standAlone":"format",_829[l-3]].join("-");
s=_825[_82c][d];
}
break;
case "a":
var _82d=_824.getHours()<12?"am":"pm";
s=_826[_82d]||_825["dayPeriods-format-wide-"+_82d];
break;
case "h":
case "H":
case "K":
case "k":
var h=_824.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_824.getMinutes();
pad=true;
break;
case "s":
s=_824.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_824.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_822._getZone(_824,true,_826);
if(s){
break;
}
l=4;
case "Z":
var _82e=_822._getZone(_824,false,_826);
var tz=[(_82e<=0?"+":"-"),_81f.pad(Math.floor(Math.abs(_82e)/60),2),_81f.pad(Math.abs(_82e)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_827);
}
if(pad){
s=_81f.pad(s,l);
}
return s;
});
};
_822._getZone=function(_82f,_830,_831){
if(_830){
return date.getTimezoneName(_82f);
}else{
return _82f.getTimezoneOffset();
}
};
_822.format=function(_832,_833){
_833=_833||{};
var _834=i18n.normalizeLocale(_833.locale),_835=_833.formatLength||"short",_836=_822._getGregorianBundle(_834),str=[],_837=lang.hitch(this,_823,_832,_836,_833);
if(_833.selector=="year"){
return _838(_836["dateFormatItem-yyyy"]||"yyyy",_837);
}
var _839;
if(_833.selector!="date"){
_839=_833.timePattern||_836["timeFormat-"+_835];
if(_839){
str.push(_838(_839,_837));
}
}
if(_833.selector!="time"){
_839=_833.datePattern||_836["dateFormat-"+_835];
if(_839){
str.push(_838(_839,_837));
}
}
return str.length==1?str[0]:_836["dateTimeFormat-"+_835].replace(/\{(\d+)\}/g,function(_83a,key){
return str[key];
});
};
_822.regexp=function(_83b){
return _822._parseInfo(_83b).regexp;
};
_822._parseInfo=function(_83c){
_83c=_83c||{};
var _83d=i18n.normalizeLocale(_83c.locale),_83e=_822._getGregorianBundle(_83d),_83f=_83c.formatLength||"short",_840=_83c.datePattern||_83e["dateFormat-"+_83f],_841=_83c.timePattern||_83e["timeFormat-"+_83f],_842;
if(_83c.selector=="date"){
_842=_840;
}else{
if(_83c.selector=="time"){
_842=_841;
}else{
_842=_83e["dateTimeFormat-"+_83f].replace(/\{(\d+)\}/g,function(_843,key){
return [_841,_840][key];
});
}
}
var _844=[],re=_838(_842,lang.hitch(this,_845,_844,_83e,_83c));
return {regexp:re,tokens:_844,bundle:_83e};
};
_822.parse=function(_846,_847){
var _848=/[\u200E\u200F\u202A\u202E]/g,info=_822._parseInfo(_847),_849=info.tokens,_84a=info.bundle,re=new RegExp("^"+info.regexp.replace(_848,"")+"$",info.strict?"":"i"),_84b=re.exec(_846&&_846.replace(_848,""));
if(!_84b){
return null;
}
var _84c=["abbr","wide","narrow"],_84d=[1970,0,1,0,0,0,0],amPm="",_84e=_81c.every(_84b,function(v,i){
if(!i){
return true;
}
var _84f=_849[i-1],l=_84f.length,c=_84f.charAt(0);
switch(c){
case "y":
if(l!=2&&_847.strict){
_84d[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_850=year.substring(0,2)*100,_851=Math.min(Number(year.substring(2,4))+20,99);
_84d[0]=(v<_851)?_850+v:_850-100+v;
}else{
if(_847.strict){
return false;
}
_84d[0]=v;
}
}
break;
case "M":
case "L":
if(l>2){
var _852=_84a["months-"+(c=="L"?"standAlone":"format")+"-"+_84c[l-3]].concat();
if(!_847.strict){
v=v.replace(".","").toLowerCase();
_852=_81c.map(_852,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_81c.indexOf(_852,v);
if(v==-1){
return false;
}
}else{
v--;
}
_84d[1]=v;
break;
case "E":
case "e":
case "c":
var days=_84a["days-"+(c=="c"?"standAlone":"format")+"-"+_84c[l-3]].concat();
if(!_847.strict){
v=v.toLowerCase();
days=_81c.map(days,function(d){
return d.toLowerCase();
});
}
v=_81c.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_84d[1]=0;
case "d":
_84d[2]=v;
break;
case "a":
var am=_847.am||_84a["dayPeriods-format-wide-am"],pm=_847.pm||_84a["dayPeriods-format-wide-pm"];
if(!_847.strict){
var _853=/\./g;
v=v.replace(_853,"").toLowerCase();
am=am.replace(_853,"").toLowerCase();
pm=pm.replace(_853,"").toLowerCase();
}
if(_847.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_84d[3]=v;
break;
case "m":
_84d[4]=v;
break;
case "s":
_84d[5]=v;
break;
case "S":
_84d[6]=v;
}
return true;
});
var _854=+_84d[3];
if(amPm==="p"&&_854<12){
_84d[3]=_854+12;
}else{
if(amPm==="a"&&_854==12){
_84d[3]=0;
}
}
var _855=new Date(_84d[0],_84d[1],_84d[2],_84d[3],_84d[4],_84d[5],_84d[6]);
if(_847.strict){
_855.setFullYear(_84d[0]);
}
var _856=_849.join(""),_857=_856.indexOf("d")!=-1,_858=_856.indexOf("M")!=-1;
if(!_84e||(_858&&_855.getMonth()>_84d[1])||(_857&&_855.getDate()>_84d[2])){
return null;
}
if((_858&&_855.getMonth()<_84d[1])||(_857&&_855.getDate()<_84d[2])){
_855=date.add(_855,"hour",1);
}
return _855;
};
function _838(_859,_85a,_85b,_85c){
var _85d=function(x){
return x;
};
_85a=_85a||_85d;
_85b=_85b||_85d;
_85c=_85c||_85d;
var _85e=_859.match(/(''|[^'])+/g),_85f=_859.charAt(0)=="'";
_81c.forEach(_85e,function(_860,i){
if(!_860){
_85e[i]="";
}else{
_85e[i]=(_85f?_85b:_85a)(_860.replace(/''/g,"'"));
_85f=!_85f;
}
});
return _85c(_85e.join(""));
};
function _845(_861,_862,_863,_864){
_864=_81e.escapeString(_864);
if(!_863.strict){
_864=_864.replace(" a"," ?a");
}
return _864.replace(/([a-z])\1*/ig,function(_865){
var s,c=_865.charAt(0),l=_865.length,p2="",p3="";
if(_863.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
case "L":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
case "e":
case "c":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_863.am||_862["dayPeriods-format-wide-am"],pm=_863.pm||_862["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_863.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_861){
_861.push(_865);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _866=[];
_822.addCustomFormats=function(_867,_868){
_866.push({pkg:_867,name:_868});
};
_822._getGregorianBundle=function(_869){
var _86a={};
_81c.forEach(_866,function(desc){
var _86b=i18n.getLocalization(desc.pkg,desc.name,_869);
_86a=lang.mixin(_86a,_86b);
},this);
return _86a;
};
_822.addCustomFormats(_821.id.replace(/\/date\/locale$/,".cldr"),"gregorian");
_822.getNames=function(item,type,_86c,_86d){
var _86e,_86f=_822._getGregorianBundle(_86d),_870=[item,_86c,type];
if(_86c=="standAlone"){
var key=_870.join("-");
_86e=_86f[key];
if(_86e[0]==1){
_86e=undefined;
}
}
_870[1]="format";
return (_86e||_86f[_870.join("-")]).concat();
};
_822.isWeekend=function(_871,_872){
var _873=_81d.getWeekend(_872),day=(_871||new Date()).getDay();
if(_873.end<_873.start){
_873.end+=7;
if(day<_873.start){
day+=7;
}
}
return day>=_873.start&&day<=_873.end;
};
_822._getDayOfYear=function(_874){
return date.difference(new Date(_874.getFullYear(),0,1,_874.getHours()),_874)+1;
};
_822._getWeekOfYear=function(_875,_876){
if(arguments.length==1){
_876=0;
}
var _877=new Date(_875.getFullYear(),0,1).getDay(),adj=(_877-_876+7)%7,week=Math.floor((_822._getDayOfYear(_875)+adj-1)/7);
if(_877==_876){
week++;
}
return week;
};
return _822;
});
},"url:dijit/templates/InlineEditBox.html":"<span data-dojo-attach-point=\"editNode\" role=\"presentation\" class=\"dijitReset dijitInline dijitOffScreen\"\n\tdata-dojo-attach-event=\"onkeypress: _onKeyPress\"\n\t><span data-dojo-attach-point=\"editorPlaceholder\"></span\n\t><span data-dojo-attach-point=\"buttonContainer\"\n\t\t><button data-dojo-type=\"dijit/form/Button\" data-dojo-props=\"label: '${buttonSave}', 'class': 'saveButton'\"\n\t\t\tdata-dojo-attach-point=\"saveButton\" data-dojo-attach-event=\"onClick:save\"></button\n\t\t><button data-dojo-type=\"dijit/form/Button\"  data-dojo-props=\"label: '${buttonCancel}', 'class': 'cancelButton'\"\n\t\t\tdata-dojo-attach-point=\"cancelButton\" data-dojo-attach-event=\"onClick:cancel\"></button\n\t></span\n></span>\n","dijit/form/VerticalRule":function(){
define(["dojo/_base/declare","./HorizontalRule"],function(_878,_879){
return _878("dijit.form.VerticalRule",_879,{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerV\"></div>",_positionPrefix:"<div class=\"dijitRuleMark dijitRuleMarkV\" style=\"top:",_isHorizontal:false});
});
},"dijit/form/_FormSelectWidget":function(){
define(["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(_87a,_87b,_87c,_87d,_87e,dom,_87f,_880,lang,_881,when,_882,_883){
var _884=_87e("dijit.form._FormSelectWidget",_883,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_885){
var _886=_885,opts=this.options||[],l=opts.length;
if(_886===undefined){
return opts;
}
if(lang.isArray(_886)){
return _87a.map(_886,"return this.getOptions(item);",this);
}
if(lang.isObject(_885)){
if(!_87a.some(this.options,function(o,idx){
if(o===_886||(o.value&&o.value===_886.value)){
_886=idx;
return true;
}
return false;
})){
_886=-1;
}
}
if(typeof _886=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_886){
_886=i;
break;
}
}
}
if(typeof _886=="number"&&_886>=0&&_886<l){
return this.options[_886];
}
return null;
},addOption:function(_887){
if(!lang.isArray(_887)){
_887=[_887];
}
_87a.forEach(_887,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_888){
if(!lang.isArray(_888)){
_888=[_888];
}
var _889=this.getOptions(_888);
_87a.forEach(_889,function(i){
if(i){
this.options=_87a.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_88a){
if(!lang.isArray(_88a)){
_88a=[_88a];
}
_87a.forEach(_88a,function(i){
var _88b=this.getOptions(i),k;
if(_88b){
for(k in i){
_88b[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_88c,_88d,_88e){
var _88f=this.store;
_88e=_88e||{};
if(_88f!==_88c){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!_88c.get){
lang.mixin(_88c,{_oldAPI:true,get:function(id){
var _890=new _87b();
this.fetchItemByIdentity({identity:id,onItem:function(_891){
_890.resolve(_891);
},onError:function(_892){
_890.reject(_892);
}});
return _890.promise;
},query:function(_893,_894){
var _895=new _87b(function(){
if(_896.abort){
_896.abort();
}
});
_895.total=new _87b();
var _896=this.fetch(lang.mixin({query:_893,onBegin:function(_897){
_895.total.resolve(_897);
},onComplete:function(_898){
_895.resolve(_898);
},onError:function(_899){
_895.reject(_899);
}},_894));
return new _882(_895);
}});
if(_88c.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_87c.after(_88c,"onNew",lang.hitch(this,"_onNewItem"),true),_87c.after(_88c,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_87c.after(_88c,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
}
this._set("store",_88c);
}
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(_88e.query){
this._set("query",_88e.query);
this._set("queryOptions",_88e.queryOptions);
}
if(_88c){
this._loadingStore=true;
this.onLoadDeferred=new _87b();
this._queryRes=_88c.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(_89a){
if(this.sortByLabel&&!_88e.sort&&_89a.length){
if(_89a[0].getValue){
_89a.sort(_87d.createSortFunction([{attribute:_88c.getLabelAttributes(_89a[0])[0]}],_88c));
}else{
var _89b=this.labelAttr;
_89a.sort(function(a,b){
return a[_89b]>b[_89b]?1:b[_89b]>a[_89b]?-1:0;
});
}
}
if(_88e.onFetch){
_89a=_88e.onFetch.call(this,_89a,_88e);
}
_87a.forEach(_89a,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._queryRes.observe(lang.hitch(this,function(_89c,_89d,_89e){
if(_89d==_89e){
this._onSetItem(_89c);
}else{
if(_89d!=-1){
this._onDeleteItem(_89c);
}
if(_89e!=-1){
this._onNewItem(_89c);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_88d);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_89a);
}
this.onLoadDeferred.resolve(true);
this.onSetStore();
}),function(err){
console.error("dijit.form.Select: "+err.toString());
this.onLoadDeferred.reject(err);
});
}
return _88f;
},_setValueAttr:function(_89f,_8a0){
if(!this._onChangeActive){
_8a0=null;
}
if(this._loadingStore){
this._pendingValue=_89f;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_89f)){
_89f=[_89f];
}
_87a.forEach(_89f,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_89f[idx]=_87a.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_89f=_87a.filter(_89f,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_89f[0]||!_89f[0].value)&&opts.length){
_89f[0]=opts[0];
}
_87a.forEach(opts,function(i){
i.selected=_87a.some(_89f,function(v){
return v.value===i.value;
});
});
var val=_87a.map(_89f,function(i){
return i.value;
}),disp=_87a.map(_89f,function(i){
return i.label;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_8a0]);
this._updateSelection();
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=_87a.map(this.getOptions(val),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_loadChildren:function(){
if(this._loadingStore){
return;
}
_87a.forEach(this._getChildren(),function(_8a1){
_8a1.destroyRecursive();
});
_87a.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
_87a.forEach(this._getChildren(),function(_8a2){
var _8a3=_87a.some(val,function(v){
return _8a2.option&&(v===_8a2.option.value);
});
_87f.toggle(_8a2.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_8a3);
_8a2.domNode.setAttribute("aria-selected",_8a3?"true":"false");
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_87a.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return _87a.map(_87a.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_8a4){
if(!_8a4||!_8a4.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _8a5=this.store;
this.removeOption(_8a5.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _8a6=this.store,_8a7=(this.labelAttr&&this.labelAttr in item)?item[this.labelAttr]:_8a6.getLabel(item),_8a8=(_8a7?_8a6.getIdentity(item):null);
return {value:_8a8,label:_8a7,item:item};
},_addOptionForItem:function(item){
var _8a9=this.store;
if(_8a9.isItemLoaded&&!_8a9.isItemLoaded(item)){
_8a9.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _8aa=this._getOptionObjForItem(item);
this.addOption(_8aa);
},constructor:function(_8ab){
this._oValue=(_8ab||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
if(!this.options){
this.options=this.srcNodeRef?_881("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_880._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this._set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this,"onChange","_updateSelection");
var _8ac=this.store;
if(_8ac&&(_8ac.getIdentity||_8ac.getFeatures()["dojo.data.api.Identity"])){
this.store=null;
this.setStore(_8ac,this._oValue);
}
},startup:function(){
this._loadChildren();
this.inherited(arguments);
},destroy:function(){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
this.inherited(arguments);
},_addOptionItem:function(){
},_removeOptionItem:function(){
},_setDisplay:function(){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions(this.get("value"));
},_pseudoLoadChildren:function(){
},onSetStore:function(){
}});
return _884;
});
},"dijit/form/Select":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","dojo/sniff","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_8ad,_8ae,_8af,_8b0,_8b1,_8b2,i18n,lang,has,_8b3,_8b4,Menu,_8b5,_8b6,_8b7,_8b8){
var _8b9=_8ae("dijit.form._SelectMenu",Menu,{autoFocus:true,buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=this.ownerDocument.createElement("div"));
n.style.cssText="overflow-x: hidden; overflow-y: scroll";
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_8b0.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_8b2.stop);
},focus:function(){
var _8ba=false,val=this.parentWidget.value;
if(lang.isArray(val)){
val=val[val.length-1];
}
if(val){
_8ad.forEach(this.parentWidget._getChildren(),function(_8bb){
if(_8bb.option&&(val===_8bb.option.value)){
_8ba=true;
this.focusChild(_8bb,false);
}
},this);
}
if(!_8ba){
this.inherited(arguments);
}
},resize:function(mb){
if(mb){
_8b1.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _8bc=_8ae("dijit.form.Select",[_8b3,_8b4],{baseClass:"dijitSelect dijitValidationTextBox",templateString:_8b8,_buttonInputDisabled:has("ie")?"disabled":"",required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _8b9({id:this.id+"_menu",parentWidget:this});
_8b0.add(this.dropDown.domNode,this.baseClass.replace(/\s+|$/g,"Menu "));
},_getMenuItemForOption:function(_8bd){
if(!_8bd.value&&!_8bd.label){
return new _8b6({ownerDocument:this.ownerDocument});
}else{
var _8be=lang.hitch(this,"_setValueAttr",_8bd);
var item=new _8b5({option:_8bd,label:_8bd.label||this.emptyLabel,onClick:_8be,ownerDocument:this.ownerDocument,dir:this.dir,disabled:_8bd.disabled||false});
item.focusNode.setAttribute("role","option");
return item;
}
},_addOptionItem:function(_8bf){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_8bf));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_8c0){
if(_8c0===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_8ad.forEach(this._getChildren(),function(_8c1){
_8c1.destroyRecursive();
});
var item=new _8b5({ownerDocument:this.ownerDocument,label:this.emptyLabel});
this.dropDown.addChild(item);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value,false);
}
},_refreshState:function(){
if(this._started){
this.validate(this.focused);
}
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setValueAttr:function(_8c2){
this.inherited(arguments);
_8af.set(this.valueNode,"value",this.get("value"));
this._refreshState();
},_setDisabledAttr:function(_8c3){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_8c4){
this._set("required",_8c4);
this.focusNode.setAttribute("aria-required",_8c4);
this._refreshState();
},_setOptionsAttr:function(_8c5){
this._isLoaded=false;
this._set("options",_8c5);
},_setDisplay:function(_8c6){
var lbl=_8c6||this.emptyLabel;
this.containerNode.innerHTML="<span role=\"option\" class=\"dijitReset dijitInline "+this.baseClass.replace(/\s+|$/g,"Label ")+"\">"+lbl+"</span>";
},validate:function(_8c7){
var _8c8=this.disabled||this.isValid(_8c7);
this._set("state",_8c8?"":(this._hasBeenBlurred?"Error":"Incomplete"));
this.focusNode.setAttribute("aria-invalid",_8c8?"false":"true");
var _8c9=_8c8?"":this._missingMsg;
if(_8c9&&this.focused&&this._hasBeenBlurred){
_8b7.show(_8c9,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_8b7.hide(this.domNode);
}
this._set("message",_8c9);
return _8c8;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_8b7.hide(this.domNode);
this._refreshState();
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_8b2.stop);
this.domNode.setAttribute("aria-expanded","false");
if(has("ie")<9){
this.defer(function(){
try{
var s=domStyle.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _8ca=this.domNode.getElementsByTagName("INPUT");
if(_8ca){
for(var i=0;i<_8ca.length;i++){
_8ca[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setStyleAttr:function(_8cb){
this.inherited(arguments);
_8b0.toggle(this.domNode,this.baseClass.replace(/\s+|$/g,"FixedWidth "),!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_8cc){
this._loadChildren(true);
this._isLoaded=true;
_8cc();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},destroy:function(_8cd){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_8cd);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_8b7.hide(this.domNode);
this.inherited(arguments);
this.validate(false);
}});
_8bc._Menu=_8b9;
return _8bc;
});
},"dijit/_editor/range":function(){
define("dijit/_editor/range",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","../main"],function(_8ce,_8cf,lang,win,_8d0){
_8d0.range={};
_8d0.range.getIndex=function(node,_8d1){
var ret=[],retR=[];
var _8d2=node;
var _8d3,n;
while(node!=_8d1){
var i=0;
_8d3=node.parentNode;
while((n=_8d3.childNodes[i++])){
if(n===node){
--i;
break;
}
}
ret.unshift(i);
retR.unshift(i-_8d3.childNodes.length);
node=_8d3;
}
if(ret.length>0&&_8d2.nodeType==3){
n=_8d2.previousSibling;
while(n&&n.nodeType==3){
ret[ret.length-1]--;
n=n.previousSibling;
}
n=_8d2.nextSibling;
while(n&&n.nodeType==3){
retR[retR.length-1]++;
n=n.nextSibling;
}
}
return {o:ret,r:retR};
};
_8d0.range.getNode=function(_8d4,_8d5){
if(!lang.isArray(_8d4)||_8d4.length==0){
return _8d5;
}
var node=_8d5;
_8ce.every(_8d4,function(i){
if(i>=0&&i<node.childNodes.length){
node=node.childNodes[i];
}else{
node=null;
return false;
}
return true;
});
return node;
};
_8d0.range.getCommonAncestor=function(n1,n2,root){
root=root||n1.ownerDocument.body;
var _8d6=function(n){
var as=[];
while(n){
as.unshift(n);
if(n!==root){
n=n.parentNode;
}else{
break;
}
}
return as;
};
var n1as=_8d6(n1);
var n2as=_8d6(n2);
var m=Math.min(n1as.length,n2as.length);
var com=n1as[0];
for(var i=1;i<m;i++){
if(n1as[i]===n2as[i]){
com=n1as[i];
}else{
break;
}
}
return com;
};
_8d0.range.getAncestor=function(node,_8d7,root){
root=root||node.ownerDocument.body;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(_8d7.test(name)){
return node;
}
node=node.parentNode;
}
return null;
};
_8d0.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
_8d0.range.getBlockAncestor=function(node,_8d8,root){
root=root||node.ownerDocument.body;
_8d8=_8d8||_8d0.range.BlockTagNames;
var _8d9=null,_8da;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(!_8d9&&_8d8.test(name)){
_8d9=node;
}
if(!_8da&&(/^(?:BODY|TD|TH|CAPTION)$/).test(name)){
_8da=node;
}
node=node.parentNode;
}
return {blockNode:_8d9,blockContainer:_8da||node.ownerDocument.body};
};
_8d0.range.atBeginningOfContainer=function(_8db,node,_8dc){
var _8dd=false;
var _8de=(_8dc==0);
if(!_8de&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(0,_8dc))){
_8de=true;
}
}
if(_8de){
var _8df=node;
_8dd=true;
while(_8df&&_8df!==_8db){
if(_8df.previousSibling){
_8dd=false;
break;
}
_8df=_8df.parentNode;
}
}
return _8dd;
};
_8d0.range.atEndOfContainer=function(_8e0,node,_8e1){
var _8e2=false;
var _8e3=(_8e1==(node.length||node.childNodes.length));
if(!_8e3&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(_8e1))){
_8e3=true;
}
}
if(_8e3){
var _8e4=node;
_8e2=true;
while(_8e4&&_8e4!==_8e0){
if(_8e4.nextSibling){
_8e2=false;
break;
}
_8e4=_8e4.parentNode;
}
}
return _8e2;
};
_8d0.range.adjacentNoneTextNode=function(_8e5,next){
var node=_8e5;
var len=(0-_8e5.length)||0;
var prop=next?"nextSibling":"previousSibling";
while(node){
if(node.nodeType!=3){
break;
}
len+=node.length;
node=node[prop];
}
return [node,len];
};
_8d0.range.create=function(win){
win=win||window;
if(win.getSelection){
return win.document.createRange();
}else{
return new _8d0.range.W3CRange();
}
};
_8d0.range.getSelection=function(_8e6,_8e7){
if(_8e6.getSelection){
return _8e6.getSelection();
}else{
var s=new _8d0.range.ie.selection(_8e6);
if(!_8e7){
s._getCurrentSelection();
}
return s;
}
};
if(!window.getSelection){
_8d0.range.ie={cachedSelection:{},selection:function(_8e8){
this._ranges=[];
this.addRange=function(r,_8e9){
this._ranges.push(r);
if(!_8e9){
r._select();
}
this.rangeCount=this._ranges.length;
};
this.removeAllRanges=function(){
this._ranges=[];
this.rangeCount=0;
};
var _8ea=function(){
var r=_8e8.document.selection.createRange();
var type=_8e8.document.selection.type.toUpperCase();
if(type=="CONTROL"){
return new _8d0.range.W3CRange(_8d0.range.ie.decomposeControlRange(r));
}else{
return new _8d0.range.W3CRange(_8d0.range.ie.decomposeTextRange(r));
}
};
this.getRangeAt=function(i){
return this._ranges[i];
};
this._getCurrentSelection=function(){
this.removeAllRanges();
var r=_8ea();
if(r){
this.addRange(r,true);
this.isCollapsed=r.collapsed;
}else{
this.isCollapsed=true;
}
};
},decomposeControlRange:function(_8eb){
var _8ec=_8eb.item(0),_8ed=_8eb.item(_8eb.length-1);
var _8ee=_8ec.parentNode,_8ef=_8ed.parentNode;
var _8f0=_8d0.range.getIndex(_8ec,_8ee).o[0];
var _8f1=_8d0.range.getIndex(_8ed,_8ef).o[0]+1;
return [_8ee,_8f0,_8ef,_8f1];
},getEndPoint:function(_8f2,end){
var _8f3=_8f2.duplicate();
_8f3.collapse(!end);
var _8f4="EndTo"+(end?"End":"Start");
var _8f5=_8f3.parentElement();
var _8f6,_8f7,_8f8;
if(_8f5.childNodes.length>0){
_8ce.every(_8f5.childNodes,function(node,i){
var _8f9;
if(node.nodeType!=3){
_8f3.moveToElementText(node);
if(_8f3.compareEndPoints(_8f4,_8f2)>0){
if(_8f8&&_8f8.nodeType==3){
_8f6=_8f8;
_8f9=true;
}else{
_8f6=_8f5;
_8f7=i;
return false;
}
}else{
if(i==_8f5.childNodes.length-1){
_8f6=_8f5;
_8f7=_8f5.childNodes.length;
return false;
}
}
}else{
if(i==_8f5.childNodes.length-1){
_8f6=node;
_8f9=true;
}
}
if(_8f9&&_8f6){
var _8fa=_8d0.range.adjacentNoneTextNode(_8f6)[0];
if(_8fa){
_8f6=_8fa.nextSibling;
}else{
_8f6=_8f5.firstChild;
}
var _8fb=_8d0.range.adjacentNoneTextNode(_8f6);
_8fa=_8fb[0];
var _8fc=_8fb[1];
if(_8fa){
_8f3.moveToElementText(_8fa);
_8f3.collapse(false);
}else{
_8f3.moveToElementText(_8f5);
}
_8f3.setEndPoint(_8f4,_8f2);
_8f7=_8f3.text.length-_8fc;
return false;
}
_8f8=node;
return true;
});
}else{
_8f6=_8f5;
_8f7=0;
}
if(!end&&_8f6.nodeType==1&&_8f7==_8f6.childNodes.length){
var _8fd=_8f6.nextSibling;
if(_8fd&&_8fd.nodeType==3){
_8f6=_8fd;
_8f7=0;
}
}
return [_8f6,_8f7];
},setEndPoint:function(_8fe,_8ff,_900){
var _901=_8fe.duplicate(),node,len;
if(_8ff.nodeType!=3){
if(_900>0){
node=_8ff.childNodes[_900-1];
if(node){
if(node.nodeType==3){
_8ff=node;
_900=node.length;
}else{
if(node.nextSibling&&node.nextSibling.nodeType==3){
_8ff=node.nextSibling;
_900=0;
}else{
_901.moveToElementText(node.nextSibling?node:_8ff);
var _902=node.parentNode;
var _903=_902.insertBefore(node.ownerDocument.createTextNode(" "),node.nextSibling);
_901.collapse(false);
_902.removeChild(_903);
}
}
}
}else{
_901.moveToElementText(_8ff);
_901.collapse(true);
}
}
if(_8ff.nodeType==3){
var _904=_8d0.range.adjacentNoneTextNode(_8ff);
var _905=_904[0];
len=_904[1];
if(_905){
_901.moveToElementText(_905);
_901.collapse(false);
if(_905.contentEditable!="inherit"){
len++;
}
}else{
_901.moveToElementText(_8ff.parentNode);
_901.collapse(true);
_901.move("character",1);
_901.move("character",-1);
}
_900+=len;
if(_900>0){
if(_901.move("character",_900)!=_900){
console.error("Error when moving!");
}
}
}
return _901;
},decomposeTextRange:function(_906){
var _907=_8d0.range.ie.getEndPoint(_906);
var _908=_907[0],_909=_907[1];
var _90a=_907[0],_90b=_907[1];
if(_906.htmlText.length){
if(_906.htmlText==_906.text){
_90b=_909+_906.text.length;
}else{
_907=_8d0.range.ie.getEndPoint(_906,true);
_90a=_907[0],_90b=_907[1];
}
}
return [_908,_909,_90a,_90b];
},setRange:function(_90c,_90d,_90e,_90f,_910,_911){
var _912=_8d0.range.ie.setEndPoint(_90c,_90d,_90e);
_90c.setEndPoint("StartToStart",_912);
if(!_911){
var end=_8d0.range.ie.setEndPoint(_90c,_90f,_910);
}
_90c.setEndPoint("EndToEnd",end||_912);
return _90c;
}};
_8cf("dijit.range.W3CRange",null,{constructor:function(){
if(arguments.length>0){
this.setStart(arguments[0][0],arguments[0][1]);
this.setEnd(arguments[0][2],arguments[0][3]);
}else{
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}
},_updateInternal:function(){
if(this.startContainer!==this.endContainer){
this.commonAncestorContainer=_8d0.range.getCommonAncestor(this.startContainer,this.endContainer);
}else{
this.commonAncestorContainer=this.startContainer;
}
this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset);
},setStart:function(node,_913){
_913=parseInt(_913);
if(this.startContainer===node&&this.startOffset==_913){
return;
}
delete this._cachedBookmark;
this.startContainer=node;
this.startOffset=_913;
if(!this.endContainer){
this.setEnd(node,_913);
}else{
this._updateInternal();
}
},setEnd:function(node,_914){
_914=parseInt(_914);
if(this.endContainer===node&&this.endOffset==_914){
return;
}
delete this._cachedBookmark;
this.endContainer=node;
this.endOffset=_914;
if(!this.startContainer){
this.setStart(node,_914);
}else{
this._updateInternal();
}
},setStartAfter:function(node,_915){
this._setPoint("setStart",node,_915,1);
},setStartBefore:function(node,_916){
this._setPoint("setStart",node,_916,0);
},setEndAfter:function(node,_917){
this._setPoint("setEnd",node,_917,1);
},setEndBefore:function(node,_918){
this._setPoint("setEnd",node,_918,0);
},_setPoint:function(what,node,_919,ext){
var _91a=_8d0.range.getIndex(node,node.parentNode).o;
this[what](node.parentNode,_91a.pop()+ext);
},_getIERange:function(){
var r=(this._body||this.endContainer.ownerDocument.body).createTextRange();
_8d0.range.ie.setRange(r,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);
return r;
},getBookmark:function(){
this._getIERange();
return this._cachedBookmark;
},_select:function(){
var r=this._getIERange();
r.select();
},deleteContents:function(){
var s=this.startContainer,r=this._getIERange();
if(s.nodeType===3&&!this.startOffset){
this.setStartBefore(s);
}
r.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true;
},cloneRange:function(){
var r=new _8d0.range.W3CRange([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);
r._body=this._body;
return r;
},detach:function(){
this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}});
}
return _8d0.range;
});
},"dojo/store/util/QueryResults":function(){
define(["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_91b,lang,_91c){
var _91d=function(_91e){
if(!_91e){
return _91e;
}
if(_91e.then){
_91e=lang.delegate(_91e);
}
function _91f(_920){
if(!_91e[_920]){
_91e[_920]=function(){
var args=arguments;
return _91c.when(_91e,function(_921){
Array.prototype.unshift.call(args,_921);
return _91d(_91b[_920].apply(_91b,args));
});
};
}
};
_91f("forEach");
_91f("filter");
_91f("map");
if(!_91e.total){
_91e.total=_91c.when(_91e,function(_922){
return _922.length;
});
}
return _91e;
};
lang.setObject("dojo.store.util.QueryResults",_91d);
return _91d;
});
},"dijit/form/_ListBase":function(){
define(["dojo/_base/declare","dojo/on","dojo/window"],function(_923,on,_924){
return _923("dijit.form._ListBase",null,{selected:null,_listConnect:function(_925,_926){
var self=this;
return self.own(on(self.containerNode,on.selector(function(_927,_928,_929){
return _927.parentNode==_929;
},_925),function(evt){
evt.preventDefault();
self[_926](evt,this);
}));
},selectFirstNode:function(){
var _92a=this.containerNode.firstChild;
while(_92a&&_92a.style.display=="none"){
_92a=_92a.nextSibling;
}
this._setSelectedAttr(_92a);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _92b=this.selected;
if(!_92b){
this.selectFirstNode();
}else{
var next=_92b.nextSibling;
while(next&&next.style.display=="none"){
next=next.nextSibling;
}
if(!next){
this.selectFirstNode();
}else{
this._setSelectedAttr(next);
}
}
},selectPreviousNode:function(){
var _92c=this.selected;
if(!_92c){
this.selectLastNode();
}else{
var prev=_92c.previousSibling;
while(prev&&prev.style.display=="none"){
prev=prev.previousSibling;
}
if(!prev){
this.selectLastNode();
}else{
this._setSelectedAttr(prev);
}
}
},_setSelectedAttr:function(node){
if(this.selected!=node){
var _92d=this.selected;
if(_92d){
this.onDeselect(_92d);
this.selected=null;
}
if(node){
this.selected=node;
_924.scrollIntoView(node);
this.onSelect(node);
}
}else{
if(node){
this.onSelect(node);
}
}
}});
});
},"dojo/DeferredList":function(){
define(["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_92e,_92f){
dojo.DeferredList=function(list,_930,_931,_932,_933){
var _934=[];
_92e.call(this);
var self=this;
if(list.length===0&&!_930){
this.resolve([0,[]]);
}
var _935=0;
_92f.forEach(list,function(item,i){
item.then(function(_936){
if(_930){
self.resolve([i,_936]);
}else{
_937(true,_936);
}
},function(_938){
if(_931){
self.reject(_938);
}else{
_937(false,_938);
}
if(_932){
return null;
}
throw _938;
});
function _937(_939,_93a){
_934[i]=[_939,_93a];
_935++;
if(_935===list.length){
self.resolve(_934);
}
};
});
};
dojo.DeferredList.prototype=new _92e();
dojo.DeferredList.prototype.gatherResults=function(_93b){
var d=new dojo.DeferredList(_93b,false,true,false);
d.addCallback(function(_93c){
var ret=[];
_92f.forEach(_93c,function(_93d){
ret.push(_93d[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
});
},"dojo/dnd/common":function(){
define(["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_93e,_93f,lang,dom){
var _940={};
_940.getCopyKeyState=_93e.isCopyKey;
_940._uniqueId=0;
_940.getUniqueId=function(){
var id;
do{
id=_93f._scopeName+"Unique"+(++_940._uniqueId);
}while(dom.byId(id));
return id;
};
_940._empty={};
_940.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
lang.mixin(lang.getObject("dojo.dnd",true),_940);
return _940;
});
},"dijit/CalendarLite":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/cldr/supplemental","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/dom","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/sniff","dojo/string","./_WidgetBase","./_TemplatedMixin","dojo/text!./templates/Calendar.html","./hccss"],function(_941,_942,_943,date,_944,_945,dom,_946,_947,lang,has,_948,_949,_94a,_94b){
var _94c=_942("dijit.CalendarLite",[_949,_94a],{templateString:_94b,dowTemplateString:"<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",dateTemplateString:"<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",weekTemplateString:"<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",_isValidDate:function(_94d){
return _94d&&!isNaN(_94d)&&typeof _94d=="object"&&_94d.toString()!=this.constructor.prototype.value.toString();
},_getValueAttr:function(){
if(this.value&&!isNaN(this.value)){
var _94e=new this.dateClassObj(this.value);
_94e.setHours(0,0,0,0);
if(_94e.getDate()<this.value.getDate()){
_94e=this.dateModule.add(_94e,"hour",1);
}
return _94e;
}else{
return null;
}
},_setValueAttr:function(_94f,_950){
if(typeof _94f=="string"){
_94f=_945.fromISOString(_94f);
}
_94f=this._patchDate(_94f);
if(this._isValidDate(_94f)&&!this.isDisabledDate(_94f,this.lang)){
this._set("value",_94f);
this.set("currentFocus",_94f);
this._markSelectedDates([_94f]);
if(this._created&&(_950||typeof _950=="undefined")){
this.onChange(this.get("value"));
}
}else{
this._set("value",null);
this._markSelectedDates([]);
}
},_patchDate:function(_951){
if(_951){
_951=new this.dateClassObj(_951);
_951.setHours(1,0,0,0);
}
return _951;
},_setText:function(node,text){
while(node.firstChild){
node.removeChild(node.firstChild);
}
node.appendChild(node.ownerDocument.createTextNode(text));
},_populateGrid:function(){
var _952=new this.dateClassObj(this.currentFocus);
_952.setDate(1);
var _953=_952.getDay(),_954=this.dateModule.getDaysInMonth(_952),_955=this.dateModule.getDaysInMonth(this.dateModule.add(_952,"month",-1)),_956=new this.dateClassObj(),_957=_943.getFirstDayOfWeek(this.lang);
if(_957>_953){
_957-=7;
}
this._date2cell={};
_941.forEach(this.dateCells,function(_958,idx){
var i=idx+_957;
var date=new this.dateClassObj(_952),_959,_95a="dijitCalendar",adj=0;
if(i<_953){
_959=_955-_953+i+1;
adj=-1;
_95a+="Previous";
}else{
if(i>=(_953+_954)){
_959=i-_953-_954+1;
adj=1;
_95a+="Next";
}else{
_959=i-_953+1;
_95a+="Current";
}
}
if(adj){
date=this.dateModule.add(date,"month",adj);
}
date.setDate(_959);
if(!this.dateModule.compare(date,_956,"date")){
_95a="dijitCalendarCurrentDate "+_95a;
}
if(this.isDisabledDate(date,this.lang)){
_95a="dijitCalendarDisabledDate "+_95a;
_958.setAttribute("aria-disabled","true");
}else{
_95a="dijitCalendarEnabledDate "+_95a;
_958.removeAttribute("aria-disabled");
_958.setAttribute("aria-selected","false");
}
var _95b=this.getClassForDate(date,this.lang);
if(_95b){
_95a=_95b+" "+_95a;
}
_958.className=_95a+"Month dijitCalendarDateTemplate";
var _95c=date.valueOf();
this._date2cell[_95c]=_958;
_958.dijitDateValue=_95c;
this._setText(this.dateLabels[idx],date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate());
},this);
},_populateControls:function(){
var _95d=new this.dateClassObj(this.currentFocus);
_95d.setDate(1);
this.monthWidget.set("month",_95d);
var y=_95d.getFullYear()-1;
var d=new this.dateClassObj();
_941.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(_95e){
this.dateModule=_95e.datePackage?lang.getObject(_95e.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_95e.datePackage?lang.getObject(_95e.datePackage+".locale",false):_944;
},_createMonthWidget:function(){
return _94c._MonthWidget({id:this.id+"_mw",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},buildRendering:function(){
var d=this.dowTemplateString,_95f=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),_960=_943.getFirstDayOfWeek(this.lang);
this.dayCellsHtml=_948.substitute([d,d,d,d,d,d,d].join(""),{d:""},function(){
return _95f[_960++%7];
});
var r=_948.substitute(this.weekTemplateString,{d:this.dateTemplateString});
this.dateRowsHtml=[r,r,r,r,r,r].join("");
this.dateCells=[];
this.dateLabels=[];
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
var _961=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();
this.set("currentFocus",_961,false);
},postCreate:function(){
this.inherited(arguments);
this._connectControls();
},_connectControls:function(){
var _962=lang.hitch(this,function(_963,part,_964){
this.connect(this[_963],"onclick",function(){
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,part,_964));
});
});
_962("incrementMonth","month",1);
_962("decrementMonth","month",-1);
_962("nextYearLabelNode","year",1);
_962("previousYearLabelNode","year",-1);
},_setCurrentFocusAttr:function(date,_965){
var _966=this.currentFocus,_967=this._getNodeByDate(_966);
date=this._patchDate(date);
this._set("currentFocus",date);
if(!this._date2cell||this.dateModule.difference(_966,date,"month")!=0){
this._populateGrid();
this._populateControls();
this._markSelectedDates([this.value]);
}
var _968=this._getNodeByDate(date);
_968.setAttribute("tabIndex",this.tabIndex);
if(this.focused||_965){
_968.focus();
}
if(_967&&_967!=_968){
if(has("webkit")){
_967.setAttribute("tabIndex","-1");
}else{
_967.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onDayClick:function(evt){
_947.stop(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!_946.contains(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_getNodeByDate:function(_969){
_969=this._patchDate(_969);
return _969&&this._date2cell?this._date2cell[_969.valueOf()]:null;
},_markSelectedDates:function(_96a){
function mark(_96b,cell){
_946.toggle(cell,"dijitCalendarSelectedDate",_96b);
cell.setAttribute("aria-selected",_96b?"true":"false");
};
_941.forEach(this._selectedCells||[],lang.partial(mark,false));
this._selectedCells=_941.filter(_941.map(_96a,this._getNodeByDate,this),function(n){
return n;
});
_941.forEach(this._selectedCells,lang.partial(mark,true));
},onChange:function(){
},isDisabledDate:function(){
},getClassForDate:function(){
}});
_94c._MonthWidget=_942("dijit.CalendarLite._MonthWidget",_949,{_setMonthAttr:function(_96c){
var _96d=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_96c),_96e=(has("ie")==6?"":"<div class='dijitSpacer'>"+_941.map(_96d,function(s){
return "<div>"+s+"</div>";
}).join("")+"</div>");
this.domNode.innerHTML=_96e+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_96d[_96c.getMonth()]+"</div>";
}});
return _94c;
});
},"dijit/CheckedMenuItem":function(){
require({cache:{"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"}});
define("dijit/CheckedMenuItem",["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_96f,_970,_971,_972){
return _96f("dijit.CheckedMenuItem",_971,{templateString:_972,checked:false,_setCheckedAttr:function(_973){
_970.toggle(this.domNode,"dijitCheckedMenuItemChecked",_973);
this.domNode.setAttribute("aria-checked",_973?"true":"false");
this._set("checked",_973);
},iconClass:"",onChange:function(){
},_onClick:function(evt){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.onClick(evt);
}});
});
},"dijit/form/VerticalRuleLabels":function(){
define(["dojo/_base/declare","./HorizontalRuleLabels"],function(_974,_975){
return _974("dijit.form.VerticalRuleLabels",_975,{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerV dijitRuleLabelsContainer dijitRuleLabelsContainerV\"></div>",_positionPrefix:"<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerV\" style=\"top:",_labelPrefix:"\"><span class=\"dijitRuleLabel dijitRuleLabelV\">",_calcPosition:function(pos){
return 100-pos;
},_isHorizontal:false});
});
},"dijit/Declaration":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/parser","dojo/query","./_Widget","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/NodeList-dom"],function(_976,_977,_978,lang,_979,_97a,_97b,_97c,_97d){
return _978("dijit.Declaration",_97b,{_noScript:true,stopParser:true,widgetClass:"",defaults:null,mixins:[],buildRendering:function(){
var src=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef),_97e=_97a("> script[type^='dojo/method']",src).orphan(),_97f=_97a("> script[type^='dojo/connect']",src).orphan(),_980=src.nodeName;
var _981=this.defaults||{};
_976.forEach(_97e,function(s){
var evt=s.getAttribute("event")||s.getAttribute("data-dojo-event"),func=_979._functionFromScript(s);
if(evt){
_981[evt]=func;
}else{
_97f.push(s);
}
});
if(this.mixins.length){
this.mixins=_976.map(this.mixins,function(name){
return lang.getObject(name);
});
}else{
this.mixins=[_97b,_97c,_97d];
}
_981._skipNodeCache=true;
_981.templateString="<"+_980+" class='"+src.className+"'"+" data-dojo-attach-point='"+(src.getAttribute("data-dojo-attach-point")||src.getAttribute("dojoAttachPoint")||"")+"' data-dojo-attach-event='"+(src.getAttribute("data-dojo-attach-event")||src.getAttribute("dojoAttachEvent")||"")+"' >"+src.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+_980+">";
var wc=_978(this.widgetClass,this.mixins,_981);
_976.forEach(_97f,function(s){
var evt=s.getAttribute("event")||s.getAttribute("data-dojo-event")||"postscript",func=_979._functionFromScript(s);
_977.connect(wc.prototype,evt,func);
});
}});
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_982,dom,_983,_984,_985,_986){
return _982("dijit.MenuSeparator",[_983,_984,_985],{templateString:_986,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_987,_988,_989,keys,_98a,_98b,_98c,_98d){
return _987("dijit.form._ComboBoxMenu",[_98a,_98b,_98d,_98c],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_988.add(this.previousButton,"dijitMenuItemRtl");
_988.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
var item=this.ownerDocument.createElement("div");
item.className="dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl");
item.setAttribute("role","option");
return item;
},onHover:function(node){
_988.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_988.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_988.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_988.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _98e=0;
var _98f=this.domNode.scrollTop;
var _990=_989.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_98e<_990){
var _991=this.getHighlightedOption();
if(up){
if(!_991.previousSibling||_991.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_991.nextSibling||_991.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _992=this.domNode.scrollTop;
_98e+=(_992-_98f)*(up?-1:1);
_98f=_992;
}
},handleKey:function(evt){
switch(evt.keyCode){
case keys.DOWN_ARROW:
this.selectNextNode();
return false;
case keys.PAGE_DOWN:
this._page(false);
return false;
case keys.UP_ARROW:
this.selectPreviousNode();
return false;
case keys.PAGE_UP:
this._page(true);
return false;
default:
return true;
}
}});
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\"\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>","dijit/Dialog":function(){
require({cache:{"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog",["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html","./main","dojo/i18n!./nls/common"],function(_993,_994,_995,_996,_997,dom,_998,_999,_99a,_99b,fx,i18n,keys,lang,on,_99c,has,_99d,_99e,_99f,_9a0,_9a1,_9a2,_9a3,_9a4,_9a5,_9a6,_9a7,_9a8,_9a9,_9aa){
var _9ab=_996("dijit._DialogBase",[_9a3,_9a5,_9a6,_9a4],{templateString:_9a9,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_9a1.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_setDraggableAttr:function(val){
this._set("draggable",val);
},"aria-describedby":"",maxRatio:0.9,postMixInProperties:function(){
var _9ac=i18n.getLocalization("dijit","common");
lang.mixin(this,_9ac);
this.inherited(arguments);
},postCreate:function(){
_99a.set(this.domNode,{display:"none",position:"absolute"});
this.ownerDocumentBody.appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_9ad.isTop(this)){
this._getFocusItems(this.domNode);
_9a0.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _9ae=_999.position(this.domNode),_9af=_99d.getBox(this.ownerDocument);
_9ae.y=Math.min(Math.max(_9ae.y,0),(_9af.h-_9ae.h));
_9ae.x=Math.min(Math.max(_9ae.x,0),(_9af.w-_9ae.w));
this._relativePosition=_9ae;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_99f:_99e)(node,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_998.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_994.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" "),ownerDocument:this.ownerDocument};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(typeof this._singleChildOriginalStyle!="undefined"){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
delete this._singleChildOriginalStyle;
}
}else{
_99a.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_999.position(this.domNode);
var _9b0=_99d.getBox(this.ownerDocument);
_9b0.w*=this.maxRatio;
_9b0.h*=this.maxRatio;
if(bb.w>=_9b0.w||bb.h>=_9b0.h){
var _9b1=_999.position(this.containerNode),w=Math.min(bb.w,_9b0.w)-(bb.w-_9b1.w),h=Math.min(bb.h,_9b0.h)-(bb.h-_9b1.h);
if(this._singleChild&&this._singleChild.resize){
if(typeof this._singleChildOriginalStyle=="undefined"){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
}
this._singleChild.resize({w:w,h:h});
}else{
_99a.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_998.contains(this.ownerDocumentBody,"dojoMove")){
var node=this.domNode,_9b2=_99d.getBox(this.ownerDocument),p=this._relativePosition,bb=p?null:_999.position(node),l=Math.floor(_9b2.l+(p?p.x:(_9b2.w-bb.w)/2)),t=Math.floor(_9b2.t+(p?p.y:(_9b2.h-bb.h)/2));
_99a.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _9b3=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_9b3){
_9a0.focus(this._lastFocusItem);
}
_99b.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_9b3){
_9a0.focus(this._firstFocusItem);
}
_99b.stop(evt);
}else{
while(node){
if(node==this.domNode||_998.contains(node,"dijitPopup")){
if(evt.charOrCode==keys.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==keys.TAB){
_99b.stop(evt);
}else{
if(!has("opera")){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
var win=_99d.get(this.ownerDocument);
this._modalconnects.push(on(win,"scroll",lang.hitch(this,"resize")));
this._modalconnects.push(on(this.domNode,_995._keypress,lang.hitch(this,"_onKey")));
_99a.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _9b4;
this._fadeInDeferred=new _997(lang.hitch(this,function(){
_9b4.stop();
delete this._fadeInDeferred;
}));
_9b4=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_9ad.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_9ad.isTop(this)){
this._getFocusItems(this.domNode);
_9a0.focus(this._firstFocusItem);
}
this._fadeInDeferred.resolve(true);
delete this._fadeInDeferred;
})}).play();
return this._fadeInDeferred;
},hide:function(){
if(!this._alreadyInitialized||!this.open){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _9b5;
this._fadeOutDeferred=new _997(lang.hitch(this,function(){
_9b5.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
_9b5=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_9ad.hide(this);
this._fadeOutDeferred.resolve(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},resize:function(){
if(this.domNode.style.display!="none"){
if(_9a7._singleton){
_9a7._singleton.layout();
}
this._position();
this._size();
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
_9ad.hide(this);
this.inherited(arguments);
}});
var _9b6=_996("dijit.Dialog",[_9a8,_9ab],{});
_9b6._DialogBase=_9ab;
var _9ad=_9b6._DialogLevelManager={_beginZIndex:950,show:function(_9b7,_9b8){
ds[ds.length-1].focus=_9a0.curNode;
var _9b9=_9a7._singleton;
if(!_9b9||_9b9._destroyed){
_9b9=_9aa._underlay=_9a7._singleton=new _9a7(_9b8);
}else{
_9b9.set(_9b7.underlayAttrs);
}
var _9ba=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_9b6._DialogLevelManager._beginZIndex;
if(ds.length==1){
_9b9.show();
}
_99a.set(_9a7._singleton.domNode,"zIndex",_9ba-1);
_99a.set(_9b7.domNode,"zIndex",_9ba);
ds.push({dialog:_9b7,underlayAttrs:_9b8,zIndex:_9ba});
},hide:function(_9bb){
if(ds[ds.length-1].dialog==_9bb){
ds.pop();
var pd=ds[ds.length-1];
if(!_9a7._singleton._destroyed){
if(ds.length==1){
_9a7._singleton.hide();
}else{
_99a.set(_9a7._singleton.domNode,"zIndex",pd.zIndex-1);
_9a7._singleton.set(pd.underlayAttrs);
}
}
if(_9bb.refocus){
var _9bc=pd.focus;
if(pd.dialog&&(!_9bc||!dom.isDescendant(_9bc,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_9bc=pd.dialog._firstFocusItem;
}
if(_9bc){
try{
_9bc.focus();
}
catch(e){
}
}
}
}else{
var idx=_994.indexOf(_994.map(ds,function(elem){
return elem.dialog;
}),_9bb);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_9bd){
return ds[ds.length-1].dialog==_9bd;
}};
var ds=_9b6._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(has("dijit-legacy-requires")){
_99c(0,function(){
var _9be=["dijit/TooltipDialog"];
_993(_9be);
});
}
return _9b6;
});
},"dijit/form/MultiSelect":function(){
define("dijit/form/MultiSelect",["dojo/_base/array","dojo/_base/declare","dojo/dom-geometry","dojo/query","./_FormValueWidget"],function(_9bf,_9c0,_9c1,_9c2,_9c3){
return _9c0("dijit.form.MultiSelect",_9c3,{size:7,templateString:"<select multiple='true' ${!nameAttrSetting} data-dojo-attach-point='containerNode,focusNode' data-dojo-attach-event='onchange: _onChange'></select>",addSelected:function(_9c4){
_9c4.getSelected().forEach(function(n){
if(this.restoreOriginalText){
n.text=this.enforceTextDirWithUcc(this.restoreOriginalText(n),n.text);
}
this.containerNode.appendChild(n);
this.domNode.scrollTop=this.domNode.offsetHeight;
var _9c5=_9c4.domNode.scrollTop;
_9c4.domNode.scrollTop=0;
_9c4.domNode.scrollTop=_9c5;
},this);
this._set("value",this.get("value"));
},getSelected:function(){
return _9c2("option",this.containerNode).filter(function(n){
return n.selected;
});
},_getValueAttr:function(){
return _9bf.map(this.getSelected(),function(n){
return n.value;
});
},multiple:true,_setValueAttr:function(_9c6,_9c7){
_9c2("option",this.containerNode).forEach(function(n){
n.selected=(_9bf.indexOf(_9c6,n.value)!=-1);
});
this.inherited(arguments);
},invertSelection:function(_9c8){
var val=[];
_9c2("option",this.containerNode).forEach(function(n){
if(!n.selected){
val.push(n.value);
}
});
this._setValueAttr(val,!(_9c8===false||_9c8==null));
},_onChange:function(){
this._handleOnChange(this.get("value"),true);
},resize:function(size){
if(size){
_9c1.setMarginBox(this.domNode,size);
}
},postCreate:function(){
this._set("value",this.get("value"));
this.inherited(arguments);
},_setTextDirAttr:function(_9c9){
if((this.textDir!=_9c9||!this._created)&&this.enforceTextDirWithUcc){
this._set("textDir",_9c9);
_9c2("option",this.containerNode).forEach(function(_9ca){
if(!this._created&&_9ca.value===_9ca.text){
_9ca.value=_9ca.text;
}
_9ca.text=this.enforceTextDirWithUcc(_9ca,_9ca.originalText||_9ca.text);
},this);
}
}});
});
},"dijit/form/_DateTimeTextBox":function(){
define(["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(date,_9cb,_9cc,_9cd,lang,_9ce,_9cf,_9d0){
new Date("X");
var _9d1=_9cd("dijit.form._DateTimeTextBox",[_9ce,_9cf],{templateString:_9d0,hasDownArrow:true,cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},pattern:_9cb.regexp,datePackage:"",postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},compare:function(val1,val2){
var _9d2=this._isInvalidDate(val1);
var _9d3=this._isInvalidDate(val2);
return _9d2?(_9d3?0:-1):(_9d3?1:date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_9d4,_9d5){
if(!_9d4){
return "";
}
return this.dateLocaleModule.format(_9d4,_9d5);
},"parse":function(_9d6,_9d7){
return this.dateLocaleModule.parse(_9d6,_9d7)||(this._isEmpty(_9d6)?null:undefined);
},serialize:function(val,_9d8){
if(val.toGregorian){
val=val.toGregorian();
}
return _9cc.toISOString(val,_9d8);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_9d9){
this.dateModule=_9d9.datePackage?lang.getObject(_9d9.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_9d9.datePackage?lang.getObject(_9d9.datePackage+".locale",false):_9cb;
this._set("pattern",this.dateLocaleModule.regexp);
this._invalidDate=this.constructor.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_9da){
_9da.selector=this._selector;
_9da.fullYear=true;
var _9db=_9cc.fromISOString;
if(typeof _9da.min=="string"){
_9da.min=_9db(_9da.min);
}
if(typeof _9da.max=="string"){
_9da.max=_9db(_9da.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_9dc){
return !_9dc||isNaN(_9dc)||typeof _9dc!="object"||_9dc.toString()==this._invalidDate;
},_setValueAttr:function(_9dd,_9de,_9df){
if(_9dd!==undefined){
if(typeof _9dd=="string"){
_9dd=_9cc.fromISOString(_9dd);
}
if(this._isInvalidDate(_9dd)){
_9dd=null;
}
if(_9dd instanceof Date&&!(this.dateClassObj instanceof Date)){
_9dd=new this.dateClassObj(_9dd);
}
}
this.inherited(arguments);
if(this.value instanceof Date){
this.filterString="";
}
if(this.dropDown){
this.dropDown.set("value",_9dd,false);
}
},_set:function(attr,_9e0){
if(attr=="value"&&this.value instanceof Date&&this.compare(_9e0,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_9e1){
if(this.dropDown){
this.dropDown.destroy();
}
var _9e2=lang.isString(this.popupClass)?lang.getObject(this.popupClass,false):this.popupClass,_9e3=this,_9e4=this.get("value");
this.dropDown=new _9e2({onChange:function(_9e5){
_9e3.set("value",_9e5,true);
},id:this.id+"_popup",dir:_9e3.dir,lang:_9e3.lang,value:_9e4,currentFocus:!this._isInvalidDate(_9e4)?_9e4:this.dropDownDefaultValue,constraints:_9e3.constraints,filterString:_9e3.filterString,datePackage:_9e3.params.datePackage,isDisabledDate:function(date){
return !_9e3.rangeCheck(date,_9e3.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_9e6,_9e7){
this._setValueAttr(this.parse(_9e6,this.constraints),_9e7,_9e6);
}});
return _9d1;
});
},"dijit/form/_ToggleButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_9e8,_9e9){
return _9e8("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _9ea=this.checked;
this._set("checked",!_9ea);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_9ea);
return ret;
},_setCheckedAttr:function(_9eb,_9ec){
this._set("checked",_9eb);
_9e9.set(this.focusNode||this.domNode,"checked",_9eb);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_9eb?"true":"false");
this._handleOnChange(_9eb,_9ec);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/Calendar":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","./CalendarLite","./_Widget","./_CssStateMixin","./_TemplatedMixin","./form/DropDownButton"],function(_9ed,date,_9ee,_9ef,_9f0,_9f1,_9f2,_9f3,keys,lang,has,_9f4,_9f5,_9f6,_9f7,_9f8){
var _9f9=_9ef("dijit.Calendar",[_9f4,_9f5,_9f6],{cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},setValue:function(_9fa){
_9f3.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_9fa);
},_createMonthWidget:function(){
return new _9f9._MonthDropDownButton({id:this.id+"_mddb",tabIndex:-1,onMonthSelect:lang.hitch(this,"_onMonthSelect"),lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeydown","_onKeyDown");
this.connect(this.dateRowsNode,"onmouseover","_onDayMouseOver");
this.connect(this.dateRowsNode,"onmouseout","_onDayMouseOut");
this.connect(this.dateRowsNode,"onmousedown","_onDayMouseDown");
this.connect(this.dateRowsNode,"onmouseup","_onDayMouseUp");
},_onMonthSelect:function(_9fb){
var date=new this.dateClassObj(this.currentFocus);
date.setDate(1);
date.setMonth(_9fb);
var _9fc=this.dateModule.getDaysInMonth(date);
var _9fd=this.currentFocus.getDate();
date.setDate(Math.min(_9fd,_9fc));
this._setCurrentFocusAttr(date);
},_onDayMouseOver:function(evt){
var node=_9f1.contains(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&((node.dijitDateValue&&!_9f1.contains(node,"dijitCalendarDisabledDate"))||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
_9f1.add(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(_9f1.contains(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
_9f1.remove(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue&&!_9f1.contains(node,"dijitCalendarDisabledDate")){
_9f1.add(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
_9f1.remove(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var _9fe=-1,_9ff,_a00=this.currentFocus;
switch(evt.keyCode){
case keys.RIGHT_ARROW:
_9fe=1;
case keys.LEFT_ARROW:
_9ff="day";
if(!this.isLeftToRight()){
_9fe*=-1;
}
break;
case keys.DOWN_ARROW:
_9fe=1;
case keys.UP_ARROW:
_9ff="week";
break;
case keys.PAGE_DOWN:
_9fe=1;
case keys.PAGE_UP:
_9ff=evt.ctrlKey||evt.altKey?"year":"month";
break;
case keys.END:
_a00=this.dateModule.add(_a00,"month",1);
_9ff="day";
case keys.HOME:
_a00=new this.dateClassObj(_a00);
_a00.setDate(1);
break;
case keys.ENTER:
case keys.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_9ff){
_a00=this.dateModule.add(_a00,_9ff,_9fe);
}
this._setCurrentFocusAttr(_a00);
return false;
},_onKeyDown:function(evt){
if(!this.handleKey(evt)){
_9f2.stop(evt);
}
},onValueSelected:function(){
},onChange:function(_a01){
this.onValueSelected(_a01);
},getClassForDate:function(){
}});
_9f9._MonthDropDownButton=_9ef("dijit.Calendar._MonthDropDownButton",_9f8,{onMonthSelect:function(){
},postCreate:function(){
this.inherited(arguments);
this.dropDown=new _9f9._MonthDropDown({id:this.id+"_mdd",onChange:this.onMonthSelect});
},_setMonthAttr:function(_a02){
var _a03=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_a02);
this.dropDown.set("months",_a03);
this.containerNode.innerHTML=(has("ie")==6?"":"<div class='dijitSpacer'>"+this.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_a03[_a02.getMonth()]+"</div>";
}});
_9f9._MonthDropDown=_9ef("dijit.Calendar._MonthDropDown",[_9f5,_9f7],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_a04){
this.domNode.innerHTML=_9ed.map(_a04,function(_a05,idx){
return _a05?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_a05+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(_9f0.get(evt.target,"month"));
},onChange:function(){
},_onMenuHover:function(evt){
_9f1.toggle(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
return _9f9;
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n","dijit/_editor/selection":function(){
define(["dojo/dom","dojo/_base/lang","dojo/sniff","dojo/_base/window","../main"],function(dom,lang,has,win,_a06){
var _a07={getType:function(){
if(win.doc.getSelection){
var _a08="text";
var oSel;
try{
oSel=win.global.getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _a09=oSel.getRangeAt(0);
if((_a09.startContainer==_a09.endContainer)&&((_a09.endOffset-_a09.startOffset)==1)&&(_a09.startContainer.nodeType!=3)){
_a08="control";
}
}
return _a08;
}else{
return win.doc.selection.type.toLowerCase();
}
},getSelectedText:function(){
if(win.doc.getSelection){
var _a0a=win.global.getSelection();
return _a0a?_a0a.toString():"";
}else{
if(_a06._editor.selection.getType()=="control"){
return null;
}
return win.doc.selection.createRange().text;
}
},getSelectedHtml:function(){
if(win.doc.getSelection){
var _a0b=win.global.getSelection();
if(_a0b&&_a0b.rangeCount){
var i;
var html="";
for(i=0;i<_a0b.rangeCount;i++){
var frag=_a0b.getRangeAt(i).cloneContents();
var div=win.doc.createElement("div");
div.appendChild(frag);
html+=div.innerHTML;
}
return html;
}
return null;
}else{
if(_a06._editor.selection.getType()=="control"){
return null;
}
return win.doc.selection.createRange().htmlText;
}
},getSelectedElement:function(){
if(_a06._editor.selection.getType()=="control"){
if(win.doc.getSelection){
var _a0c=win.global.getSelection();
return _a0c.anchorNode.childNodes[_a0c.anchorOffset];
}else{
var _a0d=win.doc.selection.createRange();
if(_a0d&&_a0d.item){
return win.doc.selection.createRange().item(0);
}
}
}
return null;
},getParentElement:function(){
if(_a06._editor.selection.getType()=="control"){
var p=this.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(win.doc.getSelection){
var _a0e=win.global.getSelection();
if(_a0e){
var node=_a0e.anchorNode;
while(node&&(node.nodeType!=1)){
node=node.parentNode;
}
return node;
}
}else{
var r=win.doc.selection.createRange();
r.collapse(true);
return r.parentElement();
}
}
return null;
},hasAncestorElement:function(_a0f){
return this.getAncestorElement.apply(this,arguments)!=null;
},getAncestorElement:function(_a10){
var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments);
},isTag:function(node,tags){
if(node&&node.tagName){
var _a11=node.tagName.toLowerCase();
for(var i=0;i<tags.length;i++){
var _a12=String(tags[i]).toLowerCase();
if(_a11==_a12){
return _a12;
}
}
}
return "";
},getParentOfType:function(node,tags){
while(node){
if(this.isTag(node,tags).length){
return node;
}
node=node.parentNode;
}
return null;
},collapse:function(_a13){
if(win.doc.getSelection){
var _a14=win.global.getSelection();
if(_a14.removeAllRanges){
if(_a13){
_a14.collapseToStart();
}else{
_a14.collapseToEnd();
}
}else{
_a14.collapse(_a13);
}
}else{
var _a15=win.doc.selection.createRange();
_a15.collapse(_a13);
_a15.select();
}
},remove:function(){
var sel=win.doc.selection;
if(win.doc.getSelection){
sel=win.global.getSelection();
sel.deleteFromDocument();
return sel;
}else{
if(sel.type.toLowerCase()!="none"){
sel.clear();
}
return sel;
}
},selectElementChildren:function(_a16,_a17){
var doc=win.doc;
var _a18;
_a16=dom.byId(_a16);
if(win.doc.getSelection){
var _a19=win.global.getSelection();
if(has("opera")){
if(_a19.rangeCount){
_a18=_a19.getRangeAt(0);
}else{
_a18=doc.createRange();
}
_a18.setStart(_a16,0);
_a18.setEnd(_a16,(_a16.nodeType==3)?_a16.length:_a16.childNodes.length);
_a19.addRange(_a18);
}else{
_a19.selectAllChildren(_a16);
}
}else{
_a18=_a16.ownerDocument.body.createTextRange();
_a18.moveToElementText(_a16);
if(!_a17){
try{
_a18.select();
}
catch(e){
}
}
}
},selectElement:function(_a1a,_a1b){
var _a1c;
_a1a=dom.byId(_a1a);
var doc=_a1a.ownerDocument;
var _a1d=win.global;
if(doc.getSelection){
var _a1e=_a1d.getSelection();
_a1c=doc.createRange();
if(_a1e.removeAllRanges){
if(has("opera")){
if(_a1e.getRangeAt(0)){
_a1c=_a1e.getRangeAt(0);
}
}
_a1c.selectNode(_a1a);
_a1e.removeAllRanges();
_a1e.addRange(_a1c);
}
}else{
try{
var tg=_a1a.tagName?_a1a.tagName.toLowerCase():"";
if(tg==="img"||tg==="table"){
_a1c=win.body(doc).createControlRange();
}else{
_a1c=win.body(doc).createRange();
}
_a1c.addElement(_a1a);
if(!_a1b){
_a1c.select();
}
}
catch(e){
this.selectElementChildren(_a1a,_a1b);
}
}
},inSelection:function(node){
if(node){
var _a1f;
var doc=win.doc;
var _a20;
if(win.doc.getSelection){
var sel=win.global.getSelection();
if(sel&&sel.rangeCount>0){
_a20=sel.getRangeAt(0);
}
if(_a20&&_a20.compareBoundaryPoints&&doc.createRange){
try{
_a1f=doc.createRange();
_a1f.setStart(node,0);
if(_a20.compareBoundaryPoints(_a20.START_TO_END,_a1f)===1){
return true;
}
}
catch(e){
}
}
}else{
_a20=doc.selection.createRange();
try{
_a1f=node.ownerDocument.body.createControlRange();
if(_a1f){
_a1f.addElement(node);
}
}
catch(e1){
try{
_a1f=node.ownerDocument.body.createTextRange();
_a1f.moveToElementText(node);
}
catch(e2){
}
}
if(_a20&&_a1f){
if(_a20.compareEndPoints("EndToStart",_a1f)===1){
return true;
}
}
}
}
return false;
}};
lang.setObject("dijit._editor.selection",_a07);
return _a07;
});
},"dojo/fx":function(){
define(["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_a21,dojo,_a22,_a23,_a24,dom,_a25,geom,_a26,_a27){
if(!dojo.isAsync){
_a26(0,function(){
var _a28=["./fx/Toggler"];
_a27(_a28);
});
}
var _a29=dojo.fx={};
var _a2a={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _a2b=function(_a2c){
this._index=-1;
this._animations=_a2c||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_a22.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_a2b.prototype=new _a21();
lang.extend(_a2b,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_a23.disconnect(this._onAnimateCtx);
_a23.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_a23.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_a23.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_a2d,_a2e){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_a2e&&this._current.status()=="playing"){
return this;
}
var _a2f=_a23.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_a30=_a23.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_a31=_a23.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_a23.disconnect(_a2f);
_a23.disconnect(_a30);
_a23.disconnect(_a31);
});
if(this._onAnimateCtx){
_a23.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_a23.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_a23.disconnect(this._onEndCtx);
}
this._onEndCtx=_a23.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_a23.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_a23.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_a32,_a33){
this.pause();
var _a34=this.duration*_a32;
this._current=null;
_a22.some(this._animations,function(a){
if(a.duration<=_a34){
this._current=a;
return true;
}
_a34-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_a34/this._current.duration,_a33);
}
return this;
},stop:function(_a35){
if(this._current){
if(_a35){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_a23.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_a23.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_a23.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_a23.disconnect(this._onEndCtx);
}
}});
lang.extend(_a2b,_a2a);
_a29.chain=function(_a36){
return new _a2b(_a36);
};
var _a37=function(_a38){
this._animations=_a38||[];
this._connects=[];
this._finished=0;
this.duration=0;
_a22.forEach(_a38,function(a){
var _a39=a.duration;
if(a.delay){
_a39+=a.delay;
}
if(this.duration<_a39){
this.duration=_a39;
}
this._connects.push(_a23.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _a24.Animation({curve:[0,1],duration:this.duration});
var self=this;
_a22.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_a23.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_a37,{_doAction:function(_a3a,args){
_a22.forEach(this._animations,function(a){
a[_a3a].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_a3b,args){
var t=this._pseudoAnimation;
t[_a3b].apply(t,args);
},play:function(_a3c,_a3d){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_a3e,_a3f){
var ms=this.duration*_a3e;
_a22.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_a3f);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_a40){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_a22.forEach(this._connects,_a23.disconnect);
}});
lang.extend(_a37,_a2a);
_a29.combine=function(_a41){
return new _a37(_a41);
};
_a29.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_a24.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _a42=_a25.get(node,"height");
return Math.max(_a42,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_a23.connect(anim,"onStop",fini);
_a23.connect(anim,"onEnd",fini);
return anim;
};
_a29.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_a24.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_a23.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_a23.connect(anim,"onStop",fini);
_a23.connect(anim,"onEnd",fini);
return anim;
};
_a29.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_a25.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_a24.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_a23.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _a29;
});
},"dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_a43,a11y){
return _a43("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _a44=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_a44.lowest||_a44.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_a44.last||_a44.highest||this._firstFocusItem;
}});
});
},"dijit/Tree":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/errors/create","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","dojo/touch","dojo/when","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(_a45,_a46,_a47,_a48,_a49,_a4a,dom,_a4b,_a4c,_a4d,_a4e,_a4f,_a50,_a51,keys,lang,on,_a52,_a53,when,_a54,_a55,_a56,_a57,_a58,_a59,_a5a,_a5b,_a5c,_a5d,_a5e,_a5f,_a60){
_a49=_a48(_a49,{addCallback:function(_a61){
this.then(_a61);
},addErrback:function(_a62){
this.then(null,_a62);
}});
var _a63=_a48("dijit._TreeNode",[_a57,_a58,_a59,_a5a,_a5b],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_a5c,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_a64){
var _a65=(Math.max(_a64,0)*this.tree._nodePixelIndent)+"px";
_a4d.set(this.domNode,"backgroundPosition",_a65+" 0px");
_a4d.set(this.indentNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_a65);
_a45.forEach(this.getChildren(),function(_a66){
_a66.set("indent",_a64+1);
});
this._set("indent",_a64);
},markProcessing:function(){
this.state="LOADING";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,_a67=tree.model;
if(tree._v10Compat&&item===_a67.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
this.tree._startPaint(true);
},_applyClassAndStyle:function(item,_a68,_a69){
var _a6a="_"+_a68+"Class";
var _a6b=_a68+"Node";
var _a6c=this[_a6a];
this[_a6a]=this.tree["get"+_a69+"Class"](item,this.isExpanded);
_a4b.replace(this[_a6b],this[_a6a]||"",_a6c||"");
_a4d.set(this[_a6b],this.tree["get"+_a69+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _a6d=this.getParent();
if(!_a6d||!_a6d.rowNode||_a6d.rowNode.style.display=="none"){
_a4b.add(this.domNode,"dijitTreeIsRoot");
}else{
_a4b.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_a6e){
var _a6f=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_a70=["*","-","+","*"],idx=_a6e?0:(this.isExpandable?(this.isExpanded?1:2):3);
_a4b.replace(this.expandoNode,_a6f[idx],_a6f);
this.expandoNodeText.innerHTML=_a70[idx];
},expand:function(){
if(this._expandDeferred){
return this._expandDeferred;
}
if(this._collapseDeferred){
this._collapseDeferred.cancel();
delete this._collapseDeferred;
}
this.isExpanded=true;
this.labelNode.setAttribute("aria-expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
this.containerNode.setAttribute("role","group");
}
_a4b.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_a71=_a50.wipeIn({node:this.containerNode,duration:_a56.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._expandDeferred=new _a49(function(){
_a71.stop();
}));
_a71.play();
return def;
},collapse:function(){
if(this._collapseDeferred){
return this._collapseDeferred;
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
this.labelNode.setAttribute("aria-expanded","false");
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","false");
}
_a4b.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
var def,_a72=_a50.wipeOut({node:this.containerNode,duration:_a56.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._collapseDeferred=new _a49(function(){
_a72.stop();
}));
_a72.play();
return def;
},indent:0,setChildItems:function(_a73){
var tree=this.tree,_a74=tree.model,defs=[];
var _a75=this.getChildren();
_a45.forEach(_a75,function(_a76){
_a59.prototype.removeChild.call(this,_a76);
},this);
this.defer(function(){
_a45.forEach(_a75,function(node){
if(!node._destroyed&&!node.getParent()){
tree.dndController.removeTreeNode(node);
var id=_a74.getIdentity(node.item),ary=tree._itemNodesMap[id];
if(ary.length==1){
delete tree._itemNodesMap[id];
}else{
var _a77=_a45.indexOf(ary,node);
if(_a77!=-1){
ary.splice(_a77,1);
}
}
node.destroyRecursive();
}
});
});
this.state="LOADED";
if(_a73&&_a73.length>0){
this.isExpandable=true;
_a45.forEach(_a73,function(item){
var id=_a74.getIdentity(item),_a78=tree._itemNodesMap[id],node;
if(_a78){
for(var i=0;i<_a78.length;i++){
if(_a78[i]&&!_a78[i].getParent()){
node=_a78[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:_a74.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),ownerDocument:tree.ownerDocument,dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_a78){
_a78.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(node)){
defs.push(tree._expandNode(node));
}
},this);
_a45.forEach(this.getChildren(),function(_a79){
_a79._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
if(this==tree.rootNode){
var fc=this.tree.showRoot?this:this.getChildren()[0];
if(fc){
fc.setFocusable(true);
tree.lastFocused=fc;
}else{
tree.domNode.setAttribute("tabIndex","0");
}
}
var def=new _a4a(defs);
this.tree._startPaint(def);
return def;
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _a7a=this.getChildren();
if(_a7a.length==0){
this.isExpandable=false;
this.collapse();
}
_a45.forEach(_a7a,function(_a7b){
_a7b._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},setSelected:function(_a7c){
this.labelNode.setAttribute("aria-selected",_a7c?"true":"false");
_a4b.toggle(this.rowNode,"dijitTreeRowSelected",_a7c);
},setFocusable:function(_a7d){
this.labelNode.setAttribute("tabIndex",_a7d?"0":"-1");
},_setTextDirAttr:function(_a7e){
if(_a7e&&((this.textDir!=_a7e)||!this._created)){
this._set("textDir",_a7e);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
_a45.forEach(this.getChildren(),function(_a7f){
_a7f.set("textDir",_a7e);
},this);
}
}});
var Tree=_a48("dijit.Tree",[_a57,_a58],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_a5d,persist:true,autoExpand:false,dndController:_a60,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_a80,_a81){
_a52.publish(this.id,lang.mixin({tree:this,event:_a80},_a81||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this.expandChildrenDeferred=new _a49();
this.pendingCommandsDeferred=this.expandChildrenDeferred;
this.inherited(arguments);
},postCreate:function(){
this._initState();
var self=this;
this.own(on(this.domNode,on.selector(".dijitTreeNode",_a53.enter),function(evt){
self._onNodeMouseEnter(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode",_a53.leave),function(evt){
self._onNodeMouseLeave(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","click"),function(evt){
self._onClick(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","dblclick"),function(evt){
self._onDblClick(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keypress"),function(evt){
self._onKeyPress(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keydown"),function(evt){
self._onKeyDown(_a55.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeRow","focusin"),function(evt){
self._onNodeFocus(_a55.getEnclosingWidget(this),evt);
}));
if(!this.model){
this._store2model();
}
this.connect(this.model,"onChange","_onItemChange");
this.connect(this.model,"onChildrenChange","_onItemChildrenChange");
this.connect(this.model,"onDelete","_onItemDelete");
this.inherited(arguments);
if(this.dndController){
if(lang.isString(this.dndController)){
this.dndController=lang.getObject(this.dndController);
}
var _a82={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_a82[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_a82);
}
this._load();
if(!this.params.path&&!this.params.paths&&this.persist){
this.set("paths",this.dndController._getSavedPaths());
}
this.onLoadDeferred=this.pendingCommandsDeferred;
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
},_store2model:function(){
this._v10Compat=true;
_a51.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _a83={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_a83.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_a83.getChildren=lang.hitch(this,function(item,_a84,_a85){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_a84,_a85);
});
}
this.model=new _a5f(_a83);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(lang.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),textDir:this.textDir,indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
this.domNode.setAttribute("role","presentation");
this.domNode.removeAttribute("aria-expanded");
this.domNode.removeAttribute("aria-multiselectable");
rn.labelNode.setAttribute("role","presentation");
rn.containerNode.setAttribute("role","tree");
rn.containerNode.setAttribute("aria-expanded","true");
rn.containerNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}else{
this.domNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}
this.domNode.appendChild(rn.domNode);
var _a86=this.model.getIdentity(item);
if(this._itemNodesMap[_a86]){
this._itemNodesMap[_a86].push(rn);
}else{
this._itemNodesMap[_a86]=[rn];
}
rn._updateLayout();
this._expandNode(rn).then(lang.hitch(this,function(){
this.expandChildrenDeferred.resolve(true);
}));
}),lang.hitch(this,function(err){
console.error(this,": error loading root: ",err);
}));
},getNodesByItem:function(item){
if(!item){
return [];
}
var _a87=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_a87]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(_a88){
var tree=this;
return this.pendingCommandsDeferred=this.pendingCommandsDeferred.then(lang.hitch(this,function(){
var _a89=_a45.map(_a88,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var _a8a=[];
_a45.forEach(_a89,function(id){
_a8a=_a8a.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",_a8a);
}));
},_setPathAttr:function(path){
if(path.length){
return this.set("paths",[path]);
}else{
return this.set("paths",[]);
}
},_setPathsAttr:function(_a8b){
var tree=this;
return this.pendingCommandsDeferred=this.pendingCommandsDeferred.then(function(){
return new _a4a(_a45.map(_a8b,function(path){
var d=new _a49();
path=_a45.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
_a8c(path,[tree.rootNode],d);
}else{
d.reject(new Tree.PathError("Empty path"));
}
return d;
}));
}).then(_a8d);
function _a8c(path,_a8e,def){
var _a8f=path.shift();
var _a90=_a45.filter(_a8e,function(node){
return node.getIdentity()==_a8f;
})[0];
if(!!_a90){
if(path.length){
tree._expandNode(_a90).then(function(){
_a8c(path,_a90.getChildren(),def);
});
}else{
def.resolve(_a90);
}
}else{
def.reject(new Tree.PathError("Could not expand path at "+_a8f));
}
};
function _a8d(_a91){
tree.set("selectedNodes",_a45.map(_a45.filter(_a91,function(x){
return x[0];
}),function(x){
return x[1];
}));
};
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(_a92){
this.dndController.setSelection(_a92);
},expandAll:function(){
var _a93=this;
function _a94(node){
var def=new dojo.Deferred();
_a93._expandNode(node).then(function(){
var _a95=_a45.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=_a45.map(_a95,_a94);
new dojo.DeferredList(defs).then(function(){
def.resolve(true);
});
});
return def;
};
return _a94(this.rootNode);
},collapseAll:function(){
var _a96=this;
function _a97(node){
var def=new dojo.Deferred();
def.label="collapseAllDeferred";
var _a98=_a45.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=_a45.map(_a98,_a97);
new dojo.DeferredList(defs).then(function(){
if(!node.isExpanded||(node==_a96.rootNode&&!_a96.showRoot)){
def.resolve(true);
}else{
_a96._collapseNode(node).then(function(){
def.resolve(true);
});
}
});
return def;
};
return _a97(this.rootNode);
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_a99){
return (!item||this.model.mayHaveChildren(item))?(_a99?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onKeyPress:function(_a9a,e){
if(e.charCode<=32){
return;
}
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
var c=String.fromCharCode(e.charCode);
this._onLetterKeyNav({node:_a9a,key:c.toLowerCase()});
_a4e.stop(e);
}
},_onKeyDown:function(_a9b,e){
var key=e.keyCode;
var map=this._keyHandlerMap;
if(!map){
map={};
map[keys.ENTER]=map[keys.SPACE]=map[" "]="_onEnterKey";
map[this.isLeftToRight()?keys.LEFT_ARROW:keys.RIGHT_ARROW]="_onLeftArrow";
map[this.isLeftToRight()?keys.RIGHT_ARROW:keys.LEFT_ARROW]="_onRightArrow";
map[keys.UP_ARROW]="_onUpArrow";
map[keys.DOWN_ARROW]="_onDownArrow";
map[keys.HOME]="_onHomeKey";
map[keys.END]="_onEndKey";
this._keyHandlerMap=map;
}
if(this._keyHandlerMap[key]){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
this[this._keyHandlerMap[key]]({node:_a9b,item:_a9b.item,evt:e});
_a4e.stop(e);
}
},_onEnterKey:function(_a9c){
this._publish("execute",{item:_a9c.item,node:_a9c.node});
this.dndController.userSelect(_a9c.node,_a46.isCopyKey(_a9c.evt),_a9c.evt.shiftKey);
this.onClick(_a9c.item,_a9c.node,_a9c.evt);
},_onDownArrow:function(_a9d){
var node=this._getNextNode(_a9d.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_a9e){
var node=_a9e.node;
var _a9f=node.getPreviousSibling();
if(_a9f){
node=_a9f;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _aa0=node.getChildren();
node=_aa0[_aa0.length-1];
}
}else{
var _aa1=node.getParent();
if(!(!this.showRoot&&_aa1===this.rootNode)){
node=_aa1;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_aa2){
var node=_aa2.node;
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(_aa3){
var node=_aa3.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _aa4=node.getParent();
if(_aa4&&_aa4.isTreeNode&&!(!this.showRoot&&_aa4===this.rootNode)){
this.focusNode(_aa4);
}
}
},_onHomeKey:function(){
var node=this._getRootOrFirstNode();
if(node){
this.focusNode(node);
}
},_onEndKey:function(){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
node=c[c.length-1];
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},multiCharSearchDuration:250,_onLetterKeyNav:function(_aa5){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_aa5.key;
cs.timer.remove();
}else{
cs=this._curSearch={pattern:_aa5.key,startNode:_aa5.node};
}
cs.timer=this.defer(function(){
delete this._curSearch;
},this.multiCharSearchDuration);
var node=cs.startNode;
do{
node=this._getNextNode(node);
if(!node){
node=this._getRootOrFirstNode();
}
}while(node!==cs.startNode&&(node.label.toLowerCase().substr(0,cs.pattern.length)!=cs.pattern));
if(node&&node.isTreeNode){
if(node!==cs.startNode){
this.focusNode(node);
}
}
},isExpandoNode:function(node,_aa6){
return dom.isDescendant(node,_aa6.expandoNode);
},_onClick:function(_aa7,e){
var _aa8=e.target,_aa9=this.isExpandoNode(_aa8,_aa7);
if((this.openOnClick&&_aa7.isExpandable)||_aa9){
if(_aa7.isExpandable){
this._onExpandoClick({node:_aa7});
}
}else{
this._publish("execute",{item:_aa7.item,node:_aa7,evt:e});
this.onClick(_aa7.item,_aa7,e);
this.focusNode(_aa7);
}
_a4e.stop(e);
},_onDblClick:function(_aaa,e){
var _aab=e.target,_aac=(_aab==_aaa.expandoNode||_aab==_aaa.expandoNodeText);
if((this.openOnDblClick&&_aaa.isExpandable)||_aac){
if(_aaa.isExpandable){
this._onExpandoClick({node:_aaa});
}
}else{
this._publish("execute",{item:_aaa.item,node:_aaa,evt:e});
this.onDblClick(_aaa.item,_aaa,e);
this.focusNode(_aaa);
}
_a4e.stop(e);
},_onExpandoClick:function(_aad){
var node=_aad.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(){
},onDblClick:function(){
},onOpen:function(){
},onClose:function(){
},_getNextNode:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _aae=node.getNextSibling();
if(_aae){
return _aae;
}
node=node.getParent();
}
return null;
}
},_getRootOrFirstNode:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.state=="LOADING"){
return;
}
if(node.isExpanded){
var ret=node.collapse();
this.onClose(node.item,node);
this._state(node,false);
this._startPaint(ret);
return ret;
}
},_expandNode:function(node){
var def=new _a49();
if(node._expandNodeDeferred){
return node._expandNodeDeferred;
}
var _aaf=this.model,item=node.item,_ab0=this;
if(!node._loadDeferred){
node.markProcessing();
node._loadDeferred=new _a49();
_aaf.getChildren(item,function(_ab1){
node.unmarkProcessing();
node.setChildItems(_ab1).then(function(){
node._loadDeferred.resolve(_ab1);
});
},function(err){
console.error(_ab0,": error loading "+node.label+" children: ",err);
node._loadDeferred.reject(err);
});
}
node._loadDeferred.then(lang.hitch(this,function(){
node.expand().then(function(){
def.resolve(true);
});
this.onOpen(node.item,node);
this._state(node,true);
}));
this._startPaint(def);
return def;
},focusNode:function(node){
_a54.focus(node.labelNode);
},_onNodeFocus:function(node){
if(node&&node!=this.lastFocused){
if(this.lastFocused&&!this.lastFocused._destroyed){
this.lastFocused.setFocusable(false);
}
node.setFocusable(true);
this.lastFocused=node;
}
},_onNodeMouseEnter:function(){
},_onNodeMouseLeave:function(){
},_onItemChange:function(item){
var _ab2=this.model,_ab3=_ab2.getIdentity(item),_ab4=this._itemNodesMap[_ab3];
if(_ab4){
var _ab5=this.getLabel(item),_ab6=this.getTooltip(item);
_a45.forEach(_ab4,function(node){
node.set({item:item,label:_ab5,tooltip:_ab6});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_ab7,_ab8){
var _ab9=this.model,_aba=_ab9.getIdentity(_ab7),_abb=this._itemNodesMap[_aba];
if(_abb){
_a45.forEach(_abb,function(_abc){
_abc.setChildItems(_ab8);
});
}
},_onItemDelete:function(item){
var _abd=this.model,_abe=_abd.getIdentity(item),_abf=this._itemNodesMap[_abe];
if(_abf){
_a45.forEach(_abf,function(node){
this.dndController.removeTreeNode(node);
var _ac0=node.getParent();
if(_ac0){
_ac0.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_abe];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_a47(this.cookieName);
if(oreo){
_a45.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_ac1){
if(!this.persist){
return false;
}
var path=_a45.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_ac1){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
if(this.persist&&this.cookieName){
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_a47(this.cookieName,ary.join(","),{expires:365});
}
}
},destroy:function(){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!lang.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_ac2){
if(_ac2){
_a4c.setMarginBox(this.domNode,_ac2);
}
this._nodePixelIndent=_a4c.position(this.tree.indentDetector).w||this._nodePixelIndent;
this.expandChildrenDeferred.then(lang.hitch(this,function(){
this.rootNode.set("indent",this.showRoot?0:-1);
this._adjustWidths();
}));
},_outstandingPaintOperations:0,_startPaint:function(p){
this._outstandingPaintOperations++;
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var oc=lang.hitch(this,function(){
this._outstandingPaintOperations--;
if(this._outstandingPaintOperations<=0&&!this._adjustWidthsTimer&&this._started){
this._adjustWidthsTimer=this.defer("_adjustWidths");
}
});
when(p,oc,oc);
},_adjustWidths:function(){
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var _ac3=0,_ac4=[];
function _ac5(_ac6){
var node=_ac6.rowNode;
node.style.width="auto";
_ac3=Math.max(_ac3,node.clientWidth);
_ac4.push(node);
if(_ac6.isExpanded){
_a45.forEach(_ac6.getChildren(),_ac5);
}
};
_ac5(this.rootNode);
_ac3=Math.max(_ac3,_a4c.getContentBox(this.domNode).w);
_a45.forEach(_ac4,function(node){
node.style.width=_ac3+"px";
});
},_createTreeNode:function(args){
return new _a63(args);
},_setTextDirAttr:function(_ac7){
if(_ac7&&this.textDir!=_ac7){
this._set("textDir",_ac7);
this.rootNode.set("textDir",_ac7);
}
}});
Tree.PathError=_a4f("TreePathError");
Tree._TreeNode=_a63;
return Tree;
});
},"dijit/form/HorizontalSlider":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dnd/move","dojo/_base/event","dojo/_base/fx","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/dnd/Moveable","dojo/dnd/Mover","dojo/query","dojo/mouse","../registry","../focus","../typematic","./Button","./_FormValueWidget","../_Container","dojo/text!./templates/HorizontalSlider.html"],function(_ac8,_ac9,move,_aca,fx,_acb,_acc,keys,lang,has,_acd,_ace,_acf,_ad0,_ad1,_ad2,_ad3,_ad4,_ad5,_ad6,_ad7){
var _ad8=_ac9("dijit.form._SliderMover",_ace,{onMouseMove:function(e){
var _ad9=this.widget;
var _ada=_ad9._abspos;
if(!_ada){
_ada=_ad9._abspos=_acb.position(_ad9.sliderBarContainer,true);
_ad9._setPixelValue_=lang.hitch(_ad9,"_setPixelValue");
_ad9._isReversed_=_ad9._isReversed();
}
var _adb=e[_ad9._mousePixelCoord]-_ada[_ad9._startingPixelCoord];
_ad9._setPixelValue_(_ad9._isReversed_?(_ada[_ad9._pixelCount]-_adb):_adb,_ada[_ad9._pixelCount],false);
},destroy:function(e){
_ace.prototype.destroy.apply(this,arguments);
var _adc=this.widget;
_adc._abspos=null;
_adc._setValueAttr(_adc.value,true);
}});
var _add=_ac9("dijit.form.HorizontalSlider",[_ad5,_ad6],{templateString:_ad7,value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,slideDuration:_ad1.defaultDuration,_setIdAttr:"",baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_handleOffsetCoord:"left",_progressPixelSize:"width",_onKeyUp:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
this._setValueAttr(this.value,true);
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
switch(e.charOrCode){
case keys.HOME:
this._setValueAttr(this.minimum,false);
break;
case keys.END:
this._setValueAttr(this.maximum,false);
break;
case ((this._descending||this.isLeftToRight())?keys.RIGHT_ARROW:keys.LEFT_ARROW):
case (this._descending===false?keys.DOWN_ARROW:keys.UP_ARROW):
case (this._descending===false?keys.PAGE_DOWN:keys.PAGE_UP):
this.increment(e);
break;
case ((this._descending||this.isLeftToRight())?keys.LEFT_ARROW:keys.RIGHT_ARROW):
case (this._descending===false?keys.UP_ARROW:keys.DOWN_ARROW):
case (this._descending===false?keys.PAGE_UP:keys.PAGE_DOWN):
this.decrement(e);
break;
default:
return;
}
_aca.stop(e);
},_onHandleClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!has("ie")){
_ad2.focus(this.sliderHandle);
}
_aca.stop(e);
},_isReversed:function(){
return !this.isLeftToRight();
},_onBarClick:function(e){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
_ad2.focus(this.sliderHandle);
_aca.stop(e);
var _ade=_acb.position(this.sliderBarContainer,true);
var _adf=e[this._mousePixelCoord]-_ade[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_ade[this._pixelCount]-_adf):_adf,_ade[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_ae0,_ae1,_ae2){
if(this.disabled||this.readOnly){
return;
}
var _ae3=this.discreteValues;
if(_ae3<=1||_ae3==Infinity){
_ae3=_ae1;
}
_ae3--;
var _ae4=_ae1/_ae3;
var _ae5=Math.round(_ae0/_ae4);
this._setValueAttr(Math.max(Math.min((this.maximum-this.minimum)*_ae5/_ae3+this.minimum,this.maximum),this.minimum),_ae2);
},_setValueAttr:function(_ae6,_ae7){
this._set("value",_ae6);
this.valueNode.value=_ae6;
this.focusNode.setAttribute("aria-valuenow",_ae6);
this.inherited(arguments);
var _ae8=(_ae6-this.minimum)/(this.maximum-this.minimum);
var _ae9=(this._descending===false)?this.remainingBar:this.progressBar;
var _aea=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_ae7&&this.slideDuration>0&&_ae9.style[this._progressPixelSize]){
var _aeb=this;
var _aec={};
var _aed=parseFloat(_ae9.style[this._progressPixelSize]);
var _aee=this.slideDuration*(_ae8-_aed/100);
if(_aee==0){
return;
}
if(_aee<0){
_aee=0-_aee;
}
_aec[this._progressPixelSize]={start:_aed,end:_ae8*100,units:"%"};
this._inProgressAnim=fx.animateProperty({node:_ae9,duration:_aee,onAnimate:function(v){
_aea.style[_aeb._progressPixelSize]=(100-parseFloat(v[_aeb._progressPixelSize]))+"%";
},onEnd:function(){
delete _aeb._inProgressAnim;
},properties:_aec});
this._inProgressAnim.play();
}else{
_ae9.style[this._progressPixelSize]=(_ae8*100)+"%";
_aea.style[this._progressPixelSize]=((1-_ae8)*100)+"%";
}
},_bumpValue:function(_aef,_af0){
if(this.disabled||this.readOnly){
return;
}
var s=_acc.getComputedStyle(this.sliderBarContainer);
var c=_acb.getContentBox(this.sliderBarContainer,s);
var _af1=this.discreteValues;
if(_af1<=1||_af1==Infinity){
_af1=c[this._pixelCount];
}
_af1--;
var _af2=(this.value-this.minimum)*_af1/(this.maximum-this.minimum)+_aef;
if(_af2<0){
_af2=0;
}
if(_af2>_af1){
_af2=_af1;
}
_af2=_af2*(this.maximum-this.minimum)/_af1+this.minimum;
this._setValueAttr(_af2,_af0);
},_onClkBumper:function(val){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
this._setValueAttr(val,true);
},_onClkIncBumper:function(){
this._onClkBumper(this._descending===false?this.minimum:this.maximum);
},_onClkDecBumper:function(){
this._onClkBumper(this._descending===false?this.maximum:this.minimum);
},decrement:function(e){
this._bumpValue(e.charOrCode==keys.PAGE_DOWN?-this.pageIncrement:-1);
},increment:function(e){
this._bumpValue(e.charOrCode==keys.PAGE_UP?this.pageIncrement:1);
},_mouseWheeled:function(evt){
_aca.stop(evt);
this._bumpValue(evt.wheelDelta<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
_ac8.forEach(this.getChildren(),function(_af3){
if(this[_af3.container]!=this.containerNode){
this[_af3.container].appendChild(_af3.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_af4,_af5,e){
if(_af4==-1){
this._setValueAttr(this.value,true);
}else{
this[(_af5==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _af6=_acf("label[for=\""+this.id+"\"]");
if(_af6.length){
if(!_af6[0].id){
_af6[0].id=this.id+"_label";
}
this.focusNode.setAttribute("aria-labelledby",_af6[0].id);
}
this.focusNode.setAttribute("aria-valuemin",this.minimum);
this.focusNode.setAttribute("aria-valuemax",this.maximum);
},postCreate:function(){
this.inherited(arguments);
if(this.showButtons){
this.own(_ad3.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500),_ad3.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));
}
this.connect(this.domNode,_ad0.wheel,"_mouseWheeled");
var _af7=_ac9(_ad8,{widget:this});
this._movable=new _acd(this.sliderHandle,{mover:_af7});
this._layoutHackIE7();
},destroy:function(){
this._movable.destroy();
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
this.inherited(arguments);
}});
_add._Mover=_ad8;
return _add;
});
},"*now":function(r){
r(["dojo/i18n!*preload*dijit/nls/dijit-all*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dijit/dijit-all",["./main","./dijit","./ColorPalette","./Declaration","./Dialog","./DialogUnderlay","./TooltipDialog","./Editor","./_editor/plugins/FontChoice","./_editor/plugins/LinkDialog","./Menu","./MenuItem","./PopupMenuItem","./CheckedMenuItem","./MenuBar","./MenuBarItem","./PopupMenuBarItem","./MenuSeparator","./ProgressBar","./TitlePane","./Toolbar","./Tooltip","./Tree","./InlineEditBox","./form/Form","./form/Button","./form/DropDownButton","./form/ComboButton","./form/ToggleButton","./form/CheckBox","./form/RadioButton","./form/TextBox","./form/ValidationTextBox","./form/CurrencyTextBox","./form/DateTextBox","./form/TimeTextBox","./form/NumberSpinner","./form/NumberTextBox","./form/ComboBox","./form/FilteringSelect","./form/MultiSelect","./form/Select","./form/HorizontalSlider","./form/VerticalSlider","./form/HorizontalRule","./form/VerticalRule","./form/HorizontalRuleLabels","./form/VerticalRuleLabels","./form/SimpleTextarea","./form/Textarea","./layout/AccordionContainer","./layout/ContentPane","./layout/BorderContainer","./layout/LayoutContainer","./layout/LinkPane","./layout/SplitContainer","./layout/StackContainer","./layout/TabContainer"],function(_af8){
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
return _af8;
});
