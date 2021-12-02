document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    document.querySelector("#feed").addEventListener('click', redirectFeed);
    document.querySelector("#buscar").addEventListener('click', redirectSearch);
    document.querySelector("#icono-lupa").addEventListener('click', buscar);
    let inputBusqueda = document.querySelector("#busqueda");
    let resultado = document.querySelector("#resultado");
    let nombreContacto = document.querySelector('.nombre-contacto2');

    resultado.classList.add("oculto");

    function buscar(){
        inputBusqueda.setAttribute('placeholder', 'Buscar contacto');
        setTimeout(mostrarResultado, 800);
    }

    function mostrarResultado(){
        resultado.classList.remove("oculto");
    }
        
    function redirectFeed(){
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/feed.html";
    }

    function redirectSearch(){
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/busqueda.html";
    }

  
});