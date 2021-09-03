document.addEventListener('DOMContentLoaded', () =>{
    "use strict"
    
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let ruta = false;
    let borrado = -1;
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
            if(borrado==1){
                let lineSize = document.querySelector('#range-erase').value;
                let lineColour = document.querySelector('#inputColors').value;
                ctx.lineTo(x,y); // genera linea
                ctx.lineWidth = lineSize;
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }else{
                let lineSize = document.querySelector('#range-line').value;
                let lineColour = document.querySelector('#inputColors').value;
                ctx.lineTo(x,y); // genera linea
                ctx.lineWidth = lineSize;
                ctx.strokeStyle = lineColour;
                ctx.stroke(); //para que se dibuje la linea
            }
        }
    }

    //let btnErase = document.querySelector('#btn-erase');

    canvas.addEventListener('mousemove', dibujarLapiz);

    canvas.addEventListener('mouseup', function(){
        ruta = false;
    });

    let imgBorrar = document.querySelector('#erase');
    imgBorrar.addEventListener('click', function(){
        borrado = borrado * -1;
    });


    let btnBorrar = document.querySelector('#borrar');
    btnBorrar.addEventListener('click', function() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

});