document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    window.onload = function () {
        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        //setea dibujar en falso.
        let ruta = false;
        //setea borrar en falso (-1)
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
        let borde = document.querySelector('#btnFiltroBorde');
        //botón descartar (limpia el canvas)
        let btnDescartar = document.querySelector('#descartar');
        //botón borrar
        let btnErase = document.querySelector('#btnErase');
        //botón restore (restaura la imagen)
        let btnRestore =  document.querySelector('#btnRestore');
        //se le aplica un evento al boton erase (al clickearlo)
        btnErase.addEventListener('click', function () {
            btnErase.classList.toggle('toggle');
            erase = erase * -1;
        });
        //se le aplica un evento al botón descartar (al clickearlo)
        btnDescartar.addEventListener('click', function () {
            //borra todo lo que hay en el canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });
        //al clickear, llama a la función create image para volver a tener la imagen que se cargó (si se le aplicó algun filtro, se borra)
        btnRestore.addEventListener('click', function () {
            createImage();
        })

        // se le aplica al canvas un evento que se activa al mantener clickeado (click izq)
        canvas.addEventListener('mousedown', function () { 
            ruta = true; //si se mantiene apretado el click en el canvas, ruta = true
            ctx.beginPath(); //comienza a dibujar
            ctx.moveTo(x, y); //cordenadas iniciales
            canvas.addEventListener('mousemove', dibujarLapiz); //evento al mover el mouse
        });

        function dibujarLapiz(evento) {
            x = evento.layerX; //posicion del mouse en el canvas
            y = evento.layerY; //posicion del mouse en el canvas
            //si esta el click apretado, entra al if
            if (ruta) {
                //si esta la goma seleccionada, borra
                if (erase == 1) {
                    let eraseLineSize = document.querySelector('#range-erase').value;
                    ctx.lineTo(x, y); //dibuja la linea hasta la posicion x e y
                    ctx.lineWidth = eraseLineSize; //tamaño de goma de borrar
                    ctx.strokeStyle = 'white'; //color de la goma
                    ctx.stroke(); //para que dibuje
                } 
                //sino, dibuja
                else {
                    let pencilLineSize = document.querySelector('#range-line').value;
                    let penciLineColour = document.querySelector('#inputColors').value;
                    ctx.lineTo(x, y); //dibuja la linea hasta la posicion x e y
                    ctx.lineWidth = pencilLineSize; //tamaño del trazo
                    ctx.strokeStyle = penciLineColour; //color del trazo
                    ctx.stroke(); //para que se dibuje la linea
                }
            }
        }

        canvas.addEventListener('mousemove', dibujarLapiz);
        canvas.addEventListener('mouseup', function () {
            //al dejar de mantener apretado el click, setea dibujar en false (deja de trazar).
            ruta = false;
        });
        
        /********   SUBIR IMAGENES Y FILTROS   *********/

        let inputImage = document.querySelector("#selectImage");
        //se aplica un evento change al input de la imagen, el cual se dispara al cambiar el valor del input (al seleccionar una foto)
        inputImage.addEventListener("change", createImage, false);
            //se crea la variable reader, que permite leer ficheros almacenados en el cliente de forma asincronica usando el objeto file
        function createImage(){
            //FileReader permite leer ficheros almacenados en el cliente de forma asincronica, usando el objeto File en este caso
            let reader = new FileReader();
            //el onload es un evento que se activa al ser leido el contenido
            reader.onload = function () {
                //constructor de imagen
                let image = new Image();
                //al ser leida la imagen, se ejecuta la funcion
                image.onload = function () {
                    //si la imagen es mayor a 600px de ancho, achica la imagen proporcionalmente al ancho.
                    if (image.width > 500) {
                        let newWidth = 500;
                        let porcentaje =  Math.round((100*newWidth)/image.width);
                        let newHeight = Math.round((image.height*porcentaje)/100);
                        image.width = newWidth;
                        image.height = newHeight;
                        canvas.width = image.width;
                        canvas.height = image.height;
                    }
                    //si la imagen es mayor a 600px de alto, achica la imagen proporcionalmente al alto.
                    if (image.height > 490) {
                        let newHeight = 490;
                        let porcentaje = Math.round((100*newHeight)/image.height);
                        let newWidth = Math.round((image.width*porcentaje)/100);
                        image.width = newWidth;
                        image.height = newHeight;
                        canvas.width = image.width;
                        canvas.height = image.height;
                    }
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
        }
    

        //asigna el evento click a los botones de filtros
        function botonesFiltros(image) {
            gris.addEventListener('click', () => {
                filtroGrises(image);
            });
            brillo.addEventListener('click', () => {
                filtroBrillo(image);
            });
            negativo.addEventListener('click', () => {
                filtroNegativo(image);
            });
            sepia.addEventListener('click', () => {
                filtroSepia(image);
            });
            blur.addEventListener('click', () => {
                filtroBlur(image);
            });
            binarizacion.addEventListener('click', () => {
                filtroBinarizacion(image);
            });
            saturacion.addEventListener('click', () => {
                filtroSaturacion(image);
            });
            borde.addEventListener('click', () => {
                filtroDeteccionBordes(image);
            });
        }

        /*filtro que recorre la imagen pasada por parametro e invierte los valores r,g,b
        (EJ: si, data[0] = 0
             data[0] = 255 - 0
            Resultado: data[0] = 255 (se invierte, pasa de blanco a negro))
        */
        function filtroNegativo(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
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
        function filtroGrises(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
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
        function filtroBrillo(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                let brillo = 20; // se agrega una variable que va a ir aumentando el valor r, g, b, aumentando la luz en cada iteración
                data[i] += brillo;
                data[i + 1] += brillo;
                data[i + 2] += brillo;
                data[i + 3] = 255; //sin transparencia
            }
            ctx.putImageData(imageData, 0, 0);
        }

        /* recorre la imagen, toma los valores de cada pixel y se le aplica el algoritmo para calcular sus nuevos valores */
        function filtroSepia(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                // se toma el valor de cada pixel
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                // se aplica la formula en base a los valores de los pixeles
                let newDataR = Math.trunc(0.393 * r + 0.769 * g + 0.189 * b);
                let newDataG = Math.trunc(0.349 * r + 0.686 * g + 0.168 * b);
                let newDataB = Math.trunc(0.272 * r + 0.534 * g + 0.131 * b);
                // se chequea que no pase de 255
                if (newDataR > 255){
                    data[i] = 255;
                }else data[i] = newDataR;
                if (newDataG > 255){
                    data[i + 1] = 255;
                }else data[i + 1] = newDataG;
                if (newDataB > 255){
                    data[i + 2] = 255;
                }else data[i + 2] = newDataB;
                data[i + 3] = 255; //sin transparencia
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filtroBlur(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let r = 0;
            let g = 0;
            let b = 0;
            //recorre ancho
            for (let x = 0; x < imageData.width -1; x++) {
                //recorre alto
                for (let y = 0; y < imageData.height - 1; y++) {
                    promedioRGB(imageData, x, y, r, g, b);
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        //toma los valores rgb de los pixeles adyacentes (y los del mismo pixel) y hace un promedio
        //  x-1| x |x+1
        //  y-1|y-1|y-1
        //  ---|---|---
        //  x-1| x |x+1
        //   y | y | y 
        //  ---|---|---
        //  x-1| x |x+1
        //  y+1|y+1|y+1
        function promedioRGB(imageData, x, y, r, g, b) {
            r = getRed(imageData, x - 1, y - 1) + 
                getRed(imageData, x, y - 1) + 
                getRed(imageData, x + 1, y - 1) + 
                getRed(imageData, x - 1, y) + 
                getRed(imageData, x, y) + 
                getRed(imageData, x + 1, y) + 
                getRed(imageData, x - 1, y + 1) + 
                getRed(imageData, x, y + 1) + 
                getRed(imageData, x + 1, y + 1);
            g = getGreen(imageData, x - 1, y - 1) + 
                getGreen(imageData, x, y - 1) + 
                getGreen(imageData, x + 1, y - 1) + 
                getGreen(imageData, x - 1, y) + 
                getGreen(imageData, x, y) + 
                getGreen(imageData, x + 1, y) + 
                getGreen(imageData, x - 1, y + 1) + 
                getGreen(imageData, x, y + 1) + 
                getGreen(imageData, x + 1, y + 1);
            b = getBlue(imageData, x - 1, y - 1) + 
                getBlue(imageData, x, y - 1) + 
                getBlue(imageData, x + 1, y - 1)+ 
                getBlue(imageData, x - 1, y) + 
                getBlue(imageData, x, y) + 
                getBlue(imageData, x + 1, y + 1)+ 
                getBlue(imageData, x - 1, y + 1) + 
                getBlue(imageData, x, y + 1) + 
                getBlue(imageData, x + 1, y + 1);
            setPixel(imageData, x, y, (r/9), (g/9), (b/9), 255);
        }

        //setea los valores rgb del pixel con los promedios calculados anteriormente
        function setPixel(imageData, x, y, r, g, b, a){
            //convierte la imagen en un arreglo
            let index = (x + y * imageData.width) * 4;
            imageData.data[index+0] = r;
            imageData.data[index+1] = g;
            imageData.data[index+2] = b;
            imageData.data[index+3] = a;
        }

        //obtiene componente R
        function getRed(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 0];
        }
                
        //obtiene componente G
        function getGreen(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 1];
        }
        
        //obtiene componente B
        function getBlue(imageData, x, y) {
            let index = (x + y * imageData.width) * 4;
            return imageData.data[index + 2];
        }

        function filtroBinarizacion(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            //calcula el tono de gris para cada pixel y si es mayor que 255/2 setea rgb a 255, si no, 0.
            for (let i = 0; i < data.length; i += 4) {
                //r+g+b/3 = tono de gris
                let gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                //si esta mas cerca del blanco que del negro, setea en blanco
                if( gray > (255/2)){
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                }
                //sino, setea en negro
                else {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filtroSaturacion(image) {
            //devuelve un objeto ImageData que representa los datos de los píxeles
            //en el area que va desde 0 (x), 0 (y) (inicio del canvas) hasta el ancho de la imagen (image.width)y alto de la imagen (image.height)
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
            let saturacion = 2; // valor de saturacion.

            let luR = 0.3086; // constante que determina luminosidad de rojo
            let luG = 0.6094; // constante que determina luminosidad de verde
            let luB = 0.0820; // constante que determina luminosidad de azul

            let rr = (1 - saturacion) * luR + saturacion;
            let rg = (1 - saturacion) * luG;
            let rb = (1 - saturacion) * luB;

            let gr = (1 - saturacion) * luR;
            let gg = (1 - saturacion) * luG + saturacion;
            let gb = (1 - saturacion) * luB;

            let br = (1 - saturacion) * luR;
            let bg = (1 - saturacion) * luG;
            let bb = (1 - saturacion) * luB + saturacion;

            for (let i = 0; i < data.length; i += 4) {
                let r = data[i]; // color original R
                let g = data[i + 1]; // color original G
                let b = data[i + 2]; // color original B

                let rSaturado = (rr*r + rg*g + rb*b); // R saturado
                let gSaturado = (gr*r + gg*g + gb*b); // G saturado
                let bSaturado = (br*r + bg*g + bb*b); // B saturado

                data[i] = rSaturado;
                data[i + 1] = gSaturado;
                data[i + 2] = bSaturado;
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function filtroDeteccionBordes(image){
            let imageData = ctx.getImageData(0, 0, image.width, image.height);
            let data = imageData.data;
        }

        document.querySelector('#btnDownload').addEventListener('click', () => {
            //devuelve un data URL que contiene una representacion de la imagen
            let img = canvas.toDataURL();
            let link = document.createElement('a');
            link.download = '';
            link.href = img;
            link.click();
        })

    }
});