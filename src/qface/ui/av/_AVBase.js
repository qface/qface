define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/_base/sniff",
	"dijit/_Contained",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin"
], function(declare, domConstruct, has, Contained, WidgetBase,_TemplatedMixin){
	// module:
	//		dojox/mobile/Audio

	return declare([WidgetBase, Contained,_TemplatedMixin], {
		templateString : "",

		// summary:
		//		A thin wrapper around the HTML5 `<audio>` element.
		
		// source: Array
		//		An array of src and type,
		//		ex. [{src:"a.mp3",type:"audio/mpeg"},{src:"a.ogg",type:"audio/ogg"},...]
		//		The src gives the path of the media resource. The type gives the
		//		type of the media resource.
		source: null,

		// width: String
		//		The width of the embed element.
		width: "200px",

		// height: String
		//		The height of the embed element.
		height: "15px",

		// _playable: [private] Boolean
		//		Internal flag.
		_playable: false,
		
		// _tag: [private] String
		//		The name of the tag ("audio").

		constructor: function(){
			// summary:
			//		Creates a new instance of the class.
			this.source = [];
		},

		uninitialize:function(){
			this.pause();
		},
		play : function(src) {
			if (this.avPlayer && this.avPlayer.play)  {
				if (src) {
					this.avPlayer.src = src;
				}
				this.avPlayer.play();
			}
		},
		
		pause : function() {
			if (this.avPlayer && this.avPlayer.pause)  {
				this.avPlayer.pause();
			}
		}

	});
});
