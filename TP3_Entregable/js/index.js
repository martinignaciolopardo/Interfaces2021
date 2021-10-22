document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    let divPersonaje = document.querySelector("#pj");
    let spanB = document.querySelector("#spanB");
    let spanI = document.querySelector("#spanI");
    let spanE = document.querySelector("#spanE");
    let spanN = document.querySelector("#spanN");
    let spanS = document.querySelector("#spanS");
    let saltando = false;

    function saltar(e) {
        if (e.keyCode == 38 && saltando == false) {
            saltando = true;
            divPersonaje.classList.add("saltar");
            setTimeout(terminarSalto, 980);
        }
    }

    function terminarSalto(){
        spanB.innerHTML = "B";
        spanI.innerHTML = "I";
        spanE.innerHTML = "E";
        spanN.innerHTML = "N";
        spanS.innerHTML = "!";
        divPersonaje.classList.remove("saltar");
        saltando = false;
    }

    window.addEventListener("keydown", saltar);

});