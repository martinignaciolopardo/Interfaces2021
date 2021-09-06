document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function () {
        let canvas = document.querySelector('#canvas');
        let width = canvas.width;
        let height = canvas.height;

        
        let Gris = document.querySelector('#btnFiltroGris');
        let Brillo = document.querySelector('#btnFiltroBrillo');
        let Sepia = document.querySelector('#btnFiltroSepia');
        let Blur = document.querySelector('#btnFiltroBlur');
        let Binarizacion = document.querySelector('#btnFiltroBinarizacion');
        let Saturacion = document.querySelector('#btnFiltroSaturacion');

        let ctx = canvas.getContext('2d');
        let ruta = false;
        let borrado = -1;
        let x, y;

        /*************   PAINT   ************/

        canvas.addEventListener('mousedown', function () { // evento que se activa al dar click
            ruta = true;
            ctx.beginPath(); //comienza a dibujar
            ctx.moveTo(x, y); //cordenadas iniciales
            canvas.addEventListener('mousemove', dibujarLapiz);
        });

        function dibujarLapiz(evento) {
            x = evento.layerX;
            y = evento.layerY;
            if (ruta) {
                if (borrado == 1) {
                    let lineSize = document.querySelector('#range-erase').value;
                    // let lineColour = document.querySelector('#inputColors').value;
                    ctx.lineTo(x, y); // genera linea
                    ctx.lineWidth = lineSize;
                    ctx.strokeStyle = 'white';
                    ctx.stroke();
                } else {
                    let lineSize = document.querySelector('#range-line').value;
                    let lineColour = document.querySelector('#inputColors').value;
                    ctx.lineTo(x, y); // genera linea
                    ctx.lineWidth = lineSize;
                    ctx.strokeStyle = lineColour;
                    ctx.stroke(); //para que se dibuje la linea
                }
            }
        }

        canvas.addEventListener('mousemove', dibujarLapiz);

        canvas.addEventListener('mouseup', function () {
            ruta = false;
        });

        let imgBorrar = document.querySelector('#erase');
        imgBorrar.addEventListener('click', function () {
            borrado = borrado * -1;
        });

        let btnBorrar = document.querySelector('#borrar');
        btnBorrar.addEventListener('click', function () {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });


        /********   SUBIR IMAGENES    *********/

        let inputImage = document.querySelector("#selectImage");
        inputImage.addEventListener("change", function(e){
            let reader = new FileReader();
            reader.onload = function () {
                var image = new Image();
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    Gris.addEventListener('click', () => {
                        filterImageGrey(image, width, height);
                    })
                }
                image.src = reader.result;
            }
            reader.readAsDataURL(inputImage.files[0]);
        }, false);


            /*********  FILTROS  ********/
            function filterImageGrey(image, width, height) {
                var imageData = ctx.getImageData(0, 0, width, height);
                let data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    let grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = grey;
                    data[i + 1] = grey;
                    data[i + 2] = grey;
                    data[i + 3] = 255;
                }
    
                ctx.putImageData(imageData, 0, 0);
            }
        };
    });