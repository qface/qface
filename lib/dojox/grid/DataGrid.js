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
define(["dojo/dom-class","dojo/hccss","dojo/ready","dojo/_base/window"],function(_2a,has,_2b,win){
_2b(90,function(){
if(has("highcontrast")){
_2a.add(win.body(),"dijit_a11y");
}
});
return has;
});
},"dojox/grid/_View":function(){
define(["dojo","dijit/registry","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/connect","dojo/_base/sniff","dojo/query","dojo/_base/window","dojo/text!./resources/View.html","dojo/dnd/Source","dijit/_Widget","dijit/_TemplatedMixin","dojox/html/metrics","./util","dojo/_base/html","./_Builder","dojo/dnd/Avatar","dojo/dnd/Manager"],function(_2c,_2d,_2e,_2f,_30,_31,_32,has,_33,win,_34,_35,_36,_37,_38,_39,_3a,_3b,_3c,_3d){
var _3e=function(_3f,_40){
return _3f.style.cssText==undefined?_3f.getAttribute("style"):_3f.style.cssText;
};
var _41=_2f("dojox.grid._View",[_36,_37],{defaultWidth:"18em",viewWidth:"",templateString:_34,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:_3b._HeaderBuilder,_contentBuilderClass:_3b._ContentBuilder,postMixInProperties:function(){
this.rowNodes={};
},postCreate:function(){
this.connect(this.scrollboxNode,"onscroll","doscroll");
_39.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);
_39.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new this._contentBuilderClass(this);
this.header=new this._headerBuilderClass(this);
if(!this.grid.isLeftToRight()){
this.headerNodeContainer.style.width="";
}
},destroy:function(){
_3a.destroy(this.headerNode);
delete this.headerNode;
for(var i in this.rowNodes){
this._cleanupRowWidgets(this.rowNodes[i]);
_3a.destroy(this.rowNodes[i]);
}
this.rowNodes={};
if(this.source){
this.source.destroy();
}
this.inherited(arguments);
},focus:function(){
if(has("ie")||has("webkit")||has("opera")){
this.hiddenFocusNode.focus();
}else{
this.scrollboxNode.focus();
}
},setStructure:function(_42){
var vs=(this.structure=_42);
if(vs.width&&!isNaN(vs.width)){
this.viewWidth=vs.width+"em";
}else{
this.viewWidth=vs.width||(vs.noscroll?"auto":this.viewWidth);
}
this._onBeforeRow=vs.onBeforeRow||function(){
};
this._onAfterRow=vs.onAfterRow||function(){
};
this.noscroll=vs.noscroll;
if(this.noscroll){
this.scrollboxNode.style.overflow="hidden";
}
this.simpleStructure=Boolean(vs.cells.length==1);
this.testFlexCells();
this.updateStructure();
},_cleanupRowWidgets:function(_43){
if(_43){
_30.forEach(_33("[widgetId]",_43).map(_2d.byNode),function(w){
if(w._destroyOnRemove){
w.destroy();
delete w;
}else{
if(w.domNode&&w.domNode.parentNode){
w.domNode.parentNode.removeChild(w.domNode);
}
}
});
}
},onBeforeRow:function(_44,_45){
this._onBeforeRow(_44,_45);
if(_44>=0){
this._cleanupRowWidgets(this.getRowNode(_44));
}
},onAfterRow:function(_46,_47,_48){
this._onAfterRow(_46,_47,_48);
var g=this.grid;
_30.forEach(_33(".dojoxGridStubNode",_48),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _49=window.parseInt(_3a.attr(n,"cellIdx"),10);
var _4a=g.getCell(_49);
var w=_2d.byId(lw);
if(w){
n.parentNode.replaceChild(w.domNode,n);
if(!w._started){
w.startup();
}
_2c.destroy(n);
}else{
n.innerHTML="";
}
}
},this);
},testFlexCells:function(){
this.flexCells=false;
for(var j=0,row;(row=this.structure.cells[j]);j++){
for(var i=0,_4b;(_4b=row[i]);i++){
_4b.view=this;
this.flexCells=this.flexCells||_4b.isFlex();
}
}
return this.flexCells;
},updateStructure:function(){
this.header.update();
this.content.update();
},getScrollbarWidth:function(){
var _4c=this.hasVScrollbar();
var _4d=_3a.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_4d||_4d=="hidden"){
_4c=false;
}else{
if(_4d=="scroll"){
_4c=true;
}
}
return (_4c?_38.getScrollbar().w:0);
},getColumnsWidth:function(){
var h=this.headerContentNode;
return h&&h.firstChild?h.firstChild.offsetWidth:0;
},setColumnsWidth:function(_4e){
this.headerContentNode.firstChild.style.width=_4e+"px";
if(this.viewWidth){
this.viewWidth=_4e+"px";
}
},getWidth:function(){
return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px";
},getContentWidth:function(){
return Math.max(0,_3a._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px";
},render:function(){
this.scrollboxNode.style.height="";
this.renderHeader();
if(this._togglingColumn>=0){
this.setColumnsWidth(this.getColumnsWidth()-this._togglingColumn);
this._togglingColumn=-1;
}
var _4f=this.grid.layout.cells;
var _50=_31.hitch(this,function(_51,_52){
!this.grid.isLeftToRight()&&(_52=!_52);
var inc=_52?-1:1;
var idx=this.header.getCellNodeIndex(_51)+inc;
var _53=_4f[idx];
while(_53&&_53.getHeaderNode()&&_53.getHeaderNode().style.display=="none"){
idx+=inc;
_53=_4f[idx];
}
if(_53){
return _53.getHeaderNode();
}
return null;
});
if(this.grid.columnReordering&&this.simpleStructure){
if(this.source){
this.source.destroy();
}
var _54="dojoxGrid_bottomMarker";
var _55="dojoxGrid_topMarker";
if(this.bottomMarker){
_3a.destroy(this.bottomMarker);
}
this.bottomMarker=_3a.byId(_54);
if(this.topMarker){
_3a.destroy(this.topMarker);
}
this.topMarker=_3a.byId(_55);
if(!this.bottomMarker){
this.bottomMarker=_3a.create("div",{"id":_54,"class":"dojoxGridColPlaceBottom"},win.body());
this._hide(this.bottomMarker);
this.topMarker=_3a.create("div",{"id":_55,"class":"dojoxGridColPlaceTop"},win.body());
this._hide(this.topMarker);
}
this.arrowDim=_3a.contentBox(this.bottomMarker);
var _56=_3a.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new _35(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:_31.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(has("ie")<9?1:0)){
_35.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:_31.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
_35.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:_31.hitch(this,function(_57){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_57){
return;
}
if(src.targetAnchor&&_50(src.targetAnchor,src.before)){
src._removeItemClass(_50(src.targetAnchor,src.before),src.before?"After":"Before");
}
_35.prototype._markTargetAnchor.call(src,_57);
var _58=_57?src.targetAnchor:_50(src.targetAnchor,src.before);
var _59=0;
if(!_58){
_58=src.targetAnchor;
_59=_3a.contentBox(_58).w+this.arrowDim.w/2+2;
}
var pos=_3a.position(_58,true);
var _5a=Math.floor(pos.x-this.arrowDim.w/2+_59);
_3a.style(this.bottomMarker,"visibility","visible");
_3a.style(this.topMarker,"visibility","visible");
_3a.style(this.bottomMarker,{"left":_5a+"px","top":(_56+pos.y)+"px"});
_3a.style(this.topMarker,{"left":_5a+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_50(src.targetAnchor,src.before)){
src._addItemClass(_50(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:_31.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_50(src.targetAnchor,src.before)){
src._removeItemClass(_50(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
_35.prototype._unmarkTargetAnchor.call(src);
}),destroy:_31.hitch(this,function(){
_32.disconnect(this._source_conn);
_32.unsubscribe(this._source_sub);
_35.prototype.destroy.call(this.source);
if(this.bottomMarker){
_3a.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
_3a.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:_31.hitch(this,function(){
_35.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=_32.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=_32.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(_5b){
_3a.style(_5b,{top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_5c,_5d,_5e){
if(_3d.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var _5f=this.grid.views.views;
var _60=_5f[_5c.viewIndex];
var _61=_5f[this.index];
if(_61!=_60){
_60.convertColPctToFixed();
_61.convertColPctToFixed();
}
},_onDndDrop:function(_62,_63,_64){
if(_3d.manager().target!==this.source){
if(_3d.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _65=function(n){
return n?_3a.attr(n,"idx"):null;
};
var w=_3a.marginBox(_63[0]).w;
if(_62.viewIndex!==this.index){
var _66=this.grid.views.views;
var _67=_66[_62.viewIndex];
var _68=_66[this.index];
if(_67.viewWidth&&_67.viewWidth!="auto"){
_67.setColumnsWidth(_67.getColumnsWidth()-w);
}
if(_68.viewWidth&&_68.viewWidth!="auto"){
_68.setColumnsWidth(_68.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!this.grid.isLeftToRight()&&(stb=!stb);
var _69=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_69.moveColumn(_62.viewIndex,idx,_65(_63[0]),_65(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
_39.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_6a){
var n=_6a.name||_6a.grid.getCellName(_6a);
if(/^\s+$/.test(n)){
n="&nbsp;";
}
var ret=["<div class=\"dojoxGridSortNode"];
if(_6a.index!=_6a.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_6a.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_6a.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(_6b){
var _6c=this._hasHScroll||false;
if(this._hasHScroll==undefined||_6b){
if(this.noscroll){
this._hasHScroll=false;
}else{
var _6d=_3a.style(this.scrollboxNode,"overflow");
if(_6d=="hidden"){
this._hasHScroll=false;
}else{
if(_6d=="scroll"){
this._hasHScroll=true;
}else{
this._hasHScroll=(this.scrollboxNode.offsetWidth-this.getScrollbarWidth()<this.contentNode.offsetWidth);
}
}
}
}
if(_6c!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(_6e){
var _6f=this._hasVScroll||false;
if(this._hasVScroll==undefined||_6e){
if(this.noscroll){
this._hasVScroll=false;
}else{
var _70=_3a.style(this.scrollboxNode,"overflow");
if(_70=="hidden"){
this._hasVScroll=false;
}else{
if(_70=="scroll"){
this._hasVScroll=true;
}else{
this._hasVScroll=(this.scrollboxNode.scrollHeight>this.scrollboxNode.clientHeight);
}
}
}
}
if(_6f!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _71=false;
this.grid.initialWidth="";
var _72=_33("th",this.headerContentNode);
var _73=_30.map(_72,function(c,_74){
var w=c.style.width;
_3a.attr(c,"vIdx",_74);
if(w&&w.slice(-1)=="%"){
_71=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return _3a.contentBox(c).w;
});
if(_71){
_30.forEach(this.grid.layout.cells,function(_75,idx){
if(_75.view==this){
var _76=_75.view.getHeaderCellNode(_75.index);
if(_76&&_3a.hasAttr(_76,"vIdx")){
var _77=window.parseInt(_3a.attr(_76,"vIdx"));
this.setColWidth(idx,_73[_77]);
_3a.removeAttr(_76,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_78){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var _79=this;
var _7a=function(){
var v;
for(var i in _79.grid.views.views){
v=_79.grid.views.views[i];
if(v!==_79&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_78||(this.noscroll&&_7a())){
h-=_38.getScrollbar().h;
}
_39.setStyleHeightPx(this.scrollboxNode,h);
}
this.hasVScrollbar(true);
},adaptWidth:function(){
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
if(!this._removingColumn){
w=Math.max(w,this.getColumnsWidth())+"px";
}else{
w=Math.min(w,this.getColumnsWidth())+"px";
this._removingColumn=false;
}
var cn=this.contentNode;
cn.style.width=w;
this.hasHScrollbar(true);
},setSize:function(w,h){
var ds=this.domNode.style;
var hs=this.headerNode.style;
if(w){
ds.width=w;
hs.width=w;
}
ds.height=(h>=0?h+"px":"");
},renderRow:function(_7b){
var _7c=this.createRowNode(_7b);
this.buildRow(_7b,_7c);
return _7c;
},createRowNode:function(_7d){
var _7e=document.createElement("div");
_7e.className=this.classTag+"Row";
if(this instanceof _2e.grid._RowSelector){
_3a.attr(_7e,"role","presentation");
}else{
_3a.attr(_7e,"role","row");
if(this.grid.selectionMode!="none"){
_7e.setAttribute("aria-selected","false");
}
}
_7e[_39.gridViewTag]=this.id;
_7e[_39.rowIndexTag]=_7d;
this.rowNodes[_7d]=_7e;
return _7e;
},buildRow:function(_7f,_80){
this.buildRowContent(_7f,_80);
this.styleRow(_7f,_80);
},buildRowContent:function(_81,_82){
_82.innerHTML=this.content.generateHtml(_81,_81);
if(this.flexCells&&this.contentWidth){
_82.firstChild.style.width=this.contentWidth;
}
_39.fire(this,"onAfterRow",[_81,this.structure.cells,_82]);
},rowRemoved:function(_83){
if(_83>=0){
this._cleanupRowWidgets(this.getRowNode(_83));
}
this.grid.edit.save(this,_83);
delete this.rowNodes[_83];
},getRowNode:function(_84){
return this.rowNodes[_84];
},getCellNode:function(_85,_86){
var row=this.getRowNode(_85);
if(row){
return this.content.getCellNode(row,_86);
}
},getHeaderCellNode:function(_87){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_87);
}
},styleRow:function(_88,_89){
_89._style=_3e(_89);
this.styleRowNode(_88,_89);
},styleRowNode:function(_8a,_8b){
if(_8b){
this.doStyleRowNode(_8a,_8b);
}
},doStyleRowNode:function(_8c,_8d){
this.grid.styleRowNode(_8c,_8d);
},updateRow:function(_8e){
var _8f=this.getRowNode(_8e);
if(_8f){
_8f.style.height="";
this.buildRow(_8e,_8f);
}
return _8f;
},updateRowStyles:function(_90){
this.styleRowNode(_90,this.getRowNode(_90));
},lastTop:0,firstScroll:0,_nativeScroll:false,doscroll:function(_91){
if(has("ff")>=13){
this._nativeScroll=true;
}
var _92=this.grid.isLeftToRight();
if(this.firstScroll<2){
if((!_92&&this.firstScroll==1)||(_92&&this.firstScroll===0)){
var s=_3a.marginBox(this.headerNodeContainer);
if(has("ie")){
this.headerNodeContainer.style.width=s.w+this.getScrollbarWidth()+"px";
}else{
if(has("mozilla")){
this.headerNodeContainer.style.width=s.w-this.getScrollbarWidth()+"px";
this.scrollboxNode.scrollLeft=_92?this.scrollboxNode.clientWidth-this.scrollboxNode.scrollWidth:this.scrollboxNode.scrollWidth-this.scrollboxNode.clientWidth;
}
}
}
this.firstScroll++;
}
this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!==this.lastTop){
this.grid.scrollTo(top);
}
this._nativeScroll=false;
},setScrollTop:function(_93){
this.lastTop=_93;
if(!this._nativeScroll){
this.scrollboxNode.scrollTop=_93;
}
return this.scrollboxNode.scrollTop;
},doContentEvent:function(e){
if(this.content.decorateEvent(e)){
this.grid.onContentEvent(e);
}
},doHeaderEvent:function(e){
if(this.header.decorateEvent(e)){
this.grid.onHeaderEvent(e);
}
},dispatchContentEvent:function(e){
return this.content.dispatchEvent(e);
},dispatchHeaderEvent:function(e){
return this.header.dispatchEvent(e);
},setColWidth:function(_94,_95){
this.grid.setCellWidth(_94,_95+"px");
},update:function(){
if(!this.domNode){
return;
}
this.content.update();
this.grid.update();
var _96=this.scrollboxNode.scrollLeft;
this.scrollboxNode.scrollLeft=_96;
this.headerNode.scrollLeft=_96;
}});
var _97=_2f("dojox.grid._GridAvatar",_3c,{construct:function(){
var dd=win.doc;
var a=dd.createElement("table");
a.cellPadding=a.cellSpacing="0";
a.className="dojoxGridDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dd.createElement("tbody");
var tr=dd.createElement("tr");
var td=dd.createElement("td");
var img=dd.createElement("td");
tr.className="dojoxGridDndAvatarItem";
img.className="dojoxGridDndAvatarItemImage";
img.style.width="16px";
var _98=this.manager.source,_99;
if(_98.creator){
_99=_98._normalizedCreator(_98.getItem(this.manager.nodes[0].id).data,"avatar").node;
}else{
_99=this.manager.nodes[0].cloneNode(true);
var _9a,_9b;
if(_99.tagName.toLowerCase()=="tr"){
_9a=dd.createElement("table");
_9b=dd.createElement("tbody");
_9b.appendChild(_99);
_9a.appendChild(_9b);
_99=_9a;
}else{
if(_99.tagName.toLowerCase()=="th"){
_9a=dd.createElement("table");
_9b=dd.createElement("tbody");
var r=dd.createElement("tr");
_9a.cellPadding=_9a.cellSpacing="0";
r.appendChild(_99);
_9b.appendChild(r);
_9a.appendChild(_9b);
_99=_9a;
}
}
}
_99.id="";
td.appendChild(_99);
tr.appendChild(img);
tr.appendChild(td);
_3a.style(tr,"opacity",0.9);
b.appendChild(tr);
a.appendChild(b);
this.node=a;
var m=_3d.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
_3d.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _9c=_3d.manager().makeAvatar;
_3d.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!_3a.hasClass(win.body(),"dijit_a11y")){
return new _97(this);
}
return _9c.call(_3d.manager());
};
return _41;
});
},"dijit/_Contained":function(){
define(["dojo/_base/declare","./registry"],function(_9d,_9e){
return _9d("dijit._Contained",null,{_getSibling:function(_9f){
var _a0=this.domNode;
do{
_a0=_a0[_9f+"Sibling"];
}while(_a0&&_a0.nodeType!=1);
return _a0&&_9e.byNode(_a0);
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
},"dojo/dnd/Selector":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../dom","../dom-construct","../mouse","../_base/NodeList","../on","../touch","./common","./Container"],function(_a1,_a2,_a3,_a4,_a5,dom,_a6,_a7,_a8,on,_a9,dnd,_aa){
var _ab=_a2("dojo.dnd.Selector",_aa,{constructor:function(_ac,_ad){
if(!_ad){
_ad={};
}
this.singular=_ad.singular;
this.autoSync=_ad.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(on(this.node,_a9.press,_a5.hitch(this,"onMouseDown")),on(this.node,_a9.release,_a5.hitch(this,"onMouseUp")));
},singular:false,getSelectedNodes:function(){
var t=new _a8();
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dom.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(_ae,id){
this._addItemClass(dom.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dom.byId(i);
this.delItem(i);
_a6.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||_a4.global;
var s=this.selection,e=dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
_ab.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
_a1.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_af,_b0,_b1,_b2){
var _b3=this._normalizedCreator;
this._normalizedCreator=function(_b4,_b5){
var t=_b3.call(this,_b4,_b5);
if(_af){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
_ab.superclass.insertNodes.call(this,_b0,_b1,_b2);
this._normalizedCreator=_b3;
return this;
},destroy:function(){
_ab.superclass.destroy.call(this);
this.selection=this.anchor=null;
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dnd.getCopyKeyState(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(_a7.isLeft(e)){
_a3.stop(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dnd.getCopyKeyState(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0,_b6;
for(;i<c.length;++i){
_b6=c[i];
if(_b6==this.anchor||_b6==this.current){
break;
}
}
for(++i;i<c.length;++i){
_b6=c[i];
if(_b6==this.anchor||_b6==this.current){
break;
}
this._addItemClass(_b6,"Selected");
this.selection[_b6.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dnd.getCopyKeyState(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dnd.getCopyKeyState(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
_a3.stop(e);
},onMouseUp:function(){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=on(this.node,_a9.move,_a5.hitch(this,"onMouseMove"));
},onOutEvent:function(){
if(this.onmousemoveEvent){
this.onmousemoveEvent.remove();
delete this.onmousemoveEvent;
}
},_removeSelection:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var _b7=dom.byId(i);
if(_b7){
this._removeItemClass(_b7,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
return _ab;
});
},"dojox/grid/DataSelection":function(){
define("dojox/grid/DataSelection",["dojo/_base/declare","./_SelectionPreserver","./Selection"],function(_b8,_b9,_ba){
return _b8("dojox.grid.DataSelection",_ba,{constructor:function(_bb){
if(_bb.keepSelection){
this.preserver=new _b9(this);
}
},destroy:function(){
if(this.preserver){
this.preserver.destroy();
}
},getFirstSelected:function(){
var idx=_ba.prototype.getFirstSelected.call(this);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getNextSelected:function(_bc){
var _bd=this.grid.getItemIndex(_bc);
var idx=_ba.prototype.getNextSelected.call(this,_bd);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getSelected:function(){
var _be=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_be.push(this.grid.getItem(i));
}
}
return _be;
},addToSelection:function(_bf){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _bf=="number"||typeof _bf=="string"){
idx=_bf;
}else{
idx=this.grid.getItemIndex(_bf);
}
_ba.prototype.addToSelection.call(this,idx);
},deselect:function(_c0){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _c0=="number"||typeof _c0=="string"){
idx=_c0;
}else{
idx=this.grid.getItemIndex(_c0);
}
_ba.prototype.deselect.call(this,idx);
},deselectAll:function(_c1){
var idx=null;
if(_c1||typeof _c1=="number"){
if(typeof _c1=="number"||typeof _c1=="string"){
idx=_c1;
}else{
idx=this.grid.getItemIndex(_c1);
}
_ba.prototype.deselectAll.call(this,idx);
}else{
this.inherited(arguments);
}
}});
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dojo/dnd/Manager":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../_base/window","../dom-class","../Evented","../has","../keys","../on","../topic","../touch","./common","./autoscroll","./Avatar"],function(_c2,_c3,_c4,_c5,win,_c6,_c7,has,_c8,on,_c9,_ca,dnd,_cb,_cc){
var _cd=_c3("dojo.dnd.Manager",[_c7],{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:has("touch")?0:16,OFFSET_Y:has("touch")?-64:16,overSource:function(_ce){
if(this.avatar){
this.target=(_ce&&_ce.targetState!="Disabled")?_ce:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
_c9.publish("/dnd/source/over",_ce);
},outSource:function(_cf){
if(this.avatar){
if(this.target==_cf){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
_c9.publish("/dnd/source/over",null);
}
}else{
_c9.publish("/dnd/source/over",null);
}
},startDrag:function(_d0,_d1,_d2){
_cb.autoScrollStart(win.doc);
this.source=_d0;
this.nodes=_d1;
this.copy=Boolean(_d2);
this.avatar=this.makeAvatar();
win.body().appendChild(this.avatar.node);
_c9.publish("/dnd/start",_d0,_d1,this.copy);
this.events=[on(win.doc,_ca.move,_c5.hitch(this,"onMouseMove")),on(win.doc,_ca.release,_c5.hitch(this,"onMouseUp")),on(win.doc,"keydown",_c5.hitch(this,"onKeyDown")),on(win.doc,"keyup",_c5.hitch(this,"onKeyUp")),on(win.doc,"dragstart",_c4.stop),on(win.body(),"selectstart",_c4.stop)];
var c="dojoDnd"+(_d2?"Copy":"Move");
_c6.add(win.body(),c);
},canDrop:function(_d3){
var _d4=Boolean(this.target&&_d3);
if(this.canDropFlag!=_d4){
this.canDropFlag=_d4;
this.avatar.update();
}
},stopDrag:function(){
_c6.remove(win.body(),["dojoDndCopy","dojoDndMove"]);
_c2.forEach(this.events,function(_d5){
_d5.remove();
});
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new _cc(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
_cb.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var _d6=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
if(this.copy!=_d6){
this._setCopyStatus(_d6);
}
}
if(has("touch")){
e.preventDefault();
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var _d7=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
_c9.publish("/dnd/drop/before",this.source,this.nodes,_d7,this.target,e);
_c9.publish("/dnd/drop",this.source,this.nodes,_d7,this.target,e);
}else{
_c9.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case _c8.CTRL:
var _d8=Boolean(this.source.copyState(true));
if(this.copy!=_d8){
this._setCopyStatus(_d8);
}
break;
case _c8.ESCAPE:
_c9.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==_c8.CTRL){
var _d9=Boolean(this.source.copyState(false));
if(this.copy!=_d9){
this._setCopyStatus(_d9);
}
}
},_setCopyStatus:function(_da){
this.copy=_da;
this.source._markDndStatus(this.copy);
this.updateAvatar();
_c6.replace(win.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dnd._manager=null;
_cd.manager=dnd.manager=function(){
if(!dnd._manager){
dnd._manager=new _cd();
}
return dnd._manager;
};
return _cd;
});
},"dijit/a11yclick":function(){
define(["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window"],function(on,_db,_dc,_dd,has,_de,win){
var _df=null;
if(has("dom-addeventlistener")){
win.doc.addEventListener("keydown",function(evt){
_df=evt.target;
},true);
}else{
(function(){
var _e0=function(evt){
_df=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_e0);
_de.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_e0);
});
})();
}
function _e1(e){
return (e.keyCode===_dc.ENTER||e.keyCode===_dc.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
return function(_e2,_e3){
if(/input|button/i.test(_e2.nodeName)){
return on(_e2,"click",_e3);
}else{
var _e4=[on(_e2,"keydown",function(e){
if(_e1(e)){
_df=e.target;
e.preventDefault();
}
}),on(_e2,"keyup",function(e){
if(_e1(e)&&e.target==_df){
_df=null;
on.emit(e.target,"click",{cancelable:true,bubbles:true});
}
}),on(_e2,"click",function(e){
_e3.call(this,e);
})];
if(has("touch")){
var _e5;
_e4.push(on(_e2,"touchend",function(e){
var _e6=e.target;
_e5=setTimeout(function(){
_e5=null;
on.emit(_e6,"click",{cancelable:true,bubbles:true});
},600);
}),on(_e2,"click",function(e){
if(_e5){
clearTimeout(_e5);
}
}));
}
return {remove:function(){
_db.forEach(_e4,function(h){
h.remove();
});
if(_e5){
clearTimeout(_e5);
_e5=null;
}
}};
}
};
return ret;
});
},"dojox/grid/_RowSelector":function(){
define(["dojo/_base/declare","./_View"],function(_e7,_e8){
return _e7("dojox.grid._RowSelector",_e8,{defaultWidth:"2em",noscroll:true,padBorderWidth:2,buildRendering:function(){
this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden";
},getWidth:function(){
return this.viewWidth||this.defaultWidth;
},buildRowContent:function(_e9,_ea){
var w=this.contentWidth||0;
_ea.innerHTML="<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;height:1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr><td class=\"dojoxGridRowbarInner\">&nbsp;</td></tr></table>";
},renderHeader:function(){
},updateRow:function(){
},resize:function(){
this.adaptHeight();
},adaptWidth:function(){
if(!("contentWidth" in this)&&this.contentNode&&this.contentNode.offsetWidth>0){
this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;
}
},doStyleRowNode:function(_eb,_ec){
var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];
if(this.grid.rows.isOver(_eb)){
n.push("dojoxGridRowbarOver");
}
if(this.grid.selection.isSelected(_eb)){
n.push("dojoxGridRowbarSelected");
}
_ec.className=n.join(" ");
},domouseover:function(e){
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}});
});
},"dojox/grid/_Layout":function(){
define("dojox/grid/_Layout",["dojo/_base/kernel","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-geometry","./cells","./_RowSelector"],function(_ed,_ee,_ef,_f0,_f1,_f2){
return _ef("dojox.grid._Layout",null,{constructor:function(_f3){
this.grid=_f3;
},cells:[],structure:null,defaultWidth:"6em",moveColumn:function(_f4,_f5,_f6,_f7,_f8){
var _f9=this.structure[_f4].cells[0];
var _fa=this.structure[_f5].cells[0];
var _fb=null;
var _fc=0;
var _fd=0;
for(var i=0,c;c=_f9[i];i++){
if(c.index==_f6){
_fc=i;
break;
}
}
_fb=_f9.splice(_fc,1)[0];
_fb.view=this.grid.views.views[_f5];
for(i=0,c=null;c=_fa[i];i++){
if(c.index==_f7){
_fd=i;
break;
}
}
if(!_f8){
_fd+=1;
}
_fa.splice(_fd,0,_fb);
var _fe=this.grid.getCell(this.grid.getSortIndex());
if(_fe){
_fe._currentlySorted=this.grid.getSortAsc();
}
this.cells=[];
_f6=0;
var v;
for(i=0;v=this.structure[i];i++){
for(var j=0,cs;cs=v.cells[j];j++){
for(var k=0;c=cs[k];k++){
c.index=_f6;
this.cells.push(c);
if("_currentlySorted" in c){
var si=_f6+1;
si*=c._currentlySorted?1:-1;
this.grid.sortInfo=si;
delete c._currentlySorted;
}
_f6++;
}
}
}
_f0.forEach(this.cells,function(c){
var _ff=c.markup[2].split(" ");
var _100=parseInt(_ff[1].substring(5));
if(_100!=c.index){
_ff[1]="idx=\""+c.index+"\"";
c.markup[2]=_ff.join(" ");
}
});
this.grid.setupHeaderMenu();
},setColumnVisibility:function(_101,_102){
var cell=this.cells[_101];
if(cell.hidden==_102){
cell.hidden=!_102;
var v=cell.view,w=v.viewWidth;
if(w&&w!="auto"){
v._togglingColumn=_f2.getMarginBox(cell.getHeaderNode()).w||0;
}
v.update();
return true;
}else{
return false;
}
},addCellDef:function(_103,_104,_105){
var self=this;
var _106=function(_107){
var w=0;
if(_107.colSpan>1){
w=0;
}else{
w=_107.width||self._defaultCellProps.width||self.defaultWidth;
if(!isNaN(w)){
w=w+"em";
}
}
return w;
};
var _108={grid:this.grid,subrow:_103,layoutIndex:_104,index:this.cells.length};
if(_105&&_105 instanceof _ee.grid.cells._Base){
var _109=_f1.clone(_105);
_108.unitWidth=_106(_109._props);
_109=_f1.mixin(_109,this._defaultCellProps,_105._props,_108);
return _109;
}
var _10a=_105.type||_105.cellType||this._defaultCellProps.type||this._defaultCellProps.cellType||_ee.grid.cells.Cell;
if(_f1.isString(_10a)){
_10a=_f1.getObject(_10a);
}
_108.unitWidth=_106(_105);
return new _10a(_f1.mixin({},this._defaultCellProps,_105,_108));
},addRowDef:function(_10b,_10c){
var _10d=[];
var _10e=0,_10f=0,_110=true;
for(var i=0,def,cell;(def=_10c[i]);i++){
cell=this.addCellDef(_10b,i,def);
_10d.push(cell);
this.cells.push(cell);
if(_110&&cell.relWidth){
_10e+=cell.relWidth;
}else{
if(cell.width){
var w=cell.width;
if(typeof w=="string"&&w.slice(-1)=="%"){
_10f+=window.parseInt(w,10);
}else{
if(w=="auto"){
_110=false;
}
}
}
}
}
if(_10e&&_110){
_f0.forEach(_10d,function(cell){
if(cell.relWidth){
cell.width=cell.unitWidth=((cell.relWidth/_10e)*(100-_10f))+"%";
}
});
}
return _10d;
},addRowsDef:function(_111){
var _112=[];
if(_f1.isArray(_111)){
if(_f1.isArray(_111[0])){
for(var i=0,row;_111&&(row=_111[i]);i++){
_112.push(this.addRowDef(i,row));
}
}else{
_112.push(this.addRowDef(0,_111));
}
}
return _112;
},addViewDef:function(_113){
this._defaultCellProps=_113.defaultCell||{};
if(_113.width&&_113.width=="auto"){
delete _113.width;
}
return _f1.mixin({},_113,{cells:this.addRowsDef(_113.rows||_113.cells)});
},setStructure:function(_114){
this.fieldIndex=0;
this.cells=[];
var s=this.structure=[];
if(this.grid.rowSelector){
var sel={type:_ee._scopeName+".grid._RowSelector"};
if(_f1.isString(this.grid.rowSelector)){
var _115=this.grid.rowSelector;
if(_115=="false"){
sel=null;
}else{
if(_115!="true"){
sel["width"]=_115;
}
}
}else{
if(!this.grid.rowSelector){
sel=null;
}
}
if(sel){
s.push(this.addViewDef(sel));
}
}
var _116=function(def){
return ("name" in def||"field" in def||"get" in def);
};
var _117=function(def){
if(_f1.isArray(def)){
if(_f1.isArray(def[0])||_116(def[0])){
return true;
}
}
return false;
};
var _118=function(def){
return (def!==null&&_f1.isObject(def)&&("cells" in def||"rows" in def||("type" in def&&!_116(def))));
};
if(_f1.isArray(_114)){
var _119=false;
for(var i=0,st;(st=_114[i]);i++){
if(_118(st)){
_119=true;
break;
}
}
if(!_119){
s.push(this.addViewDef({cells:_114}));
}else{
for(i=0;(st=_114[i]);i++){
if(_117(st)){
s.push(this.addViewDef({cells:st}));
}else{
if(_118(st)){
s.push(this.addViewDef(st));
}
}
}
}
}else{
if(_118(_114)){
s.push(this.addViewDef(_114));
}
}
this.cellCount=this.cells.length;
this.grid.setupHeaderMenu();
}});
});
},"dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(dojo,_11a,has,_11b,_11c,lang,xhr,json,_11d){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _11e=dojo.i18n={},_11f=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_120=function(root,_121,_122,_123){
for(var _124=[_122+_123],_125=_121.split("-"),_126="",i=0;i<_125.length;i++){
_126+=(_126?"-":"")+_125[i];
if(!root||root[_126]){
_124.push(_122+_126+"/"+_123);
}
}
return _124;
},_127={},_128=function(_129,_12a,_12b){
_12b=_12b?_12b.toLowerCase():dojo.locale;
_129=_129.replace(/\./g,"/");
_12a=_12a.replace(/\./g,"/");
return (/root/i.test(_12b))?(_129+"/nls/"+_12a):(_129+"/nls/"+_12b+"/"+_12a);
},_12c=dojo.getL10nName=function(_12d,_12e,_12f){
return _12d=_11d.id+"!"+_128(_12d,_12e,_12f);
},_130=function(_131,_132,_133,_134,_135,load){
_131([_132],function(root){
var _136=lang.clone(root.root),_137=_120(!root._v1x&&root,_135,_133,_134);
_131(_137,function(){
for(var i=1;i<_137.length;i++){
_136=lang.mixin(lang.clone(_136),arguments[i]);
}
var _138=_132+"/"+_135;
_127[_138]=_136;
load();
});
});
},_139=function(id,_13a){
return /^\./.test(id)?_13a(id):id;
},_13b=function(_13c){
var list=_11c.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_13c);
return list;
},load=function(id,_13d,load){
if(has("dojo-preload-i18n-Api")){
var _13e=id.split("*"),_13f=_13e[1]=="preload";
if(_13f){
if(!_127[id]){
_127[id]=1;
_140(_13e[2],json.parse(_13e[3]),1,_13d);
}
load(1);
}
if(_13f||_141(id,_13d,load)){
return;
}
}
var _142=_11f.exec(id),_143=_142[1]+"/",_144=_142[5]||_142[4],_145=_143+_144,_146=(_142[5]&&_142[4]),_147=_146||dojo.locale,_148=_145+"/"+_147,_149=_146?[_147]:_13b(_147),_14a=_149.length,_14b=function(){
if(!--_14a){
load(lang.delegate(_127[_148]));
}
};
_11b.forEach(_149,function(_14c){
var _14d=_145+"/"+_14c;
if(has("dojo-preload-i18n-Api")){
_14e(_14d);
}
if(!_127[_14d]){
_130(_13d,_145,_143,_144,_14c,_14b);
}else{
_14b();
}
});
};
if(has("dojo-unit-tests")){
var _14f=_11e.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _150=_11e.normalizeLocale=function(_151){
var _152=_151?_151.toLowerCase():dojo.locale;
return _152=="root"?"ROOT":_152;
},isXd=function(mid,_153){
return (1&&1)?_153.isXdUrl(_11a.toUrl(mid+".js")):true;
},_154=0,_155=[],_140=_11e._preloadLocalizations=function(_156,_157,_158,_159){
_159=_159||_11a;
function _15a(mid,_15b){
if(isXd(mid,_159)||_158){
_159([mid],_15b);
}else{
_165([mid],_15b,_159);
}
};
function _15c(_15d,func){
var _15e=_15d.split("-");
while(_15e.length){
if(func(_15e.join("-"))){
return;
}
_15e.pop();
}
func("ROOT");
};
function _15f(_160){
_160=_150(_160);
_15c(_160,function(loc){
if(_11b.indexOf(_157,loc)>=0){
var mid=_156.replace(/\./g,"/")+"_"+loc;
_154++;
_15a(mid,function(_161){
for(var p in _161){
_127[_11a.toAbsMid(p)+"/"+loc]=_161[p];
}
--_154;
while(!_154&&_155.length){
load.apply(null,_155.shift());
}
});
return true;
}
return false;
});
};
_15f();
_11b.forEach(dojo.config.extraLocale,_15f);
},_141=function(id,_162,load){
if(_154){
_155.push([id,_162,load]);
}
return _154;
},_14e=function(){
};
}
if(1){
var _163={},_164=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_165=function(deps,_166,_167){
var _168=[];
_11b.forEach(deps,function(mid){
var url=_167.toUrl(mid+".js");
function load(text){
var _169=_164(text,_14e,mid,_163);
if(_169===_163){
_168.push(_127[url]=_163.result);
}else{
if(_169 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_169);
_169={};
}
_168.push(_127[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_169:{root:_169,_v1x:1}));
}
};
if(_127[url]){
_168.push(_127[url]);
}else{
var _16a=_167.syncLoadNls(mid);
if(_16a){
_168.push(_16a);
}else{
if(!xhr){
try{
_167.getText(url,true,load);
}
catch(e){
_168.push(_127[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_168.push(_127[url]={});
}});
}
}
}
});
_166&&_166.apply(null,_168);
};
_14e=function(_16b){
for(var _16c,_16d=_16b.split("/"),_16e=dojo.global[_16d[0]],i=1;_16e&&i<_16d.length-1;_16e=_16e[_16d[i++]]){
}
if(_16e){
_16c=_16e[_16d[i]];
if(!_16c){
_16c=_16e[_16d[i].replace(/-/g,"_")];
}
if(_16c){
_127[_16b]=_16c;
}
}
return _16c;
};
_11e.getLocalization=function(_16f,_170,_171){
var _172,_173=_128(_16f,_170,_171);
load(_173,(!isXd(_173,_11a)?function(deps,_174){
_165(deps,_174,_11a);
}:_11a),function(_175){
_172=_175;
});
return _172;
};
if(has("dojo-unit-tests")){
_14f.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _176;
_176=_164("{prop:1}",_14e,"nonsense",_163);
t.is({prop:1},_176);
t.is(undefined,_176[1]);
_176=_164("({prop:1})",_14e,"nonsense",_163);
t.is({prop:1},_176);
t.is(undefined,_176[1]);
_176=_164("{'prop-x':1}",_14e,"nonsense",_163);
t.is({"prop-x":1},_176);
t.is(undefined,_176[1]);
_176=_164("({'prop-x':1})",_14e,"nonsense",_163);
t.is({"prop-x":1},_176);
t.is(undefined,_176[1]);
_176=_164("define({'prop-x':1})",_14e,"nonsense",_163);
t.is(_163,_176);
t.is({"prop-x":1},_163.result);
_176=_164("define('some/module', {'prop-x':1})",_14e,"nonsense",_163);
t.is(_163,_176);
t.is({"prop-x":1},_163.result);
_176=_164("this is total nonsense and should throw an error",_14e,"nonsense",_163);
t.is(_176 instanceof Error,true);
});
});
}
}
return lang.mixin(_11e,{dynamic:true,normalize:_139,load:load,cache:_127});
});
},"dojox/grid/_Grid":function(){
require({cache:{"url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n"}});
define("dojox/grid/_Grid",["dojo/_base/kernel","../main","dojo/_base/declare","./_Events","./_Scroller","./_Layout","./_View","./_ViewManager","./_RowManager","./_FocusManager","./_EditManager","./Selection","./_RowSelector","./util","dijit/_Widget","dijit/_TemplatedMixin","dijit/CheckedMenuItem","dojo/text!./resources/_Grid.html","dojo/string","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojox/html/metrics","dojo/_base/html","dojo/query","dojo/dnd/common","dojo/i18n!dijit/nls/loading"],function(dojo,_177,_178,_179,_17a,_17b,_17c,_17d,_17e,_17f,_180,_181,_182,util,_183,_184,_185,_186,_187,_188,lang,has,_189,html,_18a){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
var _18b=_178("dojox.grid._Grid",[_183,_184,_179],{templateString:_186,classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,summary:"",_setSummaryAttr:"domNode",sortInfo:0,_placeholders:null,_layoutClass:_17b,buildRendering:function(){
this.inherited(arguments);
if(!this.domNode.getAttribute("tabIndex")){
this.domNode.tabIndex="0";
}
this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
this.createSelection();
this.connect(this.selection,"onSelected","onSelected");
this.connect(this.selection,"onDeselected","onDeselected");
this.connect(this.selection,"onChanged","onSelectionChanged");
_189.initOnFontResize();
this.connect(_189,"onFontResize","textSizeChanged");
util.funnelEvents(this.domNode,this,"doKeyEvent",util.keyEvents);
if(this.selectionMode!="none"){
this.domNode.setAttribute("aria-multiselectable",this.selectionMode=="single"?"false":"true");
}
html.addClass(this.domNode,this.classTag);
if(!this.isLeftToRight()){
html.addClass(this.domNode,this.classTag+"Rtl");
}
},postMixInProperties:function(){
this.inherited(arguments);
var _18c=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_187.substitute(this.loadingMessage,_18c);
this.errorMessage=_187.substitute(this.errorMessage,_18c);
if(this.srcNodeRef&&this.srcNodeRef.style.height){
this.height=this.srcNodeRef.style.height;
}
this._setAutoHeightAttr(this.autoHeight,true);
this.lastScrollTop=this.scrollTop=0;
},postCreate:function(){
this._placeholders=[];
this._setHeaderMenuAttr(this.headerMenu);
this._setStructureAttr(this.structure);
this._click=[];
this.inherited(arguments);
if(this.domNode&&this.autoWidth&&this.initialWidth){
this.domNode.style.width=this.initialWidth;
}
if(this.domNode&&!this.editable){
html.attr(this.domNode,"aria-readonly","true");
}
},destroy:function(){
this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
delete this._click;
if(this.scroller){
this.scroller.destroy();
delete this.scroller;
}
this.edit.destroy();
delete this.edit;
this.views.destroyViews();
if(this.focus){
this.focus.destroy();
delete this.focus;
}
if(this.headerMenu&&this._placeholders.length){
_188.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.inherited(arguments);
},_setAutoHeightAttr:function(ah,_18d){
if(typeof ah=="string"){
if(!ah||ah=="false"){
ah=false;
}else{
if(ah=="true"){
ah=true;
}else{
ah=window.parseInt(ah,10);
}
}
}
if(typeof ah=="number"){
if(isNaN(ah)){
ah=false;
}
if(ah<0){
ah=true;
}else{
if(ah===0){
ah=false;
}
}
}
this.autoHeight=ah;
if(typeof ah=="boolean"){
this._autoHeight=ah;
}else{
if(typeof ah=="number"){
this._autoHeight=(ah>=this.get("rowCount"));
}else{
this._autoHeight=false;
}
}
if(this._started&&!_18d){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new _17e(this);
this.focus=new _17f(this);
this.edit=new _180(this);
},createSelection:function(){
this.selection=new _181(this);
},createScroller:function(){
this.scroller=new _17a();
this.scroller.grid=this;
this.scroller.renderRow=lang.hitch(this,"renderRow");
this.scroller.removeRow=lang.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.update();
},onResizeColumn:function(_18e){
},createViews:function(){
this.views=new _17d(this);
this.views.createView=lang.hitch(this,"createView");
},createView:function(_18f,idx){
var c=lang.getObject(_18f);
var view=new c({grid:this,index:idx});
this.viewsNode.appendChild(view.domNode);
this.viewsHeaderNode.appendChild(view.headerNode);
this.views.addView(view);
html.attr(this.domNode,"align",this.isLeftToRight()?"left":"right");
return view;
},buildViews:function(){
for(var i=0,vs;(vs=this.layout.structure[i]);i++){
this.createView(vs.type||_177._scopeName+".grid._View",i).setStructure(vs);
}
this.scroller.setContentNodes(this.views.getContentNodes());
},_setStructureAttr:function(_190){
var s=_190;
if(s&&lang.isString(s)){
dojo.deprecated("dojox.grid._Grid.set('structure', 'objVar')","use dojox.grid._Grid.set('structure', objVar) instead","2.0");
s=lang.getObject(s);
}
this.structure=s;
if(!s){
if(this.layout.structure){
s=this.layout.structure;
}else{
return;
}
}
this.views.destroyViews();
this.focus.focusView=null;
if(s!==this.layout.structure){
this.layout.setStructure(s);
}
this._structureChanged();
},setStructure:function(_191){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_191);
},getColumnTogglingItems:function(){
var _192,_193=[];
_192=_188.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new _185({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_194){
if(self.layout.setColumnVisibility(this._gridCell.index,_194)){
var _195=this._gridCell.menuItems;
if(_195.length>1){
_188.forEach(_195,function(item){
if(item!==this){
item.setAttribute("checked",_194);
}
},this);
}
_194=_188.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
_188.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_194.length==1){
_188.forEach(_194[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var _196=_188.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(_196,1);
delete this._gridCell;
_185.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
if(!cell.hidden){
_193.push(item);
}
return item;
},this);
if(_193.length==1){
_193[0].set("disabled",true);
}
return _192;
},_setHeaderMenuAttr:function(menu){
if(this._placeholders&&this._placeholders.length){
_188.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this._placeholders=[];
}
if(this.headerMenu){
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.headerMenu=menu;
if(!menu){
return;
}
this.headerMenu.bindDomNode(this.viewsHeaderNode);
if(this.headerMenu.getPlaceholders){
this._placeholders=this.headerMenu.getPlaceholders(this.placeholderLabel);
}
},setHeaderMenu:function(menu){
dojo.deprecated("dojox.grid._Grid.setHeaderMenu(obj)","use dojox.grid._Grid.set('headerMenu', obj) instead.","2.0");
this._setHeaderMenuAttr(menu);
},setupHeaderMenu:function(){
if(this._placeholders&&this._placeholders.length){
_188.forEach(this._placeholders,function(p){
if(p._replaced){
p.unReplace(true);
}
p.replace(this.getColumnTogglingItems());
},this);
}
},_fetch:function(_197){
this.setScrollTop(0);
},getItem:function(_198){
return null;
},showMessage:function(_199){
if(_199){
this.messagesNode.innerHTML=_199;
this.messagesNode.style.display="";
}else{
this.messagesNode.innerHTML="";
this.messagesNode.style.display="none";
}
},_structureChanged:function(){
this.buildViews();
if(this.autoRender&&this._started){
this.render();
}
},hasLayout:function(){
return this.layout.cells.length;
},resize:function(_19a,_19b){
if(dojo.isIE&&!_19a&&!_19b&&this._autoHeight){
return;
}
this._pendingChangeSize=_19a;
this._pendingResultSize=_19b;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||html._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_19c,_19d){
_19c=_19c||this._pendingChangeSize;
_19d=_19d||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _19e=this._getPadBorder();
var hh=undefined;
var h;
if(this._autoHeight){
this.domNode.style.height="auto";
}else{
if(typeof this.autoHeight=="number"){
h=hh=this._getHeaderHeight();
h+=(this.scroller.averageRowHeight*this.autoHeight);
this.domNode.style.height=h+"px";
}else{
if(this.domNode.clientHeight<=_19e.h){
if(pn==document.body){
this.domNode.style.height=this.defaultHeight;
}else{
if(this.height){
this.domNode.style.height=this.height;
}else{
this.fitTo="parent";
}
}
}
}
}
if(_19d){
_19c=_19d;
}
if(!this._autoHeight&&_19c){
html.marginBox(this.domNode,_19c);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=this._parentContentBoxHeight||html._getContentBox(pn).h;
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _19f=_188.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||html._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_19f&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_19f){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _1a0=(!this.initialWidth&&this.autoWidth);
var w=_1a0?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_1a0){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_1a1){
var t=_1a1===undefined?this._getHeaderHeight():_1a1;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _1a2=0,_1a3=0;
var _1a4=_188.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_1a2++;
}else{
_1a3++;
}
return (!has);
});
if(_1a2>0&&_1a3>0){
_188.forEach(_1a4,function(v){
v.adaptHeight(true);
});
}
}
if(this.autoHeight===true||h!=-1||(typeof this.autoHeight=="number"&&this.autoHeight>=this.get("rowCount"))){
this.scroller.windowHeight=h;
}else{
this.scroller.windowHeight=Math.max(this.domNode.clientHeight-t,0);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.autoRender){
this.render();
}
},render:function(){
if(!this.domNode){
return;
}
if(!this._started){
return;
}
if(!this.hasLayout()){
this.scroller.init(0,this.keepRows,this.rowsPerPage);
return;
}
this.update=this.defaultUpdate;
this._render();
},_render:function(){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender();
},prerender:function(){
this.keepRows=this._autoHeight?0:this.keepRows;
this.scroller.setKeepInfo(this.keepRows);
this.views.render();
this._resize();
},postrender:function(){
this.postresize();
this.focus.initFocusView();
html.setSelectable(this.domNode,this.selectable);
},postresize:function(){
if(this._autoHeight){
var size=Math.max(this.views.measureContent())+"px";
this.viewsNode.style.height=size;
}
},renderRow:function(_1a5,_1a6){
this.views.renderRow(_1a5,_1a6,this._skipRowRenormalize);
},rowRemoved:function(_1a7){
this.views.rowRemoved(_1a7);
},invalidated:null,updating:false,beginUpdate:function(){
this.invalidated=[];
this.updating=true;
},endUpdate:function(){
this.updating=false;
var i=this.invalidated,r;
if(i.all){
this.update();
}else{
if(i.rowCount!=undefined){
this.updateRowCount(i.rowCount);
}else{
for(r in i){
this.updateRow(Number(r));
}
}
}
this.invalidated=[];
},defaultUpdate:function(){
if(!this.domNode){
return;
}
if(this.updating){
this.invalidated.all=true;
return;
}
this.lastScrollTop=this.scrollTop;
this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.lastScrollTop);
this.postrender();
},update:function(){
this.render();
},updateRow:function(_1a8){
_1a8=Number(_1a8);
if(this.updating){
this.invalidated[_1a8]=true;
}else{
this.views.updateRow(_1a8);
this.scroller.rowHeightChanged(_1a8);
}
},updateRows:function(_1a9,_1aa){
_1a9=Number(_1a9);
_1aa=Number(_1aa);
var i;
if(this.updating){
for(i=0;i<_1aa;i++){
this.invalidated[i+_1a9]=true;
}
}else{
for(i=0;i<_1aa;i++){
this.views.updateRow(i+_1a9,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_1a9);
}
},updateRowCount:function(_1ab){
if(this.updating){
this.invalidated.rowCount=_1ab;
}else{
this.rowCount=_1ab;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_1ab);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_1ac){
this.views.updateRowStyles(_1ac);
},getRowNode:function(_1ad){
if(this.focus.focusView&&!(this.focus.focusView instanceof _182)){
return this.focus.focusView.rowNodes[_1ad];
}else{
for(var i=0,_1ae;(_1ae=this.views.views[i]);i++){
if(!(_1ae instanceof _182)){
return _1ae.rowNodes[_1ad];
}
}
}
return null;
},rowHeightChanged:function(_1af){
this.views.renormalizeRow(_1af);
this.scroller.rowHeightChanged(_1af);
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(has("ie")?100:50),scrollTo:function(_1b0){
if(!this.fastScroll){
this.setScrollTop(_1b0);
return;
}
var _1b1=Math.abs(this.lastScrollTop-_1b0);
this.lastScrollTop=_1b0;
if(_1b1>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.scrollTop=_1b0;
this.views.setScrollTop(_1b0);
if(this._pendingScroll){
window.clearTimeout(this._pendingScroll);
}
var _1b2=this;
this._pendingScroll=window.setTimeout(function(){
delete _1b2._pendingScroll;
_1b2.finishScrollJob();
},200);
}else{
this.setScrollTop(_1b0);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(_1b3){
this.scroller.scroll(this.views.setScrollTop(_1b3));
},scrollToRow:function(_1b4){
this.setScrollTop(this.scroller.findScrollTop(_1b4)+1);
},styleRowNode:function(_1b5,_1b6){
if(_1b6){
this.rows.styleRowNode(_1b5,_1b6);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_1b7){
return this.layout.cells[_1b7];
},setCellWidth:function(_1b8,_1b9){
this.getCell(_1b8).unitWidth=_1b9;
},getCellName:function(_1ba){
return "Cell "+_1ba.index;
},canSort:function(_1bb){
},sort:function(){
},getSortAsc:function(_1bc){
_1bc=_1bc==undefined?this.sortInfo:_1bc;
return Boolean(_1bc>0);
},getSortIndex:function(_1bd){
_1bd=_1bd==undefined?this.sortInfo:_1bd;
return Math.abs(_1bd)-1;
},setSortIndex:function(_1be,_1bf){
var si=_1be+1;
if(_1bf!=undefined){
si*=(_1bf?1:-1);
}else{
if(this.getSortIndex()==_1be){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_1c0){
if(this.canSort(_1c0)){
this.sortInfo=_1c0;
this.sort();
this.update();
}
},doKeyEvent:function(e){
e.dispatch="do"+e.type;
this.onKeyEvent(e);
},_dispatch:function(m,e){
if(m in this){
return this[m](e);
}
return false;
},dispatchKeyEvent:function(e){
this._dispatch(e.dispatch,e);
},dispatchContentEvent:function(e){
this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e);
},dispatchHeaderEvent:function(e){
e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e);
},dokeydown:function(e){
this.onKeyDown(e);
},doclick:function(e){
if(e.cellNode){
this.onCellClick(e);
}else{
this.onRowClick(e);
}
},dodblclick:function(e){
if(e.cellNode){
this.onCellDblClick(e);
}else{
this.onRowDblClick(e);
}
},docontextmenu:function(e){
if(e.cellNode){
this.onCellContextMenu(e);
}else{
this.onRowContextMenu(e);
}
},doheaderclick:function(e){
if(e.cellNode){
this.onHeaderCellClick(e);
}else{
this.onHeaderClick(e);
}
},doheaderdblclick:function(e){
if(e.cellNode){
this.onHeaderCellDblClick(e);
}else{
this.onHeaderDblClick(e);
}
},doheadercontextmenu:function(e){
if(e.cellNode){
this.onHeaderCellContextMenu(e);
}else{
this.onHeaderContextMenu(e);
}
},doStartEdit:function(_1c1,_1c2){
this.onStartEdit(_1c1,_1c2);
},doApplyCellEdit:function(_1c3,_1c4,_1c5){
this.onApplyCellEdit(_1c3,_1c4,_1c5);
},doCancelEdit:function(_1c6){
this.onCancelEdit(_1c6);
},doApplyEdit:function(_1c7){
this.onApplyEdit(_1c7);
},addRow:function(){
this.updateRowCount(this.get("rowCount")+1);
},removeSelectedRows:function(){
if(this.allItemsSelected){
this.updateRowCount(0);
}else{
this.updateRowCount(Math.max(0,this.get("rowCount")-this.selection.getSelected().length));
}
this.selection.clear();
}});
_18b.markupFactory=function(_1c8,node,ctor,_1c9){
var _1ca=function(n){
var w=html.attr(n,"width")||"auto";
if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){
w=parseInt(w,10)+"px";
}
return w;
};
if(!_1c8.structure&&node.nodeName.toLowerCase()=="table"){
_1c8.structure=_18a("> colgroup",node).map(function(cg){
var sv=html.attr(cg,"span");
var v={noscroll:(html.attr(cg,"noscroll")=="true")?true:false,__span:(!!sv?parseInt(sv,10):1),cells:[]};
if(html.hasAttr(cg,"width")){
v.width=_1ca(cg);
}
return v;
});
if(!_1c8.structure.length){
_1c8.structure.push({__span:Infinity,cells:[]});
}
_18a("thead > tr",node).forEach(function(tr,_1cb){
var _1cc=0;
var _1cd=0;
var _1ce;
var _1cf=null;
_18a("> th",tr).map(function(th){
if(!_1cf){
_1ce=0;
_1cf=_1c8.structure[0];
}else{
if(_1cc>=(_1ce+_1cf.__span)){
_1cd++;
_1ce+=_1cf.__span;
var _1d0=_1cf;
_1cf=_1c8.structure[_1cd];
}
}
var cell={name:lang.trim(html.attr(th,"name")||th.innerHTML),colSpan:parseInt(html.attr(th,"colspan")||1,10),type:lang.trim(html.attr(th,"cellType")||""),id:lang.trim(html.attr(th,"id")||"")};
_1cc+=cell.colSpan;
var _1d1=html.attr(th,"rowspan");
if(_1d1){
cell.rowSpan=_1d1;
}
if(html.hasAttr(th,"width")){
cell.width=_1ca(th);
}
if(html.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(html.attr(th,"relWidth"),10);
}
if(html.hasAttr(th,"hidden")){
cell.hidden=(html.attr(th,"hidden")=="true"||html.attr(th,"hidden")===true);
}
if(_1c9){
_1c9(th,cell);
}
cell.type=cell.type?lang.getObject(cell.type):_177.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!_1cf.cells[_1cb]){
_1cf.cells[_1cb]=[];
}
_1cf.cells[_1cb].push(cell);
});
});
}
return new ctor(_1c8,node);
};
return _18b;
});
},"dojox/main":function(){
define("dojox/main",["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_1d2,_1d3,_1d4,lang,has,win,dom,_1d5,_1d6,_1d7,on,_1d8,dnd,_1d9){
return _1d3("dojo.dnd.Mover",[_1d7],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[on(d,_1d8.move,lang.hitch(this,"onFirstMove")),on(d,_1d8.move,lang.hitch(this,"onMouseMove")),on(d,_1d8.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_1d4.stop),on(d.body,"selectstart",_1d4.stop)];
_1d9.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_1d9.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
_1d4.stop(e);
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
_1d4.stop(e);
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
var m=_1d5.getMarginBox(this.node);
var b=win.doc.body;
var bs=_1d6.getComputedStyle(b);
var bm=_1d5.getMarginBox(b,bs);
var bc=_1d5.getContentBox(b,bs);
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
_1d2.forEach(this.events,function(_1da){
_1da.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"dojo/Stateful":function(){
define(["./_base/declare","./_base/lang","./_base/array","dojo/when"],function(_1db,lang,_1dc,when){
return _1db("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
return (apn[name]={s:"_"+name+"Setter",g:"_"+name+"Getter"});
},postscript:function(_1dd){
if(_1dd){
this.set(_1dd);
}
},_get:function(name,_1de){
return typeof this[_1de.g]==="function"?this[_1de.g]():this[name];
},get:function(name){
return this._get(name,this._getAttrNames(name));
},set:function(name,_1df){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _1e0=this._getAttrNames(name),_1e1=this._get(name,_1e0),_1e2=this[_1e0.s],_1e3;
if(typeof _1e2==="function"){
_1e3=_1e2.apply(this,Array.prototype.slice.call(arguments,1));
}else{
this[name]=_1df;
}
if(this._watchCallbacks){
var self=this;
when(_1e3,function(){
self._watchCallbacks(name,_1e1,_1df);
});
}
return this;
},_changeAttrValue:function(name,_1e4){
var _1e5=this.get(name);
this[name]=_1e4;
if(this._watchCallbacks){
this._watchCallbacks(name,_1e5,_1e4);
}
return this;
},watch:function(name,_1e6){
var _1e7=this._watchCallbacks;
if(!_1e7){
var self=this;
_1e7=this._watchCallbacks=function(name,_1e8,_1e9,_1ea){
var _1eb=function(_1ec){
if(_1ec){
_1ec=_1ec.slice();
for(var i=0,l=_1ec.length;i<l;i++){
_1ec[i].call(self,name,_1e8,_1e9);
}
}
};
_1eb(_1e7["_"+name]);
if(!_1ea){
_1eb(_1e7["*"]);
}
};
}
if(!_1e6&&typeof name==="function"){
_1e6=name;
name="*";
}else{
name="_"+name;
}
var _1ed=_1e7[name];
if(typeof _1ed!=="object"){
_1ed=_1e7[name]=[];
}
_1ed.push(_1e6);
var _1ee={};
_1ee.unwatch=_1ee.remove=function(){
var _1ef=_1dc.indexOf(_1ed,_1e6);
if(_1ef>-1){
_1ed.splice(_1ef,1);
}
};
return _1ee;
}});
});
},"dojo/touch":function(){
define(["./_base/kernel","./_base/lang","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(dojo,lang,_1f0,dom,on,has,_1f1,_1f2,win){
var _1f3=has("touch");
var _1f4,_1f5;
if(_1f3){
_1f2(function(){
_1f5=win.body();
win.doc.addEventListener("touchstart",function(evt){
var _1f6=_1f5;
_1f5=evt.target;
on.emit(_1f6,"dojotouchout",{target:_1f6,relatedTarget:_1f5,bubbles:true});
on.emit(_1f5,"dojotouchover",{target:_1f5,relatedTarget:_1f6,bubbles:true});
},true);
on(win.doc,"touchmove",function(evt){
var _1f7=win.doc.elementFromPoint(evt.pageX-win.global.pageXOffset,evt.pageY-win.global.pageYOffset);
if(_1f7&&_1f5!==_1f7){
on.emit(_1f5,"dojotouchout",{target:_1f5,relatedTarget:_1f7,bubbles:true});
on.emit(_1f7,"dojotouchover",{target:_1f7,relatedTarget:_1f5,bubbles:true});
_1f5=_1f7;
}
});
});
_1f4=function(node,_1f8){
return on(win.doc,"touchmove",function(evt){
if(node===win.doc||dom.isDescendant(_1f5,node)){
_1f8.call(this,lang.mixin({},evt,{target:_1f5}));
}
});
};
}
function _1f9(type){
return function(node,_1fa){
return on(node,type,_1fa);
};
};
var _1fb={press:_1f9(_1f3?"touchstart":"mousedown"),move:_1f3?_1f4:_1f9("mousemove"),release:_1f9(_1f3?"touchend":"mouseup"),cancel:_1f3?_1f9("touchcancel"):_1f1.leave,over:_1f9(_1f3?"dojotouchover":"mouseover"),out:_1f9(_1f3?"dojotouchout":"mouseout"),enter:_1f1._eventHandler(_1f3?"dojotouchover":"mouseover"),leave:_1f1._eventHandler(_1f3?"dojotouchout":"mouseout")};
1&&(dojo.touch=_1fb);
return _1fb;
});
},"dojox/grid/Selection":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-attr"],function(_1fc,_1fd,lang,_1fe){
return _1fc("dojox.grid.Selection",null,{constructor:function(_1ff){
this.grid=_1ff;
this.selected=[];
this.setMode(_1ff.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_200){
return this.grid.onCanSelect(_200);
},onCanDeselect:function(_201){
return this.grid.onCanDeselect(_201);
},onSelected:function(_202){
},onDeselected:function(_203){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_204){
if(this.mode=="none"){
return false;
}
return this.selected[_204];
},getFirstSelected:function(){
if(!this.selected.length||this.mode=="none"){
return -1;
}
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getNextSelected:function(_205){
if(this.mode=="none"){
return -1;
}
for(var i=_205+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _206=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_206.push(i);
}
}
return _206;
},getSelectedCount:function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
},_beginUpdate:function(){
if(this.updating===0){
this.onChanging();
}
this.updating++;
},_endUpdate:function(){
this.updating--;
if(this.updating===0){
this.onChanged();
}
},select:function(_207){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_207);
this.addToSelection(_207);
}else{
this.toggleSelect(_207);
}
},addToSelection:function(_208){
if(this.mode=="none"){
return;
}
if(lang.isArray(_208)){
_1fd.forEach(_208,this.addToSelection,this);
return;
}
_208=Number(_208);
if(this.selected[_208]){
this.selectedIndex=_208;
}else{
if(this.onCanSelect(_208)!==false){
this.selectedIndex=_208;
var _209=this.grid.getRowNode(_208);
if(_209){
_1fe.set(_209,"aria-selected","true");
}
this._beginUpdate();
this.selected[_208]=true;
this.onSelected(_208);
this._endUpdate();
}
}
},deselect:function(_20a){
if(this.mode=="none"){
return;
}
if(lang.isArray(_20a)){
_1fd.forEach(_20a,this.deselect,this);
return;
}
_20a=Number(_20a);
if(this.selectedIndex==_20a){
this.selectedIndex=-1;
}
if(this.selected[_20a]){
if(this.onCanDeselect(_20a)===false){
return;
}
var _20b=this.grid.getRowNode(_20a);
if(_20b){
_1fe.set(_20b,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_20a];
this.onDeselected(_20a);
this._endUpdate();
}
},setSelected:function(_20c,_20d){
this[(_20d?"addToSelection":"deselect")](_20c);
},toggleSelect:function(_20e){
if(lang.isArray(_20e)){
_1fd.forEach(_20e,this.toggleSelect,this);
return;
}
this.setSelected(_20e,!this.selected[_20e]);
},_range:function(_20f,inTo,func){
var s=(_20f>=0?_20f:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_210,inTo){
this._range(_210,inTo,lang.hitch(this,"addToSelection"));
},deselectRange:function(_211,inTo){
this._range(_211,inTo,lang.hitch(this,"deselect"));
},insert:function(_212){
this.selected.splice(_212,0,false);
if(this.selectedIndex>=_212){
this.selectedIndex++;
}
},remove:function(_213){
this.selected.splice(_213,1);
if(this.selectedIndex>=_213){
this.selectedIndex--;
}
},deselectAll:function(_214){
for(var i in this.selected){
if((i!=_214)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_215,_216,_217){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_215);
}else{
var _218=this.selectedIndex;
if(!_216){
this.deselectAll(_215);
}
if(_217){
this.selectRange(_218,_215);
}else{
if(_216){
this.toggleSelect(_215);
}else{
this.addToSelection(_215);
}
}
}
this._endUpdate();
},clickSelectEvent:function(e){
this.clickSelect(e.rowIndex,dojo.isCopyKey(e),e.shiftKey);
},clear:function(){
this._beginUpdate();
this.deselectAll();
this._endUpdate();
}});
});
},"dijit/_CssStateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/window","./registry"],function(_219,_21a,dom,_21b,lang,on,_21c,win,_21d){
var _21e=_21a("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_219.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","_opened"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode,this.baseClass);
this._setStateClass();
},_cssMouseEvent:function(_21f){
if(!this.disabled){
switch(_21f.type){
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
var _220=this.baseClass.split(" ");
function _221(_222){
_220=_220.concat(_219.map(_220,function(c){
return c+_222;
}),"dijit"+_222);
};
if(!this.isLeftToRight()){
_221("Rtl");
}
var _223=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_221(_223);
}
if(this.state){
_221(this.state);
}
if(this.selected){
_221("Selected");
}
if(this._opened){
_221("Opened");
}
if(this.disabled){
_221("Disabled");
}else{
if(this.readOnly){
_221("ReadOnly");
}else{
if(this.active){
_221("Active");
}else{
if(this.hovering){
_221("Hover");
}
}
}
}
if(this.focused){
_221("Focused");
}
var tn=this.stateNode||this.domNode,_224={};
_219.forEach(tn.className.split(" "),function(c){
_224[c]=true;
});
if("_stateClasses" in this){
_219.forEach(this._stateClasses,function(c){
delete _224[c];
});
}
_219.forEach(_220,function(c){
_224[c]=true;
});
var _225=[];
for(var c in _224){
_225.push(c);
}
tn.className=_225.join(" ");
this._stateClasses=_220;
},_subnodeCssMouseEvent:function(node,_226,evt){
if(this.disabled||this.readOnly){
return;
}
function _227(_228){
_21b.toggle(node,_226+"Hover",_228);
};
function _229(_22a){
_21b.toggle(node,_226+"Active",_22a);
};
function _22b(_22c){
_21b.toggle(node,_226+"Focused",_22c);
};
switch(evt.type){
case "mouseover":
_227(true);
break;
case "mouseout":
_227(false);
_229(false);
break;
case "mousedown":
case "touchstart":
_229(true);
break;
case "mouseup":
case "touchend":
_229(false);
break;
case "focus":
case "focusin":
_22b(true);
break;
case "blur":
case "focusout":
_22b(false);
break;
}
},_trackMouseState:function(node,_22d){
node._cssState=_22d;
}});
_21c(function(){
function _22e(evt){
if(!dom.isDescendant(evt.relatedTarget,evt.target)){
for(var node=evt.target;node&&node!=evt.relatedTarget;node=node.parentNode){
if(node._cssState){
var _22f=_21d.getEnclosingWidget(node);
if(_22f){
if(node==_22f.domNode){
_22f._cssMouseEvent(evt);
}else{
_22f._subnodeCssMouseEvent(node,node._cssState,evt);
}
}
}
}
}
};
function _230(evt){
evt.target=evt.srcElement;
_22e(evt);
};
var body=win.body();
_219.forEach(["mouseover","mouseout","mousedown","touchstart","mouseup","touchend"],function(type){
if(body.addEventListener){
body.addEventListener(type,_22e,true);
}else{
body.attachEvent("on"+type,_230);
}
});
on(body,"focusin, focusout",function(evt){
var node=evt.target;
if(node._cssState&&!node.getAttribute("widgetId")){
var _231=_21d.getEnclosingWidget(node);
_231._subnodeCssMouseEvent(node,node._cssState,evt);
}
});
});
return _21e;
});
},"url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n","dojox/grid/_RowManager":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-class"],function(_232,lang,_233){
var _234=function(_235,_236){
if(_235.style.cssText==undefined){
_235.setAttribute("style",_236);
}else{
_235.style.cssText=_236;
}
};
return _232("dojox.grid._RowManager",null,{constructor:function(_237){
this.grid=_237;
},linesToEms:2,overRow:-2,prepareStylingRow:function(_238,_239){
return {index:_238,node:_239,odd:Boolean(_238&1),selected:!!this.grid.selection.isSelected(_238),over:this.isOver(_238),customStyles:"",customClasses:"dojoxGridRow"};
},styleRowNode:function(_23a,_23b){
var row=this.prepareStylingRow(_23a,_23b);
this.grid.onStyleRow(row);
this.applyStyles(row);
},applyStyles:function(_23c){
var i=_23c;
i.node.className=i.customClasses;
var h=i.node.style.height;
_234(i.node,i.customStyles+";"+(i.node._style||""));
i.node.style.height=h;
},updateStyles:function(_23d){
this.grid.updateRowStyles(_23d);
},setOverRow:function(_23e){
var last=this.overRow;
this.overRow=_23e;
if((last!=this.overRow)&&(lang.isString(last)||last>=0)){
this.updateStyles(last);
}
this.updateStyles(this.overRow);
},isOver:function(_23f){
return (this.overRow==_23f&&!_233.contains(this.grid.domNode,"dojoxGridColumnResizing"));
}});
});
},"dojo/hccss":function(){
define(["require","./_base/config","./dom-class","./dom-construct","./dom-style","./has","./ready","./_base/window"],function(_240,_241,_242,_243,_244,has,_245,win){
has.add("highcontrast",function(){
var div=win.doc.createElement("div");
div.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_241.blankGif||_240.toUrl("./resources/blank.gif"))+");";
win.body().appendChild(div);
var cs=_244.getComputedStyle(div),_246=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_246&&(_246=="none"||_246=="url(invalid-url:)"));
_243.destroy(div);
return hc;
});
_245(90,function(){
if(has("highcontrast")){
_242.add(win.body(),"dj_a11y");
}
});
return has;
});
},"dojo/string":function(){
define(["./_base/kernel","./_base/lang"],function(_247,lang){
var _248={};
lang.setObject("dojo.string",_248);
_248.rep=function(str,num){
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
_248.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_248.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_248.substitute=function(_249,map,_24a,_24b){
_24b=_24b||_247.global;
_24a=_24a?lang.hitch(_24b,_24a):function(v){
return v;
};
return _249.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_24c,key,_24d){
var _24e=lang.getObject(key,false,map);
if(_24d){
_24e=lang.getObject(_24d,false,_24b).call(_24b,_24e,key);
}
return _24a(_24e,key).toString();
});
};
_248.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _248;
});
},"dojo/dnd/Avatar":function(){
define(["../_base/declare","../_base/window","../dom","../dom-attr","../dom-class","../dom-construct","../hccss","../query"],function(_24f,win,dom,_250,_251,_252,has,_253){
return _24f("dojo.dnd.Avatar",null,{constructor:function(_254){
this.manager=_254;
this.construct();
},construct:function(){
var a=_252.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_255=this.manager.source,node,b=_252.create("tbody",null,a),tr=_252.create("tr",null,b),td=_252.create("td",null,tr),k=Math.min(5,this.manager.nodes.length),i=0;
if(has("highcontrast")){
_252.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td);
}
_252.create("span",{innerHTML:_255.generateText?this._generateText():""},td);
_250.set(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_255.creator){
node=_255._normalizedCreator(_255.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _256=_252.create("table"),_257=_252.create("tbody",null,_256);
_257.appendChild(node);
node=_256;
}
}
node.id="";
tr=_252.create("tr",null,b);
td=_252.create("td",null,tr);
td.appendChild(node);
_250.set(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
_252.destroy(this.node);
this.node=false;
},update:function(){
_251.toggle(this.node,"dojoDndAvatarCanDrop",this.manager.canDropFlag);
if(has("highcontrast")){
var icon=dom.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
_253(("tr.dojoDndAvatarHeader td span"+(has("highcontrast")?" span":"")),this.node).forEach(function(node){
node.innerHTML=this.manager.source.generateText?this._generateText():"";
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
});
},"dojox/grid/_Scroller":function(){
define("dojox/grid/_Scroller",["dijit/registry","dojo/_base/declare","dojo/_base/lang","./util","dojo/_base/html"],function(_258,_259,lang,util,html){
var _25a=function(_25b){
var i=0,n,p=_25b.parentNode;
while((n=p.childNodes[i++])){
if(n==_25b){
return i-1;
}
}
return -1;
};
var _25c=function(_25d){
if(!_25d){
return;
}
dojo.forEach(_258.toArray(),function(w){
if(w.domNode&&html.isDescendant(w.domNode,_25d,true)){
w.destroy();
}
});
};
var _25e=function(_25f){
var node=html.byId(_25f);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _260=function(_261,_262){
var _263=[];
var i=0,n;
while((n=_261.childNodes[i])){
i++;
if(_25e(n)==_262){
_263.push(n);
}
}
return _263;
};
var _264=function(_265){
return _260(_265,"div");
};
return _259("dojox.grid._Scroller",null,{constructor:function(_266){
this.setContentNodes(_266);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_267,_268,_269){
switch(arguments.length){
case 3:
this.rowsPerPage=_269;
case 2:
this.keepRows=_268;
case 1:
this.rowCount=_267;
default:
break;
}
this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
this.setKeepInfo(this.keepRows);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=lang.hitch(this,"onscroll");
}
},_getPageCount:function(_26a,_26b){
return _26a?(Math.ceil(_26a/_26b)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_26c){
this.keepRows=_26c;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_26d){
this.contentNodes=_26d;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0]||[];
},invalidate:function(){
this._invalidating=true;
this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize();
this._invalidating=false;
},updateRowCount:function(_26e){
this.invalidateNodes();
this.rowCount=_26e;
var _26f=this.pageCount;
if(_26f===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_26f){
for(var i=_26f-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_26f){
this.height+=this.defaultPageHeight*(this.pageCount-_26f-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_270){
return Boolean(this.getDefaultPageNode(_270));
},measurePage:function(_271){
if(this.grid.rowHeight){
var _272=this.grid.rowHeight+1;
return ((_271+1)*this.rowsPerPage>this.rowCount?this.rowCount-_271*this.rowsPerPage:this.rowsPerPage)*_272;
}
var n=this.getDefaultPageNode(_271);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_273,_274){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_273].style.top=_274+"px";
}
},repositionPages:function(_275){
var _276=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_276[_275];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_275):0);
for(var p=_275+1;p<=last;p++){
n=_276[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_277){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_277]);
}
},preparePage:function(_278,_279){
var p=(_279?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _27a=this.pageNodes[i];
var _27b=(p===null?this.createPageNode():this.invalidatePageNode(p,_27a));
_27b.pageIndex=_278;
_27a[_278]=_27b;
}
},renderPage:function(_27c){
var _27d=[];
var i,j;
for(i=0;i<this.colCount;i++){
_27d[i]=this.pageNodes[i][_27c];
}
for(i=0,j=_27c*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_27d);
}
},removePage:function(_27e){
for(var i=0,j=_27e*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_27f){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_27f,this.pageNodes[i]);
if(n){
html.destroy(n);
}
}
},pacify:function(_280){
},pacifying:false,pacifyTicks:200,setPacifying:function(_281){
if(this.pacifying!=_281){
this.pacifying=_281;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _282=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _282;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _283=(!this._invalidating);
if(!_283){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_283=true;
}
}
if(_283){
this.needPage(this.page,this.pageTop);
}
var _284=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _285=this.getPageHeight(this.page);
this.averageRowHeight=(_285>0&&_284>0)?(_285/_284):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _286=this.pageCount-1;
var _287=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_286]=_287;
return _287;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_288,_289,_28a){
if(this.pageExists(_288)){
var oh=this.getPageHeight(_288);
var h=(this.measurePage(_288));
if(h===undefined){
h=oh;
}
this.pageHeights[_288]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_289)){
if(!_28a){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_288);
}
}else{
this.repositionPages(_288);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_28b,_28c){
this.updatePageHeight(Math.floor(_28b/this.rowsPerPage),false,_28c);
},invalidateNodes:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
},createPageNode:function(){
var p=document.createElement("div");
html.attr(p,"role","presentation");
p.style.position="absolute";
p.style[this.grid.isLeftToRight()?"left":"right"]="0";
return p;
},getPageHeight:function(_28d){
var ph=this.pageHeights[_28d];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_28e){
return this.stack.push(_28e);
},popPage:function(){
return this.stack.shift();
},findPage:function(_28f){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_28f){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_290,_291,_292){
this.preparePage(_290,_291);
this.positionPage(_290,_292);
this.installPage(_290);
this.renderPage(_290);
this.pushPage(_290);
},needPage:function(_293,_294){
var h=this.getPageHeight(_293),oh=h;
if(!this.pageExists(_293)){
this.buildPage(_293,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_294);
h=this.updatePageHeight(_293,true);
}else{
this.positionPage(_293,_294);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_295){
this.grid.scrollTop=_295;
if(this.colCount){
this.startPacify();
this.findPage(_295);
var h=this.height;
var b=this.getScrollBottom(_295);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_295);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_296){
return (this.windowHeight>=0?_296+this.windowHeight:-1);
},processNodeEvent:function(e,_297){
var t=e.target;
while(t&&(t!=_297)&&t.parentNode&&(t.parentNode.parentNode!=_297)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_297)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_25a(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_298,_299){
},removeRow:function(_29a){
},getDefaultPageNode:function(_29b){
return this.getDefaultNodes()[_29b];
},positionPageNode:function(_29c,_29d){
},getPageNodePosition:function(_29e){
return _29e.offsetTop;
},invalidatePageNode:function(_29f,_2a0){
var p=_2a0[_29f];
if(p){
delete _2a0[_29f];
this.removePage(_29f,p);
_25c(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_2a1){
return _2a1*this.rowsPerPage;
},getLastPageRow:function(_2a2){
return Math.min(this.rowCount,this.getPageRow(_2a2+1))-1;
},getFirstVisibleRow:function(_2a3,_2a4,_2a5){
if(!this.pageExists(_2a3)){
return 0;
}
var row=this.getPageRow(_2a3);
var _2a6=this.getDefaultNodes();
var rows=_264(_2a6[_2a3]);
for(var i=0,l=rows.length;i<l&&_2a4<_2a5;i++,row++){
_2a4+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_2a7,_2a8,_2a9){
if(!this.pageExists(_2a7)){
return 0;
}
var _2aa=this.getDefaultNodes();
var row=this.getLastPageRow(_2a7);
var rows=_264(_2aa[_2a7]);
for(var i=rows.length-1;i>=0&&_2a8>_2a9;i--,row--){
_2a8-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_2ab){
var _2ac=this.getDefaultNodes();
var rows=_264(_2ac[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_2ab){
this.offset=h-(t-_2ab);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_2ad){
var _2ae=Math.floor(_2ad/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_2ae;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_2ae;
this.needPage(_2ae,this.pageTop);
var _2af=this.getDefaultNodes();
var rows=_264(_2af[_2ae]);
var r=_2ad-this.rowsPerPage*_2ae;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
});
},"dojox/grid/_Events":function(){
define("dojox/grid/_Events",["dojo/keys","dojo/dom-class","dojo/_base/declare","dojo/_base/event","dojo/_base/sniff"],function(keys,_2b0,_2b1,_2b2,has){
return _2b1("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
this.dispatchKeyEvent(e);
},onContentEvent:function(e){
this.dispatchContentEvent(e);
},onHeaderEvent:function(e){
this.dispatchHeaderEvent(e);
},onStyleRow:function(_2b3){
var i=_2b3;
i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");
this.focus.styleRow(_2b3);
this.edit.styleRow(_2b3);
},onKeyDown:function(e){
if(e.altKey||e.metaKey){
return;
}
var _2b4;
switch(e.keyCode){
case keys.ESCAPE:
this.edit.cancel();
break;
case keys.ENTER:
if(!this.edit.isEditing()){
_2b4=this.focus.getHeaderIndex();
if(_2b4>=0){
this.setSortIndex(_2b4);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
_2b2.stop(e);
}
if(!e.shiftKey){
var _2b5=this.edit.isEditing();
this.edit.apply();
if(!_2b5){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _2b6=this.focus.focusView||this.views.views[0];
_2b6.content.decorateEvent(e);
this.onRowClick(e);
_2b2.stop(e);
}
break;
case keys.SPACE:
if(!this.edit.isEditing()){
_2b4=this.focus.getHeaderIndex();
if(_2b4>=0){
this.setSortIndex(_2b4);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
_2b2.stop(e);
}
break;
case keys.TAB:
this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
if(!this.edit.isEditing()){
var _2b7=e.keyCode;
_2b2.stop(e);
_2b4=this.focus.getHeaderIndex();
if(_2b4>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_2b4,(_2b7==keys.LEFT_ARROW?-1:1)*5);
}else{
var _2b8=(_2b7==keys.LEFT_ARROW)?1:-1;
if(this.isLeftToRight()){
_2b8*=-1;
}
this.focus.move(0,_2b8);
}
}
break;
case keys.UP_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
_2b2.stop(e);
this.focus.move(-1,0);
}
break;
case keys.DOWN_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
_2b2.stop(e);
this.focus.move(1,0);
}
break;
case keys.PAGE_UP:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
_2b2.stop(e);
if(this.focus.rowIndex!=this.scroller.firstVisibleRow+1){
this.focus.move(this.scroller.firstVisibleRow-this.focus.rowIndex,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex-1));
this.focus.move(this.scroller.firstVisibleRow-this.scroller.lastVisibleRow+1,0);
}
}
break;
case keys.PAGE_DOWN:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
_2b2.stop(e);
if(this.focus.rowIndex!=this.scroller.lastVisibleRow-1){
this.focus.move(this.scroller.lastVisibleRow-this.focus.rowIndex-1,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex+1));
this.focus.move(this.scroller.lastVisibleRow-this.scroller.firstVisibleRow-1,0);
}
}
break;
default:
break;
}
},onMouseOver:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e);
},onMouseOut:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e);
},onMouseDown:function(e){
e.rowIndex==-1?this.onHeaderCellMouseDown(e):this.onCellMouseDown(e);
},onMouseOverRow:function(e){
if(!this.rows.isOver(e.rowIndex)){
this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e);
}
},onMouseOutRow:function(e){
if(this.rows.isOver(-1)){
this.onHeaderMouseOut(e);
}else{
if(!this.rows.isOver(-2)){
this.rows.setOverRow(-2);
this.onRowMouseOut(e);
}
}
},onMouseDownRow:function(e){
if(e.rowIndex!=-1){
this.onRowMouseDown(e);
}
},onCellMouseOver:function(e){
if(e.cellNode){
_2b0.add(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
_2b0.remove(e.cellNode,this.cellOverClass);
}
},onCellMouseDown:function(e){
},onCellClick:function(e){
this._click[0]=this._click[1];
this._click[1]=e;
if(!this.edit.isEditCell(e.rowIndex,e.cellIndex)){
this.focus.setFocusCell(e.cell,e.rowIndex);
}
if(this._click.length>1&&this._click[0]==null){
this._click.shift();
}
this.onRowClick(e);
},onCellDblClick:function(e){
var _2b9;
if(this._click.length>1&&has("ie")){
_2b9=this._click[1];
}else{
if(this._click.length>1&&this._click[0].rowIndex!=this._click[1].rowIndex){
_2b9=this._click[0];
}else{
_2b9=e;
}
}
this.focus.setFocusCell(_2b9.cell,_2b9.rowIndex);
this.onRowClick(_2b9);
this.edit.setEditCell(_2b9.cell,_2b9.rowIndex);
this.onRowDblClick(e);
},onCellContextMenu:function(e){
this.onRowContextMenu(e);
},onCellFocus:function(_2ba,_2bb){
this.edit.cellFocus(_2ba,_2bb);
},onRowClick:function(e){
this.edit.rowClick(e);
this.selection.clickSelectEvent(e);
},onRowDblClick:function(e){
},onRowMouseOver:function(e){
},onRowMouseOut:function(e){
},onRowMouseDown:function(e){
},onRowContextMenu:function(e){
_2b2.stop(e);
},onHeaderMouseOver:function(e){
},onHeaderMouseOut:function(e){
},onHeaderCellMouseOver:function(e){
if(e.cellNode){
_2b0.add(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
_2b0.remove(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseDown:function(e){
},onHeaderClick:function(e){
},onHeaderCellClick:function(e){
this.setSortIndex(e.cell.index);
this.onHeaderClick(e);
},onHeaderDblClick:function(e){
},onHeaderCellDblClick:function(e){
this.onHeaderDblClick(e);
},onHeaderCellContextMenu:function(e){
this.onHeaderContextMenu(e);
},onHeaderContextMenu:function(e){
if(!this.headerMenu){
_2b2.stop(e);
}
},onStartEdit:function(_2bc,_2bd){
},onApplyCellEdit:function(_2be,_2bf,_2c0){
},onCancelEdit:function(_2c1){
},onApplyEdit:function(_2c2){
},onCanSelect:function(_2c3){
return true;
},onCanDeselect:function(_2c4){
return true;
},onSelected:function(_2c5){
this.updateRowStyles(_2c5);
},onDeselected:function(_2c6){
this.updateRowStyles(_2c6);
},onSelectionChanged:function(){
}});
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_2c7,_2c8,_2c9){
var _2ca={};
lang.setObject("dojo.dnd.autoscroll",_2ca);
_2ca.getViewport=_2c9.getBox;
_2ca.V_TRIGGER_AUTOSCROLL=32;
_2ca.H_TRIGGER_AUTOSCROLL=32;
_2ca.V_AUTOSCROLL_VALUE=16;
_2ca.H_AUTOSCROLL_VALUE=16;
var _2cb,doc=win.doc,_2cc=Infinity,_2cd=Infinity;
_2ca.autoScrollStart=function(d){
doc=d;
_2cb=_2c9.getBox(doc);
var html=win.body(doc).parentNode;
_2cc=Math.max(html.scrollHeight-_2cb.h,0);
_2cd=Math.max(html.scrollWidth-_2cb.w,0);
};
_2ca.autoScroll=function(e){
var v=_2cb||_2c9.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_2ca.H_TRIGGER_AUTOSCROLL){
dx=-_2ca.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_2ca.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_2ca.H_AUTOSCROLL_VALUE,_2cd-html.scrollLeft);
}
}
if(e.clientY<_2ca.V_TRIGGER_AUTOSCROLL){
dy=-_2ca.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_2ca.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_2ca.V_AUTOSCROLL_VALUE,_2cc-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_2ca._validNodes={"div":1,"p":1,"td":1};
_2ca._validOverflow={"auto":1,"scroll":1};
_2ca.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_2ce,_2cf;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _2ca._validNodes)){
var s=_2c8.getComputedStyle(n),_2d0=(s.overflow.toLowerCase() in _2ca._validOverflow),_2d1=(s.overflowX.toLowerCase() in _2ca._validOverflow),_2d2=(s.overflowY.toLowerCase() in _2ca._validOverflow);
if(_2d0||_2d1||_2d2){
b=_2c7.getContentBox(n,s);
t=_2c7.position(n,true);
}
if(_2d0||_2d1){
w=Math.min(_2ca.H_TRIGGER_AUTOSCROLL,b.w/2);
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
_2ce=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_2d0||_2d2){
h=Math.min(_2ca.V_TRIGGER_AUTOSCROLL,b.h/2);
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
_2cf=n.scrollTop;
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
_2ca.autoScroll(e);
};
return _2ca;
});
},"dijit/registry":function(){
define(["dojo/_base/array","dojo/sniff","dojo/_base/unload","dojo/_base/window","./main"],function(_2d3,has,_2d4,win,_2d5){
var _2d6={},hash={};
var _2d7={length:0,add:function(_2d8){
if(hash[_2d8.id]){
throw new Error("Tried to register widget with id=="+_2d8.id+" but that id is already registered");
}
hash[_2d8.id]=_2d8;
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
},getUniqueId:function(_2d9){
var id;
do{
id=_2d9+"_"+(_2d9 in _2d6?++_2d6[_2d9]:_2d6[_2d9]=0);
}while(hash[id]);
return _2d5._scopeName=="dijit"?id:_2d5._scopeName+"_"+id;
},findWidgets:function(root,_2da){
var _2db=[];
function _2dc(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _2dd=node.getAttribute("widgetId");
if(_2dd){
var _2de=hash[_2dd];
if(_2de){
_2db.push(_2de);
}
}else{
if(node!==_2da){
_2dc(node);
}
}
}
}
};
_2dc(root);
return _2db;
},_destroyAll:function(){
_2d5._curFocus=null;
_2d5._prevFocus=null;
_2d5._activeStack=[];
_2d3.forEach(_2d7.findWidgets(win.body()),function(_2df){
if(!_2df._destroyed){
if(_2df.destroyRecursive){
_2df.destroyRecursive();
}else{
if(_2df.destroy){
_2df.destroy();
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
_2d5.registry=_2d7;
return _2d7;
});
},"dijit/Destroyable":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare"],function(_2e0,_2e1,_2e2){
return _2e2("dijit.Destroyable",null,{destroy:function(_2e3){
this._destroyed=true;
},own:function(){
_2e0.forEach(arguments,function(_2e4){
var _2e5="destroyRecursive" in _2e4?"destroyRecursive":"destroy" in _2e4?"destroy":"remove";
_2e4._odh=_2e1.before(this,"destroy",function(_2e6){
_2e4._odh.remove();
_2e4[_2e5](_2e6);
});
_2e1.after(_2e4,_2e5,function(){
_2e4._odh.remove();
});
},this);
return arguments;
}});
});
},"dojox/html/metrics":function(){
define("dojox/html/metrics",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/ready","dojo/_base/unload","dojo/_base/window","dojo/dom-geometry"],function(_2e7,lang,has,_2e8,_2e9,_2ea,_2eb){
var dhm=lang.getObject("dojox.html.metrics",true);
var _2ec=lang.getObject("dojox");
dhm.getFontMeasurements=function(){
var _2ed={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(has("ie")){
_2ea.doc.documentElement.style.fontSize="100%";
}
var div=_2ea.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
_2ea.body().appendChild(div);
for(var p in _2ed){
ds.fontSize=p;
_2ed[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
_2ea.body().removeChild(div);
div=null;
return _2ed;
};
var _2ee=null;
dhm.getCachedFontMeasurements=function(_2ef){
if(_2ef||!_2ee){
_2ee=dhm.getFontMeasurements();
}
return _2ee;
};
var _2f0=null,_2f1={};
dhm.getTextBox=function(text,_2f2,_2f3){
var m,s;
if(!_2f0){
m=_2f0=_2ea.doc.createElement("div");
var c=_2ea.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
_2ea.body().appendChild(c);
}else{
m=_2f0;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_2f2){
for(var i in _2f2){
if(i in _2f1){
continue;
}
s[i]=_2f2[i];
}
}
if(arguments.length>2&&_2f3){
m.className=_2f3;
}
m.innerHTML=text;
var box=_2eb.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _2f4={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_2f4.w,h:_2f4.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_2f5){
var f=dhm._fontResizeNode=_2ea.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
fs.display="none";
if(has("ie")){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[_2ec._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[_2ec._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
_2ea.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
_2e9.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(has("ie")&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
_2e8(function(){
try{
var n=_2ea.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
_2ea.body().appendChild(n);
_2f4.w=n.offsetWidth-n.clientWidth;
_2f4.h=n.offsetHeight-n.clientHeight;
_2ea.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in _2e7.config&&!!_2e7.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
return dhm;
});
},"dojox/grid/_EditManager":function(){
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/connect","dojo/_base/sniff","./util"],function(lang,_2f6,_2f7,_2f8,has,util){
return _2f7("dojox.grid._EditManager",null,{constructor:function(_2f9){
this.grid=_2f9;
if(has("ie")){
this.connections=[_2f8.connect(document.body,"onfocus",lang.hitch(this,"_boomerangFocus"))];
}else{
this.connections=[_2f8.connect(this.grid,"onBlur",this,"apply")];
}
},info:{},destroy:function(){
_2f6.forEach(this.connections,_2f8.disconnect);
},cellFocus:function(_2fa,_2fb){
if(this.grid.singleClickEdit||this.isEditRow(_2fb)){
this.setEditCell(_2fa,_2fb);
}else{
this.apply();
}
if(this.isEditing()||(_2fa&&_2fa.editable&&_2fa.alwaysEditing)){
this._focusEditor(_2fa,_2fb);
}
},rowClick:function(e){
if(this.isEditing()&&!this.isEditRow(e.rowIndex)){
this.apply();
}
},styleRow:function(_2fc){
if(_2fc.index==this.info.rowIndex){
_2fc.customClasses+=" dojoxGridRowEditing";
}
},dispatchEvent:function(e){
var c=e.cell,ed=(c&&c["editable"])?c:0;
return ed&&ed.dispatchEvent(e.dispatch,e);
},isEditing:function(){
return this.info.rowIndex!==undefined;
},isEditCell:function(_2fd,_2fe){
return (this.info.rowIndex===_2fd)&&(this.info.cell.index==_2fe);
},isEditRow:function(_2ff){
return this.info.rowIndex===_2ff;
},setEditCell:function(_300,_301){
if(!this.isEditCell(_301,_300.index)&&this.grid.canEdit&&this.grid.canEdit(_300,_301)){
this.start(_300,_301,this.isEditRow(_301)||_300.editable);
}
},_focusEditor:function(_302,_303){
util.fire(_302,"focus",[_303]);
},focusEditor:function(){
if(this.isEditing()){
this._focusEditor(this.info.cell,this.info.rowIndex);
}
},_boomerangWindow:500,_shouldCatchBoomerang:function(){
return this._catchBoomerang>new Date().getTime();
},_boomerangFocus:function(){
if(this._shouldCatchBoomerang()){
this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0;
}
},_doCatchBoomerang:function(){
if(has("ie")){
this._catchBoomerang=new Date().getTime()+this._boomerangWindow;
}
},start:function(_304,_305,_306){
if(!this._isValidInput()){
return;
}
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_305)){
this.applyRowEdit();
this.grid.updateRow(_305);
}
if(_306){
this.info={cell:_304,rowIndex:_305};
this.grid.doStartEdit(_304,_305);
this.grid.updateRow(_305);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_304,_305);
this._doCatchBoomerang();
},_editorDo:function(_307){
var c=this.info.cell;
if(c&&c.editable){
c[_307](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_308,_309,_30a){
if(this.grid.canEdit(_309,_30a)){
this.grid.doApplyCellEdit(_308,_30a,_309.field);
}
},applyRowEdit:function(){
this.grid.doApplyEdit(this.info.rowIndex,this.info.cell.field);
},apply:function(){
if(this.isEditing()&&this._isValidInput()){
this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},cancel:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},save:function(_30b,_30c){
var c=this.info.cell;
if(this.isEditRow(_30b)&&(!_30c||c.view==_30c)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_30d,_30e){
var c=this.info.cell;
if(this.isEditRow(_30e)&&c.view==_30d&&c.editable){
c.restore(this.info.rowIndex);
}
},_isValidInput:function(){
var w=(this.info.cell||{}).widget;
if(!w||!w.isValid){
return true;
}
w.focused=true;
return w.isValid(true);
}});
});
},"dijit/a11y":function(){
define(["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/sniff","./main"],function(_30f,_310,_311,dom,_312,_313,has,_314){
var _315=(_314._isElementShown=function(elem){
var s=_313.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_312.get(elem,"type")!="hidden");
});
_314.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _312.has(elem,"href");
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
var _316=elem.contentDocument;
if("designMode" in _316&&_316.designMode=="on"){
return true;
}
body=_316.body;
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
var _317=(_314.isTabNavigable=function(elem){
if(_312.get(elem,"disabled")){
return false;
}else{
if(_312.has(elem,"tabIndex")){
return _312.get(elem,"tabIndex")>=0;
}else{
return _314.hasDefaultTabStop(elem);
}
}
});
_314._getTabNavigable=function(root){
var _318,last,_319,_31a,_31b,_31c,_31d={};
function _31e(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _31f=function(_320){
for(var _321=_320.firstChild;_321;_321=_321.nextSibling){
if(_321.nodeType!=1||(has("ie")&&_321.scopeName!=="HTML")||!_315(_321)){
continue;
}
if(_317(_321)){
var _322=+_312.get(_321,"tabIndex");
if(!_312.has(_321,"tabIndex")||_322==0){
if(!_318){
_318=_321;
}
last=_321;
}else{
if(_322>0){
if(!_319||_322<_31a){
_31a=_322;
_319=_321;
}
if(!_31b||_322>=_31c){
_31c=_322;
_31b=_321;
}
}
}
var rn=_31e(_321);
if(_312.get(_321,"checked")&&rn){
_31d[rn]=_321;
}
}
if(_321.nodeName.toUpperCase()!="SELECT"){
_31f(_321);
}
}
};
if(_315(root)){
_31f(root);
}
function rs(node){
return _31d[_31e(node)]||node;
};
return {first:rs(_318),last:rs(last),lowest:rs(_319),highest:rs(_31b)};
};
_314.getFirstInTabbingOrder=function(root,doc){
var _323=_314._getTabNavigable(dom.byId(root,doc));
return _323.lowest?_323.lowest:_323.first;
};
_314.getLastInTabbingOrder=function(root,doc){
var _324=_314._getTabNavigable(dom.byId(root,doc));
return _324.last?_324.last:_324.highest;
};
return {hasDefaultTabStop:_314.hasDefaultTabStop,isTabNavigable:_314.isTabNavigable,_getTabNavigable:_314._getTabNavigable,getFirstInTabbingOrder:_314.getFirstInTabbingOrder,getLastInTabbingOrder:_314.getLastInTabbingOrder};
});
},"dijit/CheckedMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_325,_326,_327,_328){
return _325("dijit.CheckedMenuItem",_327,{templateString:_328,checked:false,_setCheckedAttr:function(_329){
_326.toggle(this.domNode,"dijitCheckedMenuItemChecked",_329);
this.domNode.setAttribute("aria-checked",_329?"true":"false");
this._set("checked",_329);
},iconClass:"",onChange:function(){
},_onClick:function(evt){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.onClick(evt);
}});
});
},"dojo/dnd/Container":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../_base/window","../dom","../dom-class","../dom-construct","../Evented","../has","../on","../query","../ready","../touch","./common"],function(_32a,_32b,_32c,_32d,lang,win,dom,_32e,_32f,_330,has,on,_331,_332,_333,dnd){
var _334=_32b("dojo.dnd.Container",_330,{skipForm:false,allowNested:false,constructor:function(node,_335){
this.node=dom.byId(node);
if(!_335){
_335={};
}
this.creator=_335.creator||null;
this.skipForm=_335.skipForm;
this.parent=_335.dropParent&&dom.byId(_335.dropParent);
this.map={};
this.current=null;
this.containerState="";
_32e.add(this.node,"dojoDndContainer");
if(!(_335&&_335._skipStartup)){
this.startup();
}
this.events=[on(this.node,_333.over,lang.hitch(this,"onMouseOver")),on(this.node,_333.out,lang.hitch(this,"onMouseOut")),on(this.node,"dragstart",lang.hitch(this,"onSelectStart")),on(this.node,"selectstart",lang.hitch(this,"onSelectStart"))];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||_32d.global;
var m=this.map,e=dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return _331((this.allowNested?"":"> ")+".dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_336,_337){
if(!this.parent.firstChild){
_337=null;
}else{
if(_336){
if(!_337){
_337=this.parent.firstChild;
}
}else{
if(_337){
_337=_337.nextSibling;
}
}
}
var i,t;
if(_337){
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
_337.parentNode.insertBefore(t.node,_337);
}
}else{
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
_32a.forEach(this.events,function(_338){
_338.remove();
});
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_339,node,Ctor){
_339._skipStartup=true;
return new Ctor(node,_339);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dnd.isFormElement(e)){
_32c.stop(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_33a){
var _33b="dojoDnd"+type;
var _33c=type.toLowerCase()+"State";
_32e.replace(this.node,_33b+_33a,_33b+this[_33c]);
this[_33c]=_33a;
},_addItemClass:function(node,type){
_32e.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_32e.remove(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _33d=node.parentNode;_33d;node=_33d,_33d=node.parentNode){
if((_33d==this.parent||this.allowNested)&&_32e.contains(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!lang.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dnd.getUniqueId();
}
_32e.add(t.node,"dojoDndItem");
return t;
}});
dnd._createNode=function(tag){
if(!tag){
return dnd._createSpan;
}
return function(text){
return _32f.create(tag,{innerHTML:text});
};
};
dnd._createTrTd=function(text){
var tr=_32f.create("tr");
_32f.create("td",{innerHTML:text},tr);
return tr;
};
dnd._createSpan=function(text){
return _32f.create("span",{innerHTML:text});
};
dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dnd._createTrTd:dnd._createNode(dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _33e=item&&lang.isObject(item),data,type,n;
if(_33e&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_33e&&item.data)?item.data:item;
type=(_33e&&item.type)?item.type:["text"];
n=(hint=="avatar"?dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
return _334;
});
},"dojo/dnd/common":function(){
define(["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_33f,_340,lang,dom){
var _341={};
_341.getCopyKeyState=_33f.isCopyKey;
_341._uniqueId=0;
_341.getUniqueId=function(){
var id;
do{
id=_340._scopeName+"Unique"+(++_341._uniqueId);
}while(dom.byId(id));
return id;
};
_341._empty={};
_341.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
lang.mixin(lang.getObject("dojo.dnd",true),_341);
return _341;
});
},"dojox/grid/_ViewManager":function(){
define(["dojo/_base/declare","dojo/_base/sniff","dojo/dom-class"],function(_342,has,_343){
return _342("dojox.grid._ViewManager",null,{constructor:function(_344){
this.grid=_344;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_345){
_345.idx=this.views.length;
this.views.push(_345);
},destroyViews:function(){
for(var i=0,v;v=this.views[i];i++){
v.destroy();
}
this.views=[];
},getContentNodes:function(){
var _346=[];
for(var i=0,v;v=this.views[i];i++){
_346.push(v.contentNode);
}
return _346;
},forEach:function(_347){
for(var i=0,v;v=this.views[i];i++){
_347(v,i);
}
},onEach:function(_348,_349){
_349=_349||[];
for(var i=0,v;v=this.views[i];i++){
if(_348 in v){
v[_348].apply(v,_349);
}
}
},normalizeHeaderNodeHeight:function(){
var _34a=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_34a.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_34a);
},normalizeRowNodeHeights:function(_34b){
var h=0;
var _34c=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_34b.length<=1){
return;
}
for(var i=0,n;(n=_34b[i]);i++){
if(!_343.contains(n,"dojoxGridNonNormalizedCell")){
_34c[i]=n.firstChild.offsetHeight;
h=Math.max(h,_34c[i]);
}
}
h=(h>=0?h:0);
if((has("mozilla")||has("ie")>8)&&h){
h++;
}
}
for(i=0;(n=_34b[i]);i++){
if(_34c[i]!=h){
n.firstChild.style.height=h+"px";
}
}
},resetHeaderNodeHeight:function(){
for(var i=0,v,n;(v=this.views[i]);i++){
n=v.headerContentNode.firstChild;
if(n){
n.style.height="";
}
}
},renormalizeRow:function(_34d){
var _34e=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_34d));i++){
n.firstChild.style.height="";
_34e.push(n);
}
this.normalizeRowNodeHeights(_34e);
},getViewWidth:function(_34f){
return this.views[_34f].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_350){
_350.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_351){
h=Math.max(_351.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_352){
h=Math.max(_352.domNode.offsetHeight,h);
});
return h;
},findClient:function(_353){
var c=this.grid.elasticView||-1;
if(c<0){
for(var i=1,v;(v=this.views[i]);i++){
if(v.viewWidth){
for(i=1;(v=this.views[i]);i++){
if(!v.viewWidth){
c=i;
break;
}
}
break;
}
}
}
if(c<0){
c=Math.floor(this.views.length/2);
}
return c;
},arrange:function(l,w){
var i,v,vw,len=this.views.length,self=this;
var c=(w<=0?len:this.findClient());
var _354=function(v,l){
var ds=v.domNode.style;
var hs=v.headerNode.style;
if(!self.grid.isLeftToRight()){
ds.right=l+"px";
if(has("ff")<4){
hs.right=l+v.getScrollbarWidth()+"px";
}else{
hs.right=l+"px";
}
if(!has("webkit")){
hs.width=parseInt(hs.width,10)-v.getScrollbarWidth()+"px";
}
}else{
ds.left=l+"px";
hs.left=l+"px";
}
ds.top=0+"px";
hs.top=0;
};
for(i=0;(v=this.views[i])&&(i<c);i++){
vw=this.getViewWidth(i);
v.setSize(vw,0);
_354(v,l);
if(v.headerContentNode&&v.headerContentNode.firstChild){
vw=v.getColumnsWidth()+v.getScrollbarWidth();
}else{
vw=v.domNode.offsetWidth;
}
l+=vw;
}
i++;
var r=w;
for(var j=len-1;(v=this.views[j])&&(i<=j);j--){
vw=this.getViewWidth(j);
v.setSize(vw,0);
vw=v.domNode.offsetWidth;
r-=vw;
_354(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_354(v,l);
}
return l;
},renderRow:function(_355,_356,_357){
var _358=[];
for(var i=0,v,n,_359;(v=this.views[i])&&(n=_356[i]);i++){
_359=v.renderRow(_355);
n.appendChild(_359);
_358.push(_359);
}
if(!_357){
this.normalizeRowNodeHeights(_358);
}
},rowRemoved:function(_35a){
this.onEach("rowRemoved",[_35a]);
},updateRow:function(_35b,_35c){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_35b);
}
if(!_35c){
this.renormalizeRow(_35b);
}
},updateRowStyles:function(_35d){
this.onEach("updateRowStyles",[_35d]);
},setScrollTop:function(_35e){
var top=_35e;
for(var i=0,v;v=this.views[i];i++){
top=v.setScrollTop(_35e);
if(has("ie")&&v.headerNode&&v.scrollboxNode){
v.headerNode.scrollLeft=v.scrollboxNode.scrollLeft;
}
}
return top;
},getFirstScrollingView:function(){
for(var i=0,v;(v=this.views[i]);i++){
if(v.hasHScrollbar()||v.hasVScrollbar()){
return v;
}
}
return null;
}});
});
},"dojox/grid/cells":function(){
define("dojox/grid/cells",["../main","./cells/_base"],function(_35f){
return _35f.grid.cells;
});
},"dijit/_Widget":function(){
define(["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_360,_361,_362,_363,has,_364,lang,_365,_366,_367,_368,_369,_36a){
function _36b(){
};
function _36c(_36d){
return function(obj,_36e,_36f,_370){
if(obj&&typeof _36e=="string"&&obj[_36e]==_36b){
return obj.on(_36e.substring(2).toLowerCase(),lang.hitch(_36f,_370));
}
return _36d.apply(_362,arguments);
};
};
_360.around(_362,"connect",_36c);
if(_364.connect){
_360.around(_364,"connect",_36c);
}
var _371=_363("dijit._Widget",[_368,_369,_36a],{onClick:_36b,onDblClick:_36b,onKeyDown:_36b,onKeyPress:_36b,onKeyUp:_36b,onMouseDown:_36b,onMouseMove:_36b,onMouseOut:_36b,onMouseOver:_36b,onMouseLeave:_36b,onMouseEnter:_36b,onMouseUp:_36b,constructor:function(_372){
this._toConnect={};
for(var name in _372){
if(this[name]===_36b){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_372[name];
delete _372[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_36b){
return _362.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_373){
_364.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_373);
},attr:function(name,_374){
if(_361.isDebug){
var _375=arguments.callee._ach||(arguments.callee._ach={}),_376=(arguments.callee.caller||"unknown caller").toString();
if(!_375[_376]){
_364.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_376,"","2.0");
_375[_376]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_364.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_365("[widgetId]",this.containerNode).map(_367.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(has("dijit-legacy-requires")){
_366(0,function(){
var _377=["dijit/_base"];
require(_377);
});
}
return _371;
});
},"dijit/_FocusMixin":function(){
define(["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_378,_379,_37a,lang){
lang.extend(_379,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _37a("dijit._FocusMixin",null,{_focusManager:_378});
});
},"dijit/_OnDijitClickMixin":function(){
define(["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window","./a11yclick"],function(on,_37b,keys,_37c,has,_37d,win,_37e){
var ret=_37c("dijit._OnDijitClickMixin",null,{connect:function(obj,_37f,_380){
return this.inherited(arguments,[obj,_37f=="ondijitclick"?_37e:_37f,_380]);
}});
ret.a11yclick=_37e;
return ret;
});
},"dojo/cache":function(){
define(["./_base/kernel","./text"],function(dojo){
return dojo.cache;
});
},"dijit/focus":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","./main"],function(_381,_382,dom,_383,_384,_385,lang,on,_386,has,_387,_388,win,_389,a11y,_38a,_38b){
var _38c=_382([_387,_385],{curNode:null,activeStack:[],constructor:function(){
var _38d=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_381.before(_384,"empty",_38d);
_381.before(_384,"destroy",_38d);
},registerIframe:function(_38e){
return this.registerWin(_38e.contentWindow,_38e);
},registerWin:function(_38f,_390){
var _391=this;
var _392=function(evt){
_391._justMouseDowned=true;
setTimeout(function(){
_391._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_391._onTouchNode(_390||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_38f.document.documentElement:_38f.document;
if(doc){
if(has("ie")){
_38f.document.body.attachEvent("onmousedown",_392);
var _393=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_391._onFocusNode(_390||evt.srcElement);
}else{
_391._onTouchNode(_390||evt.srcElement);
}
};
doc.attachEvent("onfocusin",_393);
var _394=function(evt){
_391._onBlurNode(_390||evt.srcElement);
};
doc.attachEvent("onfocusout",_394);
return {remove:function(){
_38f.document.detachEvent("onmousedown",_392);
doc.detachEvent("onfocusin",_393);
doc.detachEvent("onfocusout",_394);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_392,true);
doc.body.addEventListener("touchstart",_392,true);
var _395=function(evt){
_391._onFocusNode(_390||evt.target);
};
doc.addEventListener("focus",_395,true);
var _396=function(evt){
_391._onBlurNode(_390||evt.target);
};
doc.addEventListener("blur",_396,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_392,true);
doc.body.removeEventListener("touchstart",_392,true);
doc.removeEventListener("focus",_395,true);
doc.removeEventListener("blur",_396,true);
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
var _397=[];
try{
while(node){
var _398=_383.get(node,"dijitPopupParent");
if(_398){
node=_38a.byId(_398).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_389.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_399=id&&_38a.byId(id);
if(_399&&!(by=="mouse"&&_399.get("disabled"))){
_397.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_397,by);
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
},_setStack:function(_39a,by){
var _39b=this.activeStack;
this.set("activeStack",_39a);
for(var _39c=0;_39c<Math.min(_39b.length,_39a.length);_39c++){
if(_39b[_39c]!=_39a[_39c]){
break;
}
}
var _39d;
for(var i=_39b.length-1;i>=_39c;i--){
_39d=_38a.byId(_39b[i]);
if(_39d){
_39d._hasBeenBlurred=true;
_39d.set("focused",false);
if(_39d._focusManager==this){
_39d._onBlur(by);
}
this.emit("widget-blur",_39d,by);
}
}
for(i=_39c;i<_39a.length;i++){
_39d=_38a.byId(_39a[i]);
if(_39d){
_39d.set("focused",true);
if(_39d._focusManager==this){
_39d._onFocus(by);
}
this.emit("widget-focus",_39d,by);
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
var _39e=new _38c();
_386(function(){
var _39f=_39e.registerWin(_389.get(win.doc));
if(has("ie")){
_388.addOnWindowUnload(function(){
if(_39f){
_39f.remove();
_39f=null;
}
});
}
});
_38b.focus=function(node){
_39e.focus(node);
};
for(var attr in _39e){
if(!/^_/.test(attr)){
_38b.focus[attr]=typeof _39e[attr]=="function"?lang.hitch(_39e,attr):_39e[attr];
}
}
_39e.watch(function(attr,_3a0,_3a1){
_38b.focus[attr]=_3a1;
});
return _39e;
});
},"dojox/grid/util":function(){
define("dojox/grid/util",["../main","dojo/_base/lang","dojo/dom"],function(_3a2,lang,dom){
var dgu=lang.getObject("grid.util",true,_3a2);
dgu.na="...";
dgu.rowIndexTag="gridRowIndex";
dgu.gridViewTag="gridView";
dgu.fire=function(ob,ev,args){
var fn=ob&&ev&&ob[ev];
return fn&&(args?fn.apply(ob,args):ob[ev]());
};
dgu.setStyleHeightPx=function(_3a3,_3a4){
if(_3a4>=0){
var s=_3a3.style;
var v=_3a4+"px";
if(_3a3&&s["height"]!=v){
s["height"]=v;
}
}
};
dgu.mouseEvents=["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];
dgu.keyEvents=["keyup","keydown","keypress"];
dgu.funnelEvents=function(_3a5,_3a6,_3a7,_3a8){
var evts=(_3a8?_3a8:dgu.mouseEvents.concat(dgu.keyEvents));
for(var i=0,l=evts.length;i<l;i++){
_3a6.connect(_3a5,"on"+evts[i],_3a7);
}
};
dgu.removeNode=function(_3a9){
_3a9=dom.byId(_3a9);
_3a9&&_3a9.parentNode&&_3a9.parentNode.removeChild(_3a9);
return _3a9;
};
dgu.arrayCompare=function(inA,inB){
for(var i=0,l=inA.length;i<l;i++){
if(inA[i]!=inB[i]){
return false;
}
}
return (inA.length==inB.length);
};
dgu.arrayInsert=function(_3aa,_3ab,_3ac){
if(_3aa.length<=_3ab){
_3aa[_3ab]=_3ac;
}else{
_3aa.splice(_3ab,0,_3ac);
}
};
dgu.arrayRemove=function(_3ad,_3ae){
_3ad.splice(_3ae,1);
};
dgu.arraySwap=function(_3af,inI,inJ){
var _3b0=_3af[inI];
_3af[inI]=_3af[inJ];
_3af[inJ]=_3b0;
};
return dgu;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/main":function(){
define(["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"url:dojox/grid/resources/View.html":"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n","dojox/grid/_FocusManager":function(){
define("dojox/grid/_FocusManager",["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","dojo/_base/connect","dojo/_base/event","dojo/_base/sniff","dojo/query","./util","dojo/_base/html"],function(_3b1,lang,_3b2,_3b3,_3b4,has,_3b5,util,html){
return _3b2("dojox.grid._FocusManager",null,{constructor:function(_3b6){
this.grid=_3b6;
this.cell=null;
this.rowIndex=-1;
this._connects=[];
this._headerConnects=[];
this.headerMenu=this.grid.headerMenu;
this._connects.push(_3b3.connect(this.grid.domNode,"onfocus",this,"doFocus"));
this._connects.push(_3b3.connect(this.grid.domNode,"onblur",this,"doBlur"));
this._connects.push(_3b3.connect(this.grid.domNode,"mousedown",this,"_mouseDown"));
this._connects.push(_3b3.connect(this.grid.domNode,"mouseup",this,"_mouseUp"));
this._connects.push(_3b3.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));
this._connects.push(_3b3.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));
this._connects.push(_3b3.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));
this._connects.push(_3b3.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(_3b3.connect(this.grid,"postrender",this,"_delayedHeaderFocus"));
},destroy:function(){
_3b1.forEach(this._connects,_3b3.disconnect);
_3b1.forEach(this._headerConnects,_3b3.disconnect);
delete this.grid;
delete this.cell;
},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:false,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){
this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];
this._initColumnHeaders();
},isFocusCell:function(_3b7,_3b8){
return (this.cell==_3b7)&&(this.rowIndex==_3b8);
},isLastFocusCell:function(){
if(this.cell){
return (this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1);
}
return false;
},isFirstFocusCell:function(){
if(this.cell){
return (this.rowIndex===0)&&(this.cell.index===0);
}
return false;
},isNoFocusCell:function(){
return (this.rowIndex<0)||!this.cell;
},isNavHeader:function(){
return (!!this._colHeadNode);
},getHeaderIndex:function(){
if(this._colHeadNode){
return _3b1.indexOf(this._findHeaderCells(),this._colHeadNode);
}else{
return -1;
}
},_focusifyCellNode:function(_3b9){
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
html.toggleClass(n,this.focusClass,_3b9);
if(_3b9){
var sl=this.scrollIntoView();
try{
if(has("webkit")||!this.grid.edit.isEditing()){
util.fire(n,"focus");
if(sl){
this.cell.view.scrollboxNode.scrollLeft=sl;
}
}
}
catch(e){
}
}
}
},_delayedCellFocus:function(){
if(this.isNavHeader()||!this.grid.focused){
return;
}
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
try{
if(!this.grid.edit.isEditing()){
html.toggleClass(n,this.focusClass,true);
if(this._colHeadNode){
this.blurHeader();
}
util.fire(n,"focus");
}
}
catch(e){
}
}
},_delayedHeaderFocus:function(){
if(this.isNavHeader()){
this.focusHeader();
}
},_initColumnHeaders:function(){
_3b1.forEach(this._headerConnects,_3b3.disconnect);
this._headerConnects=[];
var _3ba=this._findHeaderCells();
for(var i=0;i<_3ba.length;i++){
this._headerConnects.push(_3b3.connect(_3ba[i],"onfocus",this,"doColHeaderFocus"));
this._headerConnects.push(_3b3.connect(_3ba[i],"onblur",this,"doColHeaderBlur"));
}
},_findHeaderCells:function(){
var _3bb=_3b5("th",this.grid.viewsHeaderNode);
var _3bc=[];
for(var i=0;i<_3bb.length;i++){
var _3bd=_3bb[i];
var _3be=html.hasAttr(_3bd,"tabIndex");
var _3bf=html.attr(_3bd,"tabIndex");
if(_3be&&_3bf<0){
_3bc.push(_3bd);
}
}
return _3bc;
},_setActiveColHeader:function(_3c0,_3c1,_3c2){
this.grid.domNode.setAttribute("aria-activedescendant",_3c0.id);
if(_3c2!=null&&_3c2>=0&&_3c2!=_3c1){
html.toggleClass(this._findHeaderCells()[_3c2],this.focusClass,false);
}
html.toggleClass(_3c0,this.focusClass,true);
this._colHeadNode=_3c0;
this._colHeadFocusIdx=_3c1;
this._scrollHeader(this._colHeadFocusIdx);
},scrollIntoView:function(){
var info=(this.cell?this._scrollInfo(this.cell):null);
if(!info||!info.s){
return null;
}
var rt=this.grid.scroller.findScrollTop(this.rowIndex);
if(info.n&&info.sr){
if(info.n.offsetLeft+info.n.offsetWidth>info.sr.l+info.sr.w){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}
}
}
if(info.r&&info.sr){
if(rt+info.r.offsetHeight>info.sr.t+info.sr.h){
this.grid.setScrollTop(rt+info.r.offsetHeight-info.sr.h);
}else{
if(rt<info.sr.t){
this.grid.setScrollTop(rt);
}
}
}
return info.s.scrollLeft;
},_scrollInfo:function(cell,_3c3){
if(cell){
var cl=cell,sbn=cl.view.scrollboxNode,sbnr={w:sbn.clientWidth,l:sbn.scrollLeft,t:sbn.scrollTop,h:sbn.clientHeight},rn=cl.view.getRowNode(this.rowIndex);
return {c:cl,s:sbn,sr:sbnr,n:(_3c3?_3c3:cell.getNode(this.rowIndex)),r:rn};
}
return null;
},_scrollHeader:function(_3c4){
var info=null;
if(this._colHeadNode){
var cell=this.grid.getCell(_3c4);
if(!cell){
return;
}
info=this._scrollInfo(cell,cell.getNode(0));
}
if(info&&info.s&&info.sr&&info.n){
var _3c5=info.sr.l+info.sr.w;
if(info.n.offsetLeft+info.n.offsetWidth>_3c5){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}else{
if(has("ie")<=7&&cell&&cell.view.headerNode){
cell.view.headerNode.scrollLeft=info.s.scrollLeft;
}
}
}
}
},_isHeaderHidden:function(){
var _3c6=this.focusView;
if(!_3c6){
for(var i=0,_3c7;(_3c7=this.grid.views.views[i]);i++){
if(_3c7.headerNode){
_3c6=_3c7;
break;
}
}
}
return (_3c6&&html.getComputedStyle(_3c6.headerNode).display=="none");
},colSizeAdjust:function(e,_3c8,_3c9){
var _3ca=this._findHeaderCells();
var view=this.focusView;
if(!view||!view.header.tableMap.map){
for(var i=0,_3cb;(_3cb=this.grid.views.views[i]);i++){
if(_3cb.header.tableMap.map){
view=_3cb;
break;
}
}
}
var _3cc=_3ca[_3c8];
if(!view||(_3c8==_3ca.length-1&&_3c8===0)){
return;
}
view.content.baseDecorateEvent(e);
e.cellNode=_3cc;
e.cellIndex=view.content.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
if(view.header.canResize(e)){
var _3cd={l:_3c9};
var drag=view.header.colResizeSetup(e,false);
view.header.doResizeColumn(drag,null,_3cd);
view.update();
}
},styleRow:function(_3ce){
return;
},setFocusIndex:function(_3cf,_3d0){
this.setFocusCell(this.grid.getCell(_3d0),_3cf);
},setFocusCell:function(_3d1,_3d2){
if(_3d1&&!this.isFocusCell(_3d1,_3d2)){
this.tabbingOut=false;
if(this._colHeadNode){
this.blurHeader();
}
this._colHeadNode=this._colHeadFocusIdx=null;
this.focusGridView();
this._focusifyCellNode(false);
this.cell=_3d1;
this.rowIndex=_3d2;
this._focusifyCellNode(true);
}
if(has("opera")){
setTimeout(lang.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1);
}else{
this.grid.onCellFocus(this.cell,this.rowIndex);
}
},next:function(){
if(this.cell){
var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1,rc=this.grid.rowCount-1;
if(col>cc){
col=0;
row++;
}
if(row>rc){
col=cc;
row=rc;
}
if(this.grid.edit.isEditing()){
var _3d3=this.grid.getCell(col);
if(!this.isLastFocusCell()&&(!_3d3.editable||this.grid.canEdit&&!this.grid.canEdit(_3d3,row))){
this.cell=_3d3;
this.rowIndex=row;
this.next();
return;
}
}
this.setFocusIndex(row,col);
}
},previous:function(){
if(this.cell){
var row=(this.rowIndex||0),col=(this.cell.index||0)-1;
if(col<0){
col=this.grid.layout.cellCount-1;
row--;
}
if(row<0){
row=0;
col=0;
}
if(this.grid.edit.isEditing()){
var _3d4=this.grid.getCell(col);
if(!this.isFirstFocusCell()&&!_3d4.editable){
this.cell=_3d4;
this.rowIndex=row;
this.previous();
return;
}
}
this.setFocusIndex(row,col);
}
},move:function(_3d5,_3d6){
var _3d7=_3d6<0?-1:1;
if(this.isNavHeader()){
var _3d8=this._findHeaderCells();
var _3d9=currentIdx=_3b1.indexOf(_3d8,this._colHeadNode);
currentIdx+=_3d6;
while(currentIdx>=0&&currentIdx<_3d8.length&&_3d8[currentIdx].style.display=="none"){
currentIdx+=_3d7;
}
if((currentIdx>=0)&&(currentIdx<_3d8.length)){
this._setActiveColHeader(_3d8[currentIdx],currentIdx,_3d9);
}
}else{
if(this.cell){
var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,row=Math.min(rc,Math.max(0,r+_3d5));
if(_3d5){
if(_3d5>0){
if(row>sc.getLastPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));
}
}else{
if(_3d5<0){
if(row<=sc.getPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));
}
}
}
}
var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_3d6));
var cell=this.grid.getCell(col);
while(col>=0&&col<cc&&cell&&cell.hidden===true){
col+=_3d7;
cell=this.grid.getCell(col);
}
if(!cell||cell.hidden===true){
col=i;
}
var n=cell.getNode(row);
if(!n&&_3d5){
if((row+_3d5)>=0&&(row+_3d5)<=rc){
this.move(_3d5>0?++_3d5:--_3d5,_3d6);
}
return;
}else{
if((!n||html.style(n,"display")==="none")&&_3d6){
if((col+_3d6)>=0&&(col+_3d6)<=cc){
this.move(_3d5,_3d6>0?++_3d6:--_3d6);
}
return;
}
}
this.setFocusIndex(row,col);
if(_3d5){
this.grid.updateRow(r);
}
}
}
},previousKey:function(e){
if(this.grid.edit.isEditing()){
_3b4.stop(e);
this.previous();
}else{
if(!this.isNavHeader()&&!this._isHeaderHidden()){
this.grid.domNode.focus();
_3b4.stop(e);
}else{
this.tabOut(this.grid.domNode);
if(this._colHeadFocusIdx!=null){
html.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],this.focusClass,false);
this._colHeadFocusIdx=null;
}
this._focusifyCellNode(false);
}
}
},nextKey:function(e){
var _3da=(this.grid.rowCount===0);
if(e.target===this.grid.domNode&&this._colHeadFocusIdx==null){
this.focusHeader();
_3b4.stop(e);
}else{
if(this.isNavHeader()){
this.blurHeader();
if(!this.findAndFocusGridCell()){
this.tabOut(this.grid.lastFocusNode);
}
this._colHeadNode=this._colHeadFocusIdx=null;
}else{
if(this.grid.edit.isEditing()){
_3b4.stop(e);
this.next();
}else{
this.tabOut(this.grid.lastFocusNode);
}
}
}
},tabOut:function(_3db){
this.tabbingOut=true;
_3db.focus();
},focusGridView:function(){
util.fire(this.focusView,"focus");
},focusGrid:function(_3dc){
this.focusGridView();
this._focusifyCellNode(true);
},findAndFocusGridCell:function(){
var _3dd=true;
var _3de=(this.grid.rowCount===0);
if(this.isNoFocusCell()&&!_3de){
var _3df=0;
var cell=this.grid.getCell(_3df);
if(cell.hidden){
_3df=this.isNavHeader()?this._colHeadFocusIdx:0;
}
this.setFocusIndex(0,_3df);
}else{
if(this.cell&&!_3de){
if(this.focusView&&!this.focusView.rowNodes[this.rowIndex]){
this.grid.scrollToRow(this.rowIndex);
}
this.focusGrid();
}else{
_3dd=false;
}
}
this._colHeadNode=this._colHeadFocusIdx=null;
return _3dd;
},focusHeader:function(){
var _3e0=this._findHeaderCells();
var _3e1=this._colHeadFocusIdx;
if(this._isHeaderHidden()){
this.findAndFocusGridCell();
}else{
if(!this._colHeadFocusIdx){
if(this.isNoFocusCell()){
this._colHeadFocusIdx=0;
}else{
this._colHeadFocusIdx=this.cell.index;
}
}
}
this._colHeadNode=_3e0[this._colHeadFocusIdx];
while(this._colHeadNode&&this._colHeadFocusIdx>=0&&this._colHeadFocusIdx<_3e0.length&&this._colHeadNode.style.display=="none"){
this._colHeadFocusIdx++;
this._colHeadNode=_3e0[this._colHeadFocusIdx];
}
if(this._colHeadNode&&this._colHeadNode.style.display!="none"){
if(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode){
this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode);
this.headerMenu.bindDomNode(this.grid.domNode);
this._contextMenuBindNode=this.grid.domNode;
}
this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,_3e1);
this._scrollHeader(this._colHeadFocusIdx);
this._focusifyCellNode(false);
}else{
this.findAndFocusGridCell();
}
},blurHeader:function(){
html.removeClass(this._colHeadNode,this.focusClass);
html.removeAttr(this.grid.domNode,"aria-activedescendant");
if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){
var _3e2=this.grid.viewsHeaderNode;
this.headerMenu.unBindDomNode(this.grid.domNode);
this.headerMenu.bindDomNode(_3e2);
this._contextMenuBindNode=_3e2;
}
},doFocus:function(e){
if(e&&e.target!=e.currentTarget){
_3b4.stop(e);
return;
}
if(this._clickFocus){
return;
}
if(!this.tabbingOut){
this.focusHeader();
}
this.tabbingOut=false;
_3b4.stop(e);
},doBlur:function(e){
_3b4.stop(e);
},doContextMenu:function(e){
if(!this.headerMenu){
_3b4.stop(e);
}
},doLastNodeFocus:function(e){
if(this.tabbingOut){
this._focusifyCellNode(false);
}else{
if(this.grid.rowCount>0){
if(this.isNoFocusCell()){
this.setFocusIndex(0,0);
}
this._focusifyCellNode(true);
}else{
this.focusHeader();
}
}
this.tabbingOut=false;
_3b4.stop(e);
},doLastNodeBlur:function(e){
_3b4.stop(e);
},doColHeaderFocus:function(e){
this._setActiveColHeader(e.target,html.attr(e.target,"idx"),this._colHeadFocusIdx);
this._scrollHeader(this.getHeaderIndex());
_3b4.stop(e);
},doColHeaderBlur:function(e){
html.toggleClass(e.target,this.focusClass,false);
},_mouseDown:function(e){
this._clickFocus=dojo.some(this.grid.views.views,function(v){
return v.scrollboxNode===e.target;
});
},_mouseUp:function(e){
this._clickFocus=false;
}});
});
},"dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_3e3,dom,_3e4,_3e5,_3e6,has,_3e7,_3e8,_3e9,_3ea,_3eb){
return _3e3("dijit.MenuItem",[_3e7,_3e8,_3e9,_3ea],{templateString:_3eb,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_3ec){
if(_3ec&&!("label" in this.params)){
this.set("label",_3ec.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _3ed=this.id+"_text";
_3e4.set(this.containerNode,"id",_3ed);
if(this.accelKeyNode){
_3e4.set(this.accelKeyNode,"id",this.id+"_accel");
_3ed+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_3ed);
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
},_setSelected:function(_3ee){
_3e5.toggle(this.domNode,"dijitMenuItemSelected",_3ee);
},setLabel:function(_3ef){
_3e6.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_3ef);
},setDisabled:function(_3f0){
_3e6.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_3f0);
},_setDisabledAttr:function(_3f1){
this.focusNode.setAttribute("aria-disabled",_3f1?"true":"false");
this._set("disabled",_3f1);
},_setAccelKeyAttr:function(_3f2){
this.accelKeyNode.style.display=_3f2?"":"none";
this.accelKeyNode.innerHTML=_3f2;
_3e4.set(this.containerNode,"colSpan",_3f2?"1":"2");
this._set("accelKey",_3f2);
},_setTextDirAttr:function(_3f3){
if(!this._created||this.textDir!=_3f3){
this._set("textDir",_3f3);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"dijit/_TemplatedMixin":function(){
define(["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/sniff","dojo/_base/unload"],function(lang,_3f4,_3f5,_3f6,_3f7,_3f8,_3f9,_3fa,has,_3fb){
var _3fc=_3f9("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _3fd=this.declaredClass,_3fe=this;
return _3f6.substitute(tmpl,this,function(_3ff,key){
if(key.charAt(0)=="!"){
_3ff=lang.getObject(key.substr(1),false,_3fe);
}
if(typeof _3ff=="undefined"){
throw new Error(_3fd+" template:"+key);
}
if(_3ff==null){
return "";
}
return key.charAt(0)=="!"?_3ff:_3ff.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_3f7(this.templatePath,{sanitize:true});
}
var _400=_3fc.getCachedTemplate(this.templateString,this._skipNodeCache,this.ownerDocument);
var node;
if(lang.isString(_400)){
node=_3fa.toDom(this._stringRepl(_400),this.ownerDocument);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_400);
}
}else{
node=_400.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_401){
var dest=this.containerNode;
if(_401&&dest){
while(_401.hasChildNodes()){
dest.appendChild(_401.firstChild);
}
}
},_attachTemplateNodes:function(_402,_403){
var _404=lang.isArray(_402)?_402:(_402.all||_402.getElementsByTagName("*"));
var x=lang.isArray(_402)?0:-1;
for(;x<0||_404[x];x++){
var _405=(x==-1)?_402:_404[x];
if(this.widgetsInTemplate&&(_403(_405,"dojoType")||_403(_405,"data-dojo-type"))){
continue;
}
var _406=_403(_405,"dojoAttachPoint")||_403(_405,"data-dojo-attach-point");
if(_406){
var _407,_408=_406.split(/\s*,\s*/);
while((_407=_408.shift())){
if(lang.isArray(this[_407])){
this[_407].push(_405);
}else{
this[_407]=_405;
}
this._attachPoints.push(_407);
}
}
var _409=_403(_405,"dojoAttachEvent")||_403(_405,"data-dojo-attach-event");
if(_409){
var _40a,_40b=_409.split(/\s*,\s*/);
var trim=lang.trim;
while((_40a=_40b.shift())){
if(_40a){
var _40c=null;
if(_40a.indexOf(":")!=-1){
var _40d=_40a.split(":");
_40a=trim(_40d[0]);
_40c=trim(_40d[1]);
}else{
_40a=trim(_40a);
}
if(!_40c){
_40c=_40a;
}
this._attachEvents.push(this.connect(_405,_3f4[_40a]||_40a,_40c));
}
}
}
}
},destroyRendering:function(){
_3f8.forEach(this._attachPoints,function(_40e){
delete this[_40e];
},this);
this._attachPoints=[];
_3f8.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_3fc._templateCache={};
_3fc.getCachedTemplate=function(_40f,_410,doc){
var _411=_3fc._templateCache;
var key=_40f;
var _412=_411[key];
if(_412){
try{
if(!_412.ownerDocument||_412.ownerDocument==(doc||document)){
return _412;
}
}
catch(e){
}
_3fa.destroy(_412);
}
_40f=_3f6.trim(_40f);
if(_410||_40f.match(/\$\{([^\}]+)\}/g)){
return (_411[key]=_40f);
}else{
var node=_3fa.toDom(_40f,doc);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_40f);
}
return (_411[key]=node);
}
};
if(has("ie")){
_3fb.addOnWindowUnload(function(){
var _413=_3fc._templateCache;
for(var key in _413){
var _414=_413[key];
if(typeof _414=="object"){
_3fa.destroy(_414);
}
delete _413[key];
}
});
}
lang.extend(_3f5,{dojoAttachEvent:"",dojoAttachPoint:""});
return _3fc;
});
},"dojox/grid/_SelectionPreserver":function(){
define("dojox/grid/_SelectionPreserver",["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(_415,_416,lang,_417){
return _415("dojox.grid._SelectionPreserver",null,{constructor:function(_418){
this.selection=_418;
var grid=this.grid=_418.grid;
this.reset();
this._connects=[_416.connect(grid,"_setStore",this,"reset"),_416.connect(grid,"_addItem",this,"_reSelectById"),_416.connect(_418,"onSelected",lang.hitch(this,"_selectById",true)),_416.connect(_418,"onDeselected",lang.hitch(this,"_selectById",false)),_416.connect(_418,"deselectAll",this,"reset")];
},destroy:function(){
this.reset();
_417.forEach(this._connects,_416.disconnect);
delete this._connects;
},reset:function(){
this._selectedById={};
},_reSelectById:function(item,_419){
if(item&&this.grid._hasIdentity){
this.selection.selected[_419]=this._selectedById[this.grid.store.getIdentity(item)];
}
},_selectById:function(_41a,_41b){
if(this.selection.mode=="none"||!this.grid._hasIdentity){
return;
}
var item=_41b,g=this.grid;
if(typeof _41b=="number"||typeof _41b=="string"){
var _41c=g._by_idx[_41b];
item=_41c&&_41c.item;
}
if(item){
this._selectedById[g.store.getIdentity(item)]=!!_41a;
}
return item;
}});
});
},"dojo/window":function(){
define(["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_41d,dom,geom,_41e){
var _41f={getBox:function(doc){
doc=doc||_41d.doc;
var _420=(doc.compatMode=="BackCompat")?_41d.body(doc):doc.documentElement,_421=geom.docScroll(doc),w,h;
if(has("touch")){
var _422=_41f.get(doc);
w=_422.innerWidth||_420.clientWidth;
h=_422.innerHeight||_420.clientHeight;
}else{
w=_420.clientWidth;
h=_420.clientHeight;
}
return {l:_421.x,t:_421.y,w:w,h:h};
},get:function(doc){
if(has("ie")&&_41f!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
},scrollIntoView:function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_41d.doc,body=_41d.body(doc),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _423=doc.compatMode=="BackCompat",_424=(isIE>=9&&"frameElement" in node.ownerDocument.parentWindow)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_423?body:html),_425=isWK?body:_424,_426=_424.clientWidth,_427=_424.clientHeight,rtl=!geom.isBodyLtr(doc),_428=pos||geom.position(node),el=node.parentNode,_429=function(el){
return ((isIE<=6||(isIE&&_423))?false:(_41e.get(el,"position").toLowerCase()=="fixed"));
};
if(_429(node)){
return;
}
while(el){
if(el==body){
el=_425;
}
var _42a=geom.position(el),_42b=_429(el);
if(el==_425){
_42a.w=_426;
_42a.h=_427;
if(_425==html&&isIE&&rtl){
_42a.x+=_425.offsetWidth-_42a.w;
}
if(_42a.x<0||!isIE){
_42a.x=0;
}
if(_42a.y<0||!isIE){
_42a.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_42a.w-=pb.w;
_42a.h-=pb.h;
_42a.x+=pb.l;
_42a.y+=pb.t;
var _42c=el.clientWidth,_42d=_42a.w-_42c;
if(_42c>0&&_42d>0){
_42a.w=_42c;
_42a.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_42d:0;
}
_42c=el.clientHeight;
_42d=_42a.h-_42c;
if(_42c>0&&_42d>0){
_42a.h=_42c;
}
}
if(_42b){
if(_42a.y<0){
_42a.h+=_42a.y;
_42a.y=0;
}
if(_42a.x<0){
_42a.w+=_42a.x;
_42a.x=0;
}
if(_42a.y+_42a.h>_427){
_42a.h=_427-_42a.y;
}
if(_42a.x+_42a.w>_426){
_42a.w=_426-_42a.x;
}
}
var l=_428.x-_42a.x,t=_428.y-Math.max(_42a.y,0),r=l+_428.w-_42a.w,bot=t+_428.h-_42a.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_423)||isIE>=9)){
s=-s;
}
_428.x+=el.scrollLeft;
el.scrollLeft+=s;
_428.x-=el.scrollLeft;
}
if(bot*t>0){
_428.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_428.y-=el.scrollTop;
}
el=(el!=_425)&&!_42b&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
}};
1&&lang.setObject("dojo.window",_41f);
return _41f;
});
},"dojox/grid/_Builder":function(){
define(["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/window","dojo/_base/event","dojo/_base/sniff","dojo/_base/connect","dojo/dnd/Moveable","dojox/html/metrics","./util","dojo/_base/html"],function(_42e,_42f,lang,win,_430,has,_431,_432,_433,util,html){
var dg=_42e.grid;
var _434=function(td){
return td.cellIndex>=0?td.cellIndex:_42f.indexOf(td.parentNode.cells,td);
};
var _435=function(tr){
return tr.rowIndex>=0?tr.rowIndex:_42f.indexOf(tr.parentNode.childNodes,tr);
};
var _436=function(_437,_438){
return _437&&((_437.rows||0)[_438]||_437.childNodes[_438]);
};
var _439=function(node){
for(var n=node;n&&n.tagName!="TABLE";n=n.parentNode){
}
return n;
};
var _43a=function(_43b,_43c){
for(var n=_43b;n&&_43c(n);n=n.parentNode){
}
return n;
};
var _43d=function(_43e){
var name=_43e.toUpperCase();
return function(node){
return node.tagName!=name;
};
};
var _43f=util.rowIndexTag;
var _440=util.gridViewTag;
var _441=dg._Builder=lang.extend(function(view){
if(view){
this.view=view;
this.grid=view.grid;
}
},{view:null,_table:"<table class=\"dojoxGridRowTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"",getTableArray:function(){
var html=[this._table];
if(this.view.viewWidth){
html.push([" style=\"width:",this.view.viewWidth,";\""].join(""));
}
html.push(">");
return html;
},generateCellMarkup:function(_442,_443,_444,_445){
var _446=[],html;
if(_445){
var _447=_442.index!=_442.grid.getSortIndex()?"":_442.grid.sortInfo>0?"aria-sort=\"ascending\"":"aria-sort=\"descending\"";
if(!_442.id){
_442.id=this.grid.id+"Hdr"+_442.index;
}
html=["<th tabIndex=\"-1\" aria-readonly=\"true\" role=\"columnheader\"",_447,"id=\"",_442.id,"\""];
}else{
var _448=this.grid.editable&&!_442.editable?"aria-readonly=\"true\"":"";
html=["<td tabIndex=\"-1\" role=\"gridcell\"",_448];
}
if(_442.colSpan){
html.push(" colspan=\"",_442.colSpan,"\"");
}
if(_442.rowSpan){
html.push(" rowspan=\"",_442.rowSpan,"\"");
}
html.push(" class=\"dojoxGridCell ");
if(_442.classes){
html.push(_442.classes," ");
}
if(_444){
html.push(_444," ");
}
_446.push(html.join(""));
_446.push("");
html=["\" idx=\"",_442.index,"\" style=\""];
if(_443&&_443[_443.length-1]!=";"){
_443+=";";
}
html.push(_442.styles,_443||"",_442.hidden?"display:none;":"");
if(_442.unitWidth){
html.push("width:",_442.unitWidth,";");
}
_446.push(html.join(""));
_446.push("");
html=["\""];
if(_442.attrs){
html.push(" ",_442.attrs);
}
html.push(">");
_446.push(html.join(""));
_446.push("");
_446.push(_445?"</th>":"</td>");
return _446;
},isCellNode:function(_449){
return Boolean(_449&&_449!=win.doc&&html.attr(_449,"idx"));
},getCellNodeIndex:function(_44a){
return _44a?Number(html.attr(_44a,"idx")):-1;
},getCellNode:function(_44b,_44c){
for(var i=0,row;((row=_436(_44b.firstChild,i))&&row.cells);i++){
for(var j=0,cell;(cell=row.cells[j]);j++){
if(this.getCellNodeIndex(cell)==_44c){
return cell;
}
}
}
return null;
},findCellTarget:function(_44d,_44e){
var n=_44d;
while(n&&(!this.isCellNode(n)||(n.offsetParent&&_440 in n.offsetParent.parentNode&&n.offsetParent.parentNode[_440]!=this.view.id))&&(n!=_44e)){
n=n.parentNode;
}
return n!=_44e?n:null;
},baseDecorateEvent:function(e){
e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
},findTarget:function(_44f,_450){
var n=_44f;
while(n&&(n!=this.domNode)&&(!(_450 in n)||(_440 in n&&n[_440]!=this.view.id))){
n=n.parentNode;
}
return (n!=this.domNode)?n:null;
},findRowTarget:function(_451){
return this.findTarget(_451,_43f);
},isIntraNodeEvent:function(e){
try{
return (e.cellNode&&e.relatedTarget&&html.isDescendant(e.relatedTarget,e.cellNode));
}
catch(x){
return false;
}
},isIntraRowEvent:function(e){
try{
var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex);
}
catch(x){
return false;
}
},dispatchEvent:function(e){
if(e.dispatch in this){
return this[e.dispatch](e);
}
return false;
},domouseover:function(e){
if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){
this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e);
}
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){
this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}
},domousedown:function(e){
if(e.cellNode){
this.grid.onMouseDown(e);
}
this.grid.onMouseDownRow(e);
}});
var _452=dg._ContentBuilder=lang.extend(function(view){
_441.call(this,view);
},_441.prototype,{update:function(){
this.prepareHtml();
},prepareHtml:function(){
var _453=this.grid.get,_454=this.view.structure.cells;
for(var j=0,row;(row=_454[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.get=cell.get||(cell.value==undefined)&&_453;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false);
if(!this.grid.editable&&cell.editable){
this.grid.editable=true;
}
}
}
},generateHtml:function(_455,_456){
var html=this.getTableArray(),v=this.view,_457=v.structure.cells,item=this.grid.getItem(_456);
util.fire(this.view,"onBeforeRow",[_456,_457]);
for(var j=0,row;(row=_457[j]);j++){
if(row.hidden||row.header){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,m,cc,cs;(cell=row[i]);i++){
m=cell.markup;
cc=cell.customClasses=[];
cs=cell.customStyles=[];
m[5]=cell.format(_456,item);
m[1]=cc.join(" ");
m[3]=cs.join(";");
html.push.apply(html,m);
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},decorateEvent:function(e){
e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){
return false;
}
e.rowIndex=e.rowNode[_43f];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true;
}});
var _458=dg._HeaderBuilder=lang.extend(function(view){
this.moveable=null;
_441.call(this,view);
},_441.prototype,{_skipBogusClicks:false,overResizeWidth:4,minColWidth:1,update:function(){
if(this.tableMap){
this.tableMap.mapRows(this.view.structure.cells);
}else{
this.tableMap=new dg._TableMap(this.view.structure.cells);
}
},generateHtml:function(_459,_45a){
var html=this.getTableArray(),_45b=this.view.structure.cells;
util.fire(this.view,"onBeforeRow",[-1,_45b]);
for(var j=0,row;(row=_45b[j]);j++){
if(row.hidden){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,_45c;(cell=row[i]);i++){
cell.customClasses=[];
cell.customStyles=[];
if(this.view.simpleStructure){
if(cell.draggable){
if(cell.headerClasses){
if(cell.headerClasses.indexOf("dojoDndItem")==-1){
cell.headerClasses+=" dojoDndItem";
}
}else{
cell.headerClasses="dojoDndItem";
}
}
if(cell.attrs){
if(cell.attrs.indexOf("dndType='gridColumn_")==-1){
cell.attrs+=" dndType='gridColumn_"+this.grid.id+"'";
}
}else{
cell.attrs="dndType='gridColumn_"+this.grid.id+"'";
}
}
_45c=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
_45c[5]=(_45a!=undefined?_45a:_459(cell));
_45c[3]=cell.customStyles.join(";");
_45c[1]=cell.customClasses.join(" ");
html.push(_45c.join(""));
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},getCellX:function(e){
var n,x=e.layerX;
if(has("mozilla")||has("ie")>=9){
n=_43a(e.target,_43d("th"));
x-=(n&&n.offsetLeft)||0;
var t=e.sourceView.getScrollbarWidth();
if(!this.grid.isLeftToRight()){
table=_43a(n,_43d("table"));
x-=(table&&table.offsetLeft)||0;
}
}
n=_43a(e.target,function(){
if(!n||n==e.cellNode){
return false;
}
x+=(n.offsetLeft<0?0:n.offsetLeft);
return true;
});
return x;
},decorateEvent:function(e){
this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true;
},prepareResize:function(e,mod){
do{
var i=e.cellIndex;
e.cellNode=(i?e.cellNode.parentNode.cells[i+mod]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
}while(e.cellNode&&e.cellNode.style.display=="none");
return Boolean(e.cellNode);
},canResize:function(e){
if(!e.cellNode||e.cellNode.colSpan>1){
return false;
}
var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&cell.canResize();
},overLeftResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return (e.cellIndex>0)&&(e.cellX>0&&e.cellX<this.overResizeWidth)&&this.prepareResize(e,-1);
}
var t=e.cellNode&&(e.cellX>0&&e.cellX<this.overResizeWidth);
return t;
},overRightResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth);
}
return (e.cellIndex>0)&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)&&this.prepareResize(e,-1);
},domousemove:function(e){
if(!this.moveable){
var c=(this.overRightResizeArea(e)?"dojoxGridColResize":(this.overLeftResizeArea(e)?"dojoxGridColResize":""));
if(c&&!this.canResize(e)){
c="dojoxGridColNoResize";
}
html.toggleClass(e.sourceView.headerNode,"dojoxGridColNoResize",(c=="dojoxGridColNoResize"));
html.toggleClass(e.sourceView.headerNode,"dojoxGridColResize",(c=="dojoxGridColResize"));
if(c){
_430.stop(e);
}
}
},domousedown:function(e){
if(!this.moveable){
if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){
this.beginColumnResize(e);
}else{
this.grid.onMouseDown(e);
this.grid.onMouseOverRow(e);
}
}
},doclick:function(e){
if(this._skipBogusClicks){
_430.stop(e);
return true;
}
return false;
},colResizeSetup:function(e,_45d){
var _45e=html.contentBox(e.sourceView.headerNode);
if(_45d){
this.lineDiv=document.createElement("div");
var vw=html.position(e.sourceView.headerNode,true);
var _45f=html.contentBox(e.sourceView.domNode);
var l=e.pageX;
if(!this.grid.isLeftToRight()&&has("ie")<8){
l-=_433.getScrollbar().w;
}
html.style(this.lineDiv,{top:vw.y+"px",left:l+"px",height:(_45f.h+_45e.h)+"px"});
html.addClass(this.lineDiv,"dojoxGridResizeColLine");
this.lineDiv._origLeft=l;
win.body().appendChild(this.lineDiv);
}
var _460=[],_461=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;(cell=_461[i]);i++){
_460.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth});
}
var view=e.sourceView;
var adj=this.grid.isLeftToRight()?1:-1;
var _462=e.grid.views.views;
var _463=[];
for(var j=view.idx+adj,_464;(_464=_462[j]);j=j+adj){
_463.push({node:_464.headerNode,left:window.parseInt(_464.headerNode.style.left)});
}
var _465=view.headerContentNode.firstChild;
var drag={scrollLeft:e.sourceView.headerNode.scrollLeft,view:view,node:e.cellNode,index:e.cellIndex,w:html.contentBox(e.cellNode).w,vw:_45e.w,table:_465,tw:html.contentBox(_465).w,spanners:_460,followers:_463};
return drag;
},beginColumnResize:function(e){
this.moverDiv=document.createElement("div");
html.style(this.moverDiv,{position:"absolute",left:0});
win.body().appendChild(this.moverDiv);
html.addClass(this.grid.domNode,"dojoxGridColumnResizing");
var m=(this.moveable=new _432(this.moverDiv));
var drag=this.colResizeSetup(e,true);
m.onMove=lang.hitch(this,"doResizeColumn",drag);
_431.connect(m,"onMoveStop",lang.hitch(this,function(){
this.endResizeColumn(drag);
if(drag.node.releaseCapture){
drag.node.releaseCapture();
}
this.moveable.destroy();
delete this.moveable;
this.moveable=null;
html.removeClass(this.grid.domNode,"dojoxGridColumnResizing");
}));
if(e.cellNode.setCapture){
e.cellNode.setCapture();
}
m.onMouseDown(e);
},doResizeColumn:function(_466,_467,_468){
var _469=_468.l;
var data={deltaX:_469,w:_466.w+(this.grid.isLeftToRight()?_469:-_469),vw:_466.vw+_469,tw:_466.tw+_469};
this.dragRecord={inDrag:_466,mover:_467,leftTop:_468};
if(data.w>=this.minColWidth){
if(!_467){
this.doResizeNow(_466,data);
}else{
html.style(this.lineDiv,"left",(this.lineDiv._origLeft+data.deltaX)+"px");
}
}
},endResizeColumn:function(_46a){
if(this.dragRecord){
var _46b=this.dragRecord.leftTop;
var _46c=this.grid.isLeftToRight()?_46b.l:-_46b.l;
_46c+=Math.max(_46a.w+_46c,this.minColWidth)-(_46a.w+_46c);
if(has("webkit")&&_46a.spanners.length){
_46c+=html._getPadBorderExtents(_46a.spanners[0].node).w;
}
var data={deltaX:_46c,w:_46a.w+_46c,vw:_46a.vw+_46c,tw:_46a.tw+_46c};
this.doResizeNow(_46a,data);
delete this.dragRecord;
}
html.destroy(this.lineDiv);
html.destroy(this.moverDiv);
html.destroy(this.moverDiv);
delete this.moverDiv;
this._skipBogusClicks=true;
_46a.view.update();
this._skipBogusClicks=false;
this.grid.onResizeColumn(_46a.index);
},doResizeNow:function(_46d,data){
_46d.view.convertColPctToFixed();
if(_46d.view.flexCells&&!_46d.view.testFlexCells()){
var t=_439(_46d.node);
if(t){
(t.style.width="");
}
}
var i,s,sw,f,fl;
for(i=0;(s=_46d.spanners[i]);i++){
sw=s.width+data.deltaX;
if(sw>0){
s.node.style.width=sw+"px";
_46d.view.setColWidth(s.index,sw);
}
}
if(this.grid.isLeftToRight()||!has("ie")){
for(i=0;(f=_46d.followers[i]);i++){
fl=f.left+data.deltaX;
f.node.style.left=fl+"px";
}
}
_46d.node.style.width=data.w+"px";
_46d.view.setColWidth(_46d.index,data.w);
_46d.view.headerNode.style.width=data.vw+"px";
_46d.view.setColumnsWidth(data.tw);
if(!this.grid.isLeftToRight()){
_46d.view.headerNode.scrollLeft=_46d.scrollLeft+data.deltaX;
}
}});
dg._TableMap=lang.extend(function(rows){
this.mapRows(rows);
},{map:null,mapRows:function(_46e){
var _46f=_46e.length;
if(!_46f){
return;
}
this.map=[];
var row;
for(var k=0;(row=_46e[k]);k++){
this.map[k]=[];
}
for(var j=0;(row=_46e[j]);j++){
for(var i=0,x=0,cell,_470,_471;(cell=row[i]);i++){
while(this.map[j][x]){
x++;
}
this.map[j][x]={c:i,r:j};
_471=cell.rowSpan||1;
_470=cell.colSpan||1;
for(var y=0;y<_471;y++){
for(var s=0;s<_470;s++){
this.map[j+y][x+s]=this.map[j][x];
}
}
x+=_470;
}
}
},dumpMap:function(){
for(var j=0,row,h="";(row=this.map[j]);j++,h=""){
for(var i=0,cell;(cell=row[i]);i++){
h+=cell.r+","+cell.c+"   ";
}
}
},getMapCoords:function(_472,_473){
for(var j=0,row;(row=this.map[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
if(cell.c==_473&&cell.r==_472){
return {j:j,i:i};
}
}
}
return {j:-1,i:-1};
},getNode:function(_474,_475,_476){
var row=_474&&_474.rows[_475];
return row&&row.cells[_476];
},_findOverlappingNodes:function(_477,_478,_479){
var _47a=[];
var m=this.getMapCoords(_478,_479);
for(var j=0,row;(row=this.map[j]);j++){
if(j==m.j){
continue;
}
var rw=row[m.i];
var n=(rw?this.getNode(_477,rw.r,rw.c):null);
if(n){
_47a.push(n);
}
}
return _47a;
},findOverlappingNodes:function(_47b){
return this._findOverlappingNodes(_439(_47b),_435(_47b.parentNode),_434(_47b));
}});
return {_Builder:_441,_HeaderBuilder:_458,_ContentBuilder:_452};
});
},"dojo/dnd/Source":function(){
define(["../_base/array","../_base/connect","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],function(_47c,_47d,_47e,_47f,lang,_480,_481,_482,_483,_484,dnd,_485,_486){
if(!_47f.isAsync){
_483(0,function(){
var _487=["dojo/dnd/AutoSource","dojo/dnd/Target"];
require(_487);
});
}
var _488=_47e("dojo.dnd.Source",_485,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_489){
lang.mixin(this,lang.mixin({},_489));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
_480.add(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
_480.add(this.node,"dojoDndTarget");
}
if(this.horizontal){
_480.add(this.node,"dojoDndHorizontal");
}
this.topics=[_484.subscribe("/dnd/source/over",lang.hitch(this,"onDndSourceOver")),_484.subscribe("/dnd/start",lang.hitch(this,"onDndStart")),_484.subscribe("/dnd/drop",lang.hitch(this,"onDndDrop")),_484.subscribe("/dnd/cancel",lang.hitch(this,"onDndCancel"))];
},checkAcceptance:function(_48a,_48b){
if(this==_48a){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_48b.length;++i){
var type=_48a.getItem(_48b[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_48c,self){
if(_48c){
return true;
}
if(arguments.length<2){
self=this==_486.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
_488.superclass.destroy.call(this);
_47c.forEach(this.topics,function(t){
t.remove();
});
this.targetAnchor=null;
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
_488.superclass.onMouseMove.call(this,e);
var m=_486.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _48d=this.getSelectedNodes();
if(_48d.length){
m.startDrag(this,_48d,this.copyState(dnd.getCopyKeyState(e),true));
}
}
}
if(this.isDragging){
var _48e=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=_481.position(this.current,true);
}
if(this.horizontal){
_48e=(e.pageX-this.targetBox.x<this.targetBox.w/2)==_481.isBodyLtr(this.current.ownerDocument);
}else{
_48e=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_48e!=this.before){
this._markTargetAnchor(_48e);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
_488.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
_488.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_48f){
if(this!==_48f){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=_486.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_490,_491,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_490?(copy?"Copied":"Moved"):"");
}
var _492=this.accept&&this.checkAcceptance(_490,_491);
this._changeState("Target",_492?"":"Disabled");
if(this==_490){
_486.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_493,_494,copy,_495){
if(this==_495){
this.onDrop(_493,_494,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_496,_497,copy){
if(this!=_496){
this.onDropExternal(_496,_497,copy);
}else{
this.onDropInternal(_497,copy);
}
},onDropExternal:function(_498,_499,copy){
var _49a=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _49a.call(this,_498.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node){
var t=_498.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node){
var t=_498.getItem(node.id);
_498.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_498.selectNone();
}
this.insertNodes(true,_499,this.before,this.current);
if(!copy&&this.creator){
_498.deleteSelectedNodes();
}
this._normalizedCreator=_49a;
},onDropInternal:function(_49b,copy){
var _49c=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _49c.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_49b,this.before,this.current);
this._normalizedCreator=_49c;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
_488.superclass.onOverEvent.call(this);
_486.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
_488.superclass.onOutEvent.call(this);
_486.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_49d){
if(this.current==this.targetAnchor&&this.before==_49d){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_49d;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(e.type!="touchstart"&&!_482.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(_480.contains(node,"dojoDndHandle")){
return true;
}
if(_480.contains(node,"dojoDndItem")||_480.contains(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
return _488;
});
},"dojox/grid/cells/_base":function(){
define("dojox/grid/cells/_base",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/event","dojo/_base/connect","dojo/_base/array","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dijit/_Widget","../util"],function(dojo,_49e,lang,_49f,_4a0,_4a1,has,dom,_4a2,_4a3,_4a4,util){
var _4a5=_49e("dojox.grid._DeferredTextWidget",_4a4,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(lang.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
var _4a6=function(_4a7){
try{
util.fire(_4a7,"focus");
util.fire(_4a7,"select");
}
catch(e){
}
};
var _4a8=function(){
setTimeout(lang.hitch.apply(dojo,arguments),0);
};
var _4a9=_49e("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_4aa){
this._props=_4aa||{};
lang.mixin(this,_4aa);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_4ab,_4ac){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_4ab!=this.defaultValue&&f)?f.apply(s,_4ac):_4ab;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new _4a5({deferred:v},_4a3.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_4ad,_4ae){
var f,i=this.grid.edit.info,d=this.get?this.get(_4ad,_4ae):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_4ad&&i.cell==this))){
return this.formatEditing(d,_4ad);
}else{
return this._defaultFormat(d,[d,_4ad,this]);
}
},formatEditing:function(_4af,_4b0){
},getNode:function(_4b1){
return this.view.getCellNode(_4b1,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_4b2){
return (this.getNode(_4b2)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&lang.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_4b3,_4b4){
if(this.getNode(_4b4)){
this.grid.edit.applyCellEdit(_4b3,this,_4b4);
}
},cancelEdit:function(_4b5){
this.grid.doCancelEdit(_4b5);
},_onEditBlur:function(_4b6){
if(this.grid.edit.isEditCell(_4b6,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_4b7,_4b8){
if(this.commitOnBlur){
_4a0.connect(_4b7,"onblur",function(e){
setTimeout(lang.hitch(this,"_onEditBlur",_4b8),250);
});
}
},needFormatNode:function(_4b9,_4ba){
this._formatPending=true;
_4a8(this,"_formatNode",_4b9,_4ba);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_4bb,_4bc){
if(this._formatPending){
this._formatPending=false;
if(!has("ie")){
dom.setSelectable(this.grid.domNode,true);
}
this.formatNode(this.getEditNode(_4bc),_4bb,_4bc);
}
},formatNode:function(_4bd,_4be,_4bf){
if(has("ie")){
_4a8(this,"focus",_4bf,_4bd);
}else{
this.focus(_4bf,_4bd);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_4c0){
return this.getEditNode(_4c0)[this._valueProp];
},setValue:function(_4c1,_4c2){
var n=this.getEditNode(_4c1);
if(n){
n[this._valueProp]=_4c2;
}
},focus:function(_4c3,_4c4){
_4a6(_4c4||this.getEditNode(_4c3));
},save:function(_4c5){
this.value=this.value||this.getValue(_4c5);
},restore:function(_4c6){
this.setValue(_4c6,this.value);
},_finish:function(_4c7){
dom.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_4c8){
this.applyEdit(this.getValue(_4c8),_4c8);
this._finish(_4c8);
},cancel:function(_4c9){
this.cancelEdit(_4c9);
this._finish(_4c9);
}});
_4a9.markupFactory=function(node,_4ca){
var _4cb=lang.trim(_4a2.get(node,"formatter")||"");
if(_4cb){
_4ca.formatter=lang.getObject(_4cb)||_4cb;
}
var get=lang.trim(_4a2.get(node,"get")||"");
if(get){
_4ca.get=lang.getObject(get);
}
var _4cc=function(attr,cell,_4cd){
var _4ce=lang.trim(_4a2.get(node,attr)||"");
if(_4ce){
cell[_4cd||attr]=!(_4ce.toLowerCase()=="false");
}
};
_4cc("sortDesc",_4ca);
_4cc("editable",_4ca);
_4cc("alwaysEditing",_4ca);
_4cc("noresize",_4ca);
_4cc("draggable",_4ca);
var _4cf=lang.trim(_4a2.get(node,"loadingText")||_4a2.get(node,"defaultValue")||"");
if(_4cf){
_4ca.defaultValue=_4cf;
}
var _4d0=function(attr,cell,_4d1){
var _4d2=lang.trim(_4a2.get(node,attr)||"")||undefined;
if(_4d2){
cell[_4d1||attr]=_4d2;
}
};
_4d0("styles",_4ca);
_4d0("headerStyles",_4ca);
_4d0("cellStyles",_4ca);
_4d0("classes",_4ca);
_4d0("headerClasses",_4ca);
_4d0("cellClasses",_4ca);
};
var Cell=_49e("dojox.grid.cells.Cell",_4a9,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_4d3,_4d4){
this.needFormatNode(_4d3,_4d4);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_4d3+"\">";
},formatNode:function(_4d5,_4d6,_4d7){
this.inherited(arguments);
this.registerOnBlur(_4d5,_4d7);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
_49f.stop(e);
}
}
},_finish:function(_4d8){
this.inherited(arguments);
var n=this.getEditNode(_4d8);
try{
util.fire(n,"blur");
}
catch(e){
}
}});
Cell.markupFactory=function(node,_4d9){
_4a9.markupFactory(node,_4d9);
var _4da=lang.trim(_4a2.get(node,"keyFilter")||"");
if(_4da){
_4d9.keyFilter=new RegExp(_4da);
}
};
var _4db=_49e("dojox.grid.cells.RowIndex",Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_4dc){
return _4dc+1;
}});
_4db.markupFactory=function(node,_4dd){
Cell.markupFactory(node,_4dd);
};
var _4de=_49e("dojox.grid.cells.Select",Cell,{options:null,values:null,returnIndex:-1,constructor:function(_4df){
this.values=this.values||this.options;
},formatEditing:function(_4e0,_4e1){
this.needFormatNode(_4e0,_4e1);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
v=v.replace?v.replace(/&/g,"&amp;").replace(/</g,"&lt;"):v;
o=o.replace?o.replace(/&/g,"&amp;").replace(/</g,"&lt;"):o;
h.push("<option",(_4e0==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},_defaultFormat:function(_4e2,_4e3){
var v=this.inherited(arguments);
if(!this.formatter&&this.values&&this.options){
var i=_4a1.indexOf(this.values,v);
if(i>=0){
v=this.options[i];
}
}
return v;
},getValue:function(_4e4){
var n=this.getEditNode(_4e4);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
_4de.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
var _4e5=lang.trim(_4a2.get(node,"options")||"");
if(_4e5){
var o=_4e5.split(",");
if(o[0]!=_4e5){
cell.options=o;
}
}
var _4e6=lang.trim(_4a2.get(node,"values")||"");
if(_4e6){
var v=_4e6.split(",");
if(v[0]!=_4e6){
cell.values=v;
}
}
};
var _4e7=_49e("dojox.grid.cells.AlwaysEdit",Cell,{alwaysEditing:true,_formatNode:function(_4e8,_4e9){
this.formatNode(this.getEditNode(_4e9),_4e8,_4e9);
},applyStaticValue:function(_4ea){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_4ea),this,_4ea);
e.start(this,_4ea,true);
}});
_4e7.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
};
var Bool=_49e("dojox.grid.cells.Bool",_4e7,{_valueProp:"checked",formatEditing:function(_4eb,_4ec){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_4eb?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
Bool.markupFactory=function(node,cell){
_4e7.markupFactory(node,cell);
};
return _4a9;
});
},"dijit/_WidgetBase":function(){
define(["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./Destroyable","./registry"],function(_4ed,_4ee,_4ef,_4f0,_4f1,_4f2,dom,_4f3,_4f4,_4f5,_4f6,_4f7,has,_4f8,lang,on,_4f9,_4fa,_4fb,win,_4fc,_4fd){
has.add("dijit-legacy-requires",!_4f8.isAsync);
if(has("dijit-legacy-requires")){
_4f9(0,function(){
var _4fe=["dijit/_base/manager"];
_4ed(_4fe);
});
}
var _4ff={};
function _500(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _501(attr){
return function(val){
_4f3[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _4f2("dijit._WidgetBase",[_4fa,_4fc],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_501("lang"),dir:"",_setDirAttr:_501("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(val){
this._set("ownerDocument",val);
},attributeMap:{},_blankGif:_4f0.blankGif||_4ed.toUrl("dojo/resources/blank.gif"),postscript:function(_502,_503){
this.create(_502,_503);
},create:function(_504,_505){
this.srcNodeRef=dom.byId(_505);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_504){
this.params=_504;
lang.mixin(this,_504);
}
this.postMixInProperties();
if(!this.id){
this.id=_4fd.getUniqueId(this.declaredClass.replace(/\./g,"_"));
if(this.params){
delete this.params.id;
}
}
this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:win.doc);
this.ownerDocumentBody=win.body(this.ownerDocument);
_4fd.add(this);
this.buildRendering();
var _506;
if(this.domNode){
this._applyAttributes();
var _507=this.srcNodeRef;
if(_507&&_507.parentNode&&this.domNode!==_507){
_507.parentNode.replaceChild(this.domNode,_507);
_506=true;
}
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(_506){
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
var _508=ctor.prototype;
for(var _509 in _508){
if(_509 in this.attributeMap){
continue;
}
var _50a="_set"+_509.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_50a in _508){
list.push(_509);
}
}
}
_4ee.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _50b in this.params){
this.set(_50b,this.params[_50b]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div");
}
if(this.baseClass){
var _50c=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_50c=_50c.concat(_4ee.map(_50c,function(name){
return name+"Rtl";
}));
}
_4f4.add(this.domNode,_50c);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_4ee.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_50d){
this._beingDestroyed=true;
this.destroyDescendants(_50d);
this.destroy(_50d);
},destroy:function(_50e){
this._beingDestroyed=true;
this.uninitialize();
function _50f(w){
if(w.destroyRecursive){
w.destroyRecursive(_50e);
}else{
if(w.destroy){
w.destroy(_50e);
}
}
};
_4ee.forEach(this._connects,lang.hitch(this,"disconnect"));
_4ee.forEach(this._supportingWidgets,_50f);
if(this.domNode){
_4ee.forEach(_4fd.findWidgets(this.domNode,this.containerNode),_50f);
}
this.destroyRendering(_50e);
_4fd.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_510){
if(this.bgIframe){
this.bgIframe.destroy(_510);
delete this.bgIframe;
}
if(this.domNode){
if(_510){
_4f3.remove(this.domNode,"widgetId");
}else{
_4f5.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_510){
_4f5.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_511){
_4ee.forEach(this.getChildren(),function(_512){
if(_512.destroyRecursive){
_512.destroyRecursive(_511);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_513){
var _514=this.domNode;
if(lang.isObject(_513)){
_4f7.set(_514,_513);
}else{
if(_514.style.cssText){
_514.style.cssText+="; "+_513;
}else{
_514.style.cssText=_513;
}
}
this._set("style",_513);
},_attrToDom:function(attr,_515,_516){
_516=arguments.length>=3?_516:this.attributeMap[attr];
_4ee.forEach(lang.isArray(_516)?_516:[_516],function(_517){
var _518=this[_517.node||_517||"domNode"];
var type=_517.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_515)){
_515=lang.hitch(this,_515);
}
var _519=_517.attribute?_517.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
if(_518.tagName){
_4f3.set(_518,_519,_515);
}else{
_518.set(_519,_515);
}
break;
case "innerText":
_518.innerHTML="";
_518.appendChild(this.ownerDocument.createTextNode(_515));
break;
case "innerHTML":
_518.innerHTML=_515;
break;
case "class":
_4f4.replace(_518,_515,this[attr]);
break;
}
},this);
},get:function(name){
var _51a=this._getAttrNames(name);
return this[_51a.g]?this[_51a.g]():this[name];
},set:function(name,_51b){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _51c=this._getAttrNames(name),_51d=this[_51c.s];
if(lang.isFunction(_51d)){
var _51e=_51d.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _51f=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_51f].tagName,_520=_4ff[tag]||(_4ff[tag]=_500(this[_51f])),map=name in this.attributeMap?this.attributeMap[name]:_51c.s in this?this[_51c.s]:((_51c.l in _520&&typeof _51b!="function")||/^aria-|^data-|^role$/.test(name))?_51f:null;
if(map!=null){
this._attrToDom(name,_51b,map);
}
this._set(name,_51b);
}
return _51e||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_521){
var _522=this[name];
this[name]=_521;
if(this._created&&_521!==_522){
if(this._watchCallbacks){
this._watchCallbacks(name,_522,_521);
}
this.emit("attrmodified-"+name,{detail:{prevValue:_522,newValue:_521}});
}
},emit:function(type,_523,_524){
_523=_523||{};
if(_523.bubbles===undefined){
_523.bubbles=true;
}
if(_523.cancelable===undefined){
_523.cancelable=true;
}
if(!_523.detail){
_523.detail={};
}
_523.detail.widget=this;
var ret,_525=this["on"+type];
if(_525){
ret=_525.apply(this,_524?_524:[_523]);
}
if(this._started&&!this._beingDestroyed){
on.emit(this.domNode,type.toLowerCase(),_523);
}
return ret;
},on:function(type,func){
var _526=this._onMap(type);
if(_526){
return _4ef.after(this,_526,func,true);
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
return this.containerNode?_4fd.findWidgets(this.containerNode):[];
},getParent:function(){
return _4fd.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_527,_528){
return this.own(_4f1.connect(obj,_527,this,_528))[0];
},disconnect:function(_529){
_529.remove();
},subscribe:function(t,_52a){
return this.own(_4fb.subscribe(t,lang.hitch(this,_52a)))[0];
},unsubscribe:function(_52b){
_52b.remove();
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_4f6.isBodyLtr(this.ownerDocument);
},isFocusable:function(){
return this.focus&&(_4f7.get(this.domNode,"display")!="none");
},placeAt:function(_52c,_52d){
var _52e=!_52c.tagName&&_4fd.byId(_52c);
if(_52e&&_52e.addChild&&(!_52d||typeof _52d==="number")){
_52e.addChild(this,_52d);
}else{
var ref=_52e?(_52e.containerNode&&!/after|before|replace/.test(_52d||"")?_52e.containerNode:_52e.domNode):dom.byId(_52c,this.ownerDocument);
_4f5.place(this.domNode,ref,_52d);
if(!this._started&&(this.getParent()||{})._started){
this.startup();
}
}
return this;
},getTextDir:function(text,_52f){
return _52f;
},applyTextDir:function(){
},defer:function(fcn,_530){
var _531=setTimeout(lang.hitch(this,function(){
_531=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_530||0);
return {remove:function(){
if(_531){
clearTimeout(_531);
_531=null;
}
return null;
}};
}});
});
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_532,_533,_534,lang,dom,_535,_536,on,_537,_538,dnd,_539,win){
var _53a=_533("dojo.dnd.Moveable",[_536],{handle:"",delay:0,skip:false,constructor:function(node,_53b){
this.node=dom.byId(node);
if(!_53b){
_53b={};
}
this.handle=_53b.handle?dom.byId(_53b.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_53b.delay>0?_53b.delay:0;
this.skip=_53b.skip;
this.mover=_53b.mover?_53b.mover:_539;
this.events=[on(this.handle,_538.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_53c,node,Ctor){
return new Ctor(node,_53c);
},destroy:function(){
_532.forEach(this.events,function(_53d){
_53d.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_538.move,lang.hitch(this,"onMouseMove")),on(this.handle,_538.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
_534.stop(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
_534.stop(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
_534.stop(e);
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
_534.stop(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_53e){
_537.publish("/dnd/move/start",_53e);
_535.add(win.body(),"dojoMove");
_535.add(this.node,"dojoMoveItem");
},onMoveStop:function(_53f){
_537.publish("/dnd/move/stop",_53f);
_535.remove(win.body(),"dojoMove");
_535.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_540,_541){
this.onMoving(_540,_541);
var s=_540.node.style;
s.left=_541.l+"px";
s.top=_541.t+"px";
this.onMoved(_540,_541);
},onMoving:function(){
},onMoved:function(){
}});
return _53a;
});
},"*now":function(r){
r(["dojo/i18n!*preload*dojox/grid/nls/DataGrid*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("dojox/grid/DataGrid",["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/sniff","dojo/_base/declare","./_Grid","./DataSelection","dojo/_base/html"],function(_542,_543,lang,json,has,_544,_545,_546,html){
var _547=_544("dojox.grid.DataGrid",_545,{store:null,query:null,queryOptions:null,fetchText:"...",sortFields:null,updateDelay:1,items:null,_store_connects:null,_by_idty:null,_by_idx:null,_cache:null,_pages:null,_pending_requests:null,_bop:-1,_eop:-1,_requests:0,rowCount:0,_isLoaded:false,_isLoading:false,keepSelection:false,postCreate:function(){
this._pages=[];
this._store_connects=[];
this._by_idty={};
this._by_idx=[];
this._cache=[];
this._pending_requests={};
this._setStore(this.store);
this.inherited(arguments);
},destroy:function(){
this.selection.destroy();
this.inherited(arguments);
},createSelection:function(){
this.selection=new _546(this);
},get:function(_548,_549){
if(_549&&this.field=="_item"&&!this.fields){
return _549;
}else{
if(_549&&this.fields){
var ret=[];
var s=this.grid.store;
_543.forEach(this.fields,function(f){
ret=ret.concat(s.getValues(_549,f));
});
return ret;
}else{
if(!_549&&typeof _548==="string"){
return this.inherited(arguments);
}
}
}
return (!_549?this.defaultValue:(!this.field?this.value:(this.field=="_item"?_549:this.grid.store.getValue(_549,this.field))));
},_checkUpdateStatus:function(){
if(this.updateDelay>0){
var _54a=false;
if(this._endUpdateDelay){
clearTimeout(this._endUpdateDelay);
delete this._endUpdateDelay;
_54a=true;
}
if(!this.updating){
this.beginUpdate();
_54a=true;
}
if(_54a){
var _54b=this;
this._endUpdateDelay=setTimeout(function(){
delete _54b._endUpdateDelay;
_54b.endUpdate();
},this.updateDelay);
}
}
},_onSet:function(item,_54c,_54d,_54e){
this._checkUpdateStatus();
var idx=this.getItemIndex(item);
if(idx>-1){
this.updateRow(idx);
}
},_createItem:function(item,_54f){
var idty=this._hasIdentity?this.store.getIdentity(item):json.toJson(this.query)+":idx:"+_54f+":sort:"+json.toJson(this.getSortProps());
var o=this._by_idty[idty]={idty:idty,item:item};
return o;
},_addItem:function(item,_550,_551){
this._by_idx[_550]=this._createItem(item,_550);
if(!_551){
this.updateRow(_550);
}
},_onNew:function(item,_552){
this._checkUpdateStatus();
var _553=this.get("rowCount");
this._addingItem=true;
this.updateRowCount(_553+1);
this._addingItem=false;
this._addItem(item,_553);
this.showMessage();
},_onDelete:function(item){
this._checkUpdateStatus();
var idx=this._getItemIndex(item,true);
if(idx>=0){
this._pages=[];
this._bop=-1;
this._eop=-1;
var o=this._by_idx[idx];
this._by_idx.splice(idx,1);
delete this._by_idty[o.idty];
this.updateRowCount(this.get("rowCount")-1);
if(this.get("rowCount")===0){
this.showMessage(this.noDataMessage);
}
}
if(this.selection.isSelected(idx)){
this.selection.deselect(idx);
this.selection.selected.splice(idx,1);
}
},_onRevert:function(){
this._refresh();
},setStore:function(_554,_555,_556){
if(this._requestsPending(0)){
return;
}
this._setQuery(_555,_556);
this._setStore(_554);
this._refresh(true);
},setQuery:function(_557,_558){
if(this._requestsPending(0)){
return;
}
this._setQuery(_557,_558);
this._refresh(true);
},setItems:function(_559){
this.items=_559;
this._setStore(this.store);
this._refresh(true);
},_setQuery:function(_55a,_55b){
this.query=_55a;
this.queryOptions=_55b||this.queryOptions;
},_setStore:function(_55c){
if(this.store&&this._store_connects){
_543.forEach(this._store_connects,this.disconnect,this);
}
this.store=_55c;
if(this.store){
var f=this.store.getFeatures();
var h=[];
this._canEdit=!!f["dojo.data.api.Write"]&&!!f["dojo.data.api.Identity"];
this._hasIdentity=!!f["dojo.data.api.Identity"];
if(!!f["dojo.data.api.Notification"]&&!this.items){
h.push(this.connect(this.store,"onSet","_onSet"));
h.push(this.connect(this.store,"onNew","_onNew"));
h.push(this.connect(this.store,"onDelete","_onDelete"));
}
if(this._canEdit){
h.push(this.connect(this.store,"revert","_onRevert"));
}
this._store_connects=h;
}
},_onFetchBegin:function(size,req){
if(!this.scroller){
return;
}
if(this.rowCount!=size){
if(req.isRender){
this.scroller.init(size,this.keepRows,this.rowsPerPage);
this.rowCount=size;
this._setAutoHeightAttr(this.autoHeight,true);
this._skipRowRenormalize=true;
this.prerender();
this._skipRowRenormalize=false;
}else{
this.updateRowCount(size);
}
}
if(!size){
this.views.render();
this._resize();
this.showMessage(this.noDataMessage);
this.focus.initFocusView();
}else{
this.showMessage();
}
},_onFetchComplete:function(_55d,req){
if(!this.scroller){
return;
}
if(_55d&&_55d.length>0){
_543.forEach(_55d,function(item,idx){
this._addItem(item,req.start+idx,true);
},this);
this.updateRows(req.start,_55d.length);
if(req.isRender){
this.setScrollTop(0);
this.postrender();
}else{
if(this._lastScrollTop){
this.setScrollTop(this._lastScrollTop);
}
}
if(has("ie")){
html.setSelectable(this.domNode,this.selectable);
}
}
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
}
this._pending_requests[req.start]=false;
},_onFetchError:function(err,req){
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
this.showMessage(this.errorMessage);
}
this._pending_requests[req.start]=false;
this.onFetchError(err,req);
},onFetchError:function(err,req){
},_fetch:function(_55e,_55f){
_55e=_55e||0;
if(this.store&&!this._pending_requests[_55e]){
if(!this._isLoaded&&!this._isLoading){
this._isLoading=true;
this.showMessage(this.loadingMessage);
}
this._pending_requests[_55e]=true;
try{
if(this.items){
var _560=this.items;
var _561=this.store;
this.rowsPerPage=_560.length;
var req={start:_55e,count:this.rowsPerPage,isRender:_55f};
this._onFetchBegin(_560.length,req);
var _562=0;
_543.forEach(_560,function(i){
if(!_561.isItemLoaded(i)){
_562++;
}
});
if(_562===0){
this._onFetchComplete(_560,req);
}else{
var _563=function(item){
_562--;
if(_562===0){
this._onFetchComplete(_560,req);
}
};
_543.forEach(_560,function(i){
if(!_561.isItemLoaded(i)){
_561.loadItem({item:i,onItem:_563,scope:this});
}
},this);
}
}else{
this.store.fetch({start:_55e,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:_55f,onBegin:lang.hitch(this,"_onFetchBegin"),onComplete:lang.hitch(this,"_onFetchComplete"),onError:lang.hitch(this,"_onFetchError")});
}
}
catch(e){
this._onFetchError(e,{start:_55e,count:this.rowsPerPage});
}
}
},_clearData:function(){
this.updateRowCount(0);
this._by_idty={};
this._by_idx=[];
this._pages=[];
this._bop=this._eop=-1;
this._isLoaded=false;
this._isLoading=false;
},getItem:function(idx){
var data=this._by_idx[idx];
if(!data||(data&&!data.item)){
this._preparePage(idx);
return null;
}
return data.item;
},getItemIndex:function(item){
return this._getItemIndex(item,false);
},_getItemIndex:function(item,_564){
if(!_564&&!this.store.isItem(item)){
return -1;
}
var idty=this._hasIdentity?this.store.getIdentity(item):null;
for(var i=0,l=this._by_idx.length;i<l;i++){
var d=this._by_idx[i];
if(d&&((idty&&d.idty==idty)||(d.item===item))){
return i;
}
}
return -1;
},filter:function(_565,_566){
this.query=_565;
if(_566){
this._clearData();
}
this._fetch();
},_getItemAttr:function(idx,attr){
var item=this.getItem(idx);
return (!item?this.fetchText:this.store.getValue(item,attr));
},_render:function(){
if(this.domNode.parentNode){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this._fetch(0,true);
}
},_requestsPending:function(_567){
return this._pending_requests[_567];
},_rowToPage:function(_568){
return (this.rowsPerPage?Math.floor(_568/this.rowsPerPage):_568);
},_pageToRow:function(_569){
return (this.rowsPerPage?this.rowsPerPage*_569:_569);
},_preparePage:function(_56a){
if((_56a<this._bop||_56a>=this._eop)&&!this._addingItem){
var _56b=this._rowToPage(_56a);
this._needPage(_56b);
this._bop=_56b*this.rowsPerPage;
this._eop=this._bop+(this.rowsPerPage||this.get("rowCount"));
}
},_needPage:function(_56c){
if(!this._pages[_56c]){
this._pages[_56c]=true;
this._requestPage(_56c);
}
},_requestPage:function(_56d){
var row=this._pageToRow(_56d);
var _56e=Math.min(this.rowsPerPage,this.get("rowCount")-row);
if(_56e>0){
this._requests++;
if(!this._requestsPending(row)){
setTimeout(lang.hitch(this,"_fetch",row,false),1);
}
}
},getCellName:function(_56f){
return _56f.field;
},_refresh:function(_570){
this._clearData();
this._fetch(0,_570);
},sort:function(){
this.edit.apply();
this._lastScrollTop=this.scrollTop;
this._refresh();
},canSort:function(){
return (!this._isLoading);
},getSortProps:function(){
var c=this.getCell(this.getSortIndex());
if(!c){
if(this.sortFields){
return this.sortFields;
}
return null;
}else{
var desc=c["sortDesc"];
var si=!(this.sortInfo>0);
if(typeof desc=="undefined"){
desc=si;
}else{
desc=si?!desc:desc;
}
return [{attribute:c.field,descending:desc}];
}
},styleRowState:function(_571){
if(this.store&&this.store.getState){
var _572=this.store.getState(_571.index),c="";
for(var i=0,ss=["inflight","error","inserting"],s;s=ss[i];i++){
if(_572[s]){
c=" dojoxGridRow-"+s;
break;
}
}
_571.customClasses+=c;
}
},onStyleRow:function(_573){
this.styleRowState(_573);
this.inherited(arguments);
},canEdit:function(_574,_575){
return this._canEdit;
},_copyAttr:function(idx,attr){
var row={};
var _576={};
var src=this.getItem(idx);
return this.store.getValue(src,attr);
},doStartEdit:function(_577,_578){
if(!this._cache[_578]){
this._cache[_578]=this._copyAttr(_578,_577.field);
}
this.onStartEdit(_577,_578);
},doApplyCellEdit:function(_579,_57a,_57b){
this.store.fetchItemByIdentity({identity:this._by_idx[_57a].idty,onItem:lang.hitch(this,function(item){
var _57c=this.store.getValue(item,_57b);
if(typeof _57c=="number"){
_579=isNaN(_579)?_579:parseFloat(_579);
}else{
if(typeof _57c=="boolean"){
_579=_579=="true"?true:_579=="false"?false:_579;
}else{
if(_57c instanceof Date){
var _57d=new Date(_579);
_579=isNaN(_57d.getTime())?_579:_57d;
}
}
}
this.store.setValue(item,_57b,_579);
this.onApplyCellEdit(_579,_57a,_57b);
})});
},doCancelEdit:function(_57e){
var _57f=this._cache[_57e];
if(_57f){
this.updateRow(_57e);
delete this._cache[_57e];
}
this.onCancelEdit.apply(this,arguments);
},doApplyEdit:function(_580,_581){
var _582=this._cache[_580];
this.onApplyEdit(_580);
},removeSelectedRows:function(){
if(this._canEdit){
this.edit.apply();
var fx=lang.hitch(this,function(_583){
if(_583.length){
_543.forEach(_583,this.store.deleteItem,this.store);
this.selection.clear();
}
});
if(this.allItemsSelected){
this.store.fetch({query:this.query,queryOptions:this.queryOptions,onComplete:fx});
}else{
fx(this.selection.getSelected());
}
}
}});
_547.cell_markupFactory=function(_584,node,_585){
var _586=lang.trim(html.attr(node,"field")||"");
if(_586){
_585.field=_586;
}
_585.field=_585.field||_585.name;
var _587=lang.trim(html.attr(node,"fields")||"");
if(_587){
_585.fields=_587.split(",");
}
if(_584){
_584(node,_585);
}
};
_547.markupFactory=function(_588,node,ctor,_589){
return _545.markupFactory(_588,node,ctor,lang.partial(_547.cell_markupFactory,_589));
};
return _547;
});
