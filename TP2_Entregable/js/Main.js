document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#canvas');
    let canvasWidth = window.innerWidth - 30;
    let canvasHeight = window.innerHeight - 30;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    let ctx = canvas.getContext('2d');
    let fichaArray = [];
    let posiciones = [];
    let fichaClick;
    let radio = 30;
    let tamanio = radio*2;
    let mouseDown = false;
    let posicionFicha = [];
    let posicionesI = [];
    let ejecutarUnaVez = true;

    /* dibuja tablero */
    function dibujarTablero() {
        let posX = 0;
        let posY = 50;
        //separacion de circulos desde el centro
        let separacionCirculos = 75;
        let color = "gray";
        let ancho = 7;
        let alto = 6;
        //se genera la matriz de espacios vacios del tablero
        for (let x = 0; x < alto; x++) {
            posY += separacionCirculos;
            posX = canvasWidth*23/100;
            for (let y = 0; y < ancho; y++) {
                //se genera un nuevo circulo trayendo la clase creada
                let coordenada = new Circulo(posX, posY, radio, color, ctx);
                //se agrega las coordenas a las posiciones de los cirulos
                let coord = [coordenada.getPosY(), coordenada.getPosX(), false];
                //posiciones.push(coordenada.getPosY(),coordenada.getPosX(),false);
                posiciones.push(coord);
                //posiciones.push("Y: "+coordenada.getY(), "X: " + coordenada.getX());
                //se dibujan las coordenadas
                coordenada.draw();
                posX += separacionCirculos;
            }
        }
        if (ejecutarUnaVez === true) {
            posicionesI = posiciones.reverse();
        } ejecutarUnaVez = null;
        //console.log(posiciones);
    }
    dibujarTablero();

    imagen = new Image();
    imagen.src="images/ficha.png";

    imagen.onload = function(){
        let cantidadFichas = 30;
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
                y=50;
                x = canvasWidth - (tamanio*2);
            }
            if (y > 590 & jugador == 1) {
                y=50;
                x = tamanio*2;
            }
        }
    }
    
    function agregarFicha(x, y, imagen, jugador, radio, color){
        let ficha = new fichaImagen(x, y, imagen, tamanio, ctx, radio, color, jugador);
        fichaArray.push(ficha);
        console.log(fichaArray);
    }
    
    function dibujarFicha(){
        limpiarCanvas();
        for(let i = 0; i < fichaArray.length; i++){
            fichaArray[i].draw();
        }
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
        fichaClick = fichaClickeada(e.layerX, e.layerY);
        if (fichaClick != null) {
            fichaClickeadaActual = fichaClick;
        }
    }

    function onMouseUp(e) {
        mouseDown = false;
        //  71 - 75 - 65 - 75 - 85 - 65
        //  75 - 65 - 75 - 85 - 65 - 100
        //Matriz que delimita las posiciones de los circulos en el tablero
        if (e.layerX > 215 && e.layerX < 285 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(6);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 286 && e.layerX < 360 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(5);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 361 && e.layerX < 425 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(4);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 426 && e.layerX < 500 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(3);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 501 && e.layerX < 585 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(2);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 586 && e.layerX < 650 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(1);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        } else if (e.layerX > 651 && e.layerX < 750 && fichaClickeadaActual != null) {
            let posicionValida = posVacia(0);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
            fichaClickeadaActual = null;
        }
    }

    //250   //325   //400   //475   //550   //625   //700

    function posVacia(x) {

        //console.log(posicionesI);
        for (let i = x; i < posicionesI.length; i += 7) {
            // console.log(posicionesI);
            // console.log(posicionesI[i]);
            console.log(posicionesI[i][2]);
            if (posicionesI[i][2] === false) {
                posicionesI[i][2] = true;
                console.log(posicionesI[i][2]);
                //  console.log(posiciones);
                posicionFicha = posicionesI[i];
                //   console.log(posicionFicha);
                return true;
            }
        }
        // console.log(posiciones);
        // console.log(posiciones[0]);
    }

    function onMouseMove(e) {
        if (mouseDown && fichaClickeadaActual != null) {
            fichaClickeadaActual.setPosition(e.layerX, e.layerY);
            dibujar();
            console.log(fichaArray);
        }
    }

    function dibujar() {
        dibujarTablero();
        for (let i = 0; i < fichaArray.length; i++) {
            fichaArray[i].draw();
        }
    }

    function limpiarCanvas() {
        ctx.fillStyle = "blue";
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        posiciones = [];
        dibujarTablero();
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

});