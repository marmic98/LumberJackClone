const cellHeigth = 50;
const cellWidth = 100;

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
