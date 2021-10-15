document.addEventListener('DOMContentLoaded',() => {

    let canvas = document.querySelector('#canvas');
    let ctx =  canvas.getContext('2d');
    let tiempoLoop = 0;
    let salto = true;
    let gameloop = window.setInterval(accion,1000);
    let width = canvas.width;
    let height = canvas.height;
    let img = new Image();


    function accion(){
        if(tiempoLoop < 10){
            console.log('x = '+ tiempoLoop );
            tiempoLoop ++;
        }else{
            window.clearInterval(gameloop);
            console.log('Listo');
        }
    }

    function setBackground(){
        ctx.save();
        ctx.fillStyle = "#00aaaf95";
        ctx.fillRect(0,0,width,height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,width,height);
        ctx.restore();
    }
    setBackground();
    img.onload = function(){
        ctx.drawImage(img,100,350,170,100);
    }
    img.src = "images/caracol.png"
});