document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function () {
        let canvas = document.querySelector('#canvas');
        let negativo = document.querySelector('#btnFiltroNegativo');
        let gris = document.querySelector('#btnFiltroGris');
        let brillo = document.querySelector('#btnFiltroBrillo');
        let sepia = document.querySelector('#btnFiltroSepia');
        let blur = document.querySelector('#btnFiltroBlur');
        let binarizacion = document.querySelector('#btnFiltroBinarizacion');
        let saturacion = document.querySelector('#btnFiltroSaturacion');
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


        /********   SUBIR IMAGENES Y FILTROS   *********/

        let inputImage = document.querySelector("#selectImage");
        inputImage.addEventListener("change", function (e) {
            let reader = new FileReader();
            reader.onload = function () {
                var image = new Image();
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    botonesFiltros(image);
                }
                image.src = reader.result;
            }
            reader.readAsDataURL(inputImage.files[0]);
        }, false);


        function botonesFiltros(image) {
            gris.addEventListener('click', () => {
                filterImageBinario(image);
            });
            brillo.addEventListener('click', () => {
                filterImageBrillo(image);
            });
            negativo.addEventListener('click', () => {
                filterImageNegativo(image);
            });
            sepia.addEventListener('click', () => {
                filterImageSepia(image);
            });
            blur.addEventListener('click', () => {
                filterImageBlur(image, width, height);
            });
            binarizacion.addEventListener('click', () => {
                filterImageBinarizacion(image);
            });
            saturacion.addEventListener('click', () => {
                filterImageSaturacion(image);
            });
        }

        function filterImageNegativo(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i +=4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                data[i] = 255 - r;
                data[i + 1] = 255 - g;
                data[i + 2] = 255 - b;
                data[i + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filterImageBinario(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = grey;
                data[i + 1] = grey;
                data[i + 2] = grey;
                data[i + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filterImageBrillo(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
               
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filterImageSepia(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
               
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filterImageBlur(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filterImageBinarizacion(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {

            }
            ctx.putImageData(imageData, 0, 0);
        }
        
        function filterImageSaturacion(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {

            }
            ctx.putImageData(imageData, 0, 0);
        }

    }
});