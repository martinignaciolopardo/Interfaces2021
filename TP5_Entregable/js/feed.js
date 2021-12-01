document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    let iconoNext = document.querySelector('#icono-next');
    let iconoPrev = document.querySelector('#icono-prev');
    let circulo1 = document.querySelector('#circulo1');
    let circulo2 = document.querySelector('#circulo2');
    let circulo3 = document.querySelector('#circulo3');
    let galeria = ["../assets/images/publicacion4.jfif","../assets/images/publicacion3.jfif","../assets/images/publicacion6.jpg"];
    let img = document.querySelector('#imagen-publicacion2');
    let posicion = 0;
   
    img.src = galeria[posicion];
    iconoPrev.classList.add('ocultar');

    function siguienteImagen(){
        if (posicion < 2) {
            posicion++;
            img.src = galeria[posicion];
            iconoPrev.classList.remove('ocultar');
        }if (posicion > 1) {
            iconoNext.classList.add('ocultar');
        }
        actualizarIconoGaleria();
    }

    function actualizarIconoGaleria(){
        if (posicion == 1) {
            circulo2.setAttribute('fill','black');
            circulo2.setAttribute('stroke','black');
            circulo1.setAttribute('fill','#606060');
            circulo1.setAttribute('stroke','#606060');
        }
        if (posicion == 2) {
            circulo3.setAttribute('fill','black');
            circulo3.setAttribute('stroke','black');
            circulo2.setAttribute('fill','#606060');
            circulo2.setAttribute('stroke','#606060');
        }
    }

    function imagenPrevia(){
        if (posicion>0) {
            posicion--;
            img.src = galeria[posicion];
            iconoNext.classList.remove('ocultar');
        }if (posicion < 1) {
            iconoPrev.classList.add('ocultar');
        }
        actualizarIcoGaleria();
    }

    function actualizarIcoGaleria(){
        if (posicion == 0) {
            circulo1.setAttribute('fill','black');
            circulo1.setAttribute('stroke','black');
            circulo2.setAttribute('fill','#606060');
            circulo2.setAttribute('stroke','#606060');
        }
        if (posicion == 1) {
            circulo2.setAttribute('fill','black');
            circulo2.setAttribute('stroke','black');
            circulo3.setAttribute('fill','#606060');
            circulo3.setAttribute('stroke','#606060');
        }
    }

    iconoNext.addEventListener('click', siguienteImagen);
    iconoPrev.addEventListener('click', imagenPrevia);
   
});