class Player {

    constructor(){
        this.w = cellWidth; 
        this.h = cellHeigth * 2;

        //1 = right
        //-1 = left
        this.direction = parseInt(random(0, 2)) ? 1 : -1;
    
        this.x = width/2 - this.w/2 + this.w*this.direction;
        this.y = height - terrainHeigth - this.h;
    }

    display(){
        
        //Player
        fill("#e9c46a");
        rect(this.x, this.y, this.w, this.h);
    }

    updateDirection(direction){
        this.direction = direction;
        this.x = width/2 - this.w/2 + this.w*this.direction;
    }

    update(direction){

        this.updateDirection(direction);
        

        //Second last
        if (centralObject.cells[centralObject.cells.length-2].obstacle == this.direction
            || centralObject.cells[centralObject.cells.length-1].obstacle == this.direction){
            noLoop();
        }
        else{
            points++;
        }
        
        centralObject.update();
    }

}
