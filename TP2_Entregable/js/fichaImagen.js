class fichaImagen{

    constructor(x, y, image, tamanio, ctx, radio, color, jugador){
        this.x = x;
        this.y = y;
        this.image = image;
        this.tamanio = tamanio;
        this.ctx = ctx;
        this.radio = radio;
        this.color = color;
        this.jugador = jugador;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.drawImage(this.image, this.x-this.radio, this.y-this.radio, this.tamanio, this.tamanio);
    }

    mouseEnCirculo(x, y){
        let _x = this.x - x;
        let _y = this.y - y;
        return Math.sqrt(_x*_x+_y*_y)<this.radio;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    getPosition(){
        return{
            x: this.getX(),
            y: this.getY()
        };
    }

    getPlayer(){
        return this.jugador;
    }

}