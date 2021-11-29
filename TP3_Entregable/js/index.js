document.addEventListener('DOMContentLoaded', () => {
    "use strict"
    let divPersonaje = document.querySelector("#pj");
    let divPopup = document.querySelector("#info-js");
    let divBtnPopup = document.querySelector("#btn-aceptar");
    let overlay = document.querySelector('.overlay');
    let divPopupInfo = document.querySelector(".popUp-Info");

    let spanB = document.querySelector("#spanB");
    let spanI = document.querySelector("#spanI");
    let spanE = document.querySelector("#spanE");
    let spanN = document.querySelector("#spanN");
    let spanS = document.querySelector("#spanS");
    let saltando = false;
    // let mediaserver = require('mediaserver');


    function saltar(e) {
        if (e.keyCode == 38 && saltando == false) {
            saltando = true;
            divPersonaje.classList.add("saltar");
            setTimeout(terminarSalto, 980);
        }
    }

    function terminarSalto() {
        spanB.innerHTML = "B";
        spanI.innerHTML = "I";
        spanE.innerHTML = "E";
        spanN.innerHTML = "N";
        spanS.innerHTML = "!";
        divPersonaje.classList.remove("saltar");
        saltando = false;
    }

    window.addEventListener("keydown", saltar);

    divPopup.addEventListener('click', (e) => {
        divPopupInfo.classList.add('active');
        overlay.classList.add('active');
        console.log('holas');
    })

    divBtnPopup.addEventListener('click', () => {
        divPopupInfo.classList.remove('active');
        overlay.classList.remove('active');
    })
});