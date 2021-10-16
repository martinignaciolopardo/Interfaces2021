document.addEventListener('DOMContentLoaded',() => {
    let divPersonaje = document.querySelector("#personaje");
    let tiempoLoop = 0;
    //let salta = false;
    //let gameloop = window.setInterval(accion,1000);
    caminar();
    
    function saltar(e){
        if (e.keyCode == 38) {
            //salta = true;
            divPersonaje.classList.remove("caminar");
            divPersonaje.classList.add("saltar");
            //setTimeout(caminar,1000);
        }
    }

    divPersonaje.addEventListener('animationend', () =>{
       // salta = false;
        divPersonaje.classList.remove("saltar");
        divPersonaje.classList.add("caminar");
    })
    
    function caminar(){
        //salta = false;
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
    }

    img.onload = function(){
        ctx.drawImage(img,100,350,170,100);
    }
    img.src = "images/caracol.png"*/
    
    window.addEventListener("keydown", saltar);
});