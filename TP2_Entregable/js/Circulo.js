class Circulo extends Figura{
    constructor(posX, posY, radio, fill, ctx, posFinX, posFinY){
        super(posX, posY, fill, ctx);
        this.radio = radio;
        this.posFinX = posFinX;
        this.posFinY = posFinY;
    }

    draw(){
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawCircleForImg(){
        super.draw();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();
    }

    getRadio(){
        return this.radio;
    }

    mouseEnCirculo(x, y){
        let _x = this.posX -x;
        let _y = this.posY -y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    getFinX(){
        return this.posFinX
    }

    getIniX(){
        return this.posX;
    }

    getFinY(){
        return this.posFinY;
    }

    getIniY(){
        return this.posY;
    }

}