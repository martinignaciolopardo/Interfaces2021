document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    document.querySelector("#feed").addEventListener('click', redirectFeed);
    document.querySelector("#chats").addEventListener('click', redirectChat);
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
        location.href = "https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToFeed.html";
    }
    function redirectChat(){
        location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/loadingToChat.html';
    }
 
});