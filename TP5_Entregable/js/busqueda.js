document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    document.querySelector("#feed").addEventListener('click', redirectFeed);
    document.querySelector("#feed").addEventListener('click', redirectChat);
    document.querySelector("#feed").addEventListener('click', redirectCrearPublicacion);
    document.querySelector("#feed").addEventListener('click', redirectSearch);
    document.querySelector("#ico-contacto").addEventListener('click', buscar);
    let inputBusqueda = document.querySelector("#busqueda");
    let resultado = document.querySelector("#resultado");
    

    resultado.classList.add("oculto");

    function buscar(){
        inputBusqueda.setAttribute('placeholder', 'Buscar contacto');
        setTimeout(mostrarResultado, 800);
    }

    function mostrarResultado(){
        resultado.classList.remove("oculto");
    }
        
    function redirectFeed(){
        location.href = "";
    }
    function redirectChat(){
        location.href = "";
    }
    function redirectCrearPublicacion(){
        location.href = "";
    }
    function redirectSearch(){
        location.href = "";
    }
});