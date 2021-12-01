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
    let msjIcon = document.querySelector("#chats");
    let searchIcon = document.querySelector("#buscar");
    let profileIcon = document.querySelector("#imagen-footer");
    let popUP = document.querySelector("#popUp");
    let btnPop = document.querySelector("#configuracion");
    //let btnCerrarSesion = document.querySelector("#op2");
    

    popUP.classList.add("ocultar");
   
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

    function redirectChats(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/chats.html'
    }

    function redirectSearch(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/busqueda.html'
    }

    function tooglePop(){
        popUP.classList.toggle("ocultar");
    }

    function logOut(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/index.html'
    }

    iconoNext.addEventListener('click', siguienteImagen);
    iconoPrev.addEventListener('click', imagenPrevia);
    msjIcon.addEventListener("click", redirectChats);
    searchIcon.addEventListener("click", redirectSearch);
    btnPop.addEventListener("click", tooglePop);
    //btnCerrarSesion.addEventListener("click", logOut);
});