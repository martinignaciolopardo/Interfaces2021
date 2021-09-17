class Figura{
    constructor(posX, posY, fill, ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
    }

    setFill(fill){
        this.fill = fill;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    draw(){
        this.ctx.fillStyle = this.fill;
    }

    
}