document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let canvasWidth = window.innerWidth -50;
    let canvasHeight = window.innerHeight -50;
    canvas.height = 600;
    canvas.width = 900;

    function agregarCirculo(){
        let radio = 30;
        let posX = Math.random() * (canvasWidth - radio * 2) + radio;
        let posY = Math.random() * (canvasHeight - radio *2) + radio;
        let color = 'red';
        let circulo1 = new Circulo(posX, posY, radio, color, ctx);
        circulo1.draw();
    }
        //agregarCirculo();

    /* dibuja tablero */
    function dibujarTablero(){
        let posX = 100;
        let posY = 50;
        radio = 30;
        color = "gray";
        ancho = 8;
        alto = 5;
        for (let x = 0; x < alto; x++) {
            posY += 90;
            posX = 100;
            for (let y = 0; y < ancho; y++) {
                let circulo = new Circulo(posX, posY, radio, color, ctx);
                posX += 90;
                circulo.draw();
            }
        }
    }
    dibujarTablero();


});