const terrainHeigth = 50;
const cellHeigth = 50;
const cellWidth = 100;

let player;
let centralObject;

let points = 0;

function setup(){
    createCanvas(800, 600);
    centralObject = new CentralObject();
    centralObject.init();
    player = new Player();
    
}

function draw(){

    background("#272727");
    drawTerrain(50);

    
    centralObject.display();
    player.display();

    fill(255);
    text(points, 50, 50);

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

        this.cells = Array(parseInt(height / cellHeigth));
        
        this.hasObstacleGenerating = true;
    }

    init(){
        for(let i = 0; i < this.cells.length; i+=2){
            this.cells[i] = new Cell(this.x, i<this.cells.length-4, i);
            this.cells[i + 1] = new Cell(this.x, 0, i + 1);
        }
        //It deletes the last element because of the number of displayed elements is always spare
        this.cells.pop();

        this.hasObstacleGenerating = this.cells[0].obstacle == 0;
    }

    update(){
        
        this.cells.pop();

        this.cells.forEach((cell) => cell.update());

        this.hasObstacleGenerating = this.cells[0].obstacle == 0;
        this.cells.unshift(new Cell(this.x, this.hasObstacleGenerating, 0));

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
        this.number = number;
        this.y = this.number * cellHeigth;
        
        //0 = noObstacle
        //1 = rightObstacle
        //-1 = leftObstacle
        this.obstacle = hasObstacle ? parseInt(random(-2, 2)) : 0;
    }

    update(){
        this.number++;
        this.y = this.number * cellHeigth;
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
        centralObject.update();

        //Second last
        if (centralObject.cells[centralObject.cells.length-2].obstacle == this.direction
            || centralObject.cells[centralObject.cells.length-1].obstacle == this.direction){
            noLoop();
        }
        else{
            points++;
        }
    }

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.update(-1)
    } 
    else if (keyCode === RIGHT_ARROW) {
        player.update(1)
    }
  }