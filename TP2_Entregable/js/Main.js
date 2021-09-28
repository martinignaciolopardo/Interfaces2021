document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#canvas');
    let canvasWidth = window.innerWidth-30;
    let canvasHeight = window.innerHeight-30;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    let ctx = canvas.getContext('2d');
    //jugar minimo en 980px x 625px
    let fichaArray = [];
    let posiciones = [];
    let mouseDown = false;
    let posicionFicha =[];
    let posicionesI = [];
    let ejecutarUnaVez = true;
   
 
        
   


    /* dibuja tablero */
    function dibujarTablero(){
        let posX = 250;
        let posY = 50;
        //separacion de circulos desde el centro
        let separacionCirculos = 75;
        let radio = 30;
        let color = "gray";
        let ancho = 7;
        let alto = 6;
        //se genera la matriz de espacios vacios del tablero
        for (let x = 0; x < alto; x++) {
            posY += separacionCirculos;
            posX = 250;
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
        }ejecutarUnaVez=null;
        
        console.log(posiciones);
    }
    dibujarTablero();

    function fichaImg(){
       /*
        prueba clip con rectangulo
        ctx.save();      
        ctx.beginPath();
        ctx.rect(250,250,50,50);
        ctx.clip();
        ctx.fillRect(10,10,500,500);
        ctx.restore();*/

        let img = new Image();
        img.addEventListener('load', function() {
            ctx.save();
            ctx.beginPath();
            //ctx.arc(canvasWidth/2, canvasHeight/2, 30, 0, Math.PI * 2, true);
            ctx.arc(250, 500, 30, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.fillRect(0,0,800, 800);
           // ctx.drawImage(img, 260, 150, 50, 50, canvasWidth/2-30, canvasHeight/2-30, 80, 80);
            ctx.drawImage(img, 260, 150, 80, 80, 200, 450, 80, 80);
            ctx.restore();
        }, true);
        img.src = 'images/roja.jpg';
    }
    fichaImg();

    function agregarFicha(){
        
        let radio = 30;
        let color = 'red';
        let cantidadFichas = 10;
        //se generan las fichas de forma random
        for (let i = 0; i < cantidadFichas; i++) {
            let posX = Math.floor(Math.random() * (150 - 40 + 1) + 40); //(Math.random() * (canvasWidth - radio * 2) + radio)/5;
            let posY = Math.random() * (canvasHeight - radio * 2) + radio;
            //si i es menor que la mitad cantidad de fichas 
            if (i >= cantidadFichas/2) {
                color = 'yellow';
                posX = Math.floor(Math.random() * (900 - 780 + 1) + 780); //Math.random() * (canvasWidth - radio * 2) + radio;
                posY = Math.random() * (canvasHeight - radio *2) + radio;
            }
            //se pushean las fichas dentro del arreglo
            fichaArray.push(new Circulo(posX, posY, radio, color, ctx));
        }
        //se dibujan las fichas en el tablero
        for (let y = 0; y < fichaArray.length; y++) {
            fichaArray[y].draw();
        }
        console.log(fichaArray);
    }
    //agregarFicha();
    //
    function fichaClickeada(x,y){
        for (let i = 0; i < fichaArray.length; i++) {
            let ficha = fichaArray[i];
            if (ficha.mouseEnCirculo(x,y)) {
                return ficha;
            }
        }
    }
    //identifica cuando el mouse esta por ensima de la ficah
    function onMouseDown(e){
        mouseDown = true;
        let fichaClick = fichaClickeada(e.layerX, e.layerY);
        if (fichaClick != null) {
            fichaClickeadaActual = fichaClick;
        }
    }

    function onMouseUp(e){
        mouseDown = false;


        //  71 - 75 - 65 - 75 - 85 - 65
        //  75 - 65 - 75 - 85 - 65 - 100
        //Matriz que delimita las posiciones de los circulos en el tablero
        if (e.layerX > 215 && e.layerX < 285) {
            let posicionValida = posVacia(6);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 286 && e.layerX < 360){
            let posicionValida = posVacia(5);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 361 && e.layerX < 425){
            let posicionValida = posVacia(4);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 426 && e.layerX < 500){
            let posicionValida = posVacia(3);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 501 && e.layerX < 585){
            let posicionValida = posVacia(2);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 586 && e.layerX < 650){
            let posicionValida = posVacia(1);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }else if(e.layerX > 651 && e.layerX < 750){
            let posicionValida = posVacia(0);
            if (posicionValida) {
                fichaClickeadaActual.setPosition(posicionFicha[1], posicionFicha[0]);
                dibujar();
            }
        }
    }

    //250   //325   //400   //475   //550   //625   //700

    function posVacia(x){
        
        //console.log(posicionesI);
        for (let i = x; i < posicionesI.length; i+=7) {
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

    function onMouseMove(e){
        if (mouseDown  && fichaClickeadaActual != null) {
            fichaClickeadaActual.setPosition(e.layerX, e.layerY);
            dibujar();
            console.log(fichaArray);
        }
    }

    function dibujar(){
        limpiarCanvas();
        dibujarTablero();
        for (let i = 0; i < fichaArray.length; i++) {
            fichaArray[i].draw();
        }
    }

    function limpiarCanvas(){
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        posiciones = [];
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);


  
});