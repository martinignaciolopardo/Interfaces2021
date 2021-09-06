document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function () {
        let canvas = document.querySelector('#canvas');

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
                    botonesFiltros(image, canvas.width, canvas.height);
                }
                image.src = reader.result;
            }
            reader.readAsDataURL(inputImage.files[0]);
        }, false);


        function botonesFiltros(image, width, height) {
            gris.addEventListener('click', () => {
                filterImageGrey(image, width, height);
            });
            brillo.addEventListener('click', () => {
                filterImageBrillo(image, width, height);
            });
            sepia.addEventListener('click', () => {
                filterImageSepia(image, width, height);
            });
            blur.addEventListener('click', () => {
                filterImageBlur(image, width, height);
            });
            binarizacion.addEventListener('click', () => {
                filterImageBinarizacion(image, width, height);
            });
            saturacion.addEventListener('click', () => {
                filterImageSaturacion(image, width, height);
            });
        }

        function filterImageGrey(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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

        function filterImageBrillo(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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

        function filterImageSepia(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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

        function filterImageBlur(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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

        function filterImageBinarizacion(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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
        
        function filterImageSaturacion(image, width, height) {
            let imageData = ctx.getImageData(0, 0, width, height);
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

    }
});