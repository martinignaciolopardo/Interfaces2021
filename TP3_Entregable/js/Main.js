document.addEventListener('DOMContentLoaded', () => {
    let divPersonaje = document.querySelector("#personaje");
    
    let divPasto = document.querySelector("#pasto");
    let divCielo = document.querySelector("#cielo");
    let divArboles = document.querySelector("#arboles");
    let divMontanias = document.querySelector("#montanias");

    let divGolem = document.querySelector("#golem");
    let divStalagtita = document.querySelector("#stalagtita");
    let divImagenChuleta = document.querySelector("#puntosImagenChuleta");

    let divDistancia = document.querySelector("#distancia");
    let barraProgresion = document.querySelector("#barraProgresion");
    barraProgresion.classList.add("oculto");
    let spanProgresion = document.querySelector("#spanProgresion");
    let divPuntaje = document.querySelector("#puntajeChuleta");

    let divFinal = document.querySelector('#cartelFinal');
    divFinal.classList.add('oculto');

    const colisionX1 = 245;
    const colisionX2 = 150;
    const colisionY = 358;
    const colisionY2 = 340;

    let interval;
    let puntaje = 0;
    let contador = 0;
    let porcentaje = 0;
    let tiempoInicio = 6;
    let saltando = false;

    // let tiempoLoop = 0;
    // let gameloop = window.setInterval(accion,1000);

    function saltar(e) {
        //si se presiona la tecla (flecha hacia arriba), se le saca la clase caminar
        //al div donde esta el personaje y se le aplica la clase saltar
        if (e.keyCode == 38) {
            saltando = true;
            divPersonaje.style.animationPlayState = 'running';
            divPersonaje.classList.remove("caminar");
            divPersonaje.classList.add("saltar");
        }
    }

    //el evento animationend detecta cuando una animacion finaliza
    //si la animacion es la de saltar, se le quita la misma al div
    //donde esta el personaje y se le aplica la clase caminar, para que 
    //de esta forma solo salte 1 vez y siga caminando
    divPersonaje.addEventListener('animationend', (e) => {
        //console.log(e);
        if (e.animationName == "saltar") {
            saltando = false;
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
        } else if (e.animationName == "agachar") {
            divPersonaje.classList.remove("agachar");
            divPersonaje.classList.add("caminar");
        }

    })
   
    divGolem.addEventListener('animationstart', (e) => {
        divGolem.classList.add('golemImg');
    })

    divStalagtita.addEventListener('animationstart', (e) => {
        divStalagtita.classList.add('stalagtitaImg');
    })

    divImagenChuleta.addEventListener('animationstart', (e) =>{
        divImagenChuleta.classList.add('chuletaImg');
    })

    function caminar() {
        divPersonaje.classList.remove("saltar");
        divPersonaje.classList.add("caminar");
        divPasto.classList.add('pasto');
        divMontanias.classList.add('montanias');
        divArboles.classList.add('arboles');
        divCielo.classList.add('cielo');
        divStalagtita.classList.add('stalagtita');
        divImagenChuleta.classList.add('desplazamientoChuleta');
        divGolem.classList.add('golem');
    }

    function pause() {
        divPersonaje.style.animationPlayState = 'paused';
    }
   
    function contarInicio(){
        if(tiempoInicio >= 4){
                document.querySelector("#countdown").innerHTML = "";
        }else {
                document.querySelector("#countdown").innerHTML = tiempoInicio;
            }
        if(tiempoInicio == 0){
            document.querySelector("#countdown").innerHTML = "Lets GO";
            caminar();
            interval = setInterval(() => {
                comprobar()
                actualizarSpanProgresion();
                divPuntaje.innerHTML =" x  " + puntaje + " puntos";
                if(Math.trunc(porcentaje) == 100){
                    mostrarCartelGanador();
                    finJuego();
                }
            }, 40);
            barraProgresion.classList.remove("oculto");
            

        }else {
            tiempoInicio -= 1;
            terminarJuego = setTimeout(contarInicio, 1000);
        }
    }
    contarInicio();

    function finJuego(){
        divPasto.style.animationPlayState = 'paused';
        divMontanias.style.animationPlayState = 'paused';
        divArboles.style.animationPlayState = 'paused';
        divCielo.style.animationPlayState = 'paused';
        divGolem.style.animationPlayState = 'paused';
        divStalagtita.style.animationPlayState = 'paused';
        divImagenChuleta.style.animationPlayState = 'paused';
        divPersonaje.style.animationPlayState = 'paused';
        clearInterval(interval);
    }

    function morir(e) {
        divPasto.style.animationPlayState = 'paused';
        divMontanias.style.animationPlayState = 'paused';
        divArboles.style.animationPlayState = 'paused';
        divCielo.style.animationPlayState = 'paused';
        divGolem.style.animationPlayState = 'paused';
        divStalagtita.style.animationPlayState = 'paused';
        divImagenChuleta.style.animationPlayState = 'paused';
        divPersonaje.classList.remove("caminar");
        divPersonaje.classList.add("morir");
        clearInterval(interval);
        setInterval(pause, 1400);
    }

    function actualizarSpanProgresion(){
        contador++;
        divDistancia.innerHTML = contador+" Km";
        porcentaje = contador/50;
        spanProgresion.style.setProperty('width', porcentaje+"%");
        spanProgresion.innerHTML = Math.trunc(porcentaje)+'%';
    }

    function randomColor() {
        let letras = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letras[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function mostrarCartelGanador(){
        divFinal.innerHTML = 'Ha ganado!';
        divFinal.classList.remove('oculto');
        let colorRandom =  randomColor();
        divFinal.style.color = colorRandom;
    }

    function getPropiedadCss(id, propiedad){
        let elem = document.getElementById(id);
        return window.getComputedStyle(elem,null).getPropertyValue(propiedad);
    }
    
    /*function generandoNumerosRandom(min,max){
        let aleatorio = Math.floor((Math.random() * (max+1 - min)) +min);
        console.log(aleatorio);
        return aleatorio;
    }
    //para revisar
    function cambiarDuracion(){

        let timeAnimation = generandoNumerosRandom(5,10);
        let timeAnimation2 = generandoNumerosRandom(5,10);

        divGolem.style.setProperty('--animation-time', timeAnimation +'s');
        divStalagtita.style.setProperty('--animation-time', timeAnimation2 +'s');
        //console.log(timeAnimation);
        //console.log(timeAnimation2);

    }
    setInterval(cambiarDuracion, 10000);*/

    function comprobar(){
        let leftStalagtita = getPropiedadCss("stalagtita", "left"); // posision X de la stalagtita
        let top = getPropiedadCss("personaje", "top"); //posicion Y del personaje
        let leftGolem = getPropiedadCss("golem", "left"); //posicion X del golem
        let leftChuleta = getPropiedadCss("puntosImagenChuleta", "left");
        //console.log(leftChuleta);
        parseInt(top);
        parseInt(leftStalagtita);
        if (leftStalagtita.replace('px','') <= colisionX1 &&
            leftStalagtita.replace('px','') >= colisionX2 && 
            top.replace('px','') >= colisionY || 
            leftGolem.replace('px','') <= colisionX1 && 
            leftGolem.replace('px','') >= colisionX2 && 
            top.replace('px','') >= colisionY)  {
            morir();
            clearInterval(interval);
        }
        if(leftChuleta.replace('px','') <= colisionX1 &&
           leftChuleta.replace('px','') > colisionX2 && 
           top.replace('px','') <= colisionY2){
            console.log('agarro chuleta');
            divImagenChuleta.style.setProperty('left', 10+"px");
            sumarPuntos();
           }
        //en proceso
        // if(leftChuleta.replace('px','') <= colision3 &&
        //    leftChuleta.replace('px','') >= colision4 && 
        //    top.replace('px', '') >= colisionY){
        //        sumarPuntos();
        //    }
    }

    function sumarPuntos() {
        contador += 50;
        puntaje++;
    }

    let paused = false;

    function pausar(e){
        if (e.keyCode == 32 && paused == false) {
            divPasto.style.animationPlayState = 'paused';
            divMontanias.style.animationPlayState = 'paused';
            divArboles.style.animationPlayState = 'paused';
            divCielo.style.animationPlayState = 'paused';
            divGolem.style.animationPlayState = 'paused';
            divStalagtita.style.animationPlayState = 'paused';
            divPersonaje.style.animationPlayState = 'paused';
            divImagenChuleta.style.animationPlayState = 'paused';
            paused = true;
        }else if (e.keyCode == 32 && paused == true) {
            divPasto.style.animationPlayState = 'running';
            divMontanias.style.animationPlayState = 'running';
            divArboles.style.animationPlayState = 'running';
            divCielo.style.animationPlayState = 'running';
            divGolem.style.animationPlayState = 'running';
            divStalagtita.style.animationPlayState = 'running';
            divPersonaje.style.animationPlayState = 'running';
            paused = false;
        }
    }

    window.addEventListener("keydown", saltar);
    window.addEventListener("keydown", pausar);

});