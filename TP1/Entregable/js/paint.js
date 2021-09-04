document.addEventListener('DOMContentLoaded', () =>{
    "use strict"
    
    window.onload = function() {
        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        let ruta = false;
        let borrado = -1;
        let x , y;
 
        /********   SUBIR IMAGENES    *********/
        
        let inputImage = document.querySelector("#selectImage");
        inputImage.addEventListener("change", handleFiles, false);

        function handleFiles() {
            let reader = new FileReader();
            reader.onload = function(){
                let image = new Image();
                image.onload = function(){                  
                    ctx.drawImage(image,0,0);
                }
                image.src = reader.result;
            }
            reader.readAsDataURL(inputImage.files[0]);
        }


        /*************   PAINT   ************/

        canvas.addEventListener('mousedown', function(){ // evento que se activa al dar click
            ruta = true;
            ctx.beginPath(); //comienza a dibujar
            ctx.moveTo(x,y); //cordenadas iniciales
            canvas.addEventListener('mousemove', dibujarLapiz);
        });

        function dibujarLapiz(evento){
            x = evento.layerX;
            y = evento.layerY;
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

    };
});