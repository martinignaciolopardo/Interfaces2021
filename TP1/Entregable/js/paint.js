document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function () {
        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        let ruta = false;
        let erase = -1;
        let x, y;
        //botones de filtros
        let negativo = document.querySelector('#btnFiltroNegativo');
        let gris = document.querySelector('#btnFiltroGris');
        let brillo = document.querySelector('#btnFiltroBrillo');
        let sepia = document.querySelector('#btnFiltroSepia');
        let blur = document.querySelector('#btnFiltroBlur');
        let binarizacion = document.querySelector('#btnFiltroBinarizacion');
        let saturacion = document.querySelector('#btnFiltroSaturacion');

        /*************   PAINT   ************/

        canvas.addEventListener('mousedown', function () { // evento que se activa al mantener clickeado (click izq)
            ruta = true; //si se mantiene apretado el click en el canvas, ruta = true
            ctx.beginPath(); //comienza a dibujar
            ctx.moveTo(x, y); //cordenadas iniciales
            canvas.addEventListener('mousemove', dibujarLapiz); //evento al mover el mouse
        });

        function dibujarLapiz(evento) {
            x = evento.layerX;
            y = evento.layerY;
            if (ruta) {
                if (erase == 1) {
                    let eraseLineSize = document.querySelector('#range-erase').value;
                    ctx.lineTo(x, y); // genera linea
                    ctx.lineWidth = eraseLineSize;
                    ctx.strokeStyle = 'white';
                    ctx.stroke();
                } else {
                    let pencilLineSize = document.querySelector('#range-line').value;
                    let penciLineColour = document.querySelector('#inputColors').value;
                    ctx.lineTo(x, y); // genera linea
                    ctx.lineWidth = pencilLineSize;
                    ctx.strokeStyle = penciLineColour;
                    ctx.stroke(); //para que se dibuje la linea
                }
            }
        }

        canvas.addEventListener('mousemove', dibujarLapiz);

        canvas.addEventListener('mouseup', function () {
            ruta = false;
        });

        let btnErase = document.querySelector('#btnErase');
        //se le aplica un evento al boton erase (al clickearlo)
        btnErase.addEventListener('click', function () {
            btnErase.classList.toggle('toggle');
            erase = erase * -1;
        });

        let btnDescartar = document.querySelector('#descartar');
        //se le aplica un evento al boton descartar (al clickearlo)
        btnDescartar.addEventListener('click', function () {
            //borra todo lo que hay en el canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });


        /********   SUBIR IMAGENES Y FILTROS   *********/

        let inputImage = document.querySelector("#selectImage");
        //se aplica un evento change al input de la imagen, el cual se dispara al cambiar el valor del input (al seleccionar una foto)
        inputImage.addEventListener("change", function () {
            //se crea la variable reader, que permite leer ficheros almacenados en el cliente de forma asincronica usando el objeto file
            let reader = new FileReader();
            reader.onload = function () {
                var image = new Image();
                image.onload = function () {
                    //setea el tamaño del canvas igual al tamaño de la imagen
                    canvas.width = image.width;
                    canvas.height = image.height;
                    //dibuja la imagen en el canvas
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    botonesFiltros(image);
                }
                image.src = reader.result;
            }
            reader.readAsDataURL(inputImage.files[0]);
        }, false);

        //asigna el evento click a los botones de filtros
        function botonesFiltros(image) {
            gris.addEventListener('click', () => {
                filterImageGrises(image)
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

        /* esta funcion nos ayuda a asegurarnos que el rango no salga de 0 - 255 */
        function rangeColor(data) {
            if (data < 0)
                data = 0;
            if (data > 255)
                data = 255;
            return data;
        }
        /*filtro que recorre la imagen pasada por parametro e invierte los valores r,g,b
        (EJ: si, data[0] = 0
             data[0] = 255 - 0
             data[0] = 255 (se invierte, pasa de blanco a negro))
        */
        function filterImageNegativo(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                data[i] = 255 - r;
                data[i + 1] = 255 - g;
                data[i + 2] = 255 - b;
                data[i + 3] = 255; //sin transparencia
            }
            ctx.putImageData(imageData, 0, 0);
        }

        /* filtro que recorre la imagen pasada por parametro y le aplica distintas tonalidades 
           de grises a los pixeles.*/
        function filterImageGrises(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let gray = (data[i] + data[i + 1] + data[i + 2]) / 3; // toma los valores rgb, los suma y al dividirlos por 3 va generando distintas tonalidades de grises dependiendo de los colores de cada iteracion (EJ: 80+100+30=210/3=70) entonces le aplicamos 70 a r,g y b para que quede esa tonalidad de gris
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
                data[i + 3] = 255; //sin transparencia
            }
            ctx.putImageData(imageData, 0, 0);
        }

        /* filtro que recorre la imagen pasada por parametro y le aplica un aumento a los tonalidades de color  */
        function filterImageBrillo(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let k = 80; // se agrega una variable que va sumar el valor de cada iteracion aumentando la luz en cada iteración
                data[i] += k;
                data[i + 1] += k;
                data[i + 2] += k;
                data[i + 3] = 255;//sin transparencia
            }
            ctx.putImageData(imageData, 0, 0);
        }

        /* */
        function filterImageSepia(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {

            }
            ctx.putImageData(imageData, 0, 0);
        }

        /* */
        function filterImageBlur(image) {
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let border = (x[0], y)
                    data[i] = r;
                    data[i + 1] = g;
                    data[i + 2] = b;
                    data[i + 3] = 255;
                }

            }
            ctx.putImageData(imageData, 0, 0);
        }

        /**/
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

        document.querySelector('#btnDownload').addEventListener('click', () => {
            let img = canvas.toDataURL();
            let link = document.createElement('a');
            link.download = 'image.png';
            link.href = img;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

    }
});