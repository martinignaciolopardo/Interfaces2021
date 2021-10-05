class Circulo extends Figura{
    constructor(posX, posY, columna, fila, radio, fill, ctx, posFinX, posIniX, posFinY, posIniY, ocupada){
        super(posX, posY, fill, ctx);
        this.radio = radio;
        this.posFinX = posFinX;
        this.posFinY = posFinY;
        this.columna = columna;
        this.fila = fila;
        this.posIniX = posIniX;
        this.posIniY = posIniY;
        this.ocupada = ocupada;
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

    getColumna(){
        return this.columna;
    }

    getOcupada(){
        return this.ocupada;
    }

    setOcupada(valor){
        this.ocupada = valor;
    }

    getX(){
        return this.posX;
    }

    getY(){
        return this.posY;
    }

    getFila(){
        return this.fila;
    }

    getFinX(){
        return this.posFinX;
    }

    getIniX(){
        return this.posIniX;
    }

    getFinY(){
        return this.posFinY;
    }

    getIniY(){
        return this.posIniY;
    }

}