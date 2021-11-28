const terrainHeigth = 50;

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

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.update(-1)
    } 
    else if (keyCode === RIGHT_ARROW) {
        player.update(1)
    }
  }