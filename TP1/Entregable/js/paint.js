document.addEventListener('DOMContentLoaded', () =>{
    "use strict"
    
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let ruta = false;
    let x , y;

    canvas.addEventListener('mousedown', function(){ // evento que se activa al dar click
        ruta = true;
        ctx.beginPath(); //arrancar a dibujar
        ctx.moveTo(x,y); //cordenadas iniciales
        canvas.addEventListener('mousemove', dibujarLapiz); 
    });

    function dibujarLapiz(evento){
        x = evento.clientX;
        y = evento.clientY;
        if(ruta){ 
            let lineSize = document.querySelector('#range-line').value;
            let lineColour = document.querySelector('#inputColors').value;
            ctx.lineTo(x,y); // genera linea
            ctx.lineWidth = lineSize;
            ctx.strokeStyle = lineColour;
            ctx.stroke(); //para que se dibuje la linea
        }
    }

    //let btnErase = document.querySelector('#btn-erase');

    canvas.addEventListener('mousemove', dibujarLapiz);

    canvas.addEventListener('mouseup', function(){
        ruta = false;
    });

    let btnBorrar = document.querySelector('#borrar');
    btnBorrar.addEventListener('click', function() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

});