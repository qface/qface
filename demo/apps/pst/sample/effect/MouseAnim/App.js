define([
	 "dojo", // dojo
	 "dojo/data/ItemFileReadStore",
	 "dijit/form/_FormValueWidget",
	 "dijit/form/Button",
	 "dijit/form/TextBox",
	 "dijit/form/Form",
	 "dijit/form/FilteringSelect",
	 "dijit/Toolbar",
	 "dijit/layout/ContentPane",
	 "dojox/gfx", 
	 "dojox/grid/DataGrid",
	 "qface/app/Application",
	 "qface/ui/window/Window",
	 "qface/ui/window/StatusBar",
	 "qface/ui/drawing/Matrix2D",
	 "qface/ui/drawing/EventDispatcher",
	 "qface/ui/drawing/DisplayObject",
	 "qface/ui/drawing/Container",
	 "qface/ui/drawing/Stage",
	 "qface/ui/drawing/MouseEvent",
	 "qface/ui/drawing/Shape",
	 "qface/ui/drawing/Ticker",
	 "qface/ui/drawing/Rectangle",
	 "qface/ui/drawing/BitmapAnimation",
	 "qface/ui/drawing/SpriteSheet",
	 
	 "dojo/i18n!./nls/app"	 
],function(dojo,ItemFileReadStore,_FormValueWidget,Button,TextBox,Form,FilteringSelect,Toolbar,ContentPane,gfx,DataGrid,_App,Window,StatusBar,nlsApp) {


    <script type="text/javascript" src="../src/easeljs/utils/UID.js"></script>
    <script type="text/javascript" src="../src/easeljs/geom/Matrix2D.js"></script>
    <script type="text/javascript" src="../src/easeljs/events/EventDispatcher.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/DisplayObject.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/Container.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/Stage.js"></script>
    <script type="text/javascript" src="../src/easeljs/events/MouseEvent.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/Shape.js"></script>
    <script type="text/javascript" src="../src/easeljs/utils/Ticker.js"></script>
    <script type="text/javascript" src="../src/easeljs/geom/Rectangle.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/BitmapAnimation.js"></script>
    <script type="text/javascript" src="../src/easeljs/display/SpriteSheet.js"></script>
    <script type="text/javascript" src="../src/easeljs/utils/SpriteSheetUtils.js"></script	return dojo.declare([_App], {
		// TO DO:
		// * When revealing a numbered tile, all adjacent *clear* tiles should be revealed, which in turn reveal all other adjacent numbered tiles
		// * When all tiles containing mines have been revealed, the player should see a 'you win' message
		
		difficulty: "Easy",		// current difficulty setting
		board: 0,			// 2d array, holds all squares
		xSize: 0,			// horiz size of board
		ySize: 0,			// vert size of board
		squaresRevealed: 0,		// num of squares revealed by player
		totalSquares: 0,		// total num of squares
		squaresToWin: 0,		// num of squares to reveal to win
		resultShade: 0,			// 'shade' (alpha'ed rect) used to dim playing field when displaying result message
		resultMessage: 0,		// text shape object, 'You Win!' or 'You Lose!'
		
		init: function(args){
			this.win = new Window({
	        	app  : this,
				title: nlsApp.title,
				width: "200px",
				height: "230px",
				iconClass: "icon-16-apps-preferences-scene-screensaver",
				resizable: false,
	            showMaximize: false,
				onClose: dojo.hitch(this, this.kill)
			});
		
			this.toolbar = new Toolbar({
				region: "top"
			});
			this.toolbar.addChild( new Button({
				label: nlsApp.start,
				onClick: dojo.hitch(this, "startGame")
			}) );
			this.win.addChild( this.toolbar );
			

        var canvas;
        var stage;

        var img = new Image();
        var bmpAnimList;

        function init() {
            //find canvas and load images, wait for last image to load
            canvas = document.getElementById("testCanvas");

            // create a new stage and point it at our canvas:
            stage = new createjs.Stage(canvas);

            img = new Image();
            img.src = "assets/testSeq.png";
            img.onload = handleImageLoad;
        }

        function handleImageLoad(event) {
            // grab canvas width and height for later calculations:
            var w = canvas.width;
            var h = canvas.height;

            // create spritesheet and assign the associated data.
            var spriteSheet  = new createjs.SpriteSheet({
                images: [img],
                frames: {width:64, height:68, regX:32, regY:34},
                animations: {
                    walkUpRt:[0,19,"walkRt"],
                    walkDnRt:[20,39,"walkUpRt"],
                    walkRt:[41,59,"walkDnRt"]
                }
            });

            // to save file size, the loaded sprite sheet only includes right facing animations
            // we could flip the display objects with scaleX=-1, but this is expensive in some browsers
            // instead, we append flipped versions of the frames to our sprite sheet
            // this adds only horizontally flipped frames:
            createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

            // we could rewire the "next" sequences to make them work like so:
            // but instead we will use code in the angleChange function.
            /*
             spriteSheet.getAnimation("walkDnRt").next = "walkDnRt_h";
             spriteSheet.getAnimation("walkDnRt_h").next = "walkRt_h";
             spriteSheet.getAnimation("walkRt_h").next = "walkUpRt_h";
             spriteSheet.getAnimation("walkUpRt_h").next = "walkUpRt";
             */

            // create a BitmapAnimation instance to display and play back the sprite sheet:
            var bmpAnim = new createjs.BitmapAnimation(spriteSheet);

            // start playing the first sequence:
            bmpAnim.gotoAndPlay("walkRt");		//animate

            // the callback is called each time a sequence completes:
            bmpAnim.onAnimationEnd = angleChange;

            // create a bunch of rats based on the first one, and place them on stage, and in our collection.
            var l = 50;
            bmpAnimList = [];
            for (var i=0; i<l; i++) {
                bmpAnim.name = "rat"+i;
                bmpAnim.speed = Math.random()*6+2;
                bmpAnim.direction = 90;
                bmpAnim.vX = bmpAnim.speed;
                bmpAnim.vY = 0;
                bmpAnim.x = Math.random()*(w-220)+60|0;
                bmpAnim.y = Math.random()*(h-220)+0|0;

                // have each rat start on a random frame in the "walkRt" animation:
                bmpAnim.currentAnimationFrame = Math.random()*spriteSheet.getNumFrames("walkRt")|0;
                stage.addChild(bmpAnim);
                bmpAnimList.push(bmpAnim);

                // rather than creating a brand new instance each time, and setting every property, we
                // can just clone the current one and overwrite the properties we want to change:
                if (i < l-1) { bmpAnim = bmpAnim.clone(); }
            }

            // we want to do some work before we update the canvas,
            // otherwise we could use createjs.Ticker.addEventListener("tick", stage);
            createjs.Ticker.addEventListener("tick", tick);
        }

        //called if there is an error loading the image (usually due to a 404)
        function handleImageError(e) {
            //console.log("Error Loading Image : " + e.target.src);
        }

        function tick() {
            // move all the rats according to their vX/vY properties:
            var l = bmpAnimList.length;
            for (var i=0; i<l; i++) {
                var bmpAnim = bmpAnimList[i];
                bmpAnim.x += bmpAnim.vX;
                bmpAnim.y += bmpAnim.vY;
            }

            // update the stage:
            stage.update();
        }

        function angleChange(bmpAnim,animation) {
            //after each sequence ends update the rat's heading and adjust velocities to match
            bmpAnim.direction -= 60;
            var angle = bmpAnim.direction * (Math.PI/180);
            bmpAnim.vX = Math.sin(angle) * bmpAnim.speed;
            bmpAnim.vY = Math.cos(angle) * bmpAnim.speed;
            var nextMap = {walkRt:"walkDnRt",walkDnRt:"walkDnRt_h",walkDnRt_h:"walkRt_h",walkRt_h:"walkUpRt_h",walkUpRt_h:"walkUpRt",walkUpRt:"walkRt"};
            bmpAnim.gotoAndPlay(nextMap[animation]);
        }

	        
	        
		},

		startGame: function(){
			//console.debug( "Starting game.. difficulty is: " + this.difficulty );
			var tHeight = this.toolbar.domNode.offsetHeight;
			if ( this.difficulty == "Easy" ){
				//console.debug("resizing..");
				this.win.resize({width: "200px", height: (200+tHeight)+"px"});
				this.surface.clear();
				this.makeBoard(10, 10);
			} else if ( this.difficulty == "Medium" ){
				this.win.resize({width:"300px", height:(300+tHeight)+"px"});
				this.surface.clear();
				this.makeBoard(15, 15);
			} else if ( this.difficulty == "Hard" ){
				this.win.resize({width:"600px", height:(300+tHeight)+"px"});
				this.surface.clear();
				this.makeBoard(30,15);
			}
		},

		makeBoard: function( xSize, ySize )	{
			this.xSize = xSize;
			this.ySize = ySize;
			this.squaresRevealed = 0;
			this.totalSquares = 0;
			this.squaresToWin = 0;		
			var a = 0;
			var b = 0;
			this.board = new Array();
			for ( b = 0; b < xSize; b++ ){
				this.board[b] = new Array();
				for ( a = 0; a < ySize; a++ ){
					this.board[b][a] = this.makeSquare(b, a);
					this.totalSquares++;
				}
			}
			this.squaresToWin = this.totalSquares;
			this.makeMines();
			this.assignNums();
			console.debug( "Total: " + this.totalSquares + ", To win: " + this.squaresToWin );
		},

		makeMines: function(){
			// Create as many mines as we have squares on the board on the x axis
			var a = 0;
			var numMines = 0;
			if ( this.difficulty == "Easy" ) numMines = 10;
			if ( this.difficulty == "Medium" ) numMines = 34;
			if ( this.difficulty == "Hard" ) numMines = 90;
			for ( a = 0; a < numMines; a++ ){
				var randX = Math.floor(Math.random() * this.xSize);
				var randY = Math.floor(Math.random() * this.ySize);
				this.board[randX][randY].hasMine = true;
				this.board[randX][randY].numMines = 0;
				this.squaresToWin--;
			}
		},

		assignNums: function(){
			var a = 0;
			var b = 0;
			var numMines = 0;
			for ( b = 0; b < this.xSize; b++ ){
				for ( a = 0; a < this.ySize; a++ ){
					numMines = 0;
		
					// Square to the north
					if ( a > 0){
						if ( this.board[b][a-1].hasMine == true ) numMines++;
					}
		
					// Square to the north east
					if ( a > 0 && b < (this.xSize-1) ){
						if ( this.board[b+1][a-1].hasMine == true ) numMines++;
					}
		
					// Square to east
					if ( b < (this.xSize-1) ){
						if ( this.board[b+1][a].hasMine == true ) numMines++;
					}

					
					// Square to south east
					if ( a < (this.ySize-1) && b < (this.xSize-1) ){
						if ( this.board[b+1][a+1].hasMine == true ) numMines++;
					}
	                            
					// Square to south
					if ( a < (this.ySize-1) ){
						if ( this.board[b][a+1].hasMine == true ) numMines++;
					}
	                            
					// Square to south west
					if ( b > 0 && a < (this.ySize-1) ){
						if ( this.board[b-1][a+1].hasMine == true ) numMines++;
					}
	                            
					// Square to west
					if ( b > 0 ){
						if ( this.board[b-1][a].hasMine == true ) numMines++;
					}
	                            
					// Square to north west
					if ( b > 0 && a > 0 ){
						if ( this.board[b-1][a-1].hasMine == true ) numMines++;
					}
					this.board[b][a].numMines = numMines;
				}                    
			}	
		},

		makeSquare: function(xPos, yPos){

			var square = this.surface.createRect({ x: xPos*20, y: yPos*20, width: 20, height: 20 });
			this.squareFillNormal( square );
			square.mouseover = square.connect("onmouseover", this, function blah(){ this.squareFillOver(square); });
			square.mouseout = square.connect("onmouseout", this, function blah2(){ this.squareFillNormal(square); });
			square.mousedown = square.connect("onmouseup", this, function (e){
				dojo.stopEvent(e);
				if(e.button == 2) this.squareFillMarked(square);
				else this.squareReveal(square);
				//this.squareReveal(square);
				return false;
			});
			square.mouseright = square.connect("oncontextmenu", this, function (e){ 
				dojo.stopEvent(e);
				//this.squareFillMarked(square);
			});
	              
			// Square is not yet revealed by default
			square.revealed = false;
	              
			// Set a default numMines (number of mines surrounding square)
			square.numMines = 0;
	              
			// Square does not have a mine by default
			square.hasMine = false;
	              
			// Square is unmarked by default
			square.marked = false;
	              
			// Assign the board position to the square
			square.xPos = xPos;
			square.yPos = yPos;
	              
			return square;
		},

		gameOver: function(){
			this.resultShade = this.surface.createRect({
				x: 0, y:0,
				width: (this.xSize*20), height: (this.ySize*20)
			}).setFill([ 225,225,225,0.75 ]);
			
			var app = nlsApp;//i18n.getLocalization("scene", "games",this.lang);
			this.resultMessage = this.surface.createText({
				x: ((this.xSize * 20)/2), y: ((this.ySize * 20)/2),
				text: nlsApp.youLose,
				align: "middle"
			}).setFill("#000000");
			this.resultMessage.setFont({
				weight: "bold",
				size: 20
			})
		},

		gameWin: function()	{
			this.resultShade = this.surface.createRect({
				x: 0, y:0,
				width: (this.xSize*20), height: (this.ySize*20)
			}).setFill([ 225,225,225,0.75 ]);

			var app =  nlsApp;//i18n.getLocalization("scene", "games",this.lang);
			this.resultMessage = this.surface.createText({
				x: ((this.xSize * 20)/2), y: ((this.ySize * 20)/2),
				text: nlsApp.youWin,
				align: "middle"
			}).setFill("#000000");
			this.resultMessage.setFont({
				weight: "bold",
				size: 20
			});	
		},

		squareReveal: function( square ){
			if ( square.revealed == true ) return;	
	              
			// disconnect this squares events
			dojo.disconnect( square.mousedown );
			dojo.disconnect( square.mouseover );
			dojo.disconnect( square.mouseout );
			dojo.disconnect( square.mouseright );
	              
			// mark it as revealed
			square.revealed = true;
	              
			// fetch the squares bounding box
			var bbox = square.getBoundingBox();
	              
			// does this square contain a mine?
			if ( square.hasMine == true ){
				square.setFill("#FF0000");
				square.mine = this.surface.createCircle({
					cx: (bbox.x + (bbox.width/2)), cy: (bbox.y + (bbox.height/2)),
					r: (bbox.width/2)
				});
				square.mine.setFill({
					type: "radial",
					cx: ((bbox.x + (bbox.width/2)) - 5),
					cy: ((bbox.y + (bbox.height/2)) - 5),
					colors:[
						{ offset: 0, color: "#FFFFFF"},
						{ offset: 0.1, color: "#222222"}
					]
				});
				this.gameOver();
				return;
			}
	              
			square.setFill("#EFEFEF");
	              
			this.squaresRevealed++;
			//console.debug( this.squaresRevealed + " squares revealed.. " + this.squaresToWin + " needed to win" );
			if ( this.squaresRevealed >= this.squaresToWin ){
				this.gameWin();
				return;
			}
	              
			if ( square.numMines > 0 ){
				var textColor = "#000000";
				if ( square.numMines == 1 ) textColor = "#0000FF";
				if ( square.numMines == 2 ) textColor = "#00AA00";
				if ( square.numMines >= 3 ) textColor = "#FF0000";
				square.numText = this.surface.createText({
					x: (bbox.x + (bbox.width/2) - 5), y: (bbox.y + (bbox.height - 5)),
					text: " "+(square.numMines)+" ",
					align: "left",
					color: "#000000"
				}).setFill(textColor);
				square.numText.setFont({
					weight: "bold"
				});
				square.numText.moveToFront();
			}else{
				this.clearAdjacentSquares( square.xPos, square.yPos );
			}
	              
			//this.surface.remove(square);
		},

		clearAdjacentSquares: function(xPos, yPos){
			// When the player reveals a clear square, we should reveal all adjacent clear squares
			// (as well as as all adjacen clear squares to those clear squares)
			// (( as well as.. well.. you get it.. its recursive! ))
	              
			// Not sure if i should do this diagonally as well..
	              
			// Check square to the north
			if ( yPos > 0 ){
				if ( !this.board[xPos][yPos-1].hasMine  && !this.board[xPos][yPos-1].revealed) this.squareReveal( this.board[xPos][yPos-1] );
			}
	              
			// Check square to the east
			if ( xPos < (this.xSize-1) ){
				if ( !this.board[xPos+1][yPos].hasMine && !this.board[xPos+1][yPos].revealed) this.squareReveal( this.board[xPos+1][yPos] );
			}
	              
			// Check square to south
			if ( yPos < (this.ySize-1) ){
				if ( !this.board[xPos][yPos+1].hasMine && this.board[xPos][yPos+1].revealed) this.squareReveal( this.board[xPos][yPos+1] );
			}
	              
			// Check square to west
			if ( xPos > 0 ){
				if ( !this.board[xPos-1][yPos].hasMine && !this.board[xPos-1][yPos].revealed) this.squareReveal( this.board[xPos-1][yPos] );
			}
	              
			// check square to northeast
			if ( yPos > 0 && xPos < (this.xSize-1) ){
				if ( !this.board[xPos+1][yPos-1].hasMine && !this.board[xPos+1][yPos-1].revealed) this.squareReveal( this.board[xPos+1][yPos-1] );
			}
	              
			// check square to southeast
			if ( yPos < (this.ySize-1) && xPos < (this.xSize-1) ){
				if ( !this.board[xPos+1][yPos+1].hasMine && !this.board[xPos+1][yPos+1].revealed) this.squareReveal( this.board[xPos+1][yPos+1] );
			}
	              
			// check square to southwest
			if ( yPos < (this.ySize-1) && xPos > 0 ){
				if ( !this.board[xPos-1][yPos+1].hasMine && !this.board[xPos-1][yPos+1].revealed) this.squareReveal( this.board[xPos-1][yPos+1] );
			}
	              
			// check square to northwest
			if ( yPos > 0 && xPos > 0 ){
				if ( !this.board[xPos-1][yPos-1].hasMine && !this.board[xPos-1][yPos-1].revealed) this.squareReveal( this.board[xPos-1][yPos-1] );
			}    
		},

		squareFillMarked: function( square ){
			if ( square.marked == false ){
				square.marked = true;
				//dojo.disconnect( square.mouseover );
				var bbox = square.getBoundingBox();
				square.setFill({
					type: "linear",
					x1: bbox.x, y1: bbox.y,
					x2: bbox.x+bbox.width, y2: bbox.y+bbox.height,
					colors: [
						{ offset: 0, color: "#8F8F8F"},
						{ offset: 1, color: "#444444"}
					]
				});
			}else{
				square.marked = false;
				this.squareFillNormal( square );
			}
		},

		squareFillNormal: function( square ){
			if ( square.marked == true ) return;
			var bbox = square.getBoundingBox();
			square.setStroke({
				width: "0.25px",
				color: "#000000"
			});
			square.setFill({
				type: "linear",
				x1: bbox.x, y1: bbox.y,
				x2: bbox.x+bbox.width, y2: bbox.y+bbox.height,
				colors: [
					{ offset: 0.1, color: "#CFCFCF"},
					{ offset: 0.9, color: "#888888"}
				]
			});
		},

		squareFillOver: function( square ){
			if ( square.marked == true ) return;
			var bbox = square.getBoundingBox();
			square.setFill({
				type: "linear",
				x1: bbox.x, y1: bbox.y,
				x2: bbox.x+bbox.width, y2: bbox.y+bbox.height,
				colors: [
					{ offset: 0, color: "#E5E5E5"},
					{ offset: 1, color: "#AAAAAA"}
				]
			});	
		},

		kill: function(){
			if ( !this.win.closed ) this.win.close();
		}

	});

});
