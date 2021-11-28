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

        this.cells[this.cells.length - 1] = new Cell(this.x, 0, this.cells.length - 1);

    }

    display(){
        this.cells.forEach((cell) => cell.display());
    }
    
}
