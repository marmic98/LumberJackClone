const terrainHeigth = 50;
const cellHeigth = 50;

let centralObject;

function setup(){
    createCanvas(800, windowHeight-100);
    centralObject = new CentralObject();
    centralObject.init();
}

function draw(){

    background("#272727");
    drawTerrain(50);

    centralObject.display();

}

const drawTerrain = () => {

    fill("#009FB7");
    rect(0, height-terrainHeigth, width, terrainHeigth);

}

//Object to cut (it will also define obstacles)
class CentralObject {
    
    constructor() {

        this.w = 100;
        // this.h = height;
        
        this.x = width/2 - this.w/2;
        this.y = 0;
        this.counter = 0;
    
        this.cells = Array(parseInt(height / cellHeigth));
    }

    init(){
        for(let i = 0; i < this.cells.length; i++){
            this.cells[i] = new Cell(this.x, i<this.cells.length-3, i);
        }
        console.log(this.cells);
    }

    update(){
        this.cells.pop();
        this.cells.forEach((cell) => cell.number++);
        this.cells[0] = new Cell(this.x, true, 0);
        
    }

    display(){
        this.cells.forEach((cell) => cell.display());
    }
    
}

class Cell {

    constructor(x, hasObstacle, number) {

        this.w = 100;
        this.h = cellHeigth;

        this.x = x;
        this.y = number * cellHeigth;

        this.number = number;
        
        //0 = noObstacle
        //1 = rightObstacle
        //-1 = leftObstacle
        this.obstacle = hasObstacle ? parseInt(random(-2, 2)) : 0;
    }

    display(){
        
        //Cell
        fill("#009FB7");
        rect(this.x, this.y, this.w, this.h);

        //Obstacle
        if(this.obstacle != 0)
            fill("#EF3E36");
        rect( this.x + (this.w * this.obstacle), this.y, this.w, this.h);
        
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.number, this.x+this.w/2, this.y+this.h/2);
        
    }
}


function keyPressed() {
    if (value === "ArrowDown") {
      console.log("x")    
    }
  }