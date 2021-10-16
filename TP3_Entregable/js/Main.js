document.addEventListener('DOMContentLoaded',() => {
    let divPersonaje = document.querySelector("#personaje");
    //let tiempoLoop = 0;
    //let gameloop = window.setInterval(accion,1000);
    caminar();
    
    function saltar(e){
        //si se presiona la tecla (flecha hacia arriba), se le saca la clase caminar
        //al div donde esta el personaje y se le aplica la clase saltar
        if (e.keyCode == 38) {
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
            divPersonaje.classList.remove("saltar");
            divPersonaje.classList.add("caminar");
        }
       
    })
    
    function caminar(){
        divPersonaje.classList.remove("saltar");
        divPersonaje.classList.add("caminar");
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
    
    window.addEventListener("keydown", saltar);

});