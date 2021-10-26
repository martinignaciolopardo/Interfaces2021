document.addEventListener('DOMContentLoaded', () => {
    let divPersonaje = document.querySelector("#personaje");
    
    let divPasto = document.querySelector("#pasto");
    let divCielo = document.querySelector("#cielo");
    let divArboles = document.querySelector("#arboles");
    let divMontanias = document.querySelector("#montanias");

    let divGolem = document.querySelector("#golem");
    let divStalagtita = document.querySelector("#stalagtita");
    let divImagenChuleta = document.querySelector("#puntosImagenChuleta");

    let divInicioCartel = document.querySelector("#inicioCartel");
    let divDistancia = document.querySelector("#distancia");
    let barraProgresion = document.querySelector("#barraProgresion");
    barraProgresion.classList.add("oculto");
    let spanProgresion = document.querySelector("#spanProgresion");
    let divPuntaje = document.querySelector("#puntajeChuleta");
    let puntaje = 0;
    let contador = 0;
    let porcentaje = 0;
    let interval;
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
        console.log(e);
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
        console.log(e);
        divGolem.classList.add('golemImg');
    })
    divStalagtita.addEventListener('animationstart', (e) => {
        divStalagtita.classList.add('stalagtitaImg');
    })
    divImagenChuleta.addEventListener('animationstart', (e) =>{
        divImagenChuleta.classList.add('desplazamientoChuletaImg');
    })
    function caminar(e) {
        // if (e.keyCode == 39 && saltando == false) {
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
            divPasto.classList.add('pasto');
            divMontanias.classList.add('montanias');
            divArboles.classList.add('arboles');
            divCielo.classList.add('cielo');
            divStalagtita.classList.add('stalagtita');
            divImagenChuleta.classList.add('desplazamientoChuleta');
            divGolem.classList.add('golem');
        // }
    }

    //function agachar(e) {
    //   console.log(e);
    //  if (e.keyCode == 40) {
    //        divPersonaje.classList.remove("caminar");
    //        divPersonaje.classList.add("agachar");
    //    }
    // }

    function morir(e) {
        divPasto.style.animationPlayState = 'paused';
        divMontanias.style.animationPlayState = 'paused';
        divArboles.style.animationPlayState = 'paused';
        divCielo.style.animationPlayState = 'paused';
        divGolem.style.animationPlayState = 'paused';
        divStalagtita.style.animationPlayState = 'paused';
        divPersonaje.classList.remove("caminar");
        divPersonaje.classList.add("morir");
        setInterval(pause, 1400);
    }

    function pause() {
        divPersonaje.style.animationPlayState = 'paused';
    }
    //en proceso
    function sumarPuntos(e) {
        puntaje += 50;
        
    }
   
    function contarInicio(){
        if(tiempoInicio >= 4){
                document.querySelector("#countdown").innerHTML = "";
        }else {
                document.querySelector("#countdown").innerHTML = tiempoInicio;
            }
        if(tiempoInicio == 0){
            //agregar background
            document.querySelector("#countdown").innerHTML = "Lets GO";
            caminar();
            interval = setInterval(() => {
                comprobar()
                contador++;
                divDistancia.innerHTML = contador+" Km";
                porcentaje = contador/50;
                spanProgresion.style.setProperty('width', porcentaje+"%");
                //en proceso
                if(porcentaje == 100){
                    let divFinal = document.querySelector('#cartelFinal');
                    divFinal.classList.add('mostrarFinal'); 
                }
                //aca falta agregar que cuando el porcentaje es 100, 
                //termine el juego con un cartel HA GANADO
            }, 40);
            barraProgresion.classList.remove("oculto");
            divPuntaje.innerHTML =" x  " + puntaje + " puntos";

        }else {
            tiempoInicio -= 1;
            terminarJuego = setTimeout(contarInicio, 1000);
        }
    }
    contarInicio();

    function getPropiedadCss(id, propiedad){
        let elem = document.getElementById(id);
        return window.getComputedStyle(elem,null).getPropertyValue(propiedad);
    }
    
    function generandoNumerosRandom(min,max){
        return Math.floor((Math.random() * (max+1 - min)) +min);
    }
    //para revisar
    function cambiarDuracion(){
        
        let timeAnimation = generandoNumerosRandom(5,10);
        let timeAnimation2 = generandoNumerosRandom(5,10);

        divGolem.style.setProperty('--animation-time', timeAnimation +'s');
        divStalagtita.style.setProperty('--animation-time', timeAnimation2 +'s');
        console.log(timeAnimation);
        console.log(timeAnimation2);

    }
    setInterval(cambiarDuracion, 10000);

    let colisionX1 = 245;
    let colisionX2 = 150;
    let colisionY = 358;

    function comprobar(){
        let leftStalagtita = getPropiedadCss("stalagtita", "left"); // posision X de la stalagtita
        let top = getPropiedadCss("personaje", "top"); //posicion Y del personaje
        let leftGolem = getPropiedadCss("golem", "left"); //posicion X del golem
        let leftChuleta = getPropiedadCss("puntosImagenChuleta", "left");
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
        //en proceso
        if(leftChuleta.replace('px','') <= colision3 &&
           leftChuleta.replace('px','') >= colision4 && 
           top.replace('px', '') >= colisionY){
               sumarPuntos();
           }
    }

    

   // function accion() {
            // if (tiempoLoop < 10) {
            //     divInicioCartel.classList.add("inicioCartel");
            //     if (tiempoLoop == 1) {
            //         divInicioCartel.classList.add("areYouReady");
            //     }
            //     else if(tiempoLoop == 3){
            //         divInicioCartel.classList.remove("areYouReady");
            //         divInicioCartel.classList.add("lestGo");
            //     }
            //     tiempoLoop++;
            //     console.log(tiempoLoop);
                
            // }else {
            //     window.clearInterval(gameloop);
            //     divInicioCartel.classList.remove("inicioCartel");
            //     divInicioCartel.classList.remove("letsGo");
            //     console.log('Listo');
            // }
   // }

    //window.addEventListener("keydown", caminar);
    window.addEventListener("keydown", saltar);
    //window.addEventListener("keydown", agachar);

});