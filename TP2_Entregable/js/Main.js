document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#canvas');
    let canvasWidth = window.innerWidth - 30;
    let canvasHeight = window.innerHeight - 30;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    let ctx = canvas.getContext('2d');
    fichaClickeadaActual = null;
    let fichaArray = [];
    let fichaClick;
    let radio = 30;
    let tamanio = radio*2;
    let mouseDown = false;
    let separacionCirculos = radio*2; // 60
    let color = "gray";
    let ancho = 4;
    let alto = 4;
    let posX = (canvasWidth/2) - ((ancho*separacionCirculos)/2.5);
    let posY = (canvasHeight/2) - ((alto*separacionCirculos)/2);
    let tablero = new Tablero(alto, ancho, ctx, color, posX, posY, radio, separacionCirculos);
    tablero.crearTablero();
    tablero.dibujar();
    
    imagen = new Image();
    imagen.src="images/ficha.png";

    imagen.onload = function(){
        let cantidadFichas = 50;
        // maximo 40 fichas
        if (cantidadFichas > 40) {
            cantidadFichas = 40;
        }
        let jugador = 1;
        let y = 50;
        let x = tamanio;
        let colorJ1 = 'red';
        const contador = cantidadFichas;
        agregarFichaJ(x, y, imagen, tamanio, cantidadFichas, radio, colorJ1, jugador, contador);
    }

    function agregarFichaJ(x, y, imagen, tamanio, cantidadFichas, radio, color, jugador, contador){
        let t = true;
        while (cantidadFichas>0) {
            if (cantidadFichas <= contador/2 & t==true) {
                y = 50;
                jugador = 2;
                x = canvasWidth - tamanio;
                color = 'yellow';
                t=false;
            }
            agregarFicha(x, y, imagen, jugador, radio, color);
            dibujarFicha();
            y += tamanio;
            cantidadFichas--;
            //2 columnas de fichas
            if (y > 590 & jugador == 2) {
                y = 50;
                x = canvasWidth - (tamanio * 2);
            }
            if (y > 590 & jugador == 1) {
                y = 50;
                x = tamanio*2;
            }
        }
    }
    
    function agregarFicha(x, y, imagen, jugador, radio, color){
        let ficha = new fichaImagen(x, y, imagen, tamanio, ctx, radio, color, jugador);
        fichaArray.push(ficha);
    }
    
    function dibujarFicha(){
        for(let i = 0; i < fichaArray.length; i++){
            fichaArray[i].draw();
        }// console.log(fichaArray);
    }

    function fichaClickeada(x, y) {
        for (let i = 0; i < fichaArray.length; i++) {
            let ficha = fichaArray[i];
            if (ficha.mouseEnCirculo(x, y)) {
                console.log(ficha);
                return ficha;
            }
        }
    }

    function onMouseDown(e) {
        mouseDown = true;
        if(fichaClickeadaActual != null){
            fichaClickeadaActual = null;
        }
        fichaClick = fichaClickeada(e.layerX, e.layerY);
        if (fichaClick != null) {
            fichaClickeadaActual = fichaClick;
        }
    }

    function onMouseUp(e) {
        mouseDown = false;
        let x = e.layerX;
        let y = e.layerY
        if (fichaClickeadaActual != null) {
            if (tablero.dentroDelArea(x)) {
                let columna = tablero.queColumna(x,y);
                let posColu = tablero.recorroColumna(columna);
                let posicionLibre = tablero.columnaLibre(posColu);
                console.log(posicionLibre);
                let nuevaPosX = posicionLibre.getX();
                let nuevaPosY = posicionLibre.getY();
                console.log(posicionLibre.getX());
                console.log(posicionLibre.getY());
                fichaClickeadaActual.setPosition(nuevaPosX,nuevaPosY);
                dibujar();
            }
        }
    }

    function onMouseMove(e) {
        if (mouseDown && fichaClickeadaActual != null) {
            fichaClickeadaActual.setPosition(e.layerX, e.layerY);
            tablero.dibujar();
            dibujar();
        }
    }

    function dibujar() {
        limpiarCanvas();
        for (let i = 0; i < fichaArray.length; i++) {
            fichaArray[i].draw();
        }
    }

    function limpiarCanvas() {
        ctx.fillStyle = "blue";
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        posiciones = [];
        tablero.dibujar();
        dibujarFicha();
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

});