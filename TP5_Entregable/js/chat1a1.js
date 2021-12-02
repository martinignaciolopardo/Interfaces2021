document.addEventListener('DOMContentLoaded', () => {
    "use strict"

    let enviar = document.querySelector("#enviar");
    let mensaje = document.querySelector("#mensaje");
    let archivo = document.querySelector("#archivo");
    let camara = document.querySelector("#camara");
    let audio2 = document.querySelector("#audio2");
    enviar.classList.add("oculto");

    mensaje.addEventListener('click', cambia);
    enviar.addEventListener('click', cambia);

    function cambia(){
        enviar.classList.toggle("oculto");
        archivo.classList.toggle("oculto");
        camara.classList.toggle("oculto");
        audio2.classList.toggle("oculto");
        mensaje.value = '';
    }
});