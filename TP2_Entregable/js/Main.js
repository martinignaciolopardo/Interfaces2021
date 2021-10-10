document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector("#header");
    let cuerpo = document.querySelector("#cuerpo");
    let canvas = document.querySelector('#canvas');
    let canvasWidth = window.innerWidth - 35;
    let canvasHeight = window.innerHeight - 30;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    let ctx = canvas.getContext('2d');
    let fichaClick;
    let radio = 25;
    let tamanio = radio * 2;
    let mouseDown = false;
    let separacionCirculos = radio * 2; // 60
    let color = "gray";
    //tamaño por defecto
    let ancho = 7;
    let alto = 6;
    let fichaArray = [];
    //let posX = (canvasWidth / 2) - ((ancho * separacionCirculos) / 2.5);
    //let posY = (canvasHeight / 2) - ((alto * separacionCirculos) / 2);
    let divGanador = document.querySelector("#divGanador");
    
    fichaClickeadaActual = null;
    let btnReset = document.querySelector("#reset");
    btnReset.addEventListener("click", resetearJuego);
    let turno = 1;
    let inputTurno = document.querySelector("#turno");
    inputTurno.value = "Turno del jugador: " + turno;
    let tiempo = 100;
    let parar = false;
    let ganador = false;
    let timeOut;
    let reloj = document.getElementById('segundos');
    let jugador1;  
    let jugador2;
    let tablero;
    let dibujado = false;
    

    const element = document.querySelector('#form');
    element.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Form submission cancelled.');
    });

    imagen = new Image();
    imagen.src = "images/ficha.png";

    document.querySelector("#submit").addEventListener("click", function () {
        jugador1 = document.querySelector('#nombre-jugador1').value;
        jugador2 = document.querySelector('#nombre-jugador2').value;
        let colorJ1 = document.querySelector('#inputColores1').value;
        let tablero6x7 = document.querySelector("#tablero1");
        let tablero7x8 = document.querySelector("#tablero2");
        let tablero8x9 = document.querySelector("#tablero3");
        if (tablero6x7.checked) {
            ancho = 7;
            alto = 6;
        }if (tablero7x8.checked) {
            ancho = 8;
            alto = 7;
        }if(tablero8x9.checked){
            ancho = 9;
            alto = 8;
        }
        let posX = (canvasWidth / 2) - ((ancho * separacionCirculos) / 2.5);
        let posY = (canvasHeight / 2) - ((alto * separacionCirculos) / 2);
        tablero = new Tablero(alto, ancho, ctx, color, posX, posY, radio, separacionCirculos);
        //tablero.crearTablero();
        //tablero.dibujar();
        reloj.innerHTML = 'Comienza: '+ jugador1;
        overlay.classList.remove('active');
        popup.classList.remove('active');
        limpiarCanvas();
        let cantidadFichas = 50;
        // maximo 40 fichas
        if (cantidadFichas > 44) {
            cantidadFichas = 44;
        }
        let jugador = 1;
        let y = 50;
        let x = tamanio;
        //let colorJ1 = 'red';
        const contador = cantidadFichas;
        agregarFichaJ(x, y, imagen, tamanio, cantidadFichas, radio, colorJ1, jugador, contador);
    });

    

    function agregarFichaJ(x, y, imagen, tamanio, cantidadFichas, radio, color, jugador, contador) {
        let t = true;
        let colorJ2 = document.querySelector('#inputColores2').value;
        while (cantidadFichas > 0) {
            if (cantidadFichas <= contador / 2 & t == true) {
                y = 50;
                jugador = 2;
                x = canvasWidth - tamanio;
                color = colorJ2;
                t = false;
            }
            agregarFicha(x, y, imagen, jugador, radio, color);
            dibujarFichas();
            y += tamanio;
            cantidadFichas--;
            //2 columnas de fichas
            if (y > 590 & jugador == 2) {
                y = 50;
                x = canvasWidth - (tamanio * 2);
            }
            if (y > 590 & jugador == 1) {
                y = 50;
                x = tamanio * 2;
            }
        }
    }

    function agregarFicha(x, y, imagen, jugador, radio, color) {
        let xIni = x;
        let yIni = y
        let posicionada = false;
        let ficha = new fichaImagen(x, y, imagen, tamanio, ctx, radio, color, jugador, xIni, yIni, posicionada);
        fichaArray.push(ficha);
    }

    function fichaClickeada(x, y) {
        for (let i = 0; i < fichaArray.length; i++) {
            let ficha = fichaArray[i];
            if (ficha.mouseEnCirculo(x, y)) {
                //console.log(ficha);
                return ficha;
            }
        }
    }

    function cambiarJugador(turno) {
        if (turno == 1) {
            return 2;
        } else {
            return 1;
        }
    }

    function onMouseDown(e) {
        mouseDown = true;
        if (fichaClickeadaActual != null) {
            fichaClickeadaActual = null;
        }
        fichaClick = fichaClickeada(e.layerX, e.layerY);
        //una vez que esta en el tablero, no puede moverse.
        if (fichaClick != null && fichaClick.getPosicionada() == false) {
            if (fichaClick != null && fichaClick.getJugador() == turno) {
                if (fichaClick != null) {
                    fichaClickeadaActual = fichaClick;
                }
                inputTurno.style.backgroundColor = "black";
            }
            else if (fichaClick != null) {
                console.log("ES TURNO DEL JUGADOR " + turno + " !!!");
                inputTurno.style.backgroundColor = "red";
            }
        }
        else{
            console.log("esta ficha no puede moverse, ya ha sido jugada");
        }
    }

    //reloj.innerHTML = 'Elija un color de ficha y establezca un nombre de jugador';
    
    console.log(turno);
    function onMouseUp(e) {
        mouseDown = false;
        let x = e.layerX;
        let y = e.layerY
        if (fichaClickeadaActual != null) {
            if (tablero.dentroDelArea(x, y)) {
                let jugador = fichaClickeadaActual.getJugador();
                let columna = tablero.queColumna(x, y);
                let posColu = tablero.recorroColumna(columna);
                let columnaLlena = tablero.columnaLlena(columna);
                if (columnaLlena) {
                    volverPosicionFicha();
                }  
                else{
                let posicionLibre = tablero.columnaLibre(posColu, jugador);
                
                //console.log(posicionLibre);
                let nuevaPosX = posicionLibre.getX();
                let nuevaPosY = posicionLibre.getY();
                //console.log(posicionLibre.getX());
                //console.log(posicionLibre.getY());
                fichaClickeadaActual.setPosition(nuevaPosX, nuevaPosY);
                fichaClickeadaActual.setPosicionada(true);
                let fila = tablero.queFila(x, y, nuevaPosY);
                ganador = tablero.hayGanador();
                if (ganador == true) {
                    //alert('gano el jugador' + jugador);
                    divGanador.innerHTML = 'Ganó el jugador' + jugador;
                    //setTimeout(resetearJuego, 8000);
                }
                if (parar == false) {
                    actualizarReloj();
                    parar = true;
                }
                turno = cambiarJugador(turno);
                inputTurno.value = "Turno del jugador: " + turno;
                dibujar();
                }
            }
            else {
                volverPosicionFicha();
            }
        }
    }

    document.querySelector("#jugar").addEventListener("click", jugar);
    let btnRestaurar = document.querySelector("#restaurar");
    btnRestaurar.addEventListener("click", restaurar);
    btnRestaurar.classList.add('ocultar');

    function restaurar(){
        
        header.classList.remove('ocultar');
        cuerpo.classList.remove('ocultar');
    }

    function jugar(){
        btnRestaurar.classList.remove('ocultar');
        header.classList.add('ocultar');
        cuerpo.classList.add('ocultar');
        if (dibujado==false) {
            tablero.crearTablero();
            tablero.dibujar();
        }
        dibujado = true;
    }

    function volverPosicionFicha() {
        let x = fichaClickeadaActual.getIniX();
        let y = fichaClickeadaActual.getIniY();
        fichaClickeadaActual.setPosition(x, y);
        dibujar();
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
        tablero.dibujar();
        for (let i = 0; i < fichaArray.length; i++) {
            fichaArray[i].draw();
        }
    }

    function dibujarFichas(){
        limpiarCanvas();
        for (let i = 0; i < fichaArray.length; i++) {
            fichaArray[i].draw();
        }
    }

    function limpiarCanvas() {
        ctx.fillStyle = "blue";
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        /*tablero.dibujar();
        dibujarFicha();*/
    }

    function resetearJuego() {
        limpiarCanvas();
        divGanador.innerHTML = '';
        tablero.resetearPosiciones();
        tablero.resetearJugadores();
        tablero.dibujar();
        for (let i = 0; i < fichaArray.length; i++) {
            let x = fichaArray[i].getIniX();
            let y = fichaArray[i].getIniY();
            fichaArray[i].setPosition(x, y);
            fichaArray[i].setPosicionada(false);
            fichaArray[i].draw();
        }
        turno = 1   ;
        reloj.innerHTML = 'Comienza: ' + jugador1;
        if (tiempo < 1) {
            reloj.innerHTML = 'SE TERMINO EL TIEMPO';
        }

        inputTurno.value = "Turno del jugador: " + turno;
        tiempo = 100;
        parar = false;
        clearTimeout(timeOut);
    }

    function actualizarReloj() {
        document.getElementById('segundos').innerHTML = tiempo + " segundos";
        if (tiempo == 0) {
            resetearJuego();
        } else {
            tiempo -= 1;
            timeOut = setTimeout(actualizarReloj, 1000);
        }
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    /* MOSTRAR POPUP*/

    let btnAbrirPopupJugadores = document.querySelector('#btn-abrir-popup1'),
        overlay = document.querySelector('.overlay'),
        popup = document.querySelector('.popup'),
        btnCerrarPopup = document.querySelector('#btn-cerrar-popup');

    btnAbrirPopupJugadores.addEventListener('click', function () {
        let h1 = document.querySelector('#titulo-jugador');
        h1.innerHTML = 'Configuración de Jugadores';
        overlay.classList.add('active');
        popup.classList.add('active');
    });

    btnCerrarPopup.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });

    

    /*function capturar(){
        function Persona(nombre, color){
            this.nombre = nombre;
            this.color = color;
        }
        let jugador1 = document.querySelector('#nombre-jugador1').value;
        let jugador2 = document.querySelector('#nombre-jugador2');
        let colorJ1 = document.querySelector('#inputColores1').value;
        let colorJ2 = document.querySelector('#inputColores2').value;

        let nuevoSujeto = new Persona(jugador1, colorJ1);
        let nuevoSujeto2 = new Persona(jugador2, colorJ2);
        agregarJugador(nuevoSujeto);
    }
    let jugadores = [];
    
    function agregarJugador(nuevoSujeto,nuevoSujeto2){
        Jugadores.push(nuevoSujeto,nuevoSujeto2);
    }*/

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     //let formData = new FormData(form);
    //     let newJugadores = jugadores.push(jugador1.value, jugador2.value);
    //     inputTurno.value = "Turno del jugador: " + jugadores[0];
    //     return newJugadores;
    // });

});