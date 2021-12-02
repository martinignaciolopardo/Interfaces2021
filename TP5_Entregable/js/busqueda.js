document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    let feed = document.querySelector("#feed");
    let chat = document.querySelector("#chats");
    let contacto = document.querySelector("#ico-contacto");
    let hashtag = document.querySelector("#ico-hashtag");
    let noticias = document.querySelector("#ico-noticias");
    let lupaBuscar = document.querySelector("#icono-lupa");
    let inputBusqueda = document.querySelector("#busqueda");
    let filtros = document.querySelector("#filtros-contacto");
    let inputFiltros = document.querySelector("#inputs-busqueda");
    let resultado = document.querySelector("#resultado");
    let inputCiudad = document.querySelector("#input-ciudad");
    let inputPais = document.querySelector("#input-pais");
    let inputEdad = document.querySelector("#input-edad");
    let labelCiudad = document.querySelector(".label1");
    let labelPais = document.querySelector(".label2");
    let labelEdad = document.querySelector(".label3");
    let box1 = document.querySelector("#cbox1");
    let box2 = document.querySelector("#cbox2");
    let box3 = document.querySelector("#cbox3");
    
    resultado.classList.add("oculto");
    filtros.classList.add("oculto");
    inputFiltros.classList.add("oculto");
    inputCiudad.classList.add("oculto");
    inputPais.classList.add("oculto");
    inputEdad.classList.add("oculto");
    labelCiudad.classList.add("oculto");
    labelPais.classList.add("oculto");
    labelEdad.classList.add("oculto");

    function buscarContacto(){
        inputBusqueda.setAttribute('placeholder', 'Buscar contacto');
        filtros.classList.toggle("oculto");
        //setTimeout(mostrarResultado, 800);
    }

    function buscarHashtag(){
        inputBusqueda.setAttribute('placeholder', 'Buscar hashtag');
        filtros.classList.add("oculto");
        inputFiltros.classList.add("oculto");
    }

    function buscarNoticias(){
        inputBusqueda.setAttribute('placeholder', 'Buscar noticias');
        filtros.classList.add("oculto");
        inputFiltros.classList.add("oculto");
    }

    function mostrarInputPais(){
        inputFiltros.classList.remove("oculto");
        inputPais.classList.toggle("oculto");
        labelPais.classList.toggle("oculto");
        if (inputCiudad.classList.contains('oculto') && inputPais.classList.contains('oculto') && inputEdad.classList.contains('oculto')) {
            console.log('se ocultaron todos');
            inputFiltros.classList.toggle("oculto");
        }
    }

    function mostrarInputCiudad(){
        inputFiltros.classList.remove("oculto");
        inputCiudad.classList.toggle("oculto");
        labelCiudad.classList.toggle("oculto");
        if (inputCiudad.classList.contains('oculto') && inputPais.classList.contains('oculto') && inputEdad.classList.contains('oculto')) {
            console.log('se ocultaron todos');
            inputFiltros.classList.toggle("oculto");
        }
    }

    function mostrarInputEdad(){
        inputFiltros.classList.remove("oculto");
        inputEdad.classList.toggle("oculto");
        labelEdad.classList.toggle("oculto");
        if (inputCiudad.classList.contains('oculto') && inputPais.classList.contains('oculto') && inputEdad.classList.contains('oculto')) {
            console.log('se ocultaron todos');
            inputFiltros.classList.toggle("oculto");
        }
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

    chat.addEventListener('click', redirectChat);
    feed.addEventListener('click', redirectFeed);
    contacto.addEventListener('click', buscarContacto);
    hashtag.addEventListener('click', buscarHashtag);
    noticias.addEventListener('click', buscarNoticias);
    box1.addEventListener('click', mostrarInputPais);
    box2.addEventListener('click', mostrarInputCiudad);
    box3.addEventListener('click', mostrarInputEdad);
    lupaBuscar.addEventListener('click', mostrarResultado);

});