document.addEventListener('DOMContentLoaded',() => {
    let divPersonaje = document.querySelector("#personaje");
    let divPasto = document.querySelector("#pasto");
    let divCielo = document.querySelector("#cielo");
    let divArboles = document.querySelector("#arboles");
    let divMontanias = document.querySelector("#montanias");
    let divGolem = document.querySelector("#golem");
    let divStalagtita = document.querySelector("#stalagtita");
    let saltando = false;

    //let tiempoLoop = 0;
    //let gameloop = window.setInterval(accion,1000);
    
    function saltar(e){
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
    divPersonaje.addEventListener('animationend', (e) =>{
        console.log(e);
        if (e.animationName == "saltar") {
            saltando = false;
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
        }else if(e.animationName == "agachar"){
            divPersonaje.classList.remove("agachar");
            divPersonaje.classList.add("caminar");
        }
       
    })

    divGolem.addEventListener('animationstart', (e) =>{
        console.log(e);
        divGolem.classList.add('golemImg');
    })
    
    function caminar(e){
        console.log(e);
        if (e.keyCode == 39 && saltando == false) {
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
            divPasto.classList.add('pasto');
            divMontanias.classList.add('montanias');
            divArboles.classList.add('arboles');
            divCielo.classList.add('cielo');
            divStalagtita.classList.add('stalagtita');
            divGolem.classList.add('golem');
        }
    }

    function agachar(e){
        console.log(e);
        if (e.keyCode == 40) {
            divPersonaje.classList.remove("caminar");
            divPersonaje.classList.add("agachar");
        }
    }

    function morir(e){
        if (e.keyCode == 37) {
            /*divPersonaje.classList.remove("saltar");*/
            //divPersonaje.style.animationPlayState = 'paused';
            divPasto.style.animationPlayState = 'paused';
            divMontanias.style.animationPlayState = 'paused';
            divArboles.style.animationPlayState = 'paused';
            divCielo.style.animationPlayState = 'paused';
            divGolem.style.animationPlayState = 'paused';
            divStalagtita.style.animationPlayState = 'paused';
            divPersonaje.classList.remove("caminar");
            /* divPasto.classList.remove('pasto');
            divMontanias.classList.remove('montanias');
            divArboles.classList.remove('arboles');
            divCielo.classList.remove('cielo');*/
            divPersonaje.classList.add("morir");
            setInterval(pause, 990);
        }
    }

    function pause(){
        divPersonaje.style.animationPlayState = 'paused';
    }

    /*function accion(){
        if(tiempoLoop < 10){
            console.log('x = '+ tiempoLoop );
            tiempoLoop ++;
        }else{
            window.clearInterval(gameloop);
            console.log('Listo');
        }
    }*/

    window.addEventListener("keydown", caminar);
    window.addEventListener("keydown", saltar);
    window.addEventListener("keydown", agachar);
    window.addEventListener("keydown", morir);
    
    
});