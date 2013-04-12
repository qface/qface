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
  "dojo/_base/Deferred",
  "dojo/_base/lang",
  "dojo/topic",
  "dojo/on",
  "dojox/css3/transit", 
  "qface/ui/window/Window",
  "./Animation"                        
],function(declare,deferred,lang,topic,on,transit,Window,anim) {
	var JsonAMLWindow = declare([Window],{
	    
		selectedChild: null,
		defaultView: "default",
		
		_views  : null,
		
		
	    constructor : function() {
	    	this._views = {};
	    },

		postCreate: function(params,node){
			this.inherited(arguments);

			on(this.domNode, "startTransition", lang.hitch(this, this.onStartTransition));
		},
		
		startup: function(){
			this.inherited(arguments);
			this.transition(this.defaultView);

		},
		

		onStartTransition: function(evt){
			console.log("onStartTransition", evt.detail.href, history.state);
			if (evt.preventDefault){
				evt.preventDefault();
			}

			var target = evt.detail.target;
			var regex = /#(.+)/;
			if(!target && regex.test(evt.detail.href)){
				target = evt.detail.href.match(regex)[1];
			}
			
			//prevent event from bubbling to window and being
			//processed by dojox/mobile/ViewController
			evt.cancelBubble = true;
			if(evt.stopPropagation){
			    evt.stopPropagation();
			}
			
			this.transition(target, lang.mixin({reverse: false},evt.detail));
	
		},
		
		transition: function(transitionTo,opts){
			//summary: 
			//  transitions from the currently visible scene to the defined scene.
			//  it should determine what would be the best transition unless
			//  an override in opts tells it to use a specific transitioning methodology
			//  the transitionTo is a string in the form of [view]@[scene].  If
			//  view is left of, the current scene will be transitioned to the default
			//  view of the specified scene (eg @scene2), if the scene is left off
			//  the app controller will instruct the active scene to the view (eg view1).  If both
			//  are supplied (view1@scene2), then the application should transition to the scene,
			//  and instruct the scene to navigate to the view.
			
			var toId= transitionTo,next, current = this.selectedChild;
					
		    if (!this._views[toId]) {
		    	var view = this._views[toId] = this.app.createView(toId);
				this.addChild(view);
		    }
		    
			next = this._views[toId];

			if (!current){
				//assume this.set(...) will return a promise object if child is first loaded
				//return nothing if child is already in array of this.children
				this.set("selectedChild",next);	
				next.activate();
				return;
			}	

			var transitionDeferred  = new deferred();
		        var promise;
		    
			if (next!==current){
			    //TODO need to refactor here, when clicking fast, current will not be the 
			    //view we want to start transition. For example, during transition 1 -> 2
			    //if user click button to transition to 3 and then transition to 1. It will
			    //perform transition 2 -> 3 and 2 -> 1 because current is always point to 
			    //2 during 1 -> 2 transition.
			    
			    var waitingList = anim.getWaitingList([next.domNode, current.domNode]);
			    //update registry with deferred objects in animations of args.
			    var transitionDefs = {};
			    transitionDefs[current.domNode.id] = anim.playing[current.domNode.id] = new deferred();
			    transitionDefs[next.domNode.id] = anim.playing[current.domNode.id] = new deferred();
			                
			    deferred.when(waitingList, lang.hitch(this, function(){
				//assume next is already loaded so that this.set(...) will not return
				//a promise object. this.set(...) will handles the this.selectedChild,
				//activate or deactivate views and refresh layout.
				this.set("selectedChild", next);
				current.deactivate();
				next.activate();
				
				//publish /app/transition event
				//application can subscript this event to do user define operation like select TabBarButton, etc.
				topic.publish("/qface/app/jaml/Window/transition", [next, toId]);
				transit(current.domNode,next.domNode,lang.mixin({},opts,{transition: this.defaultTransition || "none", transitionDefs: transitionDefs})).then(lang.hitch(this, function(){
					//dojo.style(current.domNode, "display", "none");
					deferred.when(promise, function(){
	                                    transitionDeferred.resolve();
	                                });
					}));
			    }));
			}

			deferred.when(promise, function(){
			    transitionDeferred.resolve();
			});
			return transitionDeferred;
		}
		
	});

	return JsonAMLWindow;
});
