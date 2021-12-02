document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    let enviar = document.querySelector("#enviar");
    let mensaje = document.querySelector("#mensaje");
    let archivo = document.querySelector("#archivo");
    let camara = document.querySelector("#camara");
    let audio = document.querySelector("#audio");
    let backToChat = document.querySelector("#nav-back");
    enviar.classList.add("oculto");

    function cambia(){
        enviar.classList.toggle("oculto");
        archivo.classList.toggle("oculto");
        camara.classList.toggle("oculto");
        audio.classList.toggle("oculto");
        mensaje.value = '';
    }

    function back(){
        window.location.href = 'https://martinignaciolopardo.github.io/Interfaces2021/TP5_Entregable/pages/chats.html';
    }

    mensaje.addEventListener('click', cambia);
    enviar.addEventListener('click', cambia);
    backToChat.addEventListener('click', back);
});