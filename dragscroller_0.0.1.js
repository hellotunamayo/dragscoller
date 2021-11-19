// DragScroller V 0.0.1
// Written by Minyoung Yoo
// yoo@minyoungyoo.com

class DragScroller {
	constructor(target, option = {}, callback){
/****** init variables ******/
		this.target = document.getElementById(target);
		this.option = {
			initialX: option.initialX ? option.initialX : 0,
			initialY: option.initialY ? option.initialY : 0 
		};
		this.pos = {
			contentTop: this.option.initialY,
			contentLeft: this.option.initialX,
			cursorX: 0,
			cursorY: 0
		};
		this.mousedown = false;
		this.target.style.cursor = "grab";

/****** set event listeners ******/
		this.target.addEventListener("mousedown",(ev)=>{
			//init target position
			this.pos.contentTop = this.target.scrollTop;
			this.pos.contentLeft = this.target.scrollLeft;

			//init mouse position
			this.pos.cursorX = ev.clientX;
			this.pos.cursorY = ev.clientY;

			//enable mousedown
			this.mousedown = true;

			//change cursor to dragging
			this.target.style.cursor = "grabbing";
		});
		
		this.target.addEventListener("mousemove",(ev)=>{
			if(this.mousedown == true){
				//calculate how much mouse pointer has been moved
				var dx = ev.clientX - this.pos.cursorX;
				var dy = ev.clientY - this.pos.cursorY;

				//scrolling target
				this.scrollTarget(this.pos.contentLeft - dx, this.pos.contentTop - dy);
			}
		});

		this.target.addEventListener("mouseup",(ev)=>{
			//disable mousedown
			this.mousedown = false;

			//change cursor to grab
			this.target.style.cursor = "grab";
		});		

/****** run callback if exists ******/
		if(callback){
			callback(this);
		}

/****** move to initial coord if exists ******/
		setTimeout(()=>{
			this.scrollTarget(this.option.initialX, this.option.initialY);
		},1);
	}

	scrollTarget(x,y){
		this.target.scrollLeft = x;
		this.target.scrollTop = y;
	}
}