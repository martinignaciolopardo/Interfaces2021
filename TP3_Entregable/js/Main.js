document.addEventListener('DOMContentLoaded', () => {
    let divPersonaje = document.querySelector("#personaje");
    let divPasto = document.querySelector("#pasto");
    let divCielo = document.querySelector("#cielo");
    let divArboles = document.querySelector("#arboles");
    let divMontanias = document.querySelector("#montanias");
    let divGolem = document.querySelector("#golem");
    let divInicioCartel = document.querySelector("#inicioCartel");
    let divStalagtita = document.querySelector("#stalagtita");
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

    function caminar(e) {
        console.log(e);
        // if (e.keyCode == 39 && saltando == false) {
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
            divPasto.classList.add('pasto');
            divMontanias.classList.add('montanias');
            divArboles.classList.add('arboles');
            divCielo.classList.add('cielo');
            divStalagtita.classList.add('stalagtita');
            divGolem.classList.add('golem');
        // }
    }

    function agachar(e) {
        console.log(e);
        if (e.keyCode == 40) {
            divPersonaje.classList.remove("caminar");
            divPersonaje.classList.add("agachar");
        }
    }

    function morir(e) {
        if (e.keyCode == 37) {
            divPasto.style.animationPlayState = 'paused';
            divMontanias.style.animationPlayState = 'paused';
            divArboles.style.animationPlayState = 'paused';
            divCielo.style.animationPlayState = 'paused';
            divGolem.style.animationPlayState = 'paused';
            divStalagtita.style.animationPlayState = 'paused';
            divPersonaje.classList.remove("caminar");
            divPersonaje.classList.add("morir");
            setInterval(pause, 980);
        }
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
            //agregar background
            document.querySelector("#countdown").innerHTML = "Lets GO";
            caminar();
        }else {
            tiempoInicio -= 1;
            terminarJuego = setTimeout(contarInicio, 1000);
        }
    }
    contarInicio();

    function getPropiedadCss(id, propiedad){
        let golem = document.getElementById(id);
        return window.getComputedStyle(golem,null).getPropertyValue(propiedad);
    }
    
    function generandoNumerosRandom(min,max){
        return Math.floor((Math.random() * (max+1 - min)) +min);
    }

    function cambiarDuracion(){
        
        let timeAnimation = generandoNumerosRandom(4,9);
        let timeAnimation2 = generandoNumerosRandom(5,11);

        divGolem.style.setProperty('--animation-time', timeAnimation +'s');
        divStalagtita.style.setProperty('--animation-time', timeAnimation2 +'s');
        console.log(timeAnimation);
        console.log(timeAnimation2);

    }
    setInterval(cambiarDuracion, 6000);
    function comprobar(){
        let leftStalagtita = getPropiedadCss("stalagtita", "left"); //obstaculo dentro de la posicion del personaje
        let leftGolem = getPropiedadCss("golem", "left"); //obstaculo dentro de la posicion del personaje
        let top = getPropiedadCss("personaje", "top"); //personaje con menos altura que el obstaculo
        if (leftStalagtita < 300 && top > 358 || leftGolem < 300 && top > 358) { // si pasan ambas cosas, pierde
            morir();
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

    window.addEventListener("keydown", caminar);
    window.addEventListener("keydown", saltar);
    window.addEventListener("keydown", agachar);
    window.addEventListener("keydown", morir);

});